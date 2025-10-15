import express from 'express';
import cors from 'cors';
import {db} from '../db/db.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).send({"message": "OK"});
})

app.post("/exec/select-query", (req, res) => {
    const { optimizationLevel } = req.body;
    db.selectQuery(optimizationLevel);
    res.status(200).send({ "message": `Select Query executed with ${optimizationLevel}` });
});


app.post("/exec/join-query", (req, res) => {
    const { optimizationLevel } = req.body;
    db.joinQuery(optimizationLevel);
    res.status(200).send({ "message": `Join Query executed with ${optimizationLevel}` });
});


app.post("/exec/filter-query", (req, res) => {
    const { optimizationLevel } = req.body;
    db.filterQuery(optimizationLevel);
    res.status(200).send({ "message": `Filter Query executed with ${optimizationLevel}` });
});


app.post("/exec/sort-query", (req, res) => {
    const { optimizationLevel } = req.body;
    db.sortQuery(optimizationLevel);
    res.status(200).send({ "message": `Sort Query executed with ${optimizationLevel}` });
});


app.post("/exec/aggregation-query", (req, res) => {
    const { optimizationLevel } = req.body;
    db.aggregationQuery(optimizationLevel);
    res.status(200).send({ "message": `Aggregation Query executed with ${optimizationLevel}` });
});

app.listen(3000)