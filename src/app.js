const express = require('express');
const dotenv = require('dotenv');

const app = express();
const router = require('./routes');

dotenv.config({ path: '../config/config.env' });

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
