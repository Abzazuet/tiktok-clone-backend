import express from "express";
import mongoose from "mongoose";
import Data from "./seeds.js";
import Videos from "./dbModel.js";
import Cors from 'cors';
// app config
const app = express(); // Instatiate our server
const port = process.env.PORT || 9000; // Port or own port
const connection_url =
  "mongodb+srv://admin:admin@cluster1.fcmf1kf.mongodb.net/tiktok?retryWrites=true&w=majority";
// middlewares
app.use(express.json());
app.use(Cors());
// db config
mongoose.connect(connection_url);
// api endpoint
app.get("/", (req, res) => res.status(200).send("Hello world"));
app.get("/v1/posts", (req, res) => res.status(200).send(Data));
app.get("/v2/posts", (req, res) => {
  Videos.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.post("/v2/posts", (req, res) => {
  // POST request is to ADD DATA to the database
  // It will let us ADD a video DOCUMENT to the videos COLLECTION
  const dbVideos = req.body;
  // Use the newly created model
  Videos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
// listener
app.listen(port, () => console.log(`Listening on: ${port}`)); // Tell the application to listen to that port
