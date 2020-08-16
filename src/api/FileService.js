const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() })
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

router.post('/upload', upload.single("file"), function (req, res) {
    if (req.file) {
        const file = req.file;
        const collectionName = req.body.collectionName;

        if (file) {
            if (file.mimetype === 'text/csv') {
                const rows = loadFileCSV(file, ';');
                const payLoad = getEntities(rows);
                const DynamicSchema = Schema({}, { strict: false, collection: collectionName });
                const DynamicModel = mongoose.model(collectionName, DynamicSchema);
                payLoad.forEach(element => {
                    const entity = new DynamicModel(element);
                    entity.save();
                });

            }
        }
    }

});

function loadFileCSV(file, delimitatore) {
    const csvString = file.buffer.toString();
    const rowsFile = csvString.split(/\r?\n/);
    let retRows = [];
    if (rowsFile.length > 1) {
        retRows[0] = rowsFile[0].split(delimitatore);
        for (let index = 1; index < rowsFile.length; index++) {
            const rowFile = rowsFile[index];
            retRows[index] = rowFile.split(delimitatore);
        }
    }
    return retRows;
}
function getEntities(rows) {
    const payLoad = [];
    const header = rows[0];
    const content = rows.splice(1, rows.length);
    for (let i = 0; i < content.length; i++) {
        const rowContent = content[i];
        let obj = {};
        for (let j = 0; j < header.length; j++) {
            const headerElement = header[j];
            obj[headerElement] = rowContent[j];
        }
        payLoad.push(obj);
    }
    return payLoad;

}


module.exports = router;