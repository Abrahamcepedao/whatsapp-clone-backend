//require || import stuff
import express from "express";
import mongoose from "mongoose"
import Messages from "./dbMessages.js";
import Pusher from "pusher"
/* 
https://knownorigin.io/
https://makersplace.com/
https://foundation.app/
https://artistsourced.com/
https://app.portion.io/#
https://mybae.io/
https://ghostmarket.io/
https://niftygateway.com/
https://nonfungible.com/
 */
//app config
const app = express();
const port = process.env.PORT || 9000

const pusher = new Pusher({
  appId: "1161679",
  key: "b3dc9e0547134a50acaa",
  secret: "eb9a92bc88697b18fd29",
  cluster: "us2",
  useTLS: true
});

//middleware
// password: EGRvKcxZGaUOZxwP
app.use(express.json());

//Db config
const connection_url = 'mongodb+srv://admin:EGRvKcxZGaUOZxwP@cluster0.8ic8a.mongodb.net/whatsappdb?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// ???

//Api routes
app.get('/', (req, resp) => resp.status(200).send("hello world!!"))

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if(err){
            res.status(500).send(err)
        } else{
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if(err){
            res.status(500).send(err)
        } else{
            res.status(201).send(data)
        }
    })
})

//listener
app.listen(port, () => console.log(`listening on localhost:${port}`))