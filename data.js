// Auction fees data
const auctionFeesData = [
    { price: 49, copartFee: 201, iaaiAdditionalFee: 0, iaaiBaseFee: 201 },
    { price: 99, copartFee: 201, iaaiAdditionalFee: 4, iaaiBaseFee: 201 },
    { price: 199, copartFee: 225, iaaiAdditionalFee: 15, iaaiBaseFee: 225 },
    { price: 299, copartFee: 260, iaaiAdditionalFee: 5, iaaiBaseFee: 260 },
    { price: 349, copartFee: 280, iaaiAdditionalFee: 0, iaaiBaseFee: 280 },
    { price: 399, copartFee: 290, iaaiAdditionalFee: 15, iaaiBaseFee: 290 },
    { price: 449, copartFee: 320, iaaiAdditionalFee: 0, iaaiBaseFee: 320 },
    { price: 499, copartFee: 330, iaaiAdditionalFee: 10, iaaiBaseFee: 330 },
    { price: 549, copartFee: 340, iaaiAdditionalFee: 10, iaaiBaseFee: 340 },
    { price: 599, copartFee: 350, iaaiAdditionalFee: 15, iaaiBaseFee: 350 },
    { price: 699, copartFee: 365, iaaiAdditionalFee: 25, iaaiBaseFee: 365 },
    { price: 799, copartFee: 385, iaaiAdditionalFee: 25, iaaiBaseFee: 385 },
    { price: 899, copartFee: 400, iaaiAdditionalFee: 25, iaaiBaseFee: 400 },
    { price: 999, copartFee: 415, iaaiAdditionalFee: 50, iaaiBaseFee: 415 },
    { price: 1000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 225, manheimAdditionalFee: 55 },
    { price: 1199, copartFee: 430, iaaiAdditionalFee: 55, iaaiBaseFee: 430 },
    { price: 1299, copartFee: 425, iaaiAdditionalFee: 75, iaaiBaseFee: 425 },
    { price: 1399, copartFee: 475, iaaiAdditionalFee: 40, iaaiBaseFee: 475 },
    { price: 1499, copartFee: 480, iaaiAdditionalFee: 60, iaaiBaseFee: 480 },
    { price: 1599, copartFee: 490, iaaiAdditionalFee: 65, iaaiBaseFee: 490 },
    { price: 1699, copartFee: 505, iaaiAdditionalFee: 70, iaaiBaseFee: 505 },
    { price: 1799, copartFee: 515, iaaiAdditionalFee: 80, iaaiBaseFee: 515 },
    { price: 1999, copartFee: 525, iaaiAdditionalFee: 90, iaaiBaseFee: 525 },
    { price: 2399, copartFee: 555, iaaiAdditionalFee: 95, iaaiBaseFee: 555 },
    { price: 2499, copartFee: 580, iaaiAdditionalFee: 105, iaaiBaseFee: 580 },
    { price: 2999, copartFee: 600, iaaiAdditionalFee: 130, iaaiBaseFee: 600 },
    { price: 3000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 280, manheimAdditionalFee: 60 },
    { price: 3499, copartFee: 650, iaaiAdditionalFee: 130, iaaiBaseFee: 650 },
    { price: 3999, copartFee: 700, iaaiAdditionalFee: 140, iaaiBaseFee: 700 },
    { price: 4499, copartFee: 800, iaaiAdditionalFee: 65, iaaiBaseFee: 800 },
    { price: 4999, copartFee: 825, iaaiAdditionalFee: 90, iaaiBaseFee: 825 },
    { price: 5000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 340, manheimAdditionalFee: 50 },
    { price: 5999, copartFee: 850, iaaiAdditionalFee: 125, iaaiBaseFee: 850 },
    { price: 6499, copartFee: 875, iaaiAdditionalFee: 120, iaaiBaseFee: 875 },
    { price: 6999, copartFee: 875, iaaiAdditionalFee: 155, iaaiBaseFee: 875 },
    { price: 7000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 390, manheimAdditionalFee: 35 },
    { price: 7499, copartFee: 900, iaaiAdditionalFee: 150, iaaiBaseFee: 900 },
    { price: 7999, copartFee: 900, iaaiAdditionalFee: 190, iaaiBaseFee: 900 },
    { price: 8499, copartFee: 925, iaaiAdditionalFee: 185, iaaiBaseFee: 925 },
    { price: 8999, copartFee: 925, iaaiAdditionalFee: 185, iaaiBaseFee: 925 },
    { price: 9000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 425, manheimAdditionalFee: 35 },
    { price: 9999, copartFee: 925, iaaiAdditionalFee: 185, iaaiBaseFee: 925 },
    { price: 10499, copartFee: 950, iaaiAdditionalFee: 190, iaaiBaseFee: 950 },
    { price: 10999, copartFee: 950, iaaiAdditionalFee: 190, iaaiBaseFee: 950 },
    { price: 11000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 465, manheimAdditionalFee: 30 },
    { price: 11499, copartFee: 950, iaaiAdditionalFee: 200, iaaiBaseFee: 950 },
    { price: 11999, copartFee: 960, iaaiAdditionalFee: 195, iaaiBaseFee: 960 },
    { price: 12499, copartFee: 975, iaaiAdditionalFee: 205, iaaiBaseFee: 975 },
    { price: 13000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 495, manheimAdditionalFee: 30 },
    { price: 14999, copartFee: 990, iaaiAdditionalFee: 190, iaaiBaseFee: 990 },
    { price: 15000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 525, manheimAdditionalFee: 30 },
    { price: 17000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 555, manheimAdditionalFee: 30 },
    { price: 19000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 585, manheimAdditionalFee: 25 },
    { price: 21000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 610, manheimAdditionalFee: 20 },
    { price: 23000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 630, manheimAdditionalFee: 25 },
    { price: 25000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 655, manheimAdditionalFee: 30 },
    { price: 27000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 685, manheimAdditionalFee: 25 },
    { price: 30000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 710, manheimAdditionalFee: 25 },
    { price: 32500, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 735, manheimAdditionalFee: 25 },
    { price: 35000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 760, manheimAdditionalFee: 25 },
    { price: 37500, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 785, manheimAdditionalFee: 25 },
    { price: 40000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 810, manheimAdditionalFee: 25 },
    { price: 45000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 835, manheimAdditionalFee: 50 },
    { price: 50000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 885, manheimAdditionalFee: 50 },
    { price: 60000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 935, manheimAdditionalFee: 100 },
    { price: 70000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 1035, manheimAdditionalFee: 100 },
    { price: 80000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 1135, manheimAdditionalFee: 100 },
    { price: 90000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 1235, manheimAdditionalFee: 100 },
    { price: 100000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 1335, manheimAdditionalFee: 100 },
    { price: 110000, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 1435, manheimAdditionalFee: 120 },
    { price: 999999999, copartFee: 0, iaaiAdditionalFee: 0, iaaiBaseFee: 0, manheimFee: 1555, manheimAdditionalFee: 0 }
];

// Sea shipping costs
const seaShippingCosts = [
    { port: "New Jersey (NJ)", cost: 850 },
    { port: "Savanna (GA)", cost: 900 },
    { port: "Houston (TX)", cost: 1100 },
    { port: "Los Angeles (Ca)", cost: 1400 },
    { port: "Chicago (IL)", cost: 1050 },
    { port: "Miami (FL)", cost: 950 },
    { port: "Seattle (Wa)", cost: 1550 },
    { port: "Canada Montreal/Toronto", cost: 1400 }
];

// Land delivery locations with more comprehensive locations
const landDeliveryLocations = [
    // Savannah region
    { location: "ATLANTA EAST - GA", port: "SAVANNAH,GA", cost: 595 },
    { location: "ATLANTA NORTH - GA", port: "SAVANNAH,GA", cost: 595 },
    { location: "ATLANTA SOUTH - GA", port: "SAVANNAH,GA", cost: 595 },
    { location: "ATLANTA WEST - GA", port: "SAVANNAH,GA", cost: 595 },
    { location: "BIRMINGHAM - AL", port: "SAVANNAH,GA", cost: 675 },
    { location: "CARTERSVILLE - GA", port: "SAVANNAH,GA", cost: 570 },
    { location: "CHARLESTON - SC", port: "SAVANNAH,GA", cost: 520 },
    { location: "CHINA GROVE - NC", port: "SAVANNAH,GA", cost: 595 },
    { location: "COLUMBIA - SC", port: "SAVANNAH,GA", cost: 490 },
    { location: "CONCORD - NC", port: "SAVANNAH,GA", cost: 570 },
    { location: "DANVILLE - VA", port: "SAVANNAH,GA", cost: 645 },
    { location: "ATLANTA GA", port: "SAVANNAH,GA", cost: 595 },
    { location: "DOTHAN - AL", port: "SAVANNAH,GA", cost: 700 },
    { location: "GREER - SC", port: "SAVANNAH,GA", cost: 495 },
    { location: "JACKSONVILLE EAST - FL", port: "SAVANNAH,GA", cost: 470 },
    { location: "JACKSONVILLE NORTH -FL", port: "SAVANNAH,GA", cost: 470 },
    { location: "JACKSONVILLE WEST - FL", port: "SAVANNAH,GA", cost: 470 },
    { location: "KNOXVILLE - TN", port: "SAVANNAH,GA", cost: 670 },
    { location: "LUMBERTON -NC", port: "SAVANNAH,GA", cost: 545 },
    { location: "MACON - GA", port: "SAVANNAH,GA", cost: 520 },
    { location: "MEBANE - NC", port: "SAVANNAH,GA", cost: 570 },
    { location: "MEMPHIS - TN", port: "SAVANNAH,GA", cost: 770 },
    { location: "MOBILE - AL", port: "SAVANNAH,GA", cost: 650 },
    { location: "MOCKSVILLE - NC", port: "SAVANNAH,GA", cost: 570 },
    { location: "MONTGOMERY - AL", port: "SAVANNAH,GA", cost: 675 },
    { location: "NASHVILLE - TN", port: "SAVANNAH,GA", cost: 670 },
    { location: "ORLANDO - FL", port: "SAVANNAH,GA", cost: 570 },
    { location: "ORLANDO NORTH - FL", port: "SAVANNAH,GA", cost: 570 },
    { location: "ORLANDO SOUTH - FL", port: "SAVANNAH,GA", cost: 570 },
    { location: "RALEIGH - NC", port: "SAVANNAH,GA", cost: 570 },
    { location: "SAVANNAH - GA", port: "SAVANNAH,GA", cost: 395 },

    // Chicago region
    { location: "KANSAS CITY - KS", port: "CHICAGO,IL", cost: 695 },
    { location: "Kansas City East - MO", port: "CHICAGO,IL", cost: 695 },
    { location: "MILWAUKEE NORTH - WI", port: "CHICAGO,IL", cost: 550 },
    { location: "MILWAUKEE SOUTH - WI", port: "CHICAGO,IL", cost: 550 },
    { location: "CHICAGO HEIGHTS IL", port: "CHICAGO,IL", cost: 520 },
    { location: "SOUTH BEND (IN)", port: "CHICAGO,IL", cost: 570 },
    { location: "OMAHA (NE)", port: "CHICAGO,IL", cost: 645 },
    { location: "DETROIT - MI", port: "CHICAGO,IL", cost: 700 },
    { location: "DENVER - CO", port: "CHICAGO,IL", cost: 820 },
    { location: "CHICAGO NORTH - IL", port: "CHICAGO,IL", cost: 470 },
    { location: "CHICAGO SOUTH - IL", port: "CHICAGO,IL", cost: 420 },

    // Houston region
    { location: "BATON ROUGE - LA", port: "HOUSTON,TX", cost: 595 },
    { location: "AUSTIN - TX", port: "HOUSTON,TX", cost: 520 },
    { location: "CORPUS CHRISTI - TX", port: "HOUSTON,TX", cost: 545 },
    { location: "DALLAS SOUTH - TX", port: "HOUSTON,TX", cost: 570 },
    { location: "EL PASO - TX", port: "HOUSTON,TX", cost: 720 },
    { location: "DALLAS- TX", port: "HOUSTON,TX", cost: 570 },
    { location: "FT.WORTH - TX", port: "HOUSTON,TX", cost: 545 },
    { location: "HOUSTON - TX", port: "HOUSTON,TX", cost: 470 },
    { location: "SAN ANTONIO - TX", port: "HOUSTON,TX", cost: 545 },

    // Los Angeles region
    { location: "LOS ANGELES - CA", port: "LOSANGELES,CA", cost: 470 },
    { location: "LONG BEACH - CA", port: "LOSANGELES,CA", cost: 420 },
    { location: "SAN DIEGO - CA", port: "LOSANGELES,CA", cost: 520 },
    { location: "PHOENIX", port: "LOSANGELES,CA", cost: 620 },
    { location: "LAS VEGAS - NV", port: "LOSANGELES,CA", cost: 720 },
    { location: "SAN JOSE - CA", port: "LOSANGELES,CA", cost: 695 },
    { location: "SACRAMENTO - CA", port: "LOSANGELES,CA", cost: 645 },

    // New York region
    { location: "BALTIMORE - MD", port: "New York, NY", cost: 570 },
    { location: "BUFFALO - NY", port: "New York, NY", cost: 745 },
    { location: "HARTFORD - CT", port: "New York, NY", cost: 505 },
    { location: "LONG ISLAND - NY", port: "New York, NY", cost: 520 },
    { location: "NEWBURGH - NY", port: "New York, NY", cost: 520 },
    { location: "NORTH BOSTON - MA", port: "New York, NY", cost: 645 },
    { location: "PHILADELPHIA - PA", port: "New York, NY", cost: 500 },
    { location: "PITTSBURGH NORTH - PA", port: "New York, NY", cost: 745 },

    // Florida region
    { location: "TAMPA - FL", port: "Florida, FL", cost: 600 },
    { location: "MIAMI CENTRAL - FL", port: "Florida, FL", cost: 470 },
    { location: "MIAMI NORTH - FL", port: "Florida, FL", cost: 470 },
    { location: "MIAMI SOUTH - FL", port: "Florida, FL", cost: 470 },
    { location: "WEST PALM BEACH - FL", port: "Florida, FL", cost: 470 },

    // Canada region
    { location: "Toronto (CANADA)", port: "Monreal, CA", cost: 800 },
    { location: "Montreal CA (Copart)", port: "Monreal, CA", cost: 800 },
    { location: "Ottawa CA (Impact)", port: "Monreal, CA", cost: 525 },

    // Seattle region
    { location: "PORTLAND NORTH - OR", port: "SEATTLE, WA", cost: 670 },
    { location: "PORTLAND SOUTH - OR", port: "SEATTLE, WA", cost: 670 },
    { location: "SEATTLE (WA)", port: "SEATTLE, WA", cost: 420 },
    { location: "SPOKANE - WA", port: "SEATTLE, WA", cost: 620 }
];

// Mapping for ports to use for sea shipping
const portMapping = {
    "SAVANNAH,GA": "Savanna (GA)",
    "CHICAGO,IL": "Chicago (IL)",
    "HOUSTON,TX": "Houston (TX)",
    "LOSANGELES,CA": "Los Angeles (Ca)",
    "New York, NY": "New Jersey (NJ)",
    "Florida, FL": "Miami (FL)",
    "Monreal, CA": "Canada Montreal/Toronto",
    "SEATTLE, WA": "Seattle (Wa)"
};

// Closed states
const closedStates = ["AI", "MI", "WI", "Oh"];

// Fixed costs
const fixedCosts = {
    exportDocs: 150,
    unloading: 400,
    deliveryToLviv: 800,
    borderCrossing: 110,
    brokerServices: 250,
    customsDelivery: 80,
    certification: 0
};

// Best West Auto commission options
const bwCommission = {
    basic: 600,
    repair: 1000
};

// State options costs
const stateOptions = {
    open: 0,
    closed: 100,
    manheim: 100
};

// Initialize all of the available locations for the form
function getLocations() {
    return landDeliveryLocations.map(item => item.location);
}

// Get port options based on location
function getPortForLocation(location) {
    const locationData = landDeliveryLocations.find(item => item.location === location);
    return locationData ? locationData.port : null;
}

// Get sea shipping cost for port
function getSeaShippingCost(port) {
    const mappedPort = portMapping[port];
    const portData = seaShippingCosts.find(item => item.port === mappedPort);
    return portData ? portData.cost : 0;
}

// Get land shipping cost for location
function getLandShippingCost(location) {
    const locationData = landDeliveryLocations.find(item => item.location === location);
    return locationData ? locationData.cost : 0;
}

// Get auction fee
function getAuctionFee(auctionPrice, auctionType) {
    let feeBracket = auctionFeesData.filter(item => item.price <= auctionPrice)
        .sort((a, b) => b.price - a.price)[0];

    if (!feeBracket) {
        feeBracket = auctionFeesData[0];
    }

    if (auctionType === "Copart auction") {
        if (auctionPrice > 15000) {
            return auctionPrice * 0.06 + 260;
        }
        let fee = feeBracket.copartFee;
        if (fee === 0) {
            let nextBracket = auctionFeesData.find(item => item.price > feeBracket.price && item.copartFee !== 0);
            if (nextBracket) {
                fee = nextBracket.copartFee;
            }
        }
        return fee;
    } else if (auctionType === "IAAI auction") {
        if (auctionPrice > 15000) {
            return auctionPrice * 0.06 + 260;
        }
        let fee = feeBracket.iaaiBaseFee;
        if (fee === 0) {
            let nextBracket = auctionFeesData.find(item => item.price > feeBracket.price && item.iaaiBaseFee !== 0);
            if (nextBracket) {
                fee = nextBracket.iaaiBaseFee;
            }
        }
        return fee;
    } else if (auctionType === "Manheim auction") {
        return feeBracket.manheimFee || 0;
    }

    return 0;
}

// Get additional auction fee
function getAdditionalAuctionFee(auctionPrice, auctionType) {
    let feeBracket = auctionFeesData.filter(item => item.price <= auctionPrice)
        .sort((a, b) => b.price - a.price)[0];

    if (!feeBracket) {
        feeBracket = auctionFeesData[0];
    }

    if (auctionType === "IAAI auction") {
        return feeBracket.iaaiAdditionalFee || 0;
    } else if (auctionType === "Manheim auction") {
        return feeBracket.manheimAdditionalFee || 0;
    }

    return 0;
}

// Check if a state is closed
function isClosedState(location) {
    return closedStates.some(state => location.includes(state));
}