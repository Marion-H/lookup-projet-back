require('dotenv').config();
const express = require('express');


const app = express();

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.status(200).send("Here is our API!")
})

app.listen(PORT, (err) => {
    if (err) throw new Error(err.message);
    console.log(`Server is running on htpp://localhost:${PORT}`);
})