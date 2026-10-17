// Professional ERP Mock Database for KARTIK INDIA MANPOWER PRIVATE LIMITED ERP System
// Contains all organizational entities, hierarchy, projects, tenders, compliances, HR, accounts, and tickets

const mockData = {
  users: [
    {
      id: "u1",
      name: "Alok Kumar",
      email: "md@kartikindiamanpower.com",
      password: "123",
      role: "OWNER",
      department: "Management",
      title: "Managing Director & Owner",
      status: "ACTIVE",
      loginType: "owner",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      permissions: ["ALL"]
    },
    {
      id: "u2",
      name: "Rahul Kumar",
      email: "gm@kartikindiamanpower.com",
      password: "123",
      role: "MANAGER",
      department: "Operations",
      title: "General Manager",
      status: "ACTIVE",
      loginType: "department",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      permissions: ["PROJECTS_ALL", "TENDERS_ALL", "HR_VIEW", "ACCOUNTS_VIEW", "COMPLIANCE_ALL", "SUPPORT_ALL"]
    },
    {
      id: "u3",
      name: "Pooja Sharma",
      email: "hr@kartikindiamanpower.com",
      password: "123",
      role: "DEPT_MANAGER",
      department: "HR",
      title: "HR & Recruitment Manager",
      status: "ACTIVE",
      loginType: "department",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      permissions: ["HR_ALL", "PROJECTS_VIEW", "COMPLIANCE_VIEW", "SUPPORT_VIEW"]
    },
    {
      id: "u4",
      name: "Arpita Sinha",
      email: "accounts@kartikindiamanpower.com",
      password: "123",
      role: "DEPT_MANAGER",
      department: "Accounts",
      title: "Chief Accounts Officer",
      status: "ACTIVE",
      loginType: "department",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      permissions: ["ACCOUNTS_ALL", "PROJECTS_VIEW", "TENDERS_VIEW", "HR_VIEW", "SUPPORT_VIEW"]
    },
    {
      id: "u5",
      name: "Vikas Verma",
      email: "tender@kartikindiamanpower.com",
      password: "123",
      role: "DEPT_MANAGER",
      department: "Tender",
      title: "Tender & Bidding Lead",
      status: "ACTIVE",
      loginType: "department",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      permissions: ["TENDERS_ALL", "PROJECTS_ALL", "COMPLIANCE_VIEW", "SUPPORT_VIEW"]
    },
    {
      id: "u6",
      name: "Manoj Tiwary",
      email: "compliance@kartikindiamanpower.com",
      password: "123",
      role: "DEPT_MANAGER",
      department: "Compliance",
      title: "Legal & PSARA Compliance Head",
      status: "ACTIVE",
      loginType: "department",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
      permissions: ["COMPLIANCE_ALL", "PROJECTS_VIEW", "TENDERS_VIEW", "SUPPORT_VIEW"]
    },
    {
      id: "u7",
      name: "Sanjay Mishra",
      email: "deo@kartikindiamanpower.com",
      password: "123",
      role: "EMPLOYEE",
      department: "Operations",
      title: "Senior DEO Operator",
      status: "ACTIVE",
      loginType: "employee",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
      permissions: ["PROJECTS_VIEW", "SUPPORT_CREATE"]
    },
    {
      id: "u8",
      name: "Ramesh Singh",
      email: "supervisor@kartikindiamanpower.com",
      password: "123",
      role: "EMPLOYEE",
      department: "HR",
      title: "Site Guard Supervisor",
      status: "ACTIVE",
      loginType: "employee",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
      permissions: ["ATTENDANCE_MARK", "HR_VIEW_SITE", "SUPPORT_CREATE"]
    },
    {
      id: "u9",
      name: "Ankit Roy",
      email: "ankit.roy@kartikindiamanpower.com",
      password: "123",
      role: "EMPLOYEE",
      department: "Accounts",
      title: "Junior Billing Assistant",
      status: "PENDING_APPROVAL",
      loginType: "employee",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      permissions: []
    }
  ],

  projects: [
    {
      id: "p1",
      name: "DIET Sheohar Campus Security & Facility Management",
      department: "Education Department",
      tenderNo: "NIT/DIET-SH/2025/089",
      deptHead: "Dr. R. K. Prasad (Principal)",
      tenderSaleDate: "2025-02-10",
      workOrderDate: "2025-03-25",
      tenure: "24 Months",
      tenderFee: 5000,
      emdAmount: 181200,
      location: "Sheohar, Bihar",
      requiredEmployees: [
        { post: "Security Guard Unarmed", count: 6 },
        { post: "Housekeeping Staff", count: 2 },
        { post: "Site Supervisor", count: 1 }
      ],
      salaryDetails: [
        { post: "Security Guard Unarmed", govtRate: 12584.08, workerPay: 6500, pf: 1362.14, esi: 340.54 },
        { post: "Housekeeping Staff", govtRate: 12115.69, workerPay: 6500, pf: 1311.44, esi: 327.86 },
        { post: "Site Supervisor", govtRate: 14801.12, workerPay: 8500, pf: 1602.12, esi: 400.53 }
      ],
      startDate: "2025-04-01",
      endDate: "2027-03-31",
      status: "Current",
      budget: 906050,
      spent: 345000,
      documents: [
        { name: "Signed_Work_Order_DIET_Sheohar.pdf", size: "2.4 MB", type: "pdf" },
        { name: "Police_Verification_Report.pdf", size: "1.1 MB", type: "pdf" }
      ],
      remarks: "Biometric eSSL device deployed at Main Gate. Attendance verified monthly."
    },
    {
      id: "p2",
      name: "DIET Dumra Security & Housekeeping Operations",
      department: "Education Department",
      tenderNo: "NIT/DUMRA/2024/112",
      deptHead: "Prof. Arvind Narayan (Centre Head)",
      tenderSaleDate: "2024-02-15",
      workOrderDate: "2024-03-20",
      tenure: "30 Months",
      tenderFee: 7500,
      emdAmount: 240000,
      location: "Sitamarhi, Bihar",
      requiredEmployees: [
        { post: "Security Guard Unarmed", count: 6 },
        { post: "Housekeeping Staff", count: 4 }
      ],
      salaryDetails: [
        { post: "Security Guard Unarmed", govtRate: 12584.08, workerPay: 6500, pf: 1362.14, esi: 340.54 },
        { post: "Housekeeping Staff", govtRate: 12115.69, workerPay: 6500, pf: 1311.44, esi: 327.86 }
      ],
      startDate: "2024-04-01",
      endDate: "2026-11-30",
      status: "Current",
      budget: 1200000,
      spent: 980000,
      documents: [
        { name: "Agreement_Dumra_College.pdf", size: "3.1 MB", type: "pdf" }
      ],
      remarks: "Contract expiring in 49 days. Renewal application submitted to District Education Office."
    },
    {
      id: "p3",
      name: "Bakhtiyarpur Block Sanitation & Waste Management Project",
      department: "Urban Development & Municipal",
      tenderNo: "NIT/BKP-SCH/2025/304",
      deptHead: "Shri S. K. Singh (BDO)",
      tenderSaleDate: "2024-11-10",
      workOrderDate: "2024-12-18",
      tenure: "36 Months",
      tenderFee: 10000,
      emdAmount: 490000,
      location: "Bakhtiyarpur, Patna, Bihar",
      requiredEmployees: [
        { post: "Sanitation Staff", count: 12 },
        { post: "Bikers / Field Staff", count: 4 },
        { post: "Operations Supervisor", count: 2 }
      ],
      salaryDetails: [
        { post: "Sanitation Staff", govtRate: 12115.69, workerPay: 6500, pf: 1311.44, esi: 327.86 },
        { post: "Bikers / Field Staff", govtRate: 14000.00, workerPay: 7500, pf: 0, esi: 0 },
        { post: "Operations Supervisor", govtRate: 16500.00, workerPay: 9500, pf: 1800, esi: 450 }
      ],
      startDate: "2025-01-01",
      endDate: "2027-12-31",
      status: "Current",
      budget: 2450000,
      spent: 840000,
      documents: [
        { name: "Bakhtiyarpur_Sanitation_Tender_Award.pdf", size: "4.2 MB", type: "pdf" }
      ],
      remarks: "Field vehicles and protective equipment issued to all 18 workers."
    },
    {
      id: "p4",
      name: "DIET Quila Ghat Darbhanga Security & Clerical Services",
      department: "Education Department",
      tenderNo: "NIT/QG-DAR/2024/045",
      deptHead: "Dr. Meena Kumari (Principal)",
      tenderSaleDate: "2024-04-10",
      workOrderDate: "2024-05-15",
      tenure: "36 Months",
      tenderFee: 12000,
      emdAmount: 560000,
      location: "Darbhanga, Bihar",
      requiredEmployees: [
        { post: "Security Guard Unarmed", count: 8 },
        { post: "Computer Operator / DEO", count: 4 },
        { post: "Housekeeping Staff", count: 2 }
      ],
      salaryDetails: [
        { post: "Security Guard Unarmed", govtRate: 12584.08, workerPay: 6500, pf: 1362.14, esi: 340.54 },
        { post: "Computer Operator / DEO", govtRate: 16000.00, workerPay: 11000, pf: 0, esi: 0 }
      ],
      startDate: "2024-06-01",
      endDate: "2027-05-31",
      status: "Current",
      budget: 2800000,
      spent: 1120000,
      documents: [
        { name: "Darbhanga_Work_Contract.pdf", size: "1.8 MB", type: "pdf" }
      ],
      remarks: "Includes DEO operators managing examination and student portal entries."
    },
    {
      id: "p5",
      name: "AIIMS Patna Allied Hospital Facility & Security Services",
      department: "Health Department",
      tenderNo: "NIT/AIIMS-PAT/2026/012",
      deptHead: "Chief Medical Superintendent",
      tenderSaleDate: "2026-08-01",
      workOrderDate: "2026-09-15",
      tenure: "24 Months",
      tenderFee: 15000,
      emdAmount: 750000,
      location: "Phulwari Sharif, Patna, Bihar",
      requiredEmployees: [
        { post: "Security Guard Armed / Unarmed", count: 25 },
        { post: "Hospital Sanitation Staff", count: 15 },
        { post: "Paramedical Attendant", count: 10 }
      ],
      salaryDetails: [
        { post: "Security Guard Armed / Unarmed", govtRate: 15500.00, workerPay: 9000, pf: 1860, esi: 465 }
      ],
      startDate: "2026-11-01",
      endDate: "2028-10-31",
      status: "Upcoming",
      budget: 5400000,
      spent: 0,
      documents: [
        { name: "Tender_Bid_Technical_Envelope.pdf", size: "5.5 MB", type: "pdf" }
      ],
      remarks: "Technical bid cleared with L1 pricing. Mobilization stage initiated for Nov 1."
    },
    {
      id: "p6",
      name: "Bihar State Warehousing Corporation Security Tender",
      department: "Public Works & Logistics",
      tenderNo: "NIT/BSWC/2026/902",
      deptHead: "Managing Director, BSWC",
      tenderSaleDate: "2026-09-20",
      workOrderDate: "Pending Award",
      tenure: "24 Months",
      tenderFee: 8000,
      emdAmount: 320000,
      location: "Muzaffarpur & Samastipur Warehouses",
      requiredEmployees: [
        { post: "Security Guard Armed", count: 10 },
        { post: "CCTV Surveillance Operator", count: 4 }
      ],
      salaryDetails: [
        { post: "Security Guard Armed", govtRate: 16800.00, workerPay: 10500, pf: 2016, esi: 504 }
      ],
      startDate: "2026-12-01",
      endDate: "2028-11-30",
      status: "Pending",
      budget: 3100000,
      spent: 0,
      documents: [
        { name: "BSWC_Tender_Notice.pdf", size: "2.1 MB", type: "pdf" }
      ],
      remarks: "Financial envelope opening scheduled for next week. Awaiting official work order."
    },
    {
      id: "p7",
      name: "Patna Municipal Corporation Ward 12 Sanitation Contract",
      department: "Urban Development & Municipal",
      tenderNo: "NIT/PMC-WD12/2023/108",
      deptHead: "Executive Officer, PMC",
      tenderSaleDate: "2023-01-10",
      workOrderDate: "2023-02-15",
      tenure: "24 Months",
      tenderFee: 5000,
      emdAmount: 150000,
      location: "Patna, Bihar",
      requiredEmployees: [
        { post: "Sanitation Staff", count: 14 }
      ],
      salaryDetails: [
        { post: "Sanitation Staff", govtRate: 11500.00, workerPay: 6000, pf: 1200, esi: 300 }
      ],
      startDate: "2023-03-01",
      endDate: "2025-02-28",
      status: "Closed",
      budget: 1850000,
      spent: 1850000,
      documents: [
        { name: "Completion_Certificate_PMC.pdf", size: "1.2 MB", type: "pdf" }
      ],
      remarks: "Project tenure concluded successfully. Final treasury payment cleared and EMD refunded."
    },
    {
      id: "p8",
      name: "Purnea District Collectorate Gate Surveillance",
      department: "Police Dept & Administration",
      tenderNo: "NIT/PUR-COL/2025/002",
      deptHead: "Deputy Collector (General)",
      tenderSaleDate: "2025-03-05",
      workOrderDate: "Cancelled by Authority",
      tenure: "12 Months",
      tenderFee: 3000,
      emdAmount: 90000,
      location: "Purnea, Bihar",
      requiredEmployees: [
        { post: "Security Guard", count: 8 }
      ],
      salaryDetails: [
        { post: "Security Guard", govtRate: 12000.00, workerPay: 6500, pf: 1300, esi: 325 }
      ],
      startDate: "2025-05-01",
      endDate: "2026-04-30",
      status: "Cancelled",
      budget: 800000,
      spent: 0,
      documents: [
        { name: "Cancellation_Order_Gazette.pdf", size: "850 KB", type: "pdf" }
      ],
      remarks: "Tender cancelled due to administrative realignment by State Home Department. Full EMD refund processed."
    }
  ],

  tenders: [
    {
      id: "t1",
      tenderNo: "NIT/DIET-SH/2025/089",
      name: "DIET Sheohar Project Tender",
      client: "DIET Sheohar College",
      department: "Education Department",
      assignedDept: "Tender & Operations",
      type: "Govt. Sector",
      workOrderNo: "WO/DIET-SH/2025/089",
      workOrderDate: "2025-03-25",
      publicationDate: "2025-01-28",
      saleDate: "2025-02-10",
      submissionDeadline: "2025-02-28",
      tenderFee: 5000,
      emdAmount: 181200,
      startDate: "2025-04-01",
      endDate: "2027-03-31",
      contractValue: 906050,
      monthlyBilling: 75504,
      workerPayout: 39000,
      staffCount: 6,
      status: "Awarded",
      documents: ["NIT_Document.pdf", "Financial_Bid_L1.pdf", "Work_Order_Signed.pdf"]
    },
    {
      id: "t2",
      tenderNo: "NIT/DUMRA/2024/112",
      name: "DIET Dumra Sitamarhi",
      client: "DIET Dumra, Sitamarhi",
      department: "Education Department",
      assignedDept: "Tender & Operations",
      type: "Govt. Sector",
      workOrderNo: "WO/DUMRA/2024/112",
      workOrderDate: "2024-03-20",
      publicationDate: "2024-01-20",
      saleDate: "2024-02-15",
      submissionDeadline: "2024-03-05",
      tenderFee: 7500,
      emdAmount: 240000,
      startDate: "2024-04-01",
      endDate: "2026-11-30",
      contractValue: 1200000,
      monthlyBilling: 75504,
      workerPayout: 39000,
      staffCount: 6,
      status: "Expiring Soon",
      documents: ["Work_Order_Dumra.pdf", "Agreement_Copy.pdf"]
    },
    {
      id: "t3",
      tenderNo: "NIT/BKP-SCH/2025/304",
      name: "Bakhtiyarpur Block Sanitation & Staffing",
      client: "Block Development Office, Bakhtiyarpur",
      department: "Urban Development & Municipal",
      assignedDept: "Tender & Accounts",
      type: "Govt. Sector",
      workOrderNo: "WO/BKP-SCH/2025/304",
      workOrderDate: "2024-12-18",
      publicationDate: "2024-10-25",
      saleDate: "2024-11-10",
      submissionDeadline: "2024-11-30",
      tenderFee: 10000,
      emdAmount: 490000,
      startDate: "2025-01-01",
      endDate: "2027-12-31",
      contractValue: 2450000,
      monthlyBilling: 142200,
      workerPayout: 82000,
      staffCount: 18,
      status: "Awarded",
      documents: ["Bakhtiyarpur_Tender_Agreement.pdf"]
    },
    {
      id: "t4",
      tenderNo: "NIT/QG-DAR/2024/045",
      name: "DIET Quila Ghat Darbhanga",
      client: "DIET Quila Ghat, Darbhanga",
      department: "Education Department",
      assignedDept: "Tender & Operations",
      type: "Govt. Sector",
      workOrderNo: "WO/QG-DAR/2024/045",
      workOrderDate: "2024-05-15",
      publicationDate: "2024-03-22",
      saleDate: "2024-04-10",
      submissionDeadline: "2024-05-02",
      tenderFee: 12000,
      emdAmount: 560000,
      startDate: "2024-06-01",
      endDate: "2027-05-31",
      contractValue: 2800000,
      monthlyBilling: 219428,
      workerPayout: 124000,
      staffCount: 14,
      status: "Awarded",
      documents: ["Work_Order_Darbhanga.pdf"]
    },
    {
      id: "t5",
      tenderNo: "NIT/AIIMS-PAT/2026/012",
      name: "AIIMS Patna Allied Security & Hospital Staff",
      client: "AIIMS Patna",
      department: "Health Department",
      assignedDept: "Tender & Compliance",
      type: "Govt. Sector",
      workOrderNo: "Pending Final Dispatch",
      workOrderDate: "2026-09-15",
      publicationDate: "2026-07-15",
      saleDate: "2026-08-01",
      submissionDeadline: "2026-08-25",
      tenderFee: 15000,
      emdAmount: 750000,
      startDate: "2026-11-01",
      endDate: "2028-10-31",
      contractValue: 5400000,
      monthlyBilling: 450000,
      workerPayout: 270000,
      staffCount: 50,
      status: "Under Evaluation",
      documents: ["Technical_Bid_AIIMS.pdf", "Bank_Guarantee_EMD.pdf"]
    }
  ],

  compliances: [
    {
      id: "c1",
      title: "PSARA Operating License (Controlling Authority, Bihar Police)",
      category: "PSARA Statutory",
      responsibleDept: "Compliance",
      responsiblePerson: "Manoj Tiwary",
      referenceNo: "PSARA/BIHAR/HQ/2024/091",
      issueDate: "2023-11-20",
      expiryDate: "2028-11-19",
      dueDate: "2028-10-19",
      status: "Compliant",
      frequency: "5-Year Renewal",
      documents: ["PSARA_Bihar_Govt_License.pdf"],
      remarks: "Authorized to operate private security agency throughout Bihar state."
    },
    {
      id: "c2",
      title: "EPF Monthly Electronic Challan cum Return (ECR Filing)",
      category: "Labour & EPF",
      responsibleDept: "Accounts",
      responsiblePerson: "Arpita Sinha",
      referenceNo: "EPFO/PATNA/1029381/ECR",
      issueDate: "2026-09-01",
      expiryDate: "2026-10-15",
      dueDate: "2026-10-15",
      status: "Compliant",
      frequency: "Monthly",
      documents: ["EPF_ECR_Receipt_Sep2026.pdf"],
      remarks: "100% matched with 31-Day Muster Roll attendance for 44 enrolled staff."
    },
    {
      id: "c3",
      title: "ESIC Monthly Contribution Return (Form 6)",
      category: "Statutory ESIC",
      responsibleDept: "Accounts",
      responsiblePerson: "Arpita Sinha",
      referenceNo: "ESIC/BIHAR/4100092837",
      issueDate: "2026-09-01",
      expiryDate: "2026-10-15",
      dueDate: "2026-10-15",
      status: "Compliant",
      frequency: "Monthly",
      documents: ["ESIC_Challan_Paid_Sep2026.pdf"],
      remarks: "ESIC contribution credited @ 3.25% employer + 0.75% employee."
    },
    {
      id: "c4",
      title: "Form XVI Register of Wages & Bihar Minimum Wage Gazetted Revision",
      category: "Labour Compliance",
      responsibleDept: "HR",
      responsiblePerson: "Pooja Sharma",
      referenceNo: "GAZETTE/BIHAR/LABOUR/2026/VDA",
      issueDate: "2026-04-01",
      expiryDate: "2026-10-31",
      dueDate: "2026-10-31",
      status: "Compliant",
      frequency: "Half-Yearly",
      documents: ["Form_XVI_Signed_Register.pdf"],
      remarks: "Updated with current VDA rate: Basic ₹10,478 for Security Guards."
    },
    {
      id: "c5",
      title: "GSTR-3B & GSTR-1 Monthly Return Filing (GSTIN: 10AAACK9988C1Z8)",
      category: "Taxation GST",
      responsibleDept: "Accounts",
      responsiblePerson: "Arpita Sinha",
      referenceNo: "GST/BIHAR/10AAACK9988C1Z8",
      issueDate: "2026-09-01",
      expiryDate: "2026-10-20",
      dueDate: "2026-10-20",
      status: "Action Required",
      frequency: "Monthly",
      documents: ["GSTR1_Draft_Oct2026.pdf"],
      remarks: "Pending treasury TDS credit confirmation from DIET Dumra invoice."
    },
    {
      id: "c6",
      title: "Labour Contract License (Form VI-A) - Bakhtiyarpur Block Site",
      category: "Site Licensing",
      responsibleDept: "Compliance",
      responsiblePerson: "Manoj Tiwary",
      referenceNo: "LC/PATNA/CL/2025/1109",
      issueDate: "2025-01-15",
      expiryDate: "2026-11-15",
      dueDate: "2026-10-30",
      status: "Expiring Soon",
      frequency: "Annual",
      documents: ["Labour_License_Bakhtiyarpur.pdf"],
      remarks: "Renewal form submitted to Deputy Labour Commissioner, Patna."
    }
  ],

  postRates: [
    {
      id: "pr1",
      postName: "Security Guard Unarmed",
      skillCategory: "Semi Skilled",
      basicVDA: 10478.00,
      esiPercent: 3.25,
      esiAmount: 340.54,
      pfPercent: 13.00,
      pfAmount: 1362.14,
      serviceChargePercent: 3.85,
      serviceChargeAmount: 403.40,
      billedAmount: 12584.08,
      kimplWorkerPayout: 6500.00,
      marginPerPerson: 6084.08
    },
    {
      id: "pr2",
      postName: "Housekeeping Staff",
      skillCategory: "Semi Skilled",
      basicVDA: 10088.00,
      esiPercent: 3.25,
      esiAmount: 327.86,
      pfPercent: 13.00,
      pfAmount: 1311.44,
      serviceChargePercent: 3.85,
      serviceChargeAmount: 388.39,
      billedAmount: 12115.69,
      kimplWorkerPayout: 6500.00,
      marginPerPerson: 5615.69
    },
    {
      id: "pr3",
      postName: "Housekeeping Supervisor",
      skillCategory: "Skilled",
      basicVDA: 12324.00,
      esiPercent: 3.25,
      esiAmount: 400.53,
      pfPercent: 13.00,
      pfAmount: 1602.12,
      serviceChargePercent: 3.85,
      serviceChargeAmount: 474.47,
      billedAmount: 14801.12,
      kimplWorkerPayout: 8500.00,
      marginPerPerson: 6301.12
    },
    {
      id: "pr4",
      postName: "Computer Operator / DEO",
      skillCategory: "Grad + Typing 30wpm",
      basicVDA: 16000.00,
      esiPercent: 0,
      esiAmount: 0,
      pfPercent: 0,
      pfAmount: 0,
      serviceChargePercent: 0,
      serviceChargeAmount: 0,
      billedAmount: 16000.00,
      kimplWorkerPayout: 11000.00,
      marginPerPerson: 5000.00
    }
  ],

  employees: [
    {
      id: "e1",
      code: "SVPL-01",
      name: "Alok Ram",
      department: "Security Operations",
      type: "Site Staff",
      tenderId: "t1",
      tenderName: "DIET Sheohar Project Tender",
      post: "Security Guard Unarmed",
      mobile: "9835123401",
      aadhaar: "4207-8899-1234",
      bankName: "State Bank of India",
      bankAcc: "30918239012",
      ifsc: "SBIN0001234",
      joiningDate: "2024-04-15",
      status: "ACTIVE",
      kimplSalary: 6500,
      policeVerification: "Verified",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
      documents: ["Aadhaar_Alok.pdf", "Police_Verification_Alok.pdf"]
    },
    {
      id: "e2",
      code: "SVPL-02",
      name: "Veena Devi",
      department: "Security Operations",
      type: "Site Staff",
      tenderId: "t1",
      tenderName: "DIET Sheohar Project Tender",
      post: "Security Guard Unarmed",
      mobile: "9835123402",
      aadhaar: "4207-8899-5678",
      bankName: "Punjab National Bank",
      bankAcc: "12903841029",
      ifsc: "PUNB0123400",
      joiningDate: "2024-04-15",
      status: "ACTIVE",
      kimplSalary: 6500,
      policeVerification: "Verified",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
      documents: ["Aadhaar_Veena.pdf", "Police_Clearance.pdf"]
    },
    {
      id: "e3",
      code: "SVPL-03",
      name: "Chunnu Kumar",
      department: "Security Operations",
      type: "Site Staff",
      tenderId: "t1",
      tenderName: "DIET Sheohar Project Tender",
      post: "Security Guard Unarmed",
      mobile: "9835123403",
      aadhaar: "4207-8899-9012",
      bankName: "Bank of Baroda",
      bankAcc: "91028374619",
      ifsc: "BARB0SHEOHAR",
      joiningDate: "2024-04-15",
      status: "ACTIVE",
      kimplSalary: 6500,
      policeVerification: "Verified",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      documents: ["Aadhaar_Chunnu.pdf"]
    },
    {
      id: "e4",
      code: "SVPL-04",
      name: "Dharmveer Kumar",
      department: "Sanitation & Field",
      type: "Site Staff",
      tenderId: "t3",
      tenderName: "Bakhtiyarpur Block Sanitation",
      post: "Bikers / Field Staff",
      mobile: "7277828697",
      aadhaar: "4207-1122-3344",
      bankName: "Central Bank of India",
      bankAcc: "1029384756",
      ifsc: "CBIN0281234",
      joiningDate: "2024-07-15",
      status: "ACTIVE",
      kimplSalary: 7500,
      policeVerification: "Verified",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80",
      documents: ["Aadhaar_Dharmveer.pdf"]
    },
    {
      id: "e5",
      code: "SVPL-05",
      name: "Manish Kumar",
      department: "Sanitation & Field",
      type: "Site Staff",
      tenderId: "t3",
      tenderName: "Bakhtiyarpur Block Sanitation",
      post: "Sanitation Staff",
      mobile: "9241275538",
      aadhaar: "4207-5566-7788",
      bankName: "State Bank of India",
      bankAcc: "9018273645",
      ifsc: "SBIN0004567",
      joiningDate: "2024-07-15",
      status: "ACTIVE",
      kimplSalary: 6500,
      policeVerification: "Verified",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
      documents: ["Aadhaar_Manish.pdf"]
    },
    {
      id: "e6",
      code: "SVPL-06",
      name: "Rameshwar Paswan",
      department: "Security Operations",
      type: "Site Staff",
      tenderId: "t2",
      tenderName: "DIET Dumra Sitamarhi",
      post: "Security Guard Unarmed",
      mobile: "9835123406",
      aadhaar: "4207-9900-1122",
      bankName: "State Bank of India",
      bankAcc: "20192837465",
      ifsc: "SBIN0003412",
      joiningDate: "2024-04-01",
      status: "ACTIVE",
      kimplSalary: 6500,
      policeVerification: "Verified",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
      documents: ["Aadhaar_Rameshwar.pdf"]
    }
  ],

  invoices: [
    {
      id: "inv1",
      no: "SVPL/2026-27/001",
      client: "DIET Sheohar College",
      department: "Education Department",
      month: "August",
      year: 2026,
      date: "2026-09-02",
      totalStaff: 6,
      taxableAmount: 63986.85,
      gstRate: 18,
      gstAmount: 11517.63,
      grandTotal: 75504.48,
      status: "Paid",
      paymentRef: "TR-SBIN-892182 (Treasury NEFT)",
      paidOn: "2026-09-28"
    },
    {
      id: "inv2",
      no: "SVPL/2026-27/002",
      client: "DIET Sheohar College",
      department: "Education Department",
      month: "September",
      year: 2026,
      date: "2026-10-02",
      totalStaff: 6,
      taxableAmount: 63986.85,
      gstRate: 18,
      gstAmount: 11517.63,
      grandTotal: 75504.48,
      status: "Pending",
      paymentRef: "Awaiting Treasury Sanction",
      paidOn: null
    },
    {
      id: "inv3",
      no: "SVPL/2026-27/003",
      client: "DIET Quila Ghat Darbhanga",
      department: "Education Department",
      month: "September",
      year: 2026,
      date: "2026-10-03",
      totalStaff: 14,
      taxableAmount: 185955.93,
      gstRate: 18,
      gstAmount: 33472.07,
      grandTotal: 219428.00,
      status: "Pending",
      paymentRef: "Dossier under audit verification",
      paidOn: null
    },
    {
      id: "inv4",
      no: "SVPL/2026-27/004",
      client: "Block Development Office, Bakhtiyarpur",
      department: "Urban Development & Municipal",
      month: "September",
      year: 2026,
      date: "2026-10-03",
      totalStaff: 18,
      taxableAmount: 142200.00,
      gstRate: 0,
      gstAmount: 0.00,
      grandTotal: 142200.00,
      status: "Partially Paid",
      paymentRef: "CHQ-890123 (Part)",
      paidOn: "2026-10-08"
    }
  ],

  ledger: [
    {
      id: "l1",
      client: "DIET Sheohar College",
      billNo: "SVPL/2026-27/001",
      period: "August 2026",
      billed: 75504.48,
      rec: 75504.48,
      due: 0.00,
      status: "Cleared"
    },
    {
      id: "l2",
      client: "DIET Sheohar College",
      billNo: "SVPL/2026-27/002",
      period: "September 2026",
      billed: 75504.48,
      rec: 0.00,
      due: 75504.48,
      status: "Due"
    },
    {
      id: "l3",
      client: "DIET Quila Ghat Darbhanga",
      billNo: "SVPL/2026-27/003",
      period: "September 2026",
      billed: 219428.00,
      rec: 0.00,
      due: 219428.00,
      status: "Due"
    },
    {
      id: "l4",
      client: "Bakhtiyarpur Block Sanitation",
      billNo: "SVPL/2026-27/004",
      period: "September 2026",
      billed: 142200.00,
      rec: 80000.00,
      due: 62200.00,
      status: "Due"
    }
  ],

  accounts: {
    incomeRecords: [
      { id: "inc1", date: "2026-09-28", client: "DIET Sheohar College", amount: 75504.48, category: "Treasury Direct NEFT", mode: "Bank NEFT", txnRef: "TR-SBIN-892182", projectId: "p1" },
      { id: "inc2", date: "2026-10-08", client: "Block Development Office, Bakhtiyarpur", amount: 80000.00, category: "Municipal Sanitation Grant", mode: "Cheque", txnRef: "CHQ-890123", projectId: "p3" },
      { id: "inc3", date: "2026-09-15", client: "Blueimpulse Auto Pvt Ltd", amount: 54000.00, category: "Commercial Security Services", mode: "IMPS", txnRef: "IMPS-9021829", projectId: "p2" }
    ],
    expenseRecords: [
      { id: "exp1", date: "2026-10-10", category: "Staff Salaries & Payout", amount: 247000.00, paidTo: "44 Deployed Field Staff", projectId: "p1", status: "Approved" },
      { id: "exp2", date: "2026-10-05", category: "Uniforms & Tactical Badges", amount: 28500.00, paidTo: "Patna Garments & Uniforms", projectId: "p3", status: "Approved" },
      { id: "exp3", date: "2026-10-04", category: "Biometric Hardware & 4G SIM Data", amount: 14200.00, paidTo: "ZKTeco Bihar Distributor", projectId: "p1", status: "Approved" },
      { id: "exp4", date: "2026-09-30", category: "Vehicle Fuel & Route Inspection", amount: 18900.00, paidTo: "Operations GM Rahul Kumar", projectId: "p3", status: "Approved" },
      { id: "exp5", date: "2026-09-25", category: "Statutory EPF & ESIC Filing Admin Fee", amount: 12400.00, paidTo: "EPFO Portal & ESIC", projectId: "p2", status: "Approved" }
    ],
    projectExpenditures: [
      { projectId: "p1", projectName: "DIET Sheohar Campus Security", totalBilled: 151008.96, totalCollected: 75504.48, totalCost: 78000.00, netMargin: 73008.96, marginPct: 48.3 },
      { projectId: "p2", projectName: "DIET Dumra Security & Housekeeping", totalBilled: 1200000.00, totalCollected: 980000.00, totalCost: 620000.00, netMargin: 580000.00, marginPct: 48.3 },
      { projectId: "p3", projectName: "Bakhtiyarpur Block Sanitation", totalBilled: 142200.00, totalCollected: 80000.00, totalCost: 82000.00, netMargin: 60200.00, marginPct: 42.3 },
      { projectId: "p4", projectName: "DIET Quila Ghat Darbhanga", totalBilled: 219428.00, totalCollected: 0.00, totalCost: 124000.00, netMargin: 95428.00, marginPct: 43.5 }
    ]
  },

  tickets: [
    {
      id: "TICK-101",
      subject: "Biometric eSSL device offline at DIET Dumra Main Gate",
      description: "Machine is not pushing punch logs to the cloud webhook since 08:30 AM. Network cable checked.",
      priority: "High",
      department: "Operations",
      assignedTo: "Rahul Kumar",
      assignedEmpId: "u2",
      status: "In Progress",
      createdAt: "2026-10-14 09:15",
      comments: [
        { author: "Ramesh Singh (Supervisor)", time: "09:15 AM", text: "Device screen is blinking. Power cycle performed." },
        { author: "Rahul Kumar (GM)", time: "09:40 AM", text: "Checked SIM data plan; rebooting cloud daemon now." }
      ]
    },
    {
      id: "TICK-102",
      subject: "Overtime hour dispute for Guard Chunnu Kumar (Oct Muster)",
      description: "Chunnu Kumar completed 8 extra night shift hours on Oct 11, which is missing in provisional payroll slip.",
      priority: "Medium",
      department: "HR",
      assignedTo: "Pooja Sharma",
      assignedEmpId: "u3",
      status: "Open",
      createdAt: "2026-10-13 14:30",
      comments: [
        { author: "Pooja Sharma (HR)", time: "02:45 PM", text: "Cross-verifying night patrol gate ledger with supervisor." }
      ]
    },
    {
      id: "TICK-103",
      subject: "Treasury TDS Certificate Form 16A needed for DIET Dumra Bill",
      description: "District treasury deducted 2% TDS on last voucher. Need signed Form 16A for reconciliation.",
      priority: "Urgent",
      department: "Accounts",
      assignedTo: "Arpita Sinha",
      assignedEmpId: "u4",
      status: "Resolved",
      createdAt: "2026-10-12 11:20",
      comments: [
        { author: "Arpita Sinha (Accounts)", time: "04:10 PM", text: "Voucher #892182 matched on TRACES portal. Certificate downloaded and attached to client folder." }
      ]
    },
    {
      id: "TICK-104",
      subject: "Uniforms and baton replenishment request for Bakhtiyarpur",
      description: "Need 6 additional high-visibility safety jackets and boots for night field sanitation staff.",
      priority: "Low",
      department: "Operations",
      assignedTo: "Rahul Kumar",
      assignedEmpId: "u2",
      status: "Open",
      createdAt: "2026-10-11 16:00",
      comments: []
    }
  ]
};

module.exports = mockData;
