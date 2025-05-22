import {
    getLocations,
    getPortForLocation,
    getSeaShippingCost,
    getLandShippingCost,
    getAuctionFee,
    getAdditionalAuctionFee,
    isClosedState,
    fixedCosts,
    bwCommission,
    stateOptions,
    portMapping
} from './data.js';


document.addEventListener('DOMContentLoaded', function () {
    // Initialize form elements
    initializeYearDropdown();
    initializeLocationDropdown();

    // Добавляем обработчики изменения для input (реагируют сразу при вводе) и для select
    document.querySelectorAll('input').forEach(element => {
        element.addEventListener('input', calculateTotalCost);
    });
    document.querySelectorAll('select').forEach(element => {
        element.addEventListener('change', calculateTotalCost);
        element.addEventListener('change', updatePortDropdown); // чтобы обновлять Доставка з сша при изменении локации
    });

    // Добавляем обработчик для смены типа двигателя
    document.getElementById('engine-type').addEventListener('change', function() {
        toggleBatteryCapacity();
        calculateTotalCost();
    });

    // Initially toggle battery capacity field
    toggleBatteryCapacity();
});

// Initialize year dropdown (2008-2025)
function initializeYearDropdown() {
    const yearSelect = document.getElementById('year');
    const currentYear = new Date().getFullYear();

    for (let year = currentYear; year >= 2008; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}

// Initialize location dropdown with data from CSV
function initializeLocationDropdown() {
    const locationSelect = document.getElementById('location');
    const locations = getLocations();

    locations.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        locationSelect.appendChild(option);
    });

    // Trigger port update for initial location
    updatePortDropdown();
}

// Update port dropdown based on selected location
function updatePortDropdown() {
    const locationSelect = document.getElementById('location');
    const portSelect = document.getElementById('port');
    const selectedLocation = locationSelect.value;

    // Clear current options
    portSelect.innerHTML = '';

    // Get port for the selected location
    const port = getPortForLocation(selectedLocation);

    if (port) {
        const option = document.createElement('option');
        option.value = port;
        option.textContent = portMapping[port] || port;
        portSelect.appendChild(option);
    }
}

// Toggle battery capacity field based on engine type
function toggleBatteryCapacity() {
    const engineType = document.getElementById('engine-type').value;
    const batteryCapacityGroup = document.getElementById('battery-capacity-group');
    const engineVolumeGroup = document.getElementById('engine-volume-group');

    if (engineType === 'Електро') {
        batteryCapacityGroup.style.display = 'block';
        engineVolumeGroup.style.display = 'none';
        document.getElementById('engine-volume').removeAttribute('required');
        document.getElementById('battery-capacity').setAttribute('required', 'required');
    } else {
        batteryCapacityGroup.style.display = 'none';
        engineVolumeGroup.style.display = 'block';
        document.getElementById('battery-capacity').removeAttribute('required');
        document.getElementById('engine-volume').setAttribute('required', 'required');
    }
}

// Calculate customs value
function calculateCustomsValue(auctionPrice, auctionFee) {
    const deliveryConstant = 1600;
    return auctionPrice + auctionFee + deliveryConstant;
}

// Calculate excise tax
function calculateExcise(engineType, engineVolume, year, batteryCapacity) {
    const currentYear = new Date().getFullYear();
    // Subtract 1 to count completed years rather than calendar difference
    const age = currentYear - year - 1;
    const ageCoefficient = Math.max(Math.min(age, 15), 1);

    // EUR to USD conversion rate
    const eurToUsdRate = 1.0802;

    if (engineType === 'Електро') {
        // For electric vehicles, excise is 1 euro per kW
        return batteryCapacity * eurToUsdRate;
    } else {
        let baseRate;

        if (engineType === 'Дизельний') {
            baseRate = engineVolume <= 3500 ? 75 : 150;
        } else { // Benzin or Hybrid
            baseRate = engineVolume <= 3000 ? 50 : 100;
        }

        const volumeCoefficient = engineVolume / 1000;
        // Convert from EUR to USD
        return baseRate * volumeCoefficient * ageCoefficient * eurToUsdRate;
    }
}

// Calculate VAT
function calculateVAT(customsValue, excise, engineType) {
    if (engineType === 'Електро') {
        return 0;
    }
    return (customsValue + 0.1 * customsValue + excise) * 0.2;
}

// Calculate import duty
function calculateImportDuty(auctionPrice, engineType) {
    // Electric vehicles have 0% import duty
    if (engineType === 'Електро') {
        return 0;
    }

    // For other vehicles, import duty is 10% of auction price
    return auctionPrice * 0.1;
}

// Add new function for number formatting
function formatNumber(number) {
    return Math.round(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Main calculation function
function calculateTotalCost() {
    // Get form values
    const vehicleType = document.getElementById('vehicle-type').value;
    const engineType = document.getElementById('engine-type').value;
    const engineVolume = parseInt(document.getElementById('engine-volume').value || 0);
    const batteryCapacity = parseInt(document.getElementById('battery-capacity').value || 0);
    const year = parseInt(document.getElementById('year').value);
    const auctionPrice = parseFloat(document.getElementById('auction-price').value);
    const auctionType = document.getElementById('auction-type').value;
    const location = document.getElementById('location').value;
    const commissionsType = document.getElementById('commission-type').value;
    const stateType = document.getElementById('state-type').value;
    const insuranceChecked = document.getElementById('insurance').checked;


    // Validate input
    if (
        (engineType !== 'Електро' && (isNaN(engineVolume) || engineVolume <= 0)) ||
        (engineType === 'Електро' && (isNaN(batteryCapacity) || batteryCapacity <= 0)) ||
        isNaN(auctionPrice) || auctionPrice <= 0
    ) {
        // alert('Будь ласка, заповніть усі необхідні поля коректно');

        return;
    }

    // Calculate auction fees
    const auctionFee = getAuctionFee(auctionPrice, auctionType);
    const additionalFee = getAdditionalAuctionFee(auctionPrice, auctionType);

    // Calculate delivery costs
    const landDeliveryCost = getLandShippingCost(location);
    const port = getPortForLocation(location);
    const seaDeliveryCost = getSeaShippingCost(port);

    // Additional costs based on vehicle type and engine type
    let additionalCosts = 0;
    if (vehicleType === 'Кроссовер' || vehicleType === 'Позашляховик') {
        additionalCosts += 250;
    }
    if (engineType === 'Гібридний' || engineType === 'Електро') {
        additionalCosts += 250;
    }

    // Commission costs
    const commission = commissionsType === 'basic' ? bwCommission.basic : bwCommission.repair;

    // State costs
    const stateCost = stateOptions[stateType];

    // Insurance cost
    const insuranceCost = insuranceChecked ? Math.max(auctionPrice * 0.02, 300) : 0;

    // Transfer fee
    const transferFee = (auctionPrice + auctionFee) * 0.015;

    // Calculate customs value (for documentation purposes only) Митна вартість
    const customsValue = calculateCustomsValue(auctionPrice, auctionFee);

    // Calculate customs costs with updated formulas
    const excise = calculateExcise(engineType, engineVolume, year, batteryCapacity);
    const importDuty = calculateImportDuty(customsValue, engineType);
    const vat = calculateVAT(customsValue, excise, engineType);

    // Fixed costs
    const fixedCostsTotal =
        fixedCosts.exportDocs +
        fixedCosts.unloading +
        fixedCosts.deliveryToLviv +
        fixedCosts.borderCrossing +
        fixedCosts.brokerServices +
        fixedCosts.customsDelivery +
        fixedCosts.certification;

    // Total cost
    const totalCost =
        auctionPrice +
        auctionFee +
        additionalFee +
        landDeliveryCost +
        seaDeliveryCost +
        additionalCosts +
        commission +
        stateCost +
        insuranceCost +
        transferFee +
        excise +
        importDuty +
        vat +
        fixedCostsTotal;

    // Update result elements with formatted numbers
    document.getElementById('lot-price').textContent = formatNumber(auctionPrice) + ' $';
    document.getElementById('auction-fee').textContent = formatNumber(auctionFee) + ' $';
    document.getElementById('usa-delivery').textContent = formatNumber(landDeliveryCost) + ' $';
    document.getElementById('from-usa-delivery').textContent = formatNumber(seaDeliveryCost + additionalCosts) + ' $';
    document.getElementById('transfer-fee').textContent = formatNumber(transferFee) + ' $';
    document.getElementById('excise').textContent = formatNumber(excise) + ' $';
    document.getElementById('import-duty').textContent = formatNumber(importDuty) + ' $';
    document.getElementById('vat').textContent = formatNumber(vat) + ' $';
    document.getElementById('total-cost').textContent = formatNumber(totalCost) + ' $';
    // document.getElementById('customs-value').textContent = formatNumber(customsValue) + ' $';
    document.getElementById('auction-fee-list').textContent = formatNumber(auctionFee) + ' $';
    document.getElementById('usa-delivery-list').textContent = formatNumber(landDeliveryCost) + ' $';
    document.getElementById('from-usa-delivery-list').textContent = formatNumber(seaDeliveryCost + additionalCosts) + ' $';
    document.getElementById('calc-cost-insurance').textContent = formatNumber(insuranceCost) + ' $';

    // Show results
    document.getElementById('results').classList.remove('hidden');
}