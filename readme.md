# Technical Specification for Car Import Cost Calculator from the USA

## Project Description

This document is a technical specification for developing an application — a calculator for the cost of importing cars from the USA to Ukraine. The application is designed to automate the calculation of the total import cost of a vehicle, taking into account various parameters such as vehicle type, engine type, engine or battery capacity, year of manufacture, auction fees, shipping costs, customs payments, and additional services.

The application should be implemented as a web or desktop app with a user-friendly interface that allows users to input the required data, receive a calculation of the total cost, and, if possible, a detailed cost breakdown. Data for calculations is partially loaded from JSON files containing information on auction fees, shipping costs, etc.

## Functional Requirements

### 1. User Interface

The application must include a form with the following input elements:

- **Vehicle Type**

  - Type: Dropdown
  - Options: Passenger Car, Crossover, SUV
  - Note: If “Crossover” or “SUV” is selected, add USD 250 to the sea shipping cost.

- **Engine Type**

  - Type: Dropdown
  - Options: Gasoline, Diesel, Hybrid, Electric
  - Note: Affects excise and sea shipping cost calculations.

- **Battery Capacity (kWh)**

  - Type: Numeric Input
  - Display Condition: Visible only if Engine Type = Electric
  - Note: Excise for electric vehicles is calculated as 1 EUR per kWh.

- **Engine Volume (L)**

  - Type: Numeric Input
  - Display Condition: Visible only if Engine Type ≠ Electric
  - Note: Used for excise duty calculation for ICE vehicles.

- **Year of Manufacture**

  - Type: Dropdown or Numeric Input
  - Range: 2008–2025
  - Note: Influences age coefficient for excise duty.

- **Auction**

  - Type: Dropdown
  - Data Source: `collection_auction.json`
  - Note: Determines the auction fee.

- **Location in the USA (US Land Delivery)**

  - Type: Dropdown
  - Data Source: `cost_of_land_delivery_from_different_locations.json`
  - Note: Determines the cost of land delivery within the USA to the port.

- **US Port of Departure (Sea Shipping)**

  - Type: Dropdown
  - Data Source: `sea_shipping_cost_from_various_US_ports.json`
  - Note: Determines the base sea shipping cost.

- **Delivery Region in Ukraine**

  - Type: Dropdown
  - Data Source: `cost_of_land_delivery_from_different_locations.json`
  - Note: Determines cost of delivery from the port of Klaipeda to the selected region (fixed USD 800 for Lviv).

- **Lot Price at Auction (USD)**

  - Type: Numeric Input
  - Note: Base amount for customs value and other calculations.

- **Best West Auto Commission**

  - Type: Dropdown
  - Options: Full Service – USD 600, Full Service with Repairs – USD 1000
  - Note: Fixed service fee.

- **State Type**

  - Type: Dropdown
  - Options: Open States – USD 0, Closed States (AI, MI, WI, OH) – USD 100, Manheim – USD 100
  - Note: Adds additional fee based on purchase location.

- **Insurance**
  - Type: Checkbox
  - Note: If selected, adds 2% of the lot price, minimum USD 300.

### 2. Calculations

#### 2.1 Variables and Base Values

- Auction Fee: Loaded from `collection_auction.json`.
- US Land Delivery Cost: Loaded from `cost_of_land_delivery_from_different_locations.json`.
- Sea Shipping Cost: Base value from `sea_shipping_cost_from_various_US_ports.json`, plus USD 250 if Vehicle Type is Crossover or SUV, plus USD 250 if Engine Type is Hybrid or Electric.
- Ukraine Delivery Cost: Loaded from `cost_of_land_delivery_from_different_locations.json` (fixed USD 800 for Lviv).
- Customs Value = Lot Price + Auction Fee + USD 1600 (shipping estimate).

#### 2.2 Customs Payments

##### Electric Vehicles

- Excise Duty = Battery Capacity (kWh) × 1 EUR
- Import Duty = USD 0
- VAT = USD 0

##### Internal Combustion Engine Vehicles

- Excise Duty = Base Rate × Engine Volume (L) × Age Coefficient
  - Base Rates:
    - Diesel ≤ 3.5 L: 75 EUR
    - Diesel > 3.5 L: 150 EUR
    - Gasoline ≤ 3 L: 50 EUR
    - Gasoline > 3 L: 100 EUR
  - Age Coefficient = clamp((Current Year – Year of Manufacture + 1), 1, 15)
- Import Duty = 10% of Customs Value
- VAT = 20% of (Customs Value + Import Duty + Excise Duty in USD)

Currency Conversion: Excise in EUR → USD at 1 EUR = 1.1 USD (constant).

#### 2.3 Additional Costs

- Export Documents: USD 150
- Unloading at Klaipeda Port: USD 400
- Border Crossing & Special Transport: USD 110
- Brokerage Services: USD 250
- Delivery to Customs: USD 80
- Certification: USD 150
- Best West Auto Commission: USD 600 or 1000
- State Type Fee: USD 0 or 100
- Insurance Fee: max(2% of Lot Price, USD 300)
- Bank Transfer Fee: 1.5% of (Lot Price + Auction Fee)

#### 2.4 Total Cost

```python
total_cost = (lot_price + auction_fee + land_delivery_cost + sea_shipping_cost + ua_delivery_cost +
              import_duty + excise_usd + vat + export_documents + unloading + border_crossing +
              brokerage + delivery_to_customs + certification + bwa_commission + state_type_fee +
              insurance_fee + bank_transfer_commission)
```

## Output

- Display Total Cost in USD
- Detailed cost breakdown (optional)

## Non-Functional Requirements

- Application Type: Web or Desktop
- Data Loading: Dynamic from JSON files
- Exchange Rate: Fixed constant (1 EUR = 1.1 USD) or updateable
- Validation: Numeric fields must reject invalid input
- Performance: Instant calculation without delay
- Error Handling: Notify user if JSON files are unavailable

## Additional Notes

- Numeric inputs must be non-negative
- Exchange rate can be a constant
- Implement error handling for missing or invalid JSON data
