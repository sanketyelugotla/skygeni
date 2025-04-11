const { Data } = require("../models")

const getDataByOpportunityCount = async () => {
    const rawData = await Data.find().lean();

    const wonCount = rawData[rawData.length - 1].count;
    const result = [];

    for (let i = 0; i < rawData.length; i++) {
        const current = rawData[i];
        const currentCount = current.count;

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


const getDataByACV = async () => {
    const rawData = await Data.find().lean();

    const wonACV = rawData[rawData.length - 1].acv;
    const result = [];

    for (let i = 0; i < rawData.length; i++) {
        const current = rawData[i];
        const currentACV = current.acv;

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
            result.push({
                label: current.label,
                acv: Math.round(currentACV),
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