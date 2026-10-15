const fs = require('fs');
const path = require('path');
const mockDb = require('./mockDb');

const DB_FILE_PATH = path.join(__dirname, 'db.json');

// Ensure all ERP collections exist in data
function ensureErpCollections(data) {
  if (!data.projects || data.projects.length === 0) {
    data.projects = JSON.parse(JSON.stringify(mockDb.projects));
  }
  if (!data.compliances || data.compliances.length === 0) {
    data.compliances = JSON.parse(JSON.stringify(mockDb.compliances));
  }
  if (!data.accounts) {
    data.accounts = JSON.parse(JSON.stringify(mockDb.accounts));
  }
  if (!data.tickets || data.tickets.length === 0) {
    data.tickets = JSON.parse(JSON.stringify(mockDb.tickets));
  }
  if (!data.users || data.users.length < 8) {
    data.users = JSON.parse(JSON.stringify(mockDb.users));
  }
  if (!data.tenders || data.tenders.length === 0) {
    data.tenders = JSON.parse(JSON.stringify(mockDb.tenders));
  }

  // Attendance and payroll
  if (!data.attendance) {
    const daysInMonth = 31;
    data.attendance = [];
    data.monthlyAttendance = [];

    (data.employees || mockDb.employees).forEach(emp => {
      const presentCount = emp.type === 'Site Staff' ? 28 : 26;
      data.monthlyAttendance.push({
        empId: emp.id,
        empName: emp.name,
        post: emp.post,
        site: emp.tenderName || 'Head Office',
        month: 'October 2026',
        totalMonthDays: daysInMonth,
        presentDays: presentCount,
        absentDays: daysInMonth - presentCount,
        halfDays: 0,
        otHours: emp.post.includes('Security') ? 8 : 0,
        status: 'Submitted'
      });

      for (let day = 1; day <= 13; day++) {
        const dateStr = `2026-10-${String(day).padStart(2, '0')}`;
        const isPresent = day !== 5 && day !== 12;
        data.attendance.push({
          id: `att_${emp.id}_${day}`,
          empId: emp.id,
          empName: emp.name,
          date: dateStr,
          inTime: isPresent ? '08:55 AM' : '--',
          outTime: isPresent ? '05:05 PM' : '--',
          workingHours: isPresent ? 8.2 : 0,
          status: isPresent ? 'PRESENT' : 'OFF_DAY',
          site: emp.tenderName || 'Head Office',
          source: 'Biometric eSSL-Pro (DIET Gate 1)'
        });
      }
    });
  }

  if (!data.payroll) {
    data.payroll = [];
    const month = 'October 2026';
    
    (data.employees || mockDb.employees).forEach((emp, index) => {
      const summary = (data.monthlyAttendance && data.monthlyAttendance.find(a => a.empId === emp.id)) || { presentDays: 28, totalMonthDays: 31 };
      const basePay = emp.kimplSalary || 6500;
      const dailyRate = Math.round(basePay / 30);
      const gross = Math.round(dailyRate * summary.presentDays);
      const pf = emp.post.includes('Security') ? 0 : Math.round(gross * 0.12);
      const esi = emp.post.includes('Security') ? 0 : Math.round(gross * 0.0075);
      const advance = index === 2 ? 1000 : 0;
      const netPay = gross - pf - esi - advance;

      data.payroll.push({
        id: `pay_${emp.id}_2026_10`,
        empId: emp.id,
        empName: emp.name,
        post: emp.post,
        site: emp.tenderName || 'Head Office',
        month: month,
        baseSalary: basePay,
        presentDays: summary.presentDays,
        grossSalary: gross,
        pfDeduction: pf,
        esiDeduction: esi,
        advanceDeduction: advance,
        netPay: netPay,
        bankName: emp.bankName || (emp.bankAcc ? emp.bankAcc.split('-')[0] : 'SBI'),
        bankAcc: emp.bankAcc ? (emp.bankAcc.includes('-') ? emp.bankAcc.split('-')[1] : emp.bankAcc) : '30918239012',
        ifsc: emp.ifsc || 'SBIN0001234',
        paymentStatus: index < 2 ? 'PAID' : 'PENDING',
        paidDate: index < 2 ? '2026-10-10' : null,
        txnRef: index < 2 ? `CMS-NEFT-99281${index}` : null
      });
    });
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
  getDb: () => currentDb,
  saveDb: (newDb) => {
    currentDb = newDb;
    saveDb(currentDb);
  },
  updateDb: (mutatorFn) => {
    mutatorFn(currentDb);
    saveDb(currentDb);
    return currentDb;
  }
};
