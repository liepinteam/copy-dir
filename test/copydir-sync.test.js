
const copydir = require("../")
const path = require("path");
const mkdirp = require("mkdirp");
const rimraf = require("rimraf");
const utils = require("./testUtils");

describe("copydir", () => {

    const outputPath = path.join(__dirname, "../testOutput");
    const sourcePath = path.join(__dirname, "./sampleDir");
    const destination = path.join(outputPath, "copyDir");

    beforeEach(done => {
        rimraf(outputPath, err => {
            if(err){
                throw err;
            }
            mkdirp.sync(destination);
            done();
        })
    });

    it("should copy directory structure", () => {
        copydir.sync(sourcePath, destination);

        utils.verifyFiles(destination, utils.allPaths);
    });

    it("should filter out directories", () => {
        const filter = (state, _filepath, filename) => state != "directory" || filename === "sampleDir";

        copydir.sync(sourcePath, destination, {filter});

        utils.verifyFiles(destination, utils.directoryFilterPaths);
    });

    it("should filter out files", () => {
        const filter = (state) => state != "file";

        copydir.sync(sourcePath, destination, {filter});

        utils.verifyFiles(destination, utils.fileFilterPaths);
    });

    it("should filter based on file path", () => {
        const filter = (_state, filepath) => filepath.indexOf("Two") < 0;

        copydir.sync(sourcePath, destination, {filter});

        utils.verifyFiles(destination, utils.folderNameFilterPaths);
    });

    it("should filter based on file name", () => {
        const filter = (state, _filepath, fileName) => state !== "file" || fileName.indexOf("Two") < 0;

        copydir.sync(sourcePath, destination, {filter});

        utils.verifyFiles(destination, utils.fileNameFilterPaths);
    });
})