const express = require("express");

const app = express();

const Ranidb = require('ranidb');

let db = new Ranidb("../data/dats.json");

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`<a href="./api/users"> user </a>`)
})


app.get('/api/users', (req, res) => {
    console.log(db.getAll())
    res.send(`<a href="./api/users"> user </a>`)
})

app.get('/api/users/:id', (req, res) => {
    res.send(db.find({_id : req.params.id}));
})

const port = process.env.PORT || 5000;

app.listen(
    port, () => {
        console.log("run on port \n" + "http://localhost:" + port)
    }
)
