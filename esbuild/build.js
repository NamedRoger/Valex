const path = require("path");
const esbuild = require("esbuild");
const { getFiles } = require("./functions");
require("dotenv").config();

const {
    NODE_ENV,
} = process.env;

const cssModulesPlugin = require("esbuild-css-modules-plugin");

const basePath = path.join("web", "js", "modules");
const buildPath = path.join("assets", "js", "modules");

getFiles(basePath, (files) => {
    const loadFiles = files.map((file) => path.join(basePath, file));
    esbuild.build({
        entryPoints: loadFiles,
        outdir: buildPath,
        format: "esm",
        bundle: true,
        minify: NODE_ENV === "production",
        splitting: true,
        sourcemap: true,
        target: ["chrome58", "firefox57", "safari11"],
        loader: {
            ".js": "jsx",
        },
        plugins: [cssModulesPlugin()],
        define: {
            "process.env.NODE_ENV": `'${NODE_ENV}'`,
        }
    })
        .then(() => console.log(`⚡ Done in ${NODE_ENV} mode`))
        .catch(() => process.exit(1));
});