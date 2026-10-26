// Capstone Mini Project: Interactive Product Inventory & Analytics Dashboard
// In a browser, prompt() asks for input. In Node.js (no prompt), it falls back
// to the sample values "Monitor" and "150" so the program can still be tested.

const ask = (message, fallback) =>
  typeof prompt === "function" ? prompt(message) : fallback;

// ---------- Data ----------
const inventory = [
  { name: "Laptop", price: 800 },
  { name: "Mouse", price: 25 },
];

// ---------- Functions & Scope ----------

// Regular function: total value of the inventory
function calculateTotal(items) {
  let total = 0; // local scope: not visible outside the function
  for (const item of items) {
    total += item.price;
  }
  return total;
}

// Arrow functions with default parameters (tax and discount percentages)
const applyTax = (amount, taxRate = 0) => amount + (amount * taxRate) / 100;
const applyDiscount = (amount, discountRate = 0) => amount - (amount * discountRate) / 100;

// Conditional evaluation: category badge using if...else and switch
function getCategory(price) {
  let tier;
  if (price < 50) {
    tier = "budget";
  } else if (price < 500) {
    tier = "standard";
  } else {
    tier = "premium";
  }

  switch (tier) {
    case "budget":
      return "Budget";
    case "standard":
      return "Standard";
    case "premium":
      return "Premium";
    default:
      return "Unknown";
  }
}

// Helper to print arrays like ["a", "b"]
const formatList = (list) => `[${list.map((s) => `"${s}"`).join(", ")}]`;

// ---------- 1. Data & Input Initialization ----------
console.log("--- Initializing Inventory System ---");

const MAX_ATTEMPTS = 3;
let added = false;

// ---------- 3. Loops & Flow Control: handle bad or missing input ----------
for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
  const rawName = ask("Enter the new product name:", "Monitor");
  const rawPrice = ask("Enter the product price:", "150");

  // missing input (user pressed Cancel) -> stop asking
  if (rawName === null || rawPrice === null) {
    console.log("Input cancelled. No product added.");
    break;
  }

  const name = String(rawName).trim();
  const price = Number(rawPrice); // explicit type conversion

  // ---------- 2. Validation with if...else ----------
  if (name === "") {
    console.log("Invalid name. Please try again.");
    continue;
  } else if (isNaN(price) || price <= 0) {
    console.log("Invalid price. Please enter a positive number.");
    continue;
  }

  // search the inventory for a duplicate; break as soon as one is found
  let duplicate = false;
  for (const item of inventory) {
    if (item.name.toLowerCase() === name.toLowerCase()) {
      duplicate = true;
      break;
    }
  }
  if (duplicate) {
    console.log(`"${name}" already exists in the inventory.`);
    continue;
  }

  inventory.push({ name, price });
  console.log(`[Prompt executed: User adds "${name}" at "$${price}"]`);
  added = true;
  break;
}

if (!added) {
  console.log("[No new product was added]");
}

// ---------- 5. Array Methods: forEach ----------
console.log("\n--- Processing Inventory Roster (forEach) ---");
inventory.forEach((item) => {
  console.log(`* Item: ${item.name} ($${item.price}) -> Category: ${getCategory(item.price)}`);
});

// ---------- Financial Analytics ----------
console.log("\n--- Financial Analytics ---");
const total = calculateTotal(inventory);
console.log(`Total Inventory Value: $${total}`);

// filter: items under $200
const affordable = inventory.filter((item) => item.price < 200);
console.log(`Filtered Affordable Items (Under $200): ${formatList(affordable.map((i) => i.name))}`);

// map: formatted report list
const report = inventory.map((item) => `${item.name.toUpperCase()}: $${item.price}`);
console.log(`Formatted Report List: ${formatList(report)}`);