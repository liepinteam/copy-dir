
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

    it("should copy directory structure", done => {
        copydir(sourcePath, destination, err => {
            if(err != null){
                throw err;
            }

            utils.verifyFiles(destination, utils.allPaths);
            done();
        });
    });

    it("should filter out directories", done => {
        const filter = (state, _filepath, filename) => state != "directory" || filename === "sampleDir";

        copydir(sourcePath, destination, {filter}, err => {
            if(err != null){
                throw err;
            }

            utils.verifyFiles(destination, utils.directoryFilterPaths);
            done();
        });
    });

    it("should filter out files", done => {
        const filter = (state) => state != "file";

        copydir(sourcePath, destination, {filter}, err => {
            if(err != null){
                throw err;
            }

            utils.verifyFiles(destination, utils.fileFilterPaths);
            done();
        });
    });

    it("should filter based on file path", done => {
        const filter = (_state, filepath) => filepath.indexOf("Two") < 0;

        copydir(sourcePath, destination, {filter}, err => {
            if(err != null){
                throw err;
            }

            utils.verifyFiles(destination, utils.folderNameFilterPaths);
            done();
        });
    });

    it("should filter based on file name", done => {
        const filter = (state, _filepath, fileName) => state !== "file" || fileName.indexOf("Two") < 0;

        copydir(sourcePath, destination, {filter}, err => {
            if(err != null){
                throw err;
            }

            utils.verifyFiles(destination, utils.fileNameFilterPaths);
            done();
        });
    });
})