const fs = require('fs');
const path = require('path');
const mockDb = require('./mockDb');

const DB_FILE_PATH = path.join(__dirname, 'db.json');

// Ensure all ERP collections exist
function ensureErpCollections(data) {
  if (!Array.isArray(data.projects)) {
    data.projects = [];
  }
  if (!Array.isArray(data.compliances)) {
    data.compliances = [];
  }
  if (!data.accounts) {
    data.accounts = { incomeRecords: [], expenseRecords: [], projectExpenditures: [], assetPurchases: [] };
  }
  if (!Array.isArray(data.tickets)) {
    data.tickets = [];
  }
  if (!Array.isArray(data.users) || data.users.length === 0) {
    data.users = JSON.parse(JSON.stringify(mockDb.users || []));
  }
  if (!Array.isArray(data.tenders)) {
    data.tenders = [];
  }
  if (!Array.isArray(data.employees)) {
    data.employees = [];
  }
  if (!Array.isArray(data.invoices)) {
    data.invoices = [];
  }
  if (!Array.isArray(data.ledger)) {
    data.ledger = [];
  }
  if (!Array.isArray(data.attendance)) {
    data.attendance = [];
  }
  if (!Array.isArray(data.monthlyAttendance)) {
    data.monthlyAttendance = [];
  }
  if (!Array.isArray(data.payroll)) {
    data.payroll = [];
  }

  return data;
}

// Load DB from file or seed from mockDb
function loadDb() {
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const raw = fs.readFileSync(DB_FILE_PATH, 'utf8');
      const parsed = JSON.parse(raw);
      const enriched = ensureErpCollections(parsed);
      saveDb(enriched);
      return enriched;
    }
  } catch (err) {
    console.error('Error reading db.json, falling back to mockDb:', err.message);
  }

  const seeded = ensureErpCollections(JSON.parse(JSON.stringify(mockDb)));
  saveDb(seeded);
  return seeded;
}

// Save DB to file
function saveDb(data) {
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing to db.json:', err.message);
  }
}

let currentDb = loadDb();

module.exports = {
  getDb: () => {
    try {
      if (fs.existsSync(DB_FILE_PATH)) {
        const raw = fs.readFileSync(DB_FILE_PATH, 'utf8');
        currentDb = ensureErpCollections(JSON.parse(raw));
      }
    } catch (e) {}
    return currentDb;
  },
  saveDb: (newDb) => {
    currentDb = newDb;
    saveDb(currentDb);
  },
  updateDb: (mutatorFn) => {
    try {
      if (fs.existsSync(DB_FILE_PATH)) {
        const raw = fs.readFileSync(DB_FILE_PATH, 'utf8');
        currentDb = ensureErpCollections(JSON.parse(raw));
      }
    } catch (e) {}
    mutatorFn(currentDb);
    saveDb(currentDb);
    return currentDb;
  }
};
