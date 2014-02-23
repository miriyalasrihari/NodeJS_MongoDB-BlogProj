'user strict';

var buildTypeConfig, buildType, server;

buildTypeConfig = {
    Prod : 0,
    Test : 1
};
buildType = buildTypeConfig.Test;

if (buildType === buildTypeConfig.Test) {
    server = {
        IP : 'localhost',
        Port : 3000
    };
}
exports.BuildTypeConfig = buildTypeConfig;
exports.BuildType = buildType;
exports.Server = server;