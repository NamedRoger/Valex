const readdir = require("readdirp");

const getFiles = (basePath, callback) => {
    const allPathFiles = [];
    readdir(basePath,{
        fileFilter: ["index.js"]
    }).on("data", (entry) => {
        allPathFiles.push(entry.path);
    })
    .on("end", () => {
        callback(allPathFiles);
    });
}

module.exports = {
    getFiles
};