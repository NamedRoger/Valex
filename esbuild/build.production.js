const path = require("path");
const esbuild = require("esbuild");
const { getFiles } = require("./functions");

const cssModulesPlugin = require("esbuild-css-modules-plugin");

const basePath = path.join("web", "js", "modules");
const buildPath = path.join("assets", "js", "modules");

getFiles(basePath, (files) => {
    const loadFiles = files.map((file) => path.join(basePath, file));
    console.log(loadFiles)
    esbuild.build({
        entryPoints: loadFiles,
        outdir: buildPath,
        format: "esm",
        bundle: true,
        minify: true,
        splitting: true,
        sourcemap: true,
        target: ["chrome58", "firefox57", "safari11"],
        loader: {
            ".js": "jsx",
        },
        plugins: [cssModulesPlugin()],
    })
        .then(() => console.log("⚡ Done"))
        .catch(() => process.exit(1));
});