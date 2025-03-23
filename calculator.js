// Глобальные переменные для JSON данных
let auctionData = [];
let seaShippingData = [];
let landDeliveryData = [];

// Константы
const EXPORT_DOCUMENTS_COST = 150;
const UNLOADING_COST = 400;
const DELIVERY_KLAIPEDA_LVIV = 800;
const BORDER_CROSSING_COST = 110;
const BROKERAGE_COST = 250;
const DELIVERY_TO_CUSTOMS_COST = 80;
const CERTIFICATION_COST = 150;
const EUR_TO_USD = 1.1;

// DOM элементы
const vehicleTypeSelect = document.getElementById('calc-vehicle-type');
const engineTypeSelect = document.getElementById('calc-engine-type');
const batteryCapacityInput = document.getElementById('calc-battery-capacity');
const engineCapacityInput = document.getElementById('calc-engine-capacity');
const yearSelect = document.getElementById('calc-year');
const auctionSelect = document.getElementById('calc-auction-fee');
const usaDeliverySelect = document.getElementById('calc-usa-delivery');
const fromUsaInput = document.getElementById('calc-from-usa');
const carPriceInput = document.getElementById('calc-car-price');
const regionSelect = document.getElementById('calc-region');
const commissionSelect = document.getElementById('calc-commission');
const insuranceCheckbox = document.getElementById('calc-insurance-checkbox');
const customCheckbox = document.getElementById('calc-custom-checkbox');
const calculateButton = document.querySelector('.calc-calculate-btn');
const wantButton = document.querySelector('.calc-want-btn');

// Элементы для отображения результатов
const auctionFeeDisplay = document.querySelector('.calc-form-group:nth-child(6) .calc-price');
const usaDeliveryDisplay = document.querySelector('.calc-form-group:nth-child(7) .calc-price');
const fromUsaDisplay = document.querySelector('.calc-form-group:nth-child(8) .calc-price');
const totalValueDisplay = document.querySelector('.calc-total-value');

// Отображение стоимости в разбивке
const exciseDisplay = document.querySelector('.calc-cost-breakdown .calc-cost-item:nth-child(5) .calc-cost-value');
const importDutyDisplay = document.querySelector('.calc-cost-breakdown .calc-cost-item:nth-child(6) .calc-cost-value');
const vatDisplay = document.querySelector('.calc-cost-breakdown .calc-cost-item:nth-child(7) .calc-cost-value');
const transferCommissionDisplay = document.querySelector('.calc-cost-breakdown .calc-cost-item:nth-child(11) .calc-cost-value');

// Инициализация
document.addEventListener('DOMContentLoaded', init);

function init() {
    // Загрузка данных из JSON файлов
    loadJsonData();

    // Инициализация UI
    updateVisibility();

    // Установка обработчиков событий
    setupEventListeners();
}

function loadJsonData() {
    // Загрузка данных об аукционах
    fetch('collection_auction.json')
        .then(response => response.json())
        .then(data => {
            auctionData = data;
            populateAuctionSelect();
        })
        .catch(error => console.error('Ошибка загрузки auction data:', error));

    // Загрузка данных о морской доставке
    fetch('sea_​​shipping_cost_from_various_US_ports.json')
        .then(response => response.json())
        .then(data => {
            seaShippingData = data;
            populateSeaShippingSelect();
        })
        .catch(error => console.error('Ошибка загрузки sea shipping data:', error));

    // Загрузка данных о наземной доставке
    fetch('cost_of_land_delivery_from_different_locations.json')
        .then(response => response.json())
        .then(data => {
            landDeliveryData = data;
            populateLandDeliverySelect();
        })
        .catch(error => {
            console.error('Ошибка загрузки land delivery data:', error);
            // Резервные данные на случай ошибки
            landDeliveryData = [
                { location_name: "ATLANTA EAST - GA", cost_usd: 595 }
            ];
            populateLandDeliverySelect();
        });
}

function populateAuctionSelect() {
    // Получаем уникальные названия аукционов
    const auctionNames = [...new Set(auctionData.map(item => item.auction_name))];

    // Очищаем текущие опции
    auctionSelect.innerHTML = '';

    // Добавляем новые опции
    auctionNames.forEach(name => {
        const option = document.createElement('option');
        option.textContent = name;
        option.value = name;
        auctionSelect.appendChild(option);
    });

    // Обновляем стоимость аукциона
    updateAuctionFee();
}

function populateSeaShippingSelect() {
    // Очищаем текущие опции
    fromUsaInput.value = seaShippingData[0].location_name + " (" + seaShippingData[0].location_name.split(" ")[1].replace("(", "").replace(")", "") + ")";

    // Обновляем стоимость морской доставки
    updateSeaShippingCost();
}

function populateLandDeliverySelect() {
    // Очищаем текущие опции
    usaDeliverySelect.innerHTML = '';

    // Добавляем новые опции
    landDeliveryData.forEach(location => {
        const option = document.createElement('option');
        option.textContent = location.location_name;
        option.value = location.location_name;
        usaDeliverySelect.appendChild(option);
    });

    // Обновляем стоимость доставки
    updateLandDeliveryCost();

    // Устанавливаем обработчик события для выбора локации
    usaDeliverySelect.addEventListener('change', updateLandDeliveryCost);
}

function updateLandDeliveryCost() {
    const selectedLocation = usaDeliverySelect.value;
    const locationData = landDeliveryData.find(loc => loc.location_name === selectedLocation);

    if (locationData) {
        usaDeliveryDisplay.textContent = locationData.cost_usd + ' $';
    } else {
        usaDeliveryDisplay.textContent = '595 $'; // Значение по умолчанию
    }
}

function setupEventListeners() {
    // Обработчики событий для изменения типа двигателя
    engineTypeSelect.addEventListener('change', updateVisibility);

    // Обработчики событий для изменения значений аукциона
    auctionSelect.addEventListener('change', updateAuctionFee);
    carPriceInput.addEventListener('input', updateAuctionFee);

    // Обработчик для кнопки "Рассчитать"
    calculateButton.addEventListener('click', calculateTotal);

    // Обработчик для страхования
    insuranceCheckbox.addEventListener('change', function () {
        customCheckbox.classList.toggle('checked', this.checked);
    });

    customCheckbox.addEventListener('click', function () {
        insuranceCheckbox.checked = !insuranceCheckbox.checked;
        customCheckbox.classList.toggle('checked', insuranceCheckbox.checked);
    });

    // Обработчик для кнопки "Хочу"
    wantButton.addEventListener('click', function () {
        alert('Спасибо за интерес! Наш менеджер свяжется с вами в ближайшее время.');
    });

    // Обработчики для обновления стоимости доставки
    vehicleTypeSelect.addEventListener('change', updateSeaShippingCost);
    usaDeliverySelect.addEventListener('change', updateLandDeliveryCost);
    fromUsaInput.addEventListener('input', updateSeaShippingCost);
}

function updateVisibility() {
    // Показываем/скрываем поля в зависимости от типа двигателя
    const engineType = engineTypeSelect.value;

    if (engineType === 'Електро') {
        batteryCapacityInput.parentElement.style.display = 'block';
        engineCapacityInput.parentElement.style.display = 'none';
    } else {
        batteryCapacityInput.parentElement.style.display = 'none';
        engineCapacityInput.parentElement.style.display = 'block';
    }
}

function updateAuctionFee() {
    const auctionName = auctionSelect.value;
    const carPrice = parseFloat(carPriceInput.value) || 0;

    // Находим ближайшее значение цены лота в данных аукциона
    let auctionItem = auctionData.find(item =>
        item.auction_name === auctionName &&
        item.auction_bid >= carPrice
    );

    // Если не нашли точное совпадение, берем первую запись
    if (!auctionItem) {
        auctionItem = auctionData.find(item => item.auction_name === auctionName) ||
            { auction_collection: 0, additional_fee: 0 };
    }

    // Рассчитываем аукционный сбор
    const auctionFee = Number(auctionItem.auction_collection) +
        (Number(auctionItem.additional_fee) || 0);

    // Обновляем отображение
    auctionFeeDisplay.textContent = auctionFee + ' $';
}

function updateSeaShippingCost() {
    // Устанавливаем стоимость доставки из США
    const location = fromUsaInput.value;

    // Находим стоимость для выбранной локации
    let shippingCost = 900; // Значение по умолчанию

    // Если пользователь выбрал локацию из списка
    seaShippingData.forEach(item => {
        if (location.includes(item.location_name)) {
            shippingCost = item.coust_usd;
        }
    });

    // Проверяем, нужно ли добавлять дополнительную стоимость
    const vehicleType = vehicleTypeSelect.value;
    const engineType = engineTypeSelect.value;

    // Дополнительная стоимость для кроссоверов и внедорожников
    if (vehicleType === 'Кроссовер' || vehicleType === 'Позашляховик') {
        shippingCost += 250;
    }

    // Дополнительная стоимость для гибридных и электрических автомобилей
    if (engineType === 'Гібридний' || engineType === 'Електро') {
        shippingCost += 250;
    }

    // Обновляем отображение
    fromUsaDisplay.textContent = shippingCost + ' $';
}

function getExciseDuty() {
    const engineType = engineTypeSelect.value;
    const year = parseInt(yearSelect.value);
    const currentYear = new Date().getFullYear();
    let excise = 0;

    if (engineType === 'Електро') {
        // Расчет акциза для электромобилей
        const batteryCapacity = parseFloat(batteryCapacityInput.value) || 0;
        excise = batteryCapacity * 1 * EUR_TO_USD; // 1 EUR за кВт*ч
    } else {
        // Расчет акциза для ДВС автомобилей
        const engineVolume = parseFloat(engineCapacityInput.value) || 0;
        const engineVolumeL = engineVolume / 1000; // Перевод из см³ в литры

        // Определение базовой ставки
        let baseRate = 0;

        if (engineType === 'Дизельній') {
            baseRate = engineVolumeL <= 3.5 ? 75 : 150;
        } else { // Бензиновый или гибридный
            baseRate = engineVolumeL <= 3 ? 50 : 100;
        }

        // Коэффициент возраста
        const ageCoefficient = Math.max(1, Math.min(15, currentYear - year + 1));

        // Расчет акциза
        excise = baseRate * engineVolumeL * ageCoefficient * EUR_TO_USD;
    }

    return excise;
}

function getImportDuty(customsValue) {
    const engineType = engineTypeSelect.value;

    if (engineType === 'Електро') {
        return 0; // Для электромобилей нет пошлины
    } else {
        return customsValue * 0.1; // 10% от таможенной стоимости
    }
}

function getVAT(customsValue, importDuty, exciseDuty) {
    const engineType = engineTypeSelect.value;

    if (engineType === 'Електро') {
        return 0; // Для электромобилей нет НДС
    } else {
        return (customsValue + importDuty + exciseDuty) * 0.2; // 20% от суммы
    }
}

function calculateCustomsValue() {
    const carPrice = parseFloat(carPriceInput.value) || 0;
    const auctionName = auctionSelect.value;

    // Находим аукционный сбор
    let auctionItem = auctionData.find(item =>
        item.auction_name === auctionName &&
        item.auction_bid >= carPrice
    ) || { auction_collection: 0, additional_fee: 0 };

    const auctionFee = Number(auctionItem.auction_collection) +
        (Number(auctionItem.additional_fee) || 0);

    // Таможенная стоимость = Цена лота + Аукционный сбор + Оценка доставки
    return carPrice + auctionFee + 1600;
}

function calculateTotal() {
    // Получаем значения из полей ввода
    const carPrice = parseFloat(carPriceInput.value) || 0;
    if (carPrice <= 0) {
        alert('Пожалуйста, введите стоимость автомобиля');
        return;
    }

    // Получаем значение аукционного сбора
    const auctionFee = parseFloat(auctionFeeDisplay.textContent) || 0;

    // Получаем значение доставки по США
    const usaDeliveryCost = parseFloat(usaDeliveryDisplay.textContent) || 0;

    // Получаем значение доставки из США
    const seaShippingCost = parseFloat(fromUsaDisplay.textContent) || 0;

    // Доставка в Украине (фиксированная стоимость для Львова)
    const uaDeliveryCost = DELIVERY_KLAIPEDA_LVIV;

    // Рассчитываем таможенную стоимость
    const customsValue = calculateCustomsValue();

    // Рассчитываем акциз
    const exciseDuty = getExciseDuty();

    // Рассчитываем импортную пошлину
    const importDuty = getImportDuty(customsValue);

    // Рассчитываем НДС
    const vat = getVAT(customsValue, importDuty, exciseDuty);

    // Получаем комиссию Best West Cars
    const bwaCommission = commissionSelect.value.includes('1000') ? 1000 : 600;

    // Получаем тип штата
    const stateTypeFee = regionSelect.value.includes('0') ? 0 : 100;

    // Рассчитываем страховой взнос
    const insuranceFee = insuranceCheckbox.checked ?
        Math.max(carPrice * 0.02, 300) : 0;

    // Рассчитываем комиссию за перевод средств
    const bankTransferCommission = (carPrice + auctionFee) * 0.015;

    // Обновляем отображение разбивки стоимости
    exciseDisplay.textContent = Math.round(exciseDuty) + ' $';
    importDutyDisplay.textContent = Math.round(importDuty) + ' $';
    vatDisplay.textContent = Math.round(vat) + ' $';
    transferCommissionDisplay.textContent = Math.round(bankTransferCommission) + ' $';

    // Рассчитываем общую стоимость
    const totalCost = carPrice +
        auctionFee +
        usaDeliveryCost +
        seaShippingCost +
        uaDeliveryCost +
        EXPORT_DOCUMENTS_COST +
        UNLOADING_COST +
        BORDER_CROSSING_COST +
        exciseDuty +
        importDuty +
        vat +
        BROKERAGE_COST +
        DELIVERY_TO_CUSTOMS_COST +
        CERTIFICATION_COST +
        bwaCommission +
        stateTypeFee +
        insuranceFee +
        bankTransferCommission;

    // Обновляем отображение общей стоимости
    totalValueDisplay.textContent = Math.round(totalCost) + '$';
}
