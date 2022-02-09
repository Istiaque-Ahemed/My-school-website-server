const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
// connection to database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cmhqh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db('Musa_miya_high_school');
        const noticeCollection = database.collection('schoolNotices')

        //Notices Post API
        app.post("/schoolNotices", async (req, res) => {
            const notice = req.body;
            const result = await noticeCollection.insertOne(notice);
            res.json(result)

        })
        //Notices Get API

        app.get("/schoolNotices", async (req, res) => {
            const cursor = noticeCollection.find({});
            const notice = await cursor.toArray();
            res.send(notice)

        })




    }
    finally {
        // await client.close();
    }

}
run().catch(console.dir);







app.get('/', (_req, res) => {
    res.send("hello world");
})

app.listen(port, () => {
    console.log('listening', port)
})