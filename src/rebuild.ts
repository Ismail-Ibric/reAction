import { Request, Response } from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const rebuild = (req: Request, res: Response) => {
  
  let proj = req.body?.project;
  const host = req.get('host');
  const addr = req.socket.remoteAddress;

  console.log(`request orginated from '${host}' - '${addr}'`);

  switch( proj ) {
    case "Portfolio": 
      rebuildPortfolio(res);
      break;

    case "":
      break;
  }

}


const rebuildPortfolio = (res: Response) => {
  const loc = "Ismail-Ibric/Portfolio";
  const repoDir = "/tmp/Portfolio";
  const destDir = "/home/izzysoft/www";

  // delete directory recursively
  deleteDir(repoDir);

  const spawned = spawn('gh',
    ['repo','clone',loc],
    {cwd:'/tmp'});

  let isCloningInto = false;

  spawned.stderr.on('data', (data) => {
    isCloningInto = data.indexOf("Cloning into '", 0) === 0;
    if( isCloningInto )
      console.log(`stdout: ${data}`);
    else
      console.error(`stderr: ${data}`);
  });
  
  spawned.on('error', (error) => {
    console.error(`error: ${error.message}`);
  });

  spawned.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  spawned.on('close', (code) => {
    if( isCloningInto )
      code = 1;
    
    console.log(`child process exited with code ${code}`);
    copyDir(repoDir+"/build", destDir);
    if( code === 1 || isCloningInto )
      return res.status(201).send("SUCCESS");
    else
      return res.status(500).send("ERROR");
  });
}


async function copyDir(src: string, dest: string) {
  await fs.promises.mkdir(dest, { recursive: true });
  let entries = await fs.promises.readdir(src, { withFileTypes: true });

  for (let entry of entries) {
      let srcPath = path.join(src, entry.name);
      let destPath = path.join(dest, entry.name);

      entry.isDirectory() ?
          await copyDir(srcPath, destPath) :
          await fs.promises.copyFile(srcPath, destPath);
  }
}


async function deleteDir( repoDir: string ) {
  await fs.promises.rm(repoDir, {recursive: true, force: true})
  .then(() => {
    console.log(`${repoDir} was removed!`);
  }).catch((error: any) => {
    console.error(error.message);
  });
}


export default rebuild;