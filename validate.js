// Validate data/scams.json against the schema in README.md. Usage: node validate.js
const data = require('./data/scams.json');

const ROLES = ['Musician', 'Athlete', 'Streamer/Gamer', 'Crypto KOL', 'Reality TV/Model', 'Actor', 'Politician', 'Internet Celebrity', 'Other'];
const SCAM_TYPES = ['Insider Dump', 'Undisclosed Promo', 'Deleted Promo', 'Abandoned Project'];
const FIELDS = ['date', 'name', 'handle', 'role', 'scamType', 'token', 'chain', 'amount', 'amountDesc', 'deletedPromo', 'source', 'description', 'outcome'];

if (!Array.isArray(data)) throw new Error('data/scams.json must be an array');
const errors = [];
const seen = new Set();
data.forEach((r, i) => {
  const where = `#${i} ${r.name} / ${r.token}`;
  FIELDS.forEach(k => { if (!(k in r)) errors.push(`${where}: missing field "${k}"`); });
  Object.keys(r).forEach(k => { if (!FIELDS.includes(k)) errors.push(`${where}: unknown field "${k}"`); });
  if (!r.name || !r.description) errors.push(`${where}: name and description are required`);
  if (!ROLES.includes(r.role)) errors.push(`${where}: bad role "${r.role}"`);
  if (!SCAM_TYPES.includes(r.scamType)) errors.push(`${where}: bad scamType "${r.scamType}"`);
  if (!Number.isInteger(r.date) || r.date % 86400) errors.push(`${where}: date must be unix seconds at UTC midnight`);
  if (r.amount !== null && typeof r.amount !== 'number') errors.push(`${where}: amount must be number or null`);
  if (typeof r.deletedPromo !== 'boolean') errors.push(`${where}: deletedPromo must be boolean`);
  if (!Array.isArray(r.chain)) errors.push(`${where}: chain must be an array`);
  if (!Array.isArray(r.source) || !r.source.length) errors.push(`${where}: at least one source is required`);
  else r.source.forEach(u => { if (!/^https:\/\//.test(u)) errors.push(`${where}: source must be an https URL: ${u}`); });
  // token-less records fall back to scamType so a serial promoter's distinct incidents don't collide
  const key = `${(r.name || '').toLowerCase()}|${(r.token || r.scamType || '').toLowerCase()}`;
  if (seen.has(key)) errors.push(`${where}: duplicate of an earlier record (same name + token)`);
  seen.add(key);
});

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`OK: ${data.length} records, ${new Set(data.map(r => r.name)).size} people`);
