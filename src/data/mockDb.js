module.exports = {
  "users": [
    {
      "id": "u1",
      "name": "Alok Kumar",
      "email": "md@kartikindiamanpower.com",
      "password": "123",
      "role": "OWNER",
      "department": "Management",
      "title": "Managing Director & Owner",
      "status": "ACTIVE",
      "loginType": "owner",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      "permissions": [
        "ALL"
      ]
    },
    {
      "id": "u2",
      "name": "Rahul Kumar",
      "email": "gm@kartikindiamanpower.com",
      "password": "123",
      "role": "MANAGER",
      "department": "Operations",
      "title": "General Manager",
      "status": "ACTIVE",
      "loginType": "department",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      "permissions": [
        "OPERATIONS_ALL",
        "PROJECTS_ALL",
        "COMPLIANCE_VIEW"
      ]
    },
    {
      "id": "u3",
      "name": "Pooja Sharma",
      "email": "hr@kartikindiamanpower.com",
      "password": "123",
      "role": "DEPT_MANAGER",
      "department": "HR",
      "title": "HR & Recruitment Manager",
      "status": "ACTIVE",
      "loginType": "department",
      "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      "permissions": [
        "HR_ALL",
        "PROJECTS_VIEW",
        "COMPLIANCE_VIEW",
        "SUPPORT_VIEW"
      ]
    },
    {
      "id": "u4",
      "name": "Arpita Sinha",
      "email": "accounts@kartikindiamanpower.com",
      "password": "123",
      "role": "DEPT_MANAGER",
      "department": "Accounts",
      "title": "Chief Accounts Officer",
      "status": "ACTIVE",
      "loginType": "department",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
      "permissions": [
        "ACCOUNTS_ALL",
        "PROJECTS_VIEW",
        "REPORTS_FINANCIAL"
      ]
    },
    {
      "id": "u5",
      "name": "Vikas Verma",
      "email": "tender@kartikindiamanpower.com",
      "password": "123",
      "role": "DEPT_MANAGER",
      "department": "Tender",
      "title": "Tender & Bidding Lead",
      "status": "ACTIVE",
      "loginType": "department",
      "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      "permissions": [
        "TENDER_ALL",
        "PROJECTS_ALL"
      ]
    },
    {
      "id": "u6",
      "name": "Manoj Tiwary",
      "email": "compliance@kartikindiamanpower.com",
      "password": "123",
      "role": "DEPT_MANAGER",
      "department": "Compliance",
      "title": "Legal & PSARA Compliance Head",
      "status": "ACTIVE",
      "loginType": "department",
      "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
      "permissions": [
        "COMPLIANCE_ALL",
        "PROJECTS_VIEW"
      ]
    },
    {
      "id": "u7",
      "name": "Sanjay Mishra",
      "email": "deo@kartikindiamanpower.com",
      "password": "123",
      "role": "EMPLOYEE",
      "department": "Operations",
      "title": "Senior DEO Operator",
      "status": "ACTIVE",
      "loginType": "employee",
      "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
      "permissions": [
        "PROJECTS_VIEW",
        "SUPPORT_CREATE"
      ]
    },
    {
      "id": "u8",
      "name": "Ramesh Singh",
      "email": "supervisor@kartikindiamanpower.com",
      "password": "123",
      "role": "EMPLOYEE",
      "department": "HR",
      "title": "Site Guard Supervisor",
      "status": "ACTIVE",
      "loginType": "employee",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      "permissions": [
        "HR_VIEW",
        "SUPPORT_CREATE"
      ]
    },
    {
      "id": "u9",
      "name": "Ankit Roy",
      "email": "ankit.roy@kartikindiamanpower.com",
      "password": "123",
      "role": "EMPLOYEE",
      "department": "Accounts",
      "title": "Junior Billing Assistant",
      "status": "ACTIVE",
      "loginType": "employee",
      "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
      "permissions": [
        "ACCOUNTS_VIEW",
        "SUPPORT_CREATE"
      ]
    }
  ],
  "tenders": [],
  "postRates": [
    {
      "id": "pr1",
      "postName": "Security Guard Unarmed",
      "skillCategory": "Semi Skilled",
      "basicVDA": 10478,
      "esiPercent": 3.25,
      "esiAmount": 340.54,
      "pfPercent": 13,
      "pfAmount": 1362.14,
      "serviceChargePercent": 3.85,
      "serviceChargeAmount": 403.4,
      "billedAmount": 12584.08,
      "kimplWorkerPayout": 6500,
      "marginPerPerson": 6084.08
    },
    {
      "id": "pr2",
      "postName": "Housekeeping Staff",
      "skillCategory": "Semi Skilled",
      "basicVDA": 10088,
      "esiPercent": 3.25,
      "esiAmount": 327.86,
      "pfPercent": 13,
      "pfAmount": 1311.44,
      "serviceChargePercent": 3.85,
      "serviceChargeAmount": 388.39,
      "billedAmount": 12115.69,
      "kimplWorkerPayout": 6500,
      "marginPerPerson": 5615.69
    },
    {
      "id": "pr3",
      "postName": "Housekeeping Supervisor",
      "skillCategory": "Skilled",
      "basicVDA": 12324,
      "esiPercent": 3.25,
      "esiAmount": 400.53,
      "pfPercent": 13,
      "pfAmount": 1602.12,
      "serviceChargePercent": 3.85,
      "serviceChargeAmount": 474.47,
      "billedAmount": 14801.12,
      "kimplWorkerPayout": 8500,
      "marginPerPerson": 6301.12
    },
    {
      "id": "pr4",
      "postName": "Computer Operator / DEO",
      "skillCategory": "Grad + Typing 30wpm",
      "basicVDA": 16000,
      "esiPercent": 0,
      "esiAmount": 0,
      "pfPercent": 0,
      "pfAmount": 0,
      "serviceChargePercent": 0,
      "serviceChargeAmount": 0,
      "billedAmount": 16000,
      "kimplWorkerPayout": 11000,
      "marginPerPerson": 5000
    }
  ],
  "employees": [
    {
      "id": "e1",
      "name": "Niraj Singh",
      "empId": "EMP000001",
      "code": "EMP000001",
      "email": "ramesh.guard@kartikindiamanpower.com",
      "department": "Security & Field Operations",
      "designation": "Armed Security Guard (Gunman)",
      "employmentStatus": "Active",
      "loginStatus": "Active",
      "status": "Active",
      "joiningDate": "2026-05-01",
      "joined": "2026-05-01",
      "avatar": "https://api.dicebear.com/7.x/initials/svg?seed=Niraj%20Singh"
    },
    {
      "id": "e2",
      "name": "Ramesh Kumar Singh",
      "empId": "EMP000002",
      "code": "EMP000002",
      "email": "ramesh.guard@kartikindiamanpower.com",
      "department": "Agriculture Department (कृषि विभाग)",
      "designation": "Armed Security Guard (Gunman)",
      "employmentStatus": "Active",
      "loginStatus": "Active",
      "status": "Active",
      "joiningDate": "2026-05-01",
      "joined": "2026-05-01",
      "avatar": "https://api.dicebear.com/7.x/initials/svg?seed=Ramesh%20Kumar%20Singh"
    },
    {
      "id": "e3",
      "name": "Niraj Singh",
      "empId": "EMP000003",
      "code": "EMP000003",
      "email": "nk667296@gmail.com",
      "department": "Agriculture Department (कृषि विभाग)",
      "designation": "Armed Security Guard (Gunman)",
      "employmentStatus": "Active",
      "loginStatus": "Active",
      "status": "Active",
      "joiningDate": "2026-05-01",
      "joined": "2026-05-01",
      "avatar": "https://api.dicebear.com/7.x/initials/svg?seed=Niraj%20Singh%202"
    }
  ],
  "invoices": [],
  "ledger": [],
  "attendance": [],
  "monthlyAttendance": [],
  "payroll": [],
  "projects": [
    {
      "id": "p1",
      "name": "Testing_Niraj",
      "tenderNo": "NIT/DIET-SH/2026/091",
      "department": "Agriculture Department (कृषि विभाग)",
      "client": "Ck Check • Agriculture Department (कृषि विभाग)",
      "portal": "GEM (Government e-Marketplace)",
      "startDate": "2026-05-01",
      "endDate": "2027-04-30",
      "budget": 1450000,
      "spent": 75500,
      "staff": 16,
      "status": "Running",
      "type": "Govt. Sector",
      "location": "Sheohar, Bihar",
      "remarks": "Active GEM tender deployment"
    },
    {
      "id": "p2",
      "name": "DIET Sheohar Campus Security & Facility Management Services",
      "tenderNo": "NIT/DIET-SH/2026/089",
      "department": "Higher Education & Universities",
      "client": "d • Higher Education & Universities",
      "portal": "Eproc 2 (eProcurement Bihar / State)",
      "startDate": "2026-05-01",
      "endDate": "2027-04-30",
      "budget": 1450000,
      "spent": 75500,
      "staff": 15,
      "status": "Running",
      "type": "Govt. Sector",
      "location": "Sheohar, Bihar",
      "remarks": "Active eProc 2 deployment"
    },
    {
      "id": "p3",
      "name": "DIET Sheohar Campus Security & Facility Management Services",
      "tenderNo": "NIT/DIET-SH/2026/090",
      "department": "Police Dept & Administration",
      "client": "Department Head / Tender Authority • Police Dept & Administration",
      "portal": "Offline Tender (Physical Sealed Bid)",
      "startDate": "2026-05-01",
      "endDate": "2027-04-30",
      "budget": 1450000,
      "spent": 75500,
      "staff": 15,
      "status": "Running",
      "type": "Govt. Sector",
      "location": "Sheohar, Bihar",
      "remarks": "Active Offline Sealed Bid deployment"
    },
    {
      "id": "p4",
      "name": "Arun Project",
      "tenderNo": "NIT/DIET-SH/2026/088",
      "department": "Education Department",
      "client": "h • Education Department",
      "portal": "Eproc 2 (eProcurement Bihar / State)",
      "startDate": "2026-05-01",
      "endDate": "2027-04-30",
      "budget": 1450000,
      "spent": 75500,
      "staff": 15,
      "status": "Running",
      "type": "Govt. Sector",
      "location": "Sheohar, Bihar",
      "remarks": "Active education department security deployment"
    }
  ],
  "compliances": [],
  "accounts": {
    "incomeRecords": [],
    "expenseRecords": [],
    "projectExpenditures": [],
    "assetPurchases": []
  },
  "tickets": []
};
