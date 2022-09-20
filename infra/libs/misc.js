const util = require('util');
const execP = util.promisify(require('child_process').exec);
const exec = require('child_process').exec;
const chalk = require("chalk");

async function runSync(cmd) {
    console.log(chalk.green(cmd))
    const { stdout, stderr } = await execP(cmd);
    console.log(stdout.toString());
    console.error(stderr.toString());
    return { stdout, stderr };
}

async function runAsync(cmd) {
    console.log(chalk.green("> " + cmd))
    return new Promise((resolve, reject) => {
        const process = exec(cmd);
        let stdout = ''
        let stderr = ''
        process.stdout.on("data", function(data) {
            console.log(data);
            stdout += data;
        });

        process.stderr.on("data", function(data) {
            console.log(data);
            stderr += data;
        });
        process.on("close", function(code) {
            console.log(chalk.gray(`child process exited with code ${code}`));
            if (code === 0) {
                resolve({ stdout, stderr, code })
            } else {
                reject({ stdout, stderr, code })
            }
        });
    })
}

async function qaRepositoryTag({ containerName }){
    const { stdout: branchName } = await runSync('git rev-parse --abbrev-ref HEAD');
    const { stdout: commitHash } = await runSync('git rev-parse --short HEAD');
    return `${containerName}__${branchName}__${commitHash}`.replace(/\//, '_').replace("\n", '').replace("\n", '')
}

async function ecrLogIn({ region, profile, accountId }){
    return await runAsync(`aws ecr get-login-password --region ${region} --profile ${profile} | sudo docker login --username AWS --password-stdin ${accountId}`);
}

async function buildAndReleaseImage({ accountId, repositoryName }, { repositoryTag }){
    await runAsync(`sudo docker build -t "${repositoryName}:${repositoryTag}" .`);
    await runAsync(`sudo docker tag ${repositoryName}:${repositoryTag} ${accountId}/${repositoryName}:${repositoryTag}`);
    try {
        await runAsync(`sudo docker push ${accountId}/${repositoryName}:${repositoryTag}`);
    } catch (e) {
        if (e.stderr.includes('already exists')) {
            console.log(chalk.yellow('The image tag already exists. Please, consider commit your changes and try again. Otherwise the old version will be deployed.'));
        } else {
            throw e;
        }
    }
}

async function gitCheckout({ target }){
    await runAsync(`git pull ; git checkout ${target}`);
}
function connectString(server){
    return `ssh -o StrictHostKeyChecking=no -i ${server.sshKey} ec2-user@${server.host}`
}
async function runRemotely({ host, sshKey }, cmd){
    await runAsync(`ssh -o StrictHostKeyChecking=no -i ${sshKey} ec2-user@${host} '${cmd}'`);
}
async function download({ host, sshKey }, from, to){
    await runAsync(`scp -i ${sshKey} ec2-user@${host}:${from} ${to}`);
}
async function upload({ host, sshKey }, from, to){
    await runAsync(`scp -i ${sshKey} ${from} ec2-user@${host}:${to}`);
}

async function loginAndStopImage(config, server){
    await runRemotely(server, `yes | sudo docker image prune -a`)
    await runRemotely(server, `aws ecr get-login-password --region ${config.region} | sudo docker login --username AWS --password-stdin ${config.accountId}`)
    try {
        await runRemotely(server, `sudo docker stop ${config.containerName}`)
    } catch (e) {
        if (e.stderr.includes('No such container')) {
            console.log(chalk.yellow('No such container'));
        } else {
            throw e;
        }
    }
    await runRemotely(server, `sleep 5`)
}

async function waitForHealthyRemotely(config, server, { url, delay, logLines, expectedStatus = 200 } = {}){
    await runRemotely(server, `while [[ "$(curl -s -o /dev/null -L -w ''%{http_code}'' ${url})" != "${expectedStatus}" ]]; do echo "Waiting for ${url}" && sleep ${delay} && sudo docker logs ${config.containerName} | tail -n ${logLines}; done`)
}

async function hasGitChanges(){
    const result = await runSync('git status --porcelain')
    return result.stdout !== ''
}

async function throwIfGitHasChanges(){
    if (await hasGitChanges()) {
        console.log(chalk.red('Please, commit your changes first.'));
        process.exit(1)
    }
}

async function machineUserAndId(){
    const user = await runSync(`whoami`)
    let machineId = 'CI'
    try {
        machineId = await runSync(`sudo dmidecode --string system-uuid`)
        machineId = machineId.stdout.replace("\n", "").slice(0,4)
    } catch (e) {
        console.log('e', e)
    }
    return `${user.stdout.replace("\n", "")}:${machineId}`
}

async function getLastVersion(config){
    const versions = await runSync(`aws ecr describe-images --repository-name ${config.repositoryName} --profile ${config.profile} --region ${config.region} --query \'sort_by(imageDetails,& imagePushedAt)[-1].imageTags[0]\' `)
    return versions.stdout.split('\n')[0].replace(/"/g, '')
}

async function isImageExistsInEcr(config, imageTag){
    try {
        await runSync(`aws ecr describe-images --repository-name ${config.repositoryName} --profile ${config.profile} --region ${config.region} --image-ids imageTag=${imageTag}`)
        return true
    } catch (e) {
        console.log('Image not found', e.toString())
        return false
    }
}

async function getNextVersion(config){
    const v = await getLastVersion(config)
    const semverInc = require('semver/functions/inc')
    return semverInc(v, 'patch')
}

async function releaseDocker(imageTag, config){
    await runAsync(`sudo docker build -t "${config.repositoryName}:${imageTag}" -f ${config.dockerFile} .`)
    await runAsync(`aws ecr get-login-password --region ${config.region} --profile ${config.profile} | sudo docker login --username AWS --password-stdin ${config.accountId}`)
    await runAsync(`sudo docker tag ${config.repositoryName}:${imageTag} ${config.accountId}/${config.repositoryName}:${imageTag}`)
    await runAsync(`sudo docker push ${config.accountId}/${config.repositoryName}:${imageTag}`)
}

async function getCommitHash(){
    const result = await runSync('git rev-parse HEAD')
    return result.stdout.split("\n")[0]
}

async function autoReleaseDocker(config){
    await throwIfGitHasChanges()
    const imageTag = await getCommitHash()
    const isImageExists = await isImageExistsInEcr(config, imageTag)
    if (!isImageExists) {
        await releaseDocker(imageTag, config)
    }
    return { imageTag }
}

function replaceShell(cmd) {
    const args = cmd.split(' ')
    const tool = args.shift()
    const options = args
    require('child_process').spawn(
        tool,
        options,
        {stdio: [process.stdin, process.stdout, process.stderr]}
    );
}

module.exports = {
    qaRepositoryTag,
    ecrLogIn,
    buildAndReleaseImage,
    gitCheckout,
    loginAndStopImage,
    runRemotely,
    waitForHealthyRemotely,
    connectString,
    color: chalk,
    runAsync,
    machineUserAndId,
    throwIfGitHasChanges,
    download,
    upload,
    getNextVersion,
    getLastVersion,
    autoReleaseDocker,
    releaseDocker,
    isImageExistsInEcr,
    getCommitHash,
    replaceShell,
    rootDir: __dirname + "/../..",
}
