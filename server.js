import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js';
import Cors from "cors";

// App Config
const app = express();
const port = process.env.PORT || 8001
// const connection_url ="mongodb+srv://admin:6mrmnw1@cluster0.4lrnua9.mongodb.net/tinderdb?retryWrites=true&w=majority";

const connection_url ="mongodb+srv://hydra:6mrmnw1@tinder.nq1vkof.mongodb.net/tinderDB"


// Middlewares
app.use(express.json());
app. use(Cors());

// DB config
mongoose.set('strictQuery', false);
mongoose.connect(connection_url, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('Cannot connect to the database');
    } else {
        console.log('Successfully connected to the database');
    }
})
// mongoose.connect(connection_url, { useNewUrlParser: true });
// mongoose.connect(connection_url, { useCreateIndex: true });
// mongoose.connect(connection_url, { useUnifiedTopology: true });
//  mongoose.connect(connection_url, {
    //  useNewUrlParse: true,
    //   useCreateIndex: true,
    //   useUnifiedTopology: true,
//  });
 

// API Endpoints
app.get("/", (req, res) => res.status(200).send('HELLO CLEVER PROGRAMMERS!!!'));

app.post("/tinder/cards", (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard,(err,data) => {
        if (err) {
            res.status(500).send(err)
        } else {
          res.status(201).send(data)            
        }
    })
});


app.get("/tinder/cards", (req, res) => {
    Cards.find((err,data) => {
        if (err) {
            res.status(500).send(err)
        } else {
          res.status(200).send(data)            
        }
    })
});

// Listener
app.listen (port, () => console.log(`listening on localhost: ${port}`));

app.on('error', () => {
    console.log('Cannot start the server');
})