// Read API data
const fs = require('fs');
const apiData = JSON.parse(fs.readFileSync('api_products.json', 'utf8'));

// Read local data  
const localData = JSON.parse(fs.readFileSync('data/db.json', 'utf8'));

// Function to normalize text (handle encoding issues)
const normalize = (text) => {
  return text
    .replace(/Ã¦/g, 'æ')
    .replace(/Ã¸/g, 'ø') 
    .replace(/Ã¥/g, 'å')
    .replace(/Ã†/g, 'Æ')
    .replace(/Ã˜/g, 'Ø')
    .replace(/Ã…/g, 'Å');
};

// Normalize API data
const normalizedApiData = apiData.map(item => ({
  id: item.id.toString(),
  name: normalize(item.name)
}));

console.log('=== API PRODUCTS (normalized) ===');
normalizedApiData.forEach(item => {
  console.log(`ID: ${item.id.padStart(3)} - ${item.name}`);
});

console.log(`\nTotal API products: ${normalizedApiData.length}`);
console.log(`Total local products: ${localData.goods.length}`);

// Find missing products
const localNames = new Set(localData.goods.map(g => g.name.toLowerCase()));
const missingProducts = normalizedApiData.filter(item => 
  !localNames.has(item.name.toLowerCase())
);

console.log(`\nMISSING PRODUCTS (${missingProducts.length}):`);
missingProducts.forEach(item => {
  console.log(`- ${item.name} (ID: ${item.id})`);
});

// Categorize missing products using the same logic as the app
const CATEGORY_KEYWORDS = {
  'Frugt & Grønt': [
    'frugt', 'grønt', 'æble', 'banan', 'agurk', 'tomat', 'løg', 'hvidløg',
    'peberfrugt', 'spidskål', 'blomkål', 'broccoli', 'champignon', 'kartofler',
    'gulerod', 'gulerød', 'appelsin', 'citron', 'melon', 'aubergine', 'avocado',
    'kål', 'porrer', 'forårslag', 'squash', 'bær', 'hindbær', 'blåbær', 
    'brombær', 'jordbær', 'clementin', 'grapefrugt', 'pomelo', 'lime', 'kiwi'
  ],
  'Mejeri': [
    'mælk', 'ost', 'yoghurt', 'smør', 'creme', 'skyr', 'hytteost', 'æg',
    'fløde', 'piskefløde', 'koldskål'
  ],
  'Kød & Fisk': [
    'kød', 'fisk', 'kylling', 'pølse', 'tun', 'tofu'
  ],
  'Bageri & Korn': [
    'brød', 'mel', 'pasta', 'ris', 'rugbrød', 'linser', 'havregryn', 
    'kikærter', 'bønner', 'mungbønner', 'wrap', 'chapati', 'burger', 'knækbrød',
    'riskiks', 'chiafrø'
  ],
  'Snacks & Sødt': [
    'mandler', 'valnød', 'nuts', 'chips', 'slik', 'chokolade', 'peanuts',
    'kerner', 'pinjekerner', 'solsikkekerner', 'græskarkerner'
  ],
  'Krydderier & Tilbehør': [
    'salt', 'peber', 'chili', 'mayonnaise', 'dressing', 'dipmix', 'ketchup',
    'humus', 'tzatziki', 'oliven', 'pure', 'karry', 'krydderier', 'honning'
  ],
  'Drikkevarer': [
    'kaffe', 'proteindrik', 'kokosmælk'
  ],
  'Husholdning': [
    'toiletpapir', 'opvaskemiddel'
  ],
  'Bagning & Dessert': [
    'sukker', 'flormelis', 'farin', 'bagepulver', 'vaniljesukker', 'gær'
  ],
  'Konserves & Dåser': [
    'hakkede', 'flåede', 'tomater'
  ]
};

const detectCategory = (name) => {
  const lowercaseName = name.toLowerCase();
  
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(keyword => lowercaseName.includes(keyword))) {
      return category;
    }
  }
  
  return 'Andet';
};

console.log('\n=== CATEGORIZED MISSING PRODUCTS ===');
const categorizedMissing = {};
missingProducts.forEach(item => {
  const category = detectCategory(item.name);
  if (!categorizedMissing[category]) {
    categorizedMissing[category] = [];
  }
  categorizedMissing[category].push(item);
});

Object.entries(categorizedMissing).forEach(([category, items]) => {
  console.log(`\n${category}:`);
  items.forEach(item => {
    console.log(`  - ${item.name} (ID: ${item.id})`);
  });
});
