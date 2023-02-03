const express = require('express');
const router = require('./src/routes/router');

const app = express();
app.use(express.json());
app.use(router);
const port = 8000;

app.get('/', (req, res) => {
    res.send('This is Backend Eval Task');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});