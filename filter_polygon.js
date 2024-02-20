const fs = require('fs');

// Read the JSON file
const rawData = fs.readFileSync('ethereum.json');
const data = JSON.parse(rawData);

// Filter for POLYGON
const polygonData = {
    data_aggregator: [],
    explorers: [],
    bridges: [],
    bounty: [],
    grants: [],
    faucets: [],
    rpcs: [],
    wallets: [],
    oracles: []
};

for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
        const value = data[key];
        if (Array.isArray(value)) {
            value.forEach(item => {
                if (item && item.url && typeof item.url === 'string' && item.url.toLowerCase().includes('polygon')) {
                    polygonData[key].push(item);
                }
            });
        }
    }
}

// Write filtered data to polygon.json
fs.writeFileSync('polygon.json', JSON.stringify(polygonData, null, 4));

