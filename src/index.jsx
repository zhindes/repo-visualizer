import { exec } from '@actions/exec'
import * as core from '@actions/core'
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from "fs"

import { processDir } from "./process-dir.js"
import { Tree } from "./Tree.tsx"

const main = async () => {
  core.info('[INFO] Usage https://github.com/githubocto/repo-visualizer#readme')

  const rootPath = core.getInput("root_path") || "./";
  const maxDepth = core.getInput("max_depth") || 9
  const colorEncoding = core.getInput("color_encoding") || "type"
  const commitMessage = core.getInput("commit_message") || "Repo visualizer: updated diagram"
  const excludedPathsString = core.getInput("excluded_paths") || "node_modules,bower_components,dist,out,build,eject,.next,.netlify,.yarn,.git,.vscode,package-lock.json,yarn.lock"
  const excludedPaths = excludedPathsString.split(",").map(str => str.trim())
  const branch = core.getInput("branch")
  const data = await processDir(rootPath, excludedPaths);

  const componentCodeString = ReactDOMServer.renderToStaticMarkup(
    <Tree data={data} maxDepth={+maxDepth} colorEncoding={colorEncoding} />
  );

  const outputFile = core.getInput("output_file") || "./diagram.svg"

  await fs.writeFileSync(outputFile, componentCodeString)

  let doesBranchExist = true

  console.log("All set!")
}

main()

function execWithOutput(command, args) {
  return new Promise((resolve, reject) => {
    try {
      exec(command, args, {
        listeners: {
          stdout: function (res) {
            core.info(res.toString())
            resolve(res.toString())
          },
          stderr: function (res) {
            core.info(res.toString())
            reject(res.toString())
          }
        }
      })
    } catch (e) {
      reject(e)
    }
  })
}
