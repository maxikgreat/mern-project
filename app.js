const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

const PORT = config.get('port') || 3000;

(async function() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => {
            console.log(`Enabled on port ${PORT}...`);
        })
    } catch (e) {
        console.log('Server error:', e.message);
        process.exit(1); //end node js process
    }
})();
