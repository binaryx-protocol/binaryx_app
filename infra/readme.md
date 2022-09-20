# Infra setup:

1. Make sure you have gitignored directory with:
   bookit.pem
   bookit-i2.pem
   bookit_deploy_key_v1
   bookit_deploy_key_v1.pub
   ssh_config
   aws_credentials
2. Make sure you installed AWS cli
3. Make sure you set AWS cli creds:
```
cat ~/.aws/credentials 
[bookit]
aws_access_key_id = XXX
aws_secret_access_key = XXXXX
```
4. Make sure have all packages installed:
```
cd infra && npm i && cd .. && \
cd website-backend-api && npm i && cd .. && \
cd website-backend-schedulers && npm i && cd .. && \
cd website-backoffice-api && npm i && cd .. && \
cd website-backoffice-frontend && npm i && cd .. && \
cd website-frontend && npm i && cd .. 
```

# deploy sandbox (replace master with needed commit if you want)

```
git checkout master && git pull origin master
infra/v1/scheduler/sandbox/deploy.js master && \
infra/v1/bo-api/sandbox/deploy.js master && \
infra/v1/bo-frontend/sandbox/deploy.js && \
infra/v1/be-api/sandbox/deploy.js && \
infra/v1/frontend/sandbox/deploy.js
```

# deploy staging (master branch as of now)

```

```

# deploy production (master branch as of now)

```
git checkout master
infra/v1/bo-api/production/deploy.js master && \
infra/v1/scheduler/production/deploy.js master && \
infra/v1/bo-frontend/production/deploy.js && \
infra/v1/be-api/production/deploy.js && \
infra/v1/frontend/production/deploy.js
```

# Connect to ec2 instance

```
infra/connect.js SERVER_NAME
```
Example:
```
infra/connect.js sandbox_be_api
```
To see the servers list:
```
infra/connect.js
```
