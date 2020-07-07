const fs = require("fs");
const path = require("path");

const allPaths = [
    "dirOne",
    path.join("dirOne", "dirTwo"),
    path.join("dirOne", "dirTwo", "fileTwo.txt"),
    path.join("dirOne", "fileOne.sample"),
    "fileOne.txt",
    "fileTwo.json",
]

const fileFilterPaths = [
    "dirOne",
    path.join("dirOne", "dirTwo")
]

const directoryFilterPaths = [
    "fileOne.txt",
    "fileTwo.json",
]

const folderNameFilterPaths = [
    "dirOne",
    path.join("dirOne", "fileOne.sample"),
    "fileOne.txt",
]

const fileNameFilterPaths = [
    "dirOne",
    path.join("dirOne", "dirTwo"),
    path.join("dirOne", "fileOne.sample"),
    "fileOne.txt",
]

function verifyFiles(folderPath, paths){
    const filePaths = buildFileList(folderPath)
    .map(childPath => path.relative(folderPath, childPath));

    expect(filePaths).toEqual(paths);
}

function buildFileList(folderPath){
    return fs.readdirSync(folderPath).map(childName => {
        const childPath = path.join(folderPath, childName);
        const stats = fs.statSync(childPath);

        const paths = [childPath];

        if(stats.isDirectory()){
            paths.push(...buildFileList(childPath));
        } 

        return paths;
    })
    .reduce((all, current) => {
        all.push(...current); 
        return all;
    }, []);
}

module.exports = {verifyFiles, allPaths, fileFilterPaths, directoryFilterPaths, folderNameFilterPaths, fileNameFilterPaths};