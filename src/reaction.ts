import express, { Request, Response } from "express";
import rebuild from "./rebuild"

const port = 8002;
const app = express();

app.use( express.json() );

app.post("/api/action", (req: Request, res: Response) => {
  
  console.log( "req.body: ", req.body );

  switch( req.body?.process ) {
    case "rebuild":
      rebuild( req, res );
      break;
    default:
      break;
  }
});

app.listen( port, () => {
  console.log(`server is running on port ${port}`);
});