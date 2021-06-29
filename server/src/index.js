require("./db/connection");
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const jobRoutes = require('./routes/job');
const miscRoutes = require('./routes/misc');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors("*"));
dotenv.config();
//test url
app.get('/', (req, res) => {
    res.status(200).send();
});

app.use('/api/user', userRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/misc', miscRoutes);
//TODO: add unhandledException handler
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
