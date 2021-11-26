import express, { Request, Response } from "express";

const port = 3002;
const app = express();

app.get("/reaction", (req: Request, res: Response) => {
  return res.send("response from izzys.work");
});

app.listen( port, () => {
  console.log(`server is running on port ${port}`);
});