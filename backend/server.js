import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import Pusher from "pusher";
import mongoData from "./schema/mongoData.js";

const mongoURI = `mongodb+srv://slack:slack@cluster0.uvdyq.mongodb.net/slackDb?retryWrites=true&w=majority`;

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// connect to db
mongoose.connection.once("open", () => {
  console.log("DBconnected");
});

app.get("/", (req, res) => res.status(200).send("server running"));

app.post("/new/channel", (req, res) => {
  const dbData = req.body;

  mongoData.create(dbData, (err, data) => {
    if (err) res.status(500).send(err);
    else res.status(201).send(data);
  });
});

app.post("/new/message", (req, res) => {
  const id = req.query.id;
  const newMessage = req.body;

  mongoData.updateMany(
    { _id: id },
    { $push: { conversations: newMessage } },
    (err, data) => {
      if (err) res.status(500).send(err);
      else res.status(201).send(data);
    }
  );
});

app.get("/get/channelList", (req, res) => {
  mongoData.find((err, data) => {
    if (err) res.status(500).send(err);
    else {
      let channels = [];

      data.map((channelData) => {
        const channelInfo = {
          id: channelData._id,
          name: channelData.channel.Name,
        };
        channels.push(channelInfo);
      });
      res.status(200).send(channels);
    }
  });
});

app.get("/get/conversation", (req, res) => {
  const id = req.query.id;

  mongoData.find({ _id: id }, (err, data) => {
    if (err) res.status(500).send(err);
    else res.status(201).send(data);
  });
});

app.listen(port, () => console.log(`server port ${port}`));
