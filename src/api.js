const express = require("express");

const app = express();

const Ranidb = require('../ranidb/index');

let db = new Ranidb("./data/data.json", {idType: 'gradual'});

app.use(express.json());


app.get('/', (req, res) => {
    res.send(`<a href="./api/users"> user </a>`)
})

app.get('/api/users', (req, res) => {
    res.send(db.getAll())
})

app.get('/api/users/:id', (req, res) => {
    res.send(db.isId(req.params.id) || '<h1>not find this id</h1>');
})

app.post('/api/users/', (req, res) => {

    db.push(
        {
            telegram: req.body.telegram,
            username: req.body.username
        }
    )
    res.send(db.getAll())
})

app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    if (db.isId(id) !== undefined) {

        db.filter({_id: parseInt(id)}).delete();

        res.status(200).send(db.getAll());

    } else {
        res.status(404).send("not find it")
    }
})

const port = process.env.PORT || 5000;

app.listen(
    port, () => {
        console.log("run on port " + port)
    }
)


db.isId = function (id) {
    return db.find({_id: parseInt(id)}) || undefined;
}
