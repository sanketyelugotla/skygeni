const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    label: { type: String, required: true },
    acv: { type: Number, required: true },
    count: { type: Number, required: true },
    diffRate: { type: Number, required: true },
    diffacvRate: { type: Number, required: true },
});

module.exports = mongoose.model("Data", dataSchema);
