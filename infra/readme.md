# Infra setup:

1. Make sure you have gitignored directory with:
   i2_v1.pem
2. Make sure you installed AWS cli
3. Make sure you set AWS cli creds:
```
cat ~/.aws/credentials 
[binaryx]
aws_access_key_id = XXX
aws_secret_access_key = XXXXX
```
4. Make sure have all packages installed:
```
cd infra && npm i && cd .. && \
```

# deploy staging (master branch as of now)

```
infra/scripts/autoReleaseDocker.js
infra/scripts/staging/deploy.js 87eedda2285c128547be2bebddcacf33a15d66e9
```

# deploy production (master branch as of now)

```
TODO
```

# Connect to ec2 instance

```
infra/scripts/connect.js SERVER_NAME
```
Example:
```
infra/scripts/connect.js i2
```
To see the servers list:
```
infra/scripts/connect.js
```
