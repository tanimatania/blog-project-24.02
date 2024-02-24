import express from "express";
// import activityLogger from './middlewares/activityLogger';
import usersRoute from "./routers/usersRoute";
import postsRoute from "./routers/postsRoute";
import "dotenv/config";
import cors from "cors";
import pool from "./db";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", usersRoute);
app.use("/posts", postsRoute);

//run the server
const port = process.env.Port || 7000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app
