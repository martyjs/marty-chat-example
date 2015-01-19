var fs = require("fs");
var path = require("path");
var _ = require("underscore");
var aliasify = require("aliasify");
var rootDir = path.join(__dirname, "..");
var appDir = path.join(rootDir, "app");

var FILES_TO_IGNORE = [".DS_Store"];
var DIRECTORIES_TO_SEARCH = [
  "actions",
  "sources",
  "components",
  "constants",
  "stores",
  "utils"
];

module.exports = function (bundle) {
  bundle.transform(aliasify.configure(aliasifyConfig()))
};

function aliasifyConfig() {
  var aliases = files(DIRECTORIES_TO_SEARCH)
    .filter(ignoredFiles)
    .map(alias);

  return {
    verbose: false,
    configDir: rootDir,
    aliases: _.object(aliases)
  };
}

function ignoredFiles(file) {
  return _.any(FILES_TO_IGNORE, function (fileToIgnore) {
    return file.indexOf(fileToIgnore) === -1;
  });
}

function alias(file) {
  var name = path.basename(file, ".js");

  if (name === "index") {
    name = file.substring(6, file.lastIndexOf("/"));
  } else {
    name = file.substring(6, file.lastIndexOf("."));
  }

  return [name, file];
}

function files(dirs) {
  var res = [];

  dirs.forEach(function (dir) {
    res = res.concat(walkSync(path.join(appDir, dir)).map(function (file) {
      return file.replace(appDir, "./app");
    }));
  });

  return res;
}

function walkSync(dir, filelist) {
  if (dir[dir.length - 1] != "/") {
    dir = dir.concat("/");
  }

  filelist = filelist || [];

  fs.readdirSync(dir).forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + "/", filelist);
    } else {
      filelist.push(dir + file);
    }
  });

  return filelist;
}