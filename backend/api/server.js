express = require('express');
cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).send({"message": "OK"});
})

app.post("/exec/select-query", (req, res) => {
    const { optimizationLevel } = req.body;
    let delay = 0;

    switch (optimizationLevel) {
        case "Unoptimized Query":            // SELECT * FROM emp
            delay = 300;
            break;
        case "Projection":                   // SELECT id, name FROM emp
            delay = 150;
            break;
    }

    console.log(`[SELECT] ${optimizationLevel} → Delay ${delay}ms`);

    setTimeout(() => {
        res.status(200).send({ "message": `Select Query executed with ${optimizationLevel}` });
    }, delay);
});


app.post("/exec/join-query", (req, res) => {
    const { optimizationLevel } = req.body;
    let delay = 0;

    switch (optimizationLevel) {
        case "Unoptimized Join":             // SELECT * with implicit join
            delay = 600;
            break;
        case "Optimized Join":               // Explicit join + selective cols
            delay = 350;
            break;
        case "Indexing on Join Keys":        // CREATE INDEX on dept_id
            delay = 200;
            break;
    }

    console.log(`[JOIN] ${optimizationLevel} → Delay ${delay}ms`);

    setTimeout(() => {
        res.status(200).send({ "message": `Join Query executed with ${optimizationLevel}` });
    }, delay);
});


app.post("/exec/filter-query", (req, res) => {
    const { optimizationLevel } = req.body;
    let delay = 0;

    switch (optimizationLevel) {
        case "Unoptimized Filter":               // SELECT * WHERE dept='Sales'
            delay = 400;
            break;
        case "Indexing on Filtered Column":      // CREATE INDEX ON dept
            delay = 180;
            break;
    }

    console.log(`[FILTER] ${optimizationLevel} → Delay ${delay}ms`);

    setTimeout(() => {
        res.status(200).send({ "message": `Filter Query executed with ${optimizationLevel}` });
    }, delay);
});


app.post("/exec/sort-query", (req, res) => {
    const { optimizationLevel } = req.body;
    let delay = 0;

    switch (optimizationLevel) {
        case "Unoptimized Sort":                // ORDER BY without index
            delay = 500;
            break;
        case "Index on Sorted Column":          // CREATE INDEX ON salary
            delay = 220;
            break;
    }

    console.log(`[SORT] ${optimizationLevel} → Delay ${delay}ms`);

    setTimeout(() => {
        res.status(200).send({ "message": `Sort Query executed with ${optimizationLevel}` });
    }, delay);
});


app.post("/exec/aggregation-query", (req, res) => {
    const { optimizationLevel } = req.body;
    let delay = 0;

    switch (optimizationLevel) {
        case "Unoptimized Aggregation":       // Fetch raw, aggregate in Python
            delay = 700;
            break;
        case "SQL Aggregation":               // GROUP BY, SUM, COUNT in SQL
            delay = 250;
            break;
    }

    console.log(`[AGGREGATION] ${optimizationLevel} → Delay ${delay}ms`);

    setTimeout(() => {
        res.status(200).send({ "message": `Aggregation Query executed with ${optimizationLevel}` });
    }, delay);
});

app.listen(3000)