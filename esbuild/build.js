const path = require("path");
const { execFile } = require("child_process");
require("dotenv").config();

const enviroment = process.env.NODE_ENV || "production";
const pathEsbuildConfig = path.join(process.cwd(), "esbuild");

const buildFile = `build.${enviroment}.js`;

const baseBuildPath = path.join(pathEsbuildConfig, buildFile);

const child = execFile("node", [baseBuildPath],
    (error, stdout) => {
        
        if (error !== null) {
            throw error;
        }
        console.log(`${stdout} in ${enviroment } mode`);
    });

child.on("error", (error) => {
    console.log(error)
    child.kill();
});



