const { Data } = require("../models")

// Service to fetch data by opportunity count along with all the calculations required
const getDataByOpportunityCount = async () => {
    // Fetching data
    const rawData = await Data.find().lean();
    
    const wonCount = rawData[rawData.length - 1].count;
    const result = [];
    
    // Iterating over data to add calculated fields
    for (let i = 0; i < rawData.length; i++) {
        const current = rawData[i];
        const currentCount = current.count;
        
        // For all labels except won
        if (i < rawData.length - 1) {
            const nextCount = rawData[i + 1].count;
            result.push({
                label: current.label,
                count: current.count,
                qualifyPercent: Math.round((nextCount / currentCount) * 100),
                wonPercent: Math.round((wonCount / currentCount) * 100),
                disqualified: currentCount - nextCount,
                qualified: nextCount
            });
        } else {
            // for winner
            result.push({
                label: current.label,
                count: currentCount,
                qualifyPercent: 100,
                wonPercent: 100
            });
        }
    }
    return result;
};


// Service to fetch data by acv along with all the calculations required
const getDataByACV = async () => {
    // Fetching data
    const rawData = await Data.find().lean();
    
    const wonACV = rawData[rawData.length - 1].acv;
    const result = [];
    
    // Iterating over data to add calculated fields
    for (let i = 0; i < rawData.length; i++) {
        const current = rawData[i];
        const currentACV = current.acv;
        
        // For all labels except won
        if (i < rawData.length - 1) {
            const nextACV = rawData[i + 1].acv;
            result.push({
                label: current.label,
                acv: Math.round(currentACV),
                qualifyPercent: Math.round((nextACV / currentACV) * 100),
                wonPercent: Math.round((wonACV / currentACV) * 100),
                disqualified: Math.round(currentACV - nextACV),
                qualified: Math.round(nextACV)
            });
        } else {
            // for winner
            result.push({
                label: current.label,
                acv: Math.round(currentACV),
                wonPercent: 100,
                qualifyPercent: 100,
                qualified: Math.round(currentACV)
            });
        }
    }
    return result;
};

module.exports = {
    getDataByOpportunityCount,
    getDataByACV
}