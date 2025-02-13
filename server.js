const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const docsFolder = path.join(__dirname, 'docs');

app.use(express.static(__dirname));

app.get('/list-files', (req, res) => {
    fs.readdir(docsFolder, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory');
        }
        res.json(files.filter(file => file.endsWith('.pdf')));
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});