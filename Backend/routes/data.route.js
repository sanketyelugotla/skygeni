const express = require("express");
const { dataService } = require("../services")

const router = express.Router();

// Route to get data by opportunityCount
router.get("/getDataByOpportunityCount", async (req, res) => {
    try {
        const data = await dataService.getDataByOpportunityCount();
        res.status(200).json({ success: true, mesage: " Opportunity Count data fetched successfully", data: data })
    } catch (error) {
        res.status(500).json({ success: false, mesage: error.mesage })
    }
});

// Route to get data by acv
router.get("/getDataByACV", async (req, res) => {
    try {
        const data = await dataService.getDataByACV();
        res.status(200).json({ success: true, message: "ACV data fetched successfully", data: data })
    } catch (error) {
        res.status(500).json({ success: false, mesage: error.mesage })
    }
});

module.exports = router;