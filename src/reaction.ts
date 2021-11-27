import express, { Request, Response } from "express";

const port = 8002;
const app = express();

app.use( express.json() );
//app.use( express.urlencoded({ extended: true }) );

app.post("/api/action", (req: Request, res: Response) => {
  console.log( "req.body: ", req.body );
  return res.status(201).send("SUCCESS");
});

app.listen( port, () => {
  console.log(`server is running on port ${port}`);
});