const servers = {
    "i1": {
        sshKey: __dirname + "/../../gitignored/i1_v1.pem.pem",
        host: "ec2-34-245-87-92.eu-west-1.compute.amazonaws.com",
    },
    "i2": {
        sshKey: __dirname + "/../../gitignored/i2_v1.pem",
        host: "ec2-34-243-201-169.eu-west-1.compute.amazonaws.com",
    },
    "i2_dev_api": {
        sshKey: __dirname + "/../../gitignored/i2_v1.pem",
        host: "ec2-3-248-201-21.eu-west-1.compute.amazonaws.com",
    },
    "i2_dev_frontend": {
        sshKey: __dirname + "/../../gitignored/i2_v1.pem",
        host: "ec2-54-195-165-227.eu-west-1.compute.amazonaws.com",
    },
}

module.exports = {
    servers,
}
