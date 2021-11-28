import { Request, Response } from "express";
import { spawn } from "child_process";

const rebuild = (req: Request, res: Response) => {

  let proj = req.body?.project;

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
  const spawned = spawn('/ghcli/bin/gh',
    ['repo','clone',loc],
    {cwd:'/tmp'});

  spawned.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  
  spawned.on('error', (error) => {
    console.error(`error: ${error.message}`);
  });

  spawned.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  spawned.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    return res.status(201).send("SUCCESS");
  });
}

export default rebuild;