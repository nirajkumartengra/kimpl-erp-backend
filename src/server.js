const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dbStore = require('./data/dbStore');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'kimpl_super_secret_jwt_key_2026';

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Helper to get db
const db = () => dbStore.getDb();

// Auth Middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No authorization token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// -------------------------------------------------------------
// 1. AUTHENTICATION & LOGIN (Owner, Department, Employee)
// -------------------------------------------------------------
app.post('/api/auth/login', (req, res) => {
  const { email, password, loginType } = req.body;
  const currentDb = db();
  const targetEmail = (email || '').trim().toLowerCase();
  const user = currentDb.users.find(u => {
    const uEmail = (u.email || '').toLowerCase();
    const norm = (em) => (em || '').replace('@kartikindiamanpower.com', '@swapnvihar.com').replace('@kimpl.com', '@swapnvihar.com');
    return uEmail === targetEmail || norm(uEmail) === norm(targetEmail);
  });

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Check Owner Approval
  if (user.status === 'PENDING_APPROVAL') {
    return res.status(403).json({
      error: 'Your account registration is currently PENDING approval by the Owner/Admin. Please contact Head Office.'
    });
  }

  if (user.status === 'INACTIVE') {
    return res.status(403).json({ error: 'This account has been deactivated. Contact Administrator.' });
  }

  // Check login entry point compatibility if specified
  if (loginType === 'owner' && user.role !== 'OWNER' && user.role !== 'SUPER_ADMIN') {
    return res.status(403).json({ error: 'Unauthorized: This account does not have Owner/Admin privileges.' });
  }
  if (loginType === 'department' && user.role !== 'DEPT_MANAGER' && user.role !== 'MANAGER' && user.role !== 'OWNER' && user.role !== 'SUPER_ADMIN') {
    return res.status(403).json({ error: 'Unauthorized: This login is reserved for Department Managers.' });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      department: user.department,
      permissions: user.permissions || []
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      title: user.title,
      status: user.status,
      avatar: user.avatar,
      permissions: user.permissions || []
    }
  });
});

// Self Registration (requires Owner approval)
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, department, title, loginType } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const currentDb = db();
  const existing = currentDb.users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'An account with this email already exists' });
  }

  let newUser;
  dbStore.updateDb(d => {
    newUser = {
      id: 'u' + (d.users.length + 1),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role: loginType === 'department' ? 'DEPT_MANAGER' : 'EMPLOYEE',
      department: department || 'Operations',
      title: title || 'Staff Member',
      status: 'PENDING_APPROVAL',
      loginType: loginType || 'employee',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
      permissions: [],
      createdAt: new Date().toISOString()
    };
    d.users.push(newUser);
  });

  return res.status(201).json({
    success: true,
    message: 'Registration request submitted! Awaiting Owner/Admin approval before you can log in.',
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      status: newUser.status
    }
  });
});

app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    const user = db().users.find(u => u.id === decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// -------------------------------------------------------------
// 2. USER MANAGEMENT & OWNER APPROVALS
// -------------------------------------------------------------
app.get('/api/users', (req, res) => {
  const users = db().users.map(u => {
    const { password, ...safe } = u;
    return safe;
  });
  res.json(users);
});

// Owner approves pending registration
app.put('/api/users/:id/approve', (req, res) => {
  const { id } = req.params;
  let updated;
  dbStore.updateDb(d => {
    const user = d.users.find(u => u.id === id);
    if (user) {
      user.status = 'ACTIVE';
      user.approvedAt = new Date().toISOString();
      if (!user.permissions || user.permissions.length === 0) {
        user.permissions = user.role === 'DEPT_MANAGER' ? [`${user.department.toUpperCase()}_ALL`, 'PROJECTS_VIEW'] : ['PROJECTS_VIEW', 'SUPPORT_CREATE'];
      }
      updated = user;
    }
  });

  if (!updated) return res.status(404).json({ error: 'User not found' });
  const { password, ...safe } = updated;
  res.json({ success: true, message: `User ${updated.name} approved successfully!`, user: safe });
});

// Toggle User Active / Inactive
app.put('/api/users/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  let updated;
  dbStore.updateDb(d => {
    const user = d.users.find(u => u.id === id);
    if (user) {
      user.status = status;
      updated = user;
    }
  });
  if (!updated) return res.status(404).json({ error: 'User not found' });
  res.json({ success: true, user: updated });
});

// Admin creates user directly
app.post('/api/users', (req, res) => {
  let created;
  dbStore.updateDb(d => {
    created = {
      id: 'u' + (d.users.length + 1),
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      password: req.body.password || '123',
      role: req.body.role || 'EMPLOYEE',
      department: req.body.department || 'Operations',
      title: req.body.title || 'Staff',
      status: req.body.status || 'ACTIVE',
      loginType: req.body.loginType || 'employee',
      avatar: req.body.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(req.body.name)}`,
      permissions: req.body.permissions || ['PROJECTS_VIEW']
    };
    d.users.push(created);
  });
  res.status(201).json(created);
});

// -------------------------------------------------------------
// 3. PROJECT MANAGEMENT (Closed, Current, Upcoming, Pending, Cancelled)
// -------------------------------------------------------------
app.get('/api/projects', (req, res) => {
  const currentDb = db();
  let projects = [...(currentDb.projects || [])];
  const { status, department, search, page = 1, limit = 50 } = req.query;

  if (status && status !== 'All') {
    const sLow = status.toLowerCase();
    projects = projects.filter(p => {
      const pStatus = (p.status || '').toLowerCase();
      if (sLow === 'running') return pStatus === 'running' || pStatus === 'current';
      if (sLow === 'uploaded') return pStatus === 'uploaded' || pStatus === 'pending';
      if (sLow === 'selected') return pStatus === 'selected' || pStatus === 'closed' || pStatus === 'awarded';
      return pStatus === sLow;
    });
  }

  if (department && department !== 'All') {
    projects = projects.filter(p => p.department === department);
  }

  if (search) {
    const s = search.toLowerCase();
    projects = projects.filter(p =>
      (p.name && p.name.toLowerCase().includes(s)) ||
      (p.tenderNo && p.tenderNo.toLowerCase().includes(s)) ||
      (p.location && p.location.toLowerCase().includes(s)) ||
      (p.deptHead && p.deptHead.toLowerCase().includes(s))
    );
  }

  const total = projects.length;
  const startIndex = (page - 1) * limit;
  const paginated = projects.slice(startIndex, startIndex + Number(limit));

  res.json({
    projects: paginated,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
    countsByStatus: {
      All: (currentDb.projects || []).length,
      Running: (currentDb.projects || []).filter(p => p.status === 'Running' || p.status === 'Current').length,
      Upcoming: (currentDb.projects || []).filter(p => p.status === 'Upcoming').length,
      Uploaded: (currentDb.projects || []).filter(p => p.status === 'Uploaded' || p.status === 'Pending').length,
      Selected: (currentDb.projects || []).filter(p => p.status === 'Selected' || p.status === 'Closed' || p.status === 'Awarded').length,
      Rejected: (currentDb.projects || []).filter(p => p.status === 'Rejected').length,
      Cancelled: (currentDb.projects || []).filter(p => p.status === 'Cancelled').length,
      // Legacy compatibility
      Current: (currentDb.projects || []).filter(p => p.status === 'Current' || p.status === 'Running').length,
      Pending: (currentDb.projects || []).filter(p => p.status === 'Pending' || p.status === 'Uploaded').length,
      Closed: (currentDb.projects || []).filter(p => p.status === 'Closed' || p.status === 'Selected').length
    }
  });
});

app.post('/api/projects', (req, res) => {
  let created;
  dbStore.updateDb(d => {
    created = {
      id: 'p' + (d.projects.length + 1),
      name: req.body.name,
      department: req.body.department || 'Education Department',
      tenderNo: req.body.tenderNo || `NIT/SVPL/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`,
      deptHead: req.body.deptHead || 'Department Head / Tender Authority',
      portal: req.body.portal || 'Eproc 2',
      tenderOpeningDate: req.body.tenderOpeningDate || req.body.tenderSaleDate || new Date().toISOString().split('T')[0],
      tenderClosingDate: req.body.tenderClosingDate || '',
      tenderSaleDate: req.body.tenderSaleDate || req.body.tenderOpeningDate || new Date().toISOString().split('T')[0],
      workOrderDate: req.body.workOrderDate || new Date().toISOString().split('T')[0],
      tenure: req.body.tenure || '24 Months',
      tenderFee: Number(req.body.tenderFee) || 5000,
      emdAmount: Number(req.body.emdAmount) || 150000,
      location: req.body.location || 'Patna, Bihar',
      requirements: req.body.requirements || [],
      totalManpower: Number(req.body.totalManpower) || 0,
      monthlySalaryTotal: Number(req.body.monthlySalaryTotal) || 0,
      monthlyPfTotal: Number(req.body.monthlyPfTotal) || 0,
      monthlyEsiTotal: Number(req.body.monthlyEsiTotal) || 0,
      monthlyBillingTotal: Number(req.body.monthlyBillingTotal) || 0,
      monthlyGstTotal: Number(req.body.monthlyGstTotal) || 0,
      monthlyGrandTotal: Number(req.body.monthlyGrandTotal) || 0,
      yearlyContractValue: Number(req.body.yearlyContractValue) || Number(req.body.budget) || 1200000,
      requiredEmployees: req.body.requiredEmployees || (req.body.requirements ? req.body.requirements.map(r => ({ post: r.post, count: r.count })) : [{ post: 'Security Guard Unarmed', count: 6 }]),
      salaryDetails: req.body.salaryDetails || (req.body.requirements ? req.body.requirements.map(r => ({ post: r.post, govtRate: r.salary, workerPay: r.salary, pf: r.pf, esi: r.esi })) : []),
      startDate: req.body.startDate || new Date().toISOString().split('T')[0],
      endDate: req.body.endDate || '2028-03-31',
      status: req.body.status || 'Running',
      budget: Number(req.body.budget) || Number(req.body.yearlyContractValue) || 1200000,
      spent: Number(req.body.spent) || 0,
      documents: req.body.documents || [],
      remarks: req.body.remarks || 'Standard deployment terms apply.'
    };
    d.projects.unshift(created);
  });
  res.status(201).json(created);
});

app.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  let updated;
  dbStore.updateDb(d => {
    const idx = d.projects.findIndex(p => p.id === id);
    if (idx !== -1) {
      d.projects[idx] = { ...d.projects[idx], ...req.body };
      updated = d.projects[idx];
    }
  });
  if (!updated) return res.status(404).json({ error: 'Project not found' });
  res.json(updated);
});

app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  let deleted = false;
  dbStore.updateDb(d => {
    const idx = d.projects.findIndex(p => p.id === id);
    if (idx !== -1) {
      d.projects.splice(idx, 1);
      deleted = true;
    }
  });
  if (!deleted) return res.status(404).json({ error: 'Project not found' });
  res.json({ success: true, message: 'Project deleted successfully' });
});

// -------------------------------------------------------------
// 4. TENDER MANAGEMENT
// -------------------------------------------------------------
app.get('/api/tenders', (req, res) => {
  res.json(db().tenders || []);
});

app.post('/api/tenders', (req, res) => {
  let created;
  dbStore.updateDb(d => {
    created = {
      id: 't' + (d.tenders.length + 1),
      tenderNo: req.body.tenderNo || `NIT/BIH/${Math.floor(1000 + Math.random() * 9000)}`,
      name: req.body.name,
      client: req.body.client,
      department: req.body.department || 'Education Department',
      assignedDept: req.body.assignedDept || 'Tender & Operations',
      type: req.body.type || 'Govt. Sector',
      workOrderNo: req.body.workOrderNo || 'Pending',
      workOrderDate: req.body.workOrderDate || new Date().toISOString().split('T')[0],
      publicationDate: req.body.publicationDate || new Date().toISOString().split('T')[0],
      saleDate: req.body.saleDate || new Date().toISOString().split('T')[0],
      submissionDeadline: req.body.submissionDeadline || '2026-12-31',
      tenderFee: Number(req.body.tenderFee) || 5000,
      emdAmount: Number(req.body.emdAmount) || 100000,
      startDate: req.body.startDate || new Date().toISOString().split('T')[0],
      endDate: req.body.endDate || '2028-03-31',
      contractValue: Number(req.body.contractValue) || 1000000,
      monthlyBilling: Number(req.body.monthlyBilling) || 80000,
      workerPayout: Number(req.body.workerPayout) || 45000,
      staffCount: Number(req.body.staffCount) || 6,
      status: req.body.status || 'Under Evaluation',
      documents: req.body.documents || ['Tender_Notice.pdf']
    };
    d.tenders.unshift(created);
  });
  res.status(201).json(created);
});

app.put('/api/tenders/:id', (req, res) => {
  const { id } = req.params;
  let updated;
  dbStore.updateDb(d => {
    const idx = d.tenders.findIndex(t => t.id === id);
    if (idx !== -1) {
      d.tenders[idx] = { ...d.tenders[idx], ...req.body };
      updated = d.tenders[idx];
    }
  });
  if (!updated) return res.status(404).json({ error: 'Tender not found' });
  res.json(updated);
});

app.delete('/api/tenders/:id', (req, res) => {
  const { id } = req.params;
  let deleted = false;
  dbStore.updateDb(d => {
    const idx = d.tenders.findIndex(t => t.id === id);
    if (idx !== -1) {
      d.tenders.splice(idx, 1);
      deleted = true;
    }
  });
  if (!deleted) return res.status(404).json({ error: 'Tender not found' });
  res.json({ success: true, message: 'Tender deleted successfully' });
});

// -------------------------------------------------------------
// 5. COMPLIANCE MANAGEMENT
// -------------------------------------------------------------
app.get('/api/compliance', (req, res) => {
  const currentDb = db();
  const list = currentDb.compliances || [];
  const compliantCount = list.filter(c => c.status === 'Compliant').length;
  const expiringSoonCount = list.filter(c => c.status === 'Expiring Soon').length;
  const actionRequiredCount = list.filter(c => c.status === 'Action Required').length;

  res.json({
    compliances: list,
    stats: {
      total: list.length,
      compliant: compliantCount,
      expiringSoon: expiringSoonCount,
      actionRequired: actionRequiredCount
    }
  });
});

app.post('/api/compliance', (req, res) => {
  let created;
  dbStore.updateDb(d => {
    created = {
      id: 'c' + (d.compliances.length + 1),
      title: req.body.title,
      category: req.body.category || 'Labour Compliance',
      responsibleDept: req.body.responsibleDept || 'Compliance',
      responsiblePerson: req.body.responsiblePerson || 'Manoj Tiwary',
      referenceNo: req.body.referenceNo || `REF-${Math.floor(1000 + Math.random() * 9000)}`,
      issueDate: req.body.issueDate || new Date().toISOString().split('T')[0],
      expiryDate: req.body.expiryDate || '2027-12-31',
      dueDate: req.body.dueDate || '2026-11-15',
      status: req.body.status || 'Compliant',
      frequency: req.body.frequency || 'Monthly',
      documents: req.body.documents || ['Compliance_Document.pdf'],
      remarks: req.body.remarks || 'Statutory filing updated.'
    };
    d.compliances.unshift(created);
  });
  res.status(201).json(created);
});

app.put('/api/compliance/:id', (req, res) => {
  const { id } = req.params;
  let updated;
  dbStore.updateDb(d => {
    const idx = d.compliances.findIndex(c => c.id === id);
    if (idx !== -1) {
      d.compliances[idx] = { ...d.compliances[idx], ...req.body };
      updated = d.compliances[idx];
    }
  });
  if (!updated) return res.status(404).json({ error: 'Compliance record not found' });
  res.json(updated);
});

// -------------------------------------------------------------
// 6. HR MANAGEMENT & EMPLOYEES
// -------------------------------------------------------------
app.get('/api/employees', (req, res) => {
  res.json(db().employees || []);
});

app.post('/api/employees', (req, res) => {
  let created;
  dbStore.updateDb(d => {
    const id = 'e' + (d.employees.length + 1);
    created = {
      id,
      code: `SVPL-0${d.employees.length + 1}`,
      name: req.body.name,
      department: req.body.department || 'Security Operations',
      type: req.body.type || 'Site Staff',
      tenderId: req.body.tenderId || 't1',
      tenderName: req.body.tenderName || 'DIET Sheohar Project Tender',
      post: req.body.post || 'Security Guard Unarmed',
      mobile: req.body.mobile || '9835000000',
      aadhaar: req.body.aadhaar || '4207-XXXX-XXXX',
      bankName: req.body.bankName || 'State Bank of India',
      bankAcc: req.body.bankAcc || '30918239012',
      ifsc: req.body.ifsc || 'SBIN0001234',
      joiningDate: req.body.joiningDate || new Date().toISOString().split('T')[0],
      status: req.body.status || 'ACTIVE',
      kimplSalary: Number(req.body.kimplSalary) || 6500,
      policeVerification: req.body.policeVerification || 'Verified',
      avatar: req.body.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(req.body.name)}`,
      documents: ['Aadhaar_Card.pdf', 'Police_Verification.pdf']
    };
    d.employees.unshift(created);
  });
  res.status(201).json(created);
});

app.put('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  let updated;
  dbStore.updateDb(d => {
    const idx = d.employees.findIndex(e => e.id === id);
    if (idx !== -1) {
      d.employees[idx] = { ...d.employees[idx], ...req.body };
      updated = d.employees[idx];
    }
  });
  if (!updated) return res.status(404).json({ error: 'Employee not found' });
  res.json(updated);
});

app.delete('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  let deleted = false;
  dbStore.updateDb(d => {
    const idx = d.employees.findIndex(e => e.id === id);
    if (idx !== -1) {
      d.employees.splice(idx, 1);
      deleted = true;
    }
  });
  if (!deleted) return res.status(404).json({ error: 'Employee not found' });
  res.json({ success: true, message: 'Employee deleted' });
});

// -------------------------------------------------------------
// 7. ACCOUNT MANAGEMENT & FINANCIALS
// -------------------------------------------------------------
app.get('/api/accounts/summary', (req, res) => {
  const currentDb = db();
  const acc = currentDb.accounts || {};
  const incomeRecords = acc.incomeRecords || [];
  const expenseRecords = acc.expenseRecords || [];

  const totalIncome = incomeRecords.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);
  const totalExpense = expenseRecords.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);
  const netProfit = totalIncome - totalExpense;

  const totalBilled = (currentDb.invoices || []).reduce((sum, inv) => sum + (inv.grandTotal || 0), 0);
  const totalOutstanding = (currentDb.ledger || []).reduce((sum, l) => sum + (l.due || 0), 0);

  res.json({
    totalIncome,
    totalExpense,
    netProfit,
    totalBilled,
    totalOutstanding,
    incomeRecords: incomeRecords.slice(-10),
    expenseRecords: expenseRecords.slice(-10),
    projectExpenditures: acc.projectExpenditures || [],
    invoices: currentDb.invoices || [],
    ledger: currentDb.ledger || [],
    assetPurchases: acc.assetPurchases || []
  });
});

// Company Assets & Purchases (Under Accounts)
app.get('/api/accounts/assets', (req, res) => {
  const currentDb = db();
  const acc = currentDb.accounts || {};
  res.json(acc.assetPurchases || []);
});

app.post('/api/accounts/assets', (req, res) => {
  let created;
  dbStore.updateDb(d => {
    if (!d.accounts) d.accounts = { incomeRecords: [], expenseRecords: [], projectExpenditures: [], assetPurchases: [] };
    if (!d.accounts.assetPurchases) d.accounts.assetPurchases = [];

    const qty = Number(req.body.qty) || 1;
    const unitPrice = Number(req.body.unitPrice) || 0;
    const totalAmount = Number(req.body.totalAmount) || (qty * unitPrice);

    created = {
      id: 'ast-' + Date.now(),
      name: req.body.name,
      category: req.body.category || 'Furniture',
      qty,
      unitPrice,
      totalAmount,
      vendor: req.body.vendor || 'Direct Vendor',
      billNo: req.body.billNo || `BILL-${Date.now().toString().slice(-4)}`,
      date: req.body.date || new Date().toISOString().split('T')[0],
      location: req.body.location || 'Head Office',
      paymentMode: req.body.paymentMode || 'Bank NEFT',
      status: req.body.status || 'In Use',
      remarks: req.body.remarks || '',
      createdAt: new Date().toISOString()
    };
    d.accounts.assetPurchases.unshift(created);

    // Optionally sync with operational expenses
    if (req.body.syncWithExpense) {
      if (!d.accounts.expenseRecords) d.accounts.expenseRecords = [];
      d.accounts.expenseRecords.unshift({
        id: 'exp' + (d.accounts.expenseRecords.length + 1),
        date: created.date,
        category: `Asset - ${created.category}`,
        amount: totalAmount,
        paidTo: created.vendor,
        projectId: 'HO',
        status: 'Approved'
      });
    }
  });
  res.status(201).json(created);
});

app.delete('/api/accounts/assets/:id', (req, res) => {
  dbStore.updateDb(d => {
    if (d.accounts && d.accounts.assetPurchases) {
      d.accounts.assetPurchases = d.accounts.assetPurchases.filter(a => String(a.id) !== String(req.params.id));
    }
  });
  res.json({ success: true });
});

app.post('/api/accounts/income', (req, res) => {
  let created;
  dbStore.updateDb(d => {
    if (!d.accounts) d.accounts = { incomeRecords: [], expenseRecords: [], projectExpenditures: [] };
    created = {
      id: 'inc' + ((d.accounts.incomeRecords || []).length + 1),
      date: req.body.date || new Date().toISOString().split('T')[0],
      client: req.body.client,
      amount: Number(req.body.amount) || 0,
      category: req.body.category || 'Client Payment',
      mode: req.body.mode || 'Bank NEFT',
      txnRef: req.body.txnRef || `TR-${Math.floor(100000 + Math.random() * 900000)}`,
      projectId: req.body.projectId || 'p1'
    };
    d.accounts.incomeRecords.unshift(created);
  });
  res.status(201).json(created);
});

app.post('/api/accounts/expense', (req, res) => {
  let created;
  dbStore.updateDb(d => {
    if (!d.accounts) d.accounts = { incomeRecords: [], expenseRecords: [], projectExpenditures: [] };
    created = {
      id: 'exp' + ((d.accounts.expenseRecords || []).length + 1),
      date: req.body.date || new Date().toISOString().split('T')[0],
      category: req.body.category || 'Operational Expense',
      amount: Number(req.body.amount) || 0,
      paidTo: req.body.paidTo || 'Vendor',
      projectId: req.body.projectId || 'p1',
      status: 'Approved'
    };
    d.accounts.expenseRecords.unshift(created);
  });
  res.status(201).json(created);
});

// -------------------------------------------------------------
// 8. SUPPORT MANAGEMENT (Tickets, Comments & Assignment)
// -------------------------------------------------------------
app.get('/api/support/tickets', (req, res) => {
  res.json(db().tickets || []);
});

app.post('/api/support/tickets', (req, res) => {
  let created;
  dbStore.updateDb(d => {
    created = {
      id: `TICK-${100 + (d.tickets.length + 1)}`,
      subject: req.body.subject,
      description: req.body.description,
      priority: req.body.priority || 'Medium',
      department: req.body.department || 'Operations',
      assignedTo: req.body.assignedTo || 'Unassigned',
      assignedEmpId: req.body.assignedEmpId || null,
      status: 'Open',
      createdAt: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
      comments: req.body.initialComment ? [{
        author: req.body.author || 'Staff',
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        text: req.body.initialComment
      }] : []
    };
    d.tickets.unshift(created);
  });
  res.status(201).json(created);
});

app.put('/api/support/tickets/:id', (req, res) => {
  const { id } = req.params;
  let updated;
  dbStore.updateDb(d => {
    const idx = d.tickets.findIndex(t => t.id === id);
    if (idx !== -1) {
      d.tickets[idx] = { ...d.tickets[idx], ...req.body };
      updated = d.tickets[idx];
    }
  });
  if (!updated) return res.status(404).json({ error: 'Ticket not found' });
  res.json(updated);
});

app.post('/api/support/tickets/:id/comments', (req, res) => {
  const { id } = req.params;
  const { author, text } = req.body;
  let newComment;
  dbStore.updateDb(d => {
    const ticket = d.tickets.find(t => t.id === id);
    if (ticket) {
      newComment = {
        author: author || 'Authorized User',
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        text: text
      };
      if (!ticket.comments) ticket.comments = [];
      ticket.comments.push(newComment);
    }
  });
  if (!newComment) return res.status(404).json({ error: 'Ticket not found' });
  res.status(201).json(newComment);
});

// -------------------------------------------------------------
// 9. DYNAMIC DASHBOARD STATS
// -------------------------------------------------------------
app.get('/api/dashboard/stats', (req, res) => {
  const currentDb = db();
  const projects = currentDb.projects || [];
  const tenders = currentDb.tenders || [];
  const employees = currentDb.employees || [];
  const compliances = currentDb.compliances || [];
  const tickets = currentDb.tickets || [];
  const accounts = currentDb.accounts || {};

  const totalProjects = projects.length;
  const currentProjects = projects.filter(p => p.status === 'Current').length;
  const upcomingProjects = projects.filter(p => p.status === 'Upcoming').length;
  const pendingProjects = projects.filter(p => p.status === 'Pending').length;
  const closedProjects = projects.filter(p => p.status === 'Closed').length;

  const totalTenders = tenders.length;
  const activeTenders = tenders.filter(t => t.status === 'Awarded' || t.status === 'Active' || t.status === 'Expiring Soon').length;
  const tenderTotalValue = tenders.reduce((sum, t) => sum + (Number(t.contractValue) || 0), 0);

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'ACTIVE').length;

  const incomeRecords = accounts.incomeRecords || [];
  const expenseRecords = accounts.expenseRecords || [];
  const totalRevenue = incomeRecords.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);
  const totalExpenses = expenseRecords.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);
  const totalOutstanding = (currentDb.ledger || []).reduce((sum, l) => sum + (l.due || 0), 0);

  const totalCompliances = compliances.length;
  const compliantCount = compliances.filter(c => c.status === 'Compliant').length;
  const expiringCompliances = compliances.filter(c => c.status === 'Expiring Soon' || c.status === 'Action Required').length;

  const openTickets = tickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length;

  // Monthly project trends for interactive chart
  const monthlyProjectTrends = [
    { month: 'May', count: 3, value: 4500000 },
    { month: 'Jun', count: 4, value: 5800000 },
    { month: 'Jul', count: 5, value: 6900000 },
    { month: 'Aug', count: 6, value: 8400000 },
    { month: 'Sep', count: 7, value: 11200000 },
    { month: 'Oct', count: 8, value: 14856000 }
  ];

  // Expenses vs Budget distribution
  const expenseBreakdown = [
    { category: 'Staff Salaries', amount: 247000, percentage: 76.5 },
    { category: 'Uniforms & Tactical', amount: 28500, percentage: 8.8 },
    { category: 'Vehicle & Transport', amount: 18900, percentage: 5.8 },
    { category: 'Biometric & Cloud SIM', amount: 14200, percentage: 4.4 },
    { category: 'Statutory EPF/ESIC Admin', amount: 12400, percentage: 3.8 }
  ];

  // Employee Post Breakdown
  const employeePostBreakdown = [
    { post: 'Security Guards (Unarmed)', count: 26, color: '#0284c7' },
    { post: 'Sanitation Staff', count: 12, color: '#10b981' },
    { post: 'Computer Operators / DEO', count: 4, color: '#f59e0b' },
    { post: 'Site Supervisors', count: 2, color: '#8b5cf6' }
  ];

  res.json({
    stats: {
      totalProjects,
      currentProjects,
      upcomingProjects,
      pendingProjects,
      closedProjects,
      totalTenders,
      activeTenders,
      tenderTotalValue,
      totalEmployees,
      activeEmployees,
      totalRevenue,
      totalExpenses,
      netProfit: totalRevenue - totalExpenses,
      totalOutstanding,
      totalCompliances,
      compliantCount,
      expiringCompliances,
      openTickets
    },
    monthlyProjectTrends,
    expenseBreakdown,
    employeePostBreakdown,
    recentProjects: projects.slice(0, 5),
    upcomingDeadlines: [
      { id: 'd1', task: 'EPF & ESIC September Challan Reconciliation', due: '2026-10-15', dept: 'Accounts', priority: 'High' },
      { id: 'd2', task: 'GSTR-3B Tax Filing for Patna Head Office', due: '2026-10-20', dept: 'Accounts', priority: 'Urgent' },
      { id: 'd3', task: 'DIET Dumra 30-Month Contract Expiry & Extension', due: '2026-11-30', dept: 'Tender', priority: 'High' },
      { id: 'd4', task: 'AIIMS Patna Security Mobilization Kick-off', due: '2026-11-01', dept: 'Operations', priority: 'Urgent' }
    ],
    pendingTasks: [
      { id: 'pt1', task: 'Approve Ankit Roy junior billing account registration', dept: 'Management', assigned: 'Owner / MD' },
      { id: 'pt2', task: 'Verify biometric attendance logs for DIET Sheohar Gate 1', dept: 'Operations', assigned: 'Rahul Kumar' },
      { id: 'pt3', task: 'Prepare SAC 9985 GST invoice for October DIET Quila Ghat', dept: 'Accounts', assigned: 'Arpita Sinha' }
    ],
    recentActivities: [
      { id: 'a1', action: 'New Project Added', detail: 'AIIMS Patna Allied Hospital Security Tender L1 awarded', time: '10 mins ago', user: 'Vikas Verma' },
      { id: 'a2', action: 'Salary Payout Disbursed', detail: 'Bulk NEFT payout for 44 staff processed', time: '1 hour ago', user: 'Alok Kumar (Owner)' },
      { id: 'a3', action: 'Compliance Verified', detail: 'Form XVI Minimum Wages Register updated with +5% VDA', time: '3 hours ago', user: 'Manoj Tiwary' },
      { id: 'a4', action: 'Support Ticket Assigned', detail: 'TICK-101 eSSL hardware diagnostic ticket assigned to GM', time: '5 hours ago', user: 'System' }
    ]
  });
});

// Existing routes for legacy compatibility
app.get('/api/rates', (req, res) => res.json(db().postRates || []));
app.get('/api/invoices', (req, res) => res.json(db().invoices || []));
app.get('/api/ledger', (req, res) => res.json(db().ledger || []));
app.get('/api/attendance', (req, res) => {
  const currentDb = db();
  res.json({
    month: 'October 2026',
    monthlySummary: currentDb.monthlyAttendance || [],
    dailyLogs: (currentDb.attendance || []).slice(-50)
  });
});
app.get('/api/payroll', (req, res) => res.json(db().payroll || []));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'KARTIK INDIA MANPOWER ERP Backend API', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`[KARTIK INDIA MANPOWER ERP Server] Running on http://localhost:${PORT}`);
});
