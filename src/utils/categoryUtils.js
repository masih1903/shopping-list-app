// Category keyword mapping for automatic categorization
export const CATEGORY_KEYWORDS = {
  'Frugt & Grønt': [
    'frugt', 'grønt', 'æble', 'banan', 'agurk', 'tomat', 'løg', 'hvidløg',
    'peberfrugt', 'spidskål', 'blomkål', 'broccoli', 'champignon', 'kartofler',
    'gulerod', 'gulerød', 'appelsin', 'citron', 'melon', 'aubergine', 'avocado',
    'kål', 'hvidkål', 'rødkål', 'porrer', 'forårslög', 'squash', 'kartoffel',
    'sød kartoffel', 'bær', 'hindbær', 'blåbær', 'brombær', 'jordbær',
    'clementin', 'grapefrugt', 'pomelo', 'lime', 'kiwi', 'vandmelon',
    'honningmelon', 'galiamelon', 'cantaloupemelon', 'figner'
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
    'riskiks', 'chiafrø', 'tortilla'
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

/**
 * Automatically detect the category of a product based on its name
 * @param {string} name - The product name
 * @returns {string} - The detected category
 */
export const detectCategory = (name) => {
  if (!name || typeof name !== 'string') {
    return 'Andet';
  }
  
  const lowercaseName = name.toLowerCase();
  
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(keyword => lowercaseName.includes(keyword))) {
      return category;
    }
  }
  
  return 'Andet';
};

/**
 * Get all available categories
 * @returns {string[]} - Array of category names
 */
export const getAllCategories = () => {
  return ['all', ...Object.keys(CATEGORY_KEYWORDS), 'Andet'];
};
