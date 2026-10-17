import { Complaint, Notice, Department, StaffMember, AuditLogEntry, CivicService, ComplaintStatus } from '../types';

export const PCMC_LOCALITIES = [
  { name: 'Wakad', ward: 'Ward D' },
  { name: 'Pimple Saudagar', ward: 'Ward D' },
  { name: 'Pimple Nilakh', ward: 'Ward D' },
  { name: 'Pimple Gurav', ward: 'Ward D' },
  { name: 'Chinchwad', ward: 'Ward B' },
  { name: 'Ravet', ward: 'Ward B' },
  { name: 'Kiwale', ward: 'Ward B' },
  { name: 'Pimpri', ward: 'Ward G' },
  { name: 'Rahatani', ward: 'Ward G' },
  { name: 'Bhosari', ward: 'Ward C' },
  { name: 'Indrayani Nagar', ward: 'Ward C' },
  { name: 'Akurdi', ward: 'Ward A' },
  { name: 'Nigdi Pradhikaran', ward: 'Ward A' },
  { name: 'Yamunanagar', ward: 'Ward A' },
  { name: 'Sangvi', ward: 'Ward H' },
  { name: 'Dapodi', ward: 'Ward H' },
  { name: 'Moshi', ward: 'Ward F' },
  { name: 'Chikhali', ward: 'Ward F' },
  { name: 'Dighi', ward: 'Ward E' },
  { name: 'Bopkhel', ward: 'Ward E' },
  { name: 'Charholi', ward: 'Ward E' },
  { name: 'Tathawade', ward: 'Ward D' },
  { name: 'Punawale', ward: 'Ward D' },
];

export const INITIAL_DEPARTMENTS: Department[] = [
  {
    id: 'dept_pwd',
    code: 'PWD',
    name: {
      en: 'Road Maintenance & PWD',
      mr: 'सार्वजनिक बांधकाम व रस्ते विभाग',
      hi: 'सड़क रखरखाव एवं लोक निर्माण विभाग'
    },
    headOfficer: 'Er. Rajesh Patil',
    contactNumber: '020-27425555',
    activeStaffCount: 42,
    openCasesCount: 14
  },
  {
    id: 'dept_health',
    code: 'HEALTH',
    name: {
      en: 'Health, Sanitation & Solid Waste',
      mr: 'आरोग्य व घनकचरा व्यवस्थापन विभाग',
      hi: 'स्वास्थ्य, स्वच्छता एवं ठोस अपशिष्ट प्रबंधन'
    },
    headOfficer: 'Dr. Sunita Kadam',
    contactNumber: '020-27425556',
    activeStaffCount: 68,
    openCasesCount: 19
  },
  {
    id: 'dept_water',
    code: 'WATER',
    name: {
      en: 'Water Supply & Drainage',
      mr: 'पाणी पुरवठा व मलनिस्सारण विभाग',
      hi: 'जल आपूर्ति एवं जल निकासी विभाग'
    },
    headOfficer: 'Er. Amit Deshmukh',
    contactNumber: '020-27425557',
    activeStaffCount: 35,
    openCasesCount: 8
  },
  {
    id: 'dept_elec',
    code: 'ELEC',
    name: {
      en: 'Electrical & Street Lighting',
      mr: 'विद्युत व पथदिवे विभाग',
      hi: 'विद्युत एवं स्ट्रीट लाइट विभाग'
    },
    headOfficer: 'Er. Sachin Shinde',
    contactNumber: '020-27425558',
    activeStaffCount: 28,
    openCasesCount: 5
  },
  {
    id: 'dept_encroach',
    code: 'ENCROACH',
    name: {
      en: 'Anti-Encroachment & Town Planning',
      mr: 'अतिक्रमण नियंत्रण व नगररचना विभाग',
      hi: 'अतिक्रमण निरोधक एवं नगर योजना'
    },
    headOfficer: 'Vinod Gaikwad',
    contactNumber: '020-27425559',
    activeStaffCount: 18,
    openCasesCount: 7
  },
  {
    id: 'dept_vet',
    code: 'VET',
    name: {
      en: 'Veterinary & Stray Animal Control',
      mr: 'पशुवैद्यकीय व भटके प्राणी नियंत्रण विभाग',
      hi: 'पशु चिकित्सा एवं आवारा पशु नियंत्रण'
    },
    headOfficer: 'Dr. Rahul Mane',
    contactNumber: '020-27425560',
    activeStaffCount: 14,
    openCasesCount: 4
  }
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'staff_1',
    name: 'Er. Rajesh Patil',
    role: 'Executive Engineer',
    departmentCode: 'PWD',
    ward: 'Ward D',
    phone: '+91 98220 11223',
    email: 'r.patil@pcmcindia.demo',
    activeCases: 4
  },
  {
    id: 'staff_2',
    name: 'Dr. Sunita Kadam',
    role: 'Chief Sanitation Officer',
    departmentCode: 'HEALTH',
    ward: 'Ward A',
    phone: '+91 98220 33445',
    email: 's.kadam@pcmcindia.demo',
    activeCases: 6
  },
  {
    id: 'staff_3',
    name: 'Er. Amit Deshmukh',
    role: 'Water Works Engineer',
    departmentCode: 'WATER',
    ward: 'Ward B',
    phone: '+91 98220 55667',
    email: 'a.deshmukh@pcmcindia.demo',
    activeCases: 3
  },
  {
    id: 'staff_4',
    name: 'Er. Sachin Shinde',
    role: 'Junior Engineer (Electrical)',
    departmentCode: 'ELEC',
    ward: 'Ward C',
    phone: '+91 98220 77889',
    email: 's.shinde@pcmcindia.demo',
    activeCases: 2
  },
  {
    id: 'staff_5',
    name: 'Vinod Gaikwad',
    role: 'Encroachment Inspector',
    departmentCode: 'ENCROACH',
    ward: 'Ward G',
    phone: '+91 98220 99001',
    email: 'v.gaikwad@pcmcindia.demo',
    activeCases: 5
  },
  {
    id: 'staff_6',
    name: 'Priya More',
    role: 'Ward Officer',
    departmentCode: 'PWD',
    ward: 'Ward D',
    phone: '+91 98220 12345',
    email: 'p.more@pcmcindia.demo',
    activeCases: 8
  }
];

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'PCMC-2026-8491',
    title: 'Severe pothole crater near Wakad flyover service road',
    description: 'A deep pothole has formed near the Wakad flyover descending ramp towards Hinjawadi. It causes severe two-wheeler skidding during peak evening traffic hours.',
    category: 'potholes',
    locality: 'Wakad',
    ward: 'Ward D',
    landmark: 'Under Wakad Flyover, near Datta Mandir road',
    coordinates: {
      lat: 18.5987,
      lng: 73.7684,
      addressString: 'Datta Mandir Road, Wakad, Pimpri-Chinchwad 411057'
    },
    photoUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
    citizenName: 'Rahul Shinde',
    citizenPhone: '9890123456',
    citizenEmail: 'rahul.shinde.demo@gmail.com',
    status: 'In Progress',
    priority: 'Urgent',
    assignedDepartment: 'Road Maintenance & PWD',
    assignedStaffId: 'staff_1',
    assignedStaffName: 'Er. Rajesh Patil',
    internalNotes: [
      'Site visited by Junior Engineer. Asphalt patch mix work scheduled for tonight 11 PM to minimize traffic diversion.',
      'Materials dispatch confirmed from Nigdi central hotmix plant.'
    ],
    publicResolutionNotes: 'Road patch team has been dispatched. Resurfacing work is scheduled tonight.',
    timeline: [
      {
        id: 'tl_1',
        status: 'Submitted',
        timestamp: '2026-10-15 08:30 AM',
        updatedBy: 'Citizen Rahul Shinde',
        notes: 'Complaint submitted via PCMC Citizen Connect Web App.'
      },
      {
        id: 'tl_2',
        status: 'Assigned',
        timestamp: '2026-10-15 10:15 AM',
        updatedBy: 'Admin Dispatcher',
        notes: 'Assigned to Road Maintenance & PWD (Ward D) under Er. Rajesh Patil.'
      },
      {
        id: 'tl_3',
        status: 'In Progress',
        timestamp: '2026-10-16 02:45 PM',
        updatedBy: 'Er. Rajesh Patil',
        notes: 'Inspection completed. Work order issued to field asphalt repair crew.'
      }
    ],
    createdAt: '2026-10-15 08:30 AM',
    updatedAt: '2026-10-16 02:45 PM'
  },
  {
    id: 'PCMC-2026-8492',
    title: 'Overflowing garbage bin and stray dogs near Akurdi station market',
    description: 'Community garbage container has not been cleared for 2 days. Garbage is spilling onto the pedestrian walkway creating foul smell and hygiene hazard near the vegetable market.',
    category: 'garbage',
    locality: 'Akurdi',
    ward: 'Ward A',
    landmark: 'Opposite Akurdi Sub-Post Office & Vegetable Market',
    coordinates: {
      lat: 18.6492,
      lng: 73.7707,
      addressString: 'Railway Station Road, Akurdi, Pimpri-Chinchwad 411035'
    },
    photoUrl: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=600&q=80',
    citizenName: 'Sneha Deshmukh',
    citizenPhone: '9881234567',
    status: 'Assigned',
    priority: 'High',
    assignedDepartment: 'Health, Sanitation & Solid Waste',
    assignedStaffId: 'staff_2',
    assignedStaffName: 'Dr. Sunita Kadam',
    internalNotes: [
      'Compactor truck #MH-14-CW-2041 diverted to clear this container bin on priority.'
    ],
    timeline: [
      {
        id: 'tl_21',
        status: 'Submitted',
        timestamp: '2026-10-16 09:10 AM',
        updatedBy: 'Citizen Sneha Deshmukh',
        notes: 'Complaint submitted with photo attachment.'
      },
      {
        id: 'tl_22',
        status: 'Assigned',
        timestamp: '2026-10-16 11:00 AM',
        updatedBy: 'Ward A Sanitation Supervisor',
        notes: 'Assigned to Ward A sanitation inspector and sanitary squad.'
      }
    ],
    createdAt: '2026-10-16 09:10 AM',
    updatedAt: '2026-10-16 11:00 AM'
  },
  {
    id: 'PCMC-2026-8493',
    title: 'Low pressure and turbid water supply in Kunal Icon Road area',
    description: 'For the past two mornings, morning water supply pressure is extremely low, and water received is muddy. Over 4 housing societies are facing shortages.',
    category: 'water_leakage',
    locality: 'Pimple Saudagar',
    ward: 'Ward D',
    landmark: 'Near Kunal Icon Society, Pimple Saudagar',
    coordinates: {
      lat: 18.5982,
      lng: 73.7937,
      addressString: 'Kunal Icon Road, Pimple Saudagar, Pimpri-Chinchwad 411027'
    },
    citizenName: 'Vikram Joshi',
    citizenPhone: '9822987654',
    status: 'Submitted',
    priority: 'Medium',
    internalNotes: [],
    timeline: [
      {
        id: 'tl_31',
        status: 'Submitted',
        timestamp: '2026-10-17 07:15 AM',
        updatedBy: 'Citizen Vikram Joshi',
        notes: 'Grievance registered. Awaiting departmental assignment.'
      }
    ],
    createdAt: '2026-10-17 07:15 AM',
    updatedAt: '2026-10-17 07:15 AM'
  },
  {
    id: 'PCMC-2026-8494',
    title: 'Streetlights out along Spine Road Bhosari MIDC stretch',
    description: 'Series of 8 LED streetlights are completely off between Century Enka and Spine Road circle. Road is pitch dark and dangerous for evening two-wheeler commuters.',
    category: 'streetlights',
    locality: 'Bhosari',
    ward: 'Ward C',
    landmark: 'Spine Road, near Sector 7 junction, Bhosari',
    coordinates: {
      lat: 18.6276,
      lng: 73.8427,
      addressString: 'Spine Road, MIDC Bhosari, Pimpri-Chinchwad 411026'
    },
    photoUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80',
    citizenName: 'Amit Gokhale',
    citizenPhone: '9765432109',
    status: 'Resolved',
    priority: 'Medium',
    assignedDepartment: 'Electrical & Street Lighting',
    assignedStaffId: 'staff_4',
    assignedStaffName: 'Er. Sachin Shinde',
    internalNotes: [
      'Feeder pillar circuit breaker tripped due to cable moisture. Replaced MCB unit and verified all 8 lamps burning normal.'
    ],
    publicResolutionNotes: 'Electrical team repaired the faulty MCB junction box on Spine Road. All streetlights have been tested and restored.',
    feedback: {
      rating: 5,
      comment: 'Very fast resolution! The streetlights were fixed within 24 hours. Excellent work by PCMC electrical team.',
      submittedAt: '2026-10-16 08:30 PM'
    },
    timeline: [
      {
        id: 'tl_41',
        status: 'Submitted',
        timestamp: '2026-10-14 07:00 PM',
        updatedBy: 'Citizen Amit Gokhale',
        notes: 'Submitted via PCMC Web Portal.'
      },
      {
        id: 'tl_42',
        status: 'Assigned',
        timestamp: '2026-10-15 09:30 AM',
        updatedBy: 'Electrical Control Room',
        notes: 'Forwarded to Junior Engineer Er. Sachin Shinde.'
      },
      {
        id: 'tl_43',
        status: 'In Progress',
        timestamp: '2026-10-15 02:00 PM',
        updatedBy: 'Er. Sachin Shinde',
        notes: 'Technician van dispatched with replacement fixtures and test equipment.'
      },
      {
        id: 'tl_44',
        status: 'Resolved',
        timestamp: '2026-10-16 11:30 AM',
        updatedBy: 'Er. Sachin Shinde',
        notes: 'Circuit repaired and street illumination restored.'
      }
    ],
    createdAt: '2026-10-14 07:00 PM',
    updatedAt: '2026-10-16 11:30 AM'
  },
  {
    id: 'PCMC-2026-8495',
    title: 'Choked storm water drain causing water-logging at Chinchwad Station underpass',
    description: 'Plastic bags and debris have blocked the storm drain grates at the railway underpass. Even light showers result in 1 foot water stagnation.',
    category: 'drainage',
    locality: 'Chinchwad',
    ward: 'Ward B',
    landmark: 'Chinchwad Railway Station Subway, Mohan Nagar side',
    coordinates: {
      lat: 18.6322,
      lng: 73.7915,
      addressString: 'Station Road, Chinchwad, Pimpri-Chinchwad 411019'
    },
    citizenName: 'Mahesh Kulkarni',
    citizenPhone: '9860123789',
    status: 'In Progress',
    priority: 'High',
    assignedDepartment: 'Water Supply & Drainage',
    assignedStaffId: 'staff_3',
    assignedStaffName: 'Er. Amit Deshmukh',
    internalNotes: [
      'Suction-cum-jetting machine deployed to clear heavy silt and plastic blockage.'
    ],
    publicResolutionNotes: 'Jetting machine deployed on site to flush drainage lines.',
    timeline: [
      {
        id: 'tl_51',
        status: 'Submitted',
        timestamp: '2026-10-16 04:20 PM',
        updatedBy: 'Citizen Mahesh Kulkarni',
        notes: 'Complaint registered.'
      },
      {
        id: 'tl_52',
        status: 'Assigned',
        timestamp: '2026-10-16 05:00 PM',
        updatedBy: 'Drainage Control Room',
        notes: 'Assigned to Ward B Drainage maintenance division.'
      },
      {
        id: 'tl_53',
        status: 'In Progress',
        timestamp: '2026-10-17 08:30 AM',
        updatedBy: 'Er. Amit Deshmukh',
        notes: 'Jetting team currently operating on subway drainage grates.'
      }
    ],
    createdAt: '2026-10-16 04:20 PM',
    updatedAt: '2026-10-17 08:30 AM'
  },
  {
    id: 'PCMC-2026-8496',
    title: 'Stray cattle causing traffic obstruction on Ravet BRTS corridor',
    description: 'A herd of stray cattle is resting on the active BRTS bus lane near D.Y. Patil College junction, creating sudden braking risks for public buses.',
    category: 'stray_animals',
    locality: 'Ravet',
    ward: 'Ward B',
    landmark: 'Near D.Y. Patil College, BRTS bus stop, Ravet',
    coordinates: {
      lat: 18.6473,
      lng: 73.7438,
      addressString: 'BRTS Road, Ravet, Pimpri-Chinchwad 412101'
    },
    citizenName: 'Pooja Gaikwad',
    citizenPhone: '9422019283',
    status: 'Assigned',
    priority: 'Medium',
    assignedDepartment: 'Veterinary & Stray Animal Control',
    assignedStaffId: 'staff_6',
    assignedStaffName: 'Dr. Rahul Mane',
    internalNotes: ['Animal rescue cattle squad van notified for relocation to Bhosari Gaushala.'],
    timeline: [
      {
        id: 'tl_61',
        status: 'Submitted',
        timestamp: '2026-10-17 06:45 AM',
        updatedBy: 'Citizen Pooja Gaikwad',
        notes: 'Submitted via citizen app.'
      },
      {
        id: 'tl_62',
        status: 'Assigned',
        timestamp: '2026-10-17 08:00 AM',
        updatedBy: 'Animal Husbandry Cell',
        notes: 'Cattle impounding vehicle scheduled for round.'
      }
    ],
    createdAt: '2026-10-17 06:45 AM',
    updatedAt: '2026-10-17 08:00 AM'
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'NOT-2026-101',
    title: {
      en: '24-Hour Water Shutdown Notice for Maintenance at Ravet Pumping Station',
      mr: 'रावेत जलउपसा केंद्राच्या दुरुस्ती कामासाठी २४ तास पाणीपुरवठा बंदची नोटीस',
      hi: 'रावेत जल पंपिंग स्टेशन के रखरखाव के लिए 24 घंटे जलापूर्ति बंद की सूचना'
    },
    content: {
      en: 'Water supply to Pimpri, Chinchwad, Bhosari, Akurdi, and Wakad will remain shut on Thursday for electrical maintenance and pipeline interconnection at Ravet Raw Water Pumping Station. Water supply will resume with low pressure on Friday morning. Citizens are requested to store adequate water.',
      mr: 'रावेत येथील अशुद्ध जलउपसा केंद्रातील विद्युत व जलवाहिनी दुरुस्तीच्या तातडीच्या कामासाठी गुरुवार रोजी पिंपरी, चिंचवड, भोसरी, आकुर्डी आणि वाकड भागातील पाणीपुरवठा दिवसभर बंद राहील. शुक्रवारी सकाळी कमी दाबाने पाणीपुरवठा सुरळीत होईल. नागरिकांनी पाण्याचा योग्य साठा करावा ही विनंती.',
      hi: 'रावेत रॉ वाटर पंपिंग स्टेशन पर आवश्यक मरम्मत कार्य के कारण गुरुवार को पिंपरी, चिंचवड, भोसरी और वाकड क्षेत्रों में पानी की आपूर्ति बंद रहेगी। शुक्रवार सुबह धीमी गति से आपूर्ति शुरू होगी। कृपया जल का पर्याप्त संचय करें।'
    },
    category: 'water',
    publishedDate: '2026-10-16',
    isUrgent: true,
    status: 'published',
    author: 'Chief Engineer (Water Supply), PCMC'
  },
  {
    id: 'NOT-2026-102',
    title: {
      en: 'Special 10% Early Bird Rebate on PCMC Property Tax for 2026-27',
      mr: 'सन २०२६-२७ च्या मालमत्ता करावर आगाऊ भरणाऱ्यांना १०% विशेष सवलत',
      hi: 'वित्तीय वर्ष 2026-27 के लिए पीसीएमसी संपत्ति कर पर 10% अग्रिम छूट'
    },
    content: {
      en: 'Citizens paying their full annual Property Tax online via the PCMC portal before May 31 are eligible for an attractive 10% concession on general tax component. Use the Demo Property Tax calculator on this portal to compute your rebate.',
      mr: 'पिंपरी-चिंचवड महानगरपालिकेचा वार्षिक मालमत्ता कर ३१ मे पूर्वी ऑनलाइन भरणाऱ्या सजग नागरिकांना सामान्य करात १०% विशेष सवलत दिली जात आहे. आपले देयक तपासण्यासाठी या पोर्टलवरील डेमो मालमत्ता कर गणक वापरा.',
      hi: '31 मई से पहले अपना पूरा वार्षिक संपत्ति कर ऑनलाइन भुगतान करने वाले नागरिकों को सामान्य कर में 10% की विशेष छूट दी जाएगी। छूट की गणना के लिए पोर्टल के डेमो कैलकुलेटर का उपयोग करें।'
    },
    category: 'civic',
    publishedDate: '2026-10-14',
    isUrgent: false,
    status: 'published',
    author: 'Property Tax Assessment Officer, PCMC'
  },
  {
    id: 'NOT-2026-103',
    title: {
      en: 'Swachh Survekshan 2026: Segregation of Wet & Dry Waste Made Mandatory',
      mr: 'स्वच्छ सर्वेक्षण २०२६: ओला व सुका कचरा १००% विलगीकरण सक्तीचे',
      hi: 'स्वच्छ सर्वेक्षण 2026: गीला और सूखा कचरा 100% पृथक्करण अनिवार्य'
    },
    content: {
      en: 'All housing societies, commercial establishments, and individual households must segregate waste into Green (Wet/Organic), Blue (Dry/Recyclable), and Red (Hazardous) bins before handing over to Ghanta Gadi. Non-compliance may attract spot fines under Maharashtra Municipal Corporation Act.',
      mr: 'पिंपरी-चिंचवड शहरातील सर्व गृहनिर्माण सोसायट्या व व्यावसायिक आस्थापनांनी कचऱ्याचे ओला (हिरवी कुंडी) व सुका (निळी कुंडी) वर्गीकरण करूनच घंटा गाडी कर्मचाऱ्यांकडे देणे बंधनकारक आहे. कचरा न विलग केल्यास दंडात्मक कारवाई होऊ शकते.',
      hi: 'सभी हाउसिंग सोसायटियों और प्रतिष्ठानों को कचरे को गीला और सूखा अलग करके ही निगम के स्वच्छता वाहनों को देना अनिवार्य है।'
    },
    category: 'health',
    publishedDate: '2026-10-12',
    isUrgent: false,
    status: 'published',
    author: 'Health & Sanitation Department, PCMC'
  },
  {
    id: 'NOT-2026-104',
    title: {
      en: 'Pre-Winter Mosquito Fogging & Dengue Prevention Campaign',
      mr: 'डास प्रतिबंधक धुरळणी व डेंग्यू निर्मूलन विशेष मोहीम',
      hi: 'मच्छर रोधी फॉगिंग और डेंगू रोकथाम अभियान'
    },
    content: {
      en: 'PCMC Health department has launched intensive insecticide spraying and thermal fogging across all 32 Prabhags. Citizens are advised to prevent water stagnation in coolers, terrace plant pots, and discarded tyres.',
      mr: 'पिंपरी-चिंचवड महानगरपालिका आरोग्य विभागातर्फे सर्व ३२ प्रभागांमध्ये डास प्रतिबंधक धुरळणी व कीटकनाशक फवारणी मोहीम युद्धपातळीवर सुरू आहे. घराच्या छतावर किंवा कुंडीत पाणी साचू देऊ नये.',
      hi: 'पीसीएमसी स्वास्थ्य विभाग द्वारा सभी वार्डों में कीटनाशक छिड़काव और फॉगिंग अभियान शुरू किया गया है।'
    },
    category: 'health',
    publishedDate: '2026-10-10',
    isUrgent: false,
    status: 'published',
    author: 'Medical Officer of Health, PCMC'
  }
];

export const CIVIC_SERVICES: CivicService[] = [
  {
    id: 'srv_prop_tax',
    title: {
      en: 'Property Tax (मालमत्ता कर)',
      mr: 'मालमत्ता कर भरणा व मूल्यांकन',
      hi: 'संपत्ति कर भुगतान व मूल्यांकन'
    },
    description: {
      en: 'View bill dues, calculate seasonal rebates, simulate online receipt download, and update property ownership records.',
      mr: 'मालमत्ता कर आकारणी, ऑनलाइन देयक पाहणे, सवलत गणक आणि पावती डाउनलोड डेमो.',
      hi: 'संपत्ति कर बिल देखें, छूट की गणना करें और रसीद डाउनलोड करें।'
    },
    category: 'tax',
    icon: 'Building2',
    processingTime: 'Instant / Same Day',
    fees: 'Based on Annual Rateable Value (ARV)',
    requiredDocuments: ['Property Index-II', 'Previous Year Receipt', 'Electricity Bill'],
    isDemoInteractive: true
  },
  {
    id: 'srv_water_conn',
    title: {
      en: 'New Water Connection & Metering',
      mr: 'नवीन नळ जोडणी व मीटर तक्रार',
      hi: 'नया जल कनेक्शन व मीटरिंग'
    },
    description: {
      en: 'Apply for residential or commercial tap connection, request meter inspection, and simulate tariff estimates.',
      mr: 'घरगुती अथवा व्यावसायिक नवीन नळ जोडणी अर्ज, मीटर तपासणी व अंदाजित दर.',
      hi: 'नए नल कनेक्शन के लिए आवेदन और मीटर निरीक्षण का अनुरोध।'
    },
    category: 'water',
    icon: 'Droplets',
    processingTime: '7 to 15 Working Days',
    fees: '₹1,500 - ₹4,500 based on pipe diameter',
    requiredDocuments: ['Sanctioned Building Plan', 'Property Tax NOC', 'Ownership Proof'],
    isDemoInteractive: true
  },
  {
    id: 'srv_birth_cert',
    title: {
      en: 'Birth & Death Certificates',
      mr: 'जन्म व मृत्यू प्रमाणपत्र',
      hi: 'जन्म एवं मृत्यु प्रमाण पत्र'
    },
    description: {
      en: 'Search institutional births in PCMC hospitals (YCM Hospital, Jijamata Hospital, etc.) and check certificate issuance status.',
      mr: 'वायसीएम हॉस्पिटल व मनपा रुग्णालयातील जन्म नोंद शोध, पडताळणी व प्रमाणपत्र स्थिती तपासणी.',
      hi: 'पीसीएमसी अस्पतालों में जन्म पंजीकरण खोजें और प्रमाण पत्र की स्थिति जांचें।'
    },
    category: 'certificates',
    icon: 'FileText',
    processingTime: '3 to 5 Working Days',
    fees: '₹20 per certified copy (Government Fee)',
    requiredDocuments: ['Hospital Discharge Card / Record', 'Parents Aadhaar Demo Copy', 'Address Proof'],
    isDemoInteractive: true
  },
  {
    id: 'srv_waste_pickup',
    title: {
      en: 'Bulk Garden & Construction Debris Pickup',
      mr: 'मोठ्या कचऱ्याची विशेष विल्हेवाट (बल्क वेस्ट)',
      hi: 'थोक कचरा व मलबा उठाव सेवा'
    },
    description: {
      en: 'Schedule special municipal pickup for tree prunings, garden waste, electronic scrap, and minor renovation debris.',
      mr: 'झाडांच्या छाटलेल्या फांद्या, फर्निचर किंवा घराच्या दुरुस्तीच्या राडारोड्यासाठी विशेष मनपा गाडी बुकिंग.',
      hi: 'पेड़ों की छंटाई, ई-कचरा और मरम्मत के मलबे के लिए विशेष नगर निगम वाहन बुक करें।'
    },
    category: 'sanitation',
    icon: 'Trash2',
    processingTime: '24 to 48 Hours',
    fees: '₹250 - ₹1,000 depending on volume',
    requiredDocuments: ['Locality Address', 'Photo of debris', 'Contact Phone'],
    isDemoInteractive: false
  },
  {
    id: 'srv_trade_lic',
    title: {
      en: 'Trade License & Health NOC',
      mr: 'व्यापार परवाना व नूतनीकरण',
      hi: 'व्यापार लाइसेंस एवं स्वास्थ्य एनओसी'
    },
    description: {
      en: 'Check eligibility, fire safety guidelines, and renewal deadlines for commercial establishments and shops under Shop Act.',
      mr: 'दुकान व आस्थापना परवाना (शॉप ॲक्ट), आरोग्य परवाना नियम व नूतनीकरण तपशील.',
      hi: 'दुकान व प्रतिष्ठानों के लिए व्यापार लाइसेंस और स्वास्थ्य अनुमति नियम।'
    },
    category: 'trade',
    icon: 'Store',
    processingTime: '10 to 20 Working Days',
    fees: 'Based on business square footage and trade nature',
    requiredDocuments: ['Rent Agreement / Ownership', 'Electricity Bill', 'FSSAI (for food joints)'],
    isDemoInteractive: false
  },
  {
    id: 'srv_building_perm',
    title: {
      en: 'Building Plan Scrutiny (AutoDCR Demo)',
      mr: 'इमारत बांधकाम परवानगी तपासणी',
      hi: 'भवन निर्माण अनुमति व प्लान जांच'
    },
    description: {
      en: 'Check AutoDCR approval status, development charges schedule, and commencement certificate guidelines for Pimpri-Chinchwad.',
      mr: 'बांधकाम परवानगी प्रस्ताव स्थिती (AutoDCR), विकास शुल्क व जोते तपासणी माहिती.',
      hi: 'भवन निर्माण योजना अनुमोदन स्थिति और विकास शुल्क की जानकारी।'
    },
    category: 'building',
    icon: 'Compass',
    processingTime: '30 to 45 Working Days',
    fees: 'As per Maharashtra Unified DCR formula',
    requiredDocuments: ['Architect Drawing (CAD)', '7/12 Extract', 'Title Search Report'],
    isDemoInteractive: false
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'aud_1',
    timestamp: '2026-10-15 08:30 AM',
    action: 'COMPLAINT_CREATED',
    performedBy: 'Citizen: Rahul Shinde',
    details: 'Submitted complaint PCMC-2026-8491 (Wakad pothole)',
    entityId: 'PCMC-2026-8491'
  },
  {
    id: 'aud_2',
    timestamp: '2026-10-15 10:15 AM',
    action: 'STATUS_UPDATED',
    performedBy: 'Admin Dispatcher',
    details: 'Status changed to Assigned (PWD - Er. Rajesh Patil)',
    entityId: 'PCMC-2026-8491'
  },
  {
    id: 'aud_3',
    timestamp: '2026-10-16 02:45 PM',
    action: 'WORK_ORDER_ISSUED',
    performedBy: 'Er. Rajesh Patil',
    details: 'Dispatched hotmix asphalt repair crew for night shift',
    entityId: 'PCMC-2026-8491'
  },
  {
    id: 'aud_4',
    timestamp: '2026-10-16 11:30 AM',
    action: 'COMPLAINT_RESOLVED',
    performedBy: 'Er. Sachin Shinde',
    details: 'Resolved PCMC-2026-8494: Repaired streetlight MCB unit on Spine Road',
    entityId: 'PCMC-2026-8494'
  },
  {
    id: 'aud_5',
    timestamp: '2026-10-16 08:30 PM',
    action: 'FEEDBACK_SUBMITTED',
    performedBy: 'Citizen: Amit Gokhale',
    details: 'Submitted 5-star rating for PCMC-2026-8494',
    entityId: 'PCMC-2026-8494'
  }
];

// LocalStorage Keys
const STORAGE_KEYS = {
  COMPLAINTS: 'pcmc_connect_complaints',
  NOTICES: 'pcmc_connect_notices',
  AUDIT_LOGS: 'pcmc_connect_audit_logs',
  LANGUAGE: 'pcmc_connect_lang',
  LOCALITY: 'pcmc_connect_locality',
  ROLE: 'pcmc_connect_admin_role',
  INITIALIZED: 'pcmc_connect_initialized_v1'
};

// Custom event for cross-component reactive updates
const EVENT_NAME = 'pcmc_store_updated';

function triggerStoreUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  }
}

export const CivicStore = {
  // Initialize storage if empty
  init() {
    if (typeof window === 'undefined') return;
    const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
    if (!isInitialized) {
      CivicStore.resetToDefaults();
    }
  },

  resetToDefaults() {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(INITIAL_COMPLAINTS));
    localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(INITIAL_NOTICES));
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(INITIAL_AUDIT_LOGS));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    triggerStoreUpdate();
  },

  // Complaints
  getComplaints(): Complaint[] {
    if (typeof window === 'undefined') return INITIAL_COMPLAINTS;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLAINTS);
      return data ? JSON.parse(data) : INITIAL_COMPLAINTS;
    } catch {
      return INITIAL_COMPLAINTS;
    }
  },

  getComplaintById(id: string): Complaint | undefined {
    const complaints = CivicStore.getComplaints();
    return complaints.find(c => c.id.toLowerCase() === id.toLowerCase());
  },

  createComplaint(data: Omit<Complaint, 'id' | 'status' | 'internalNotes' | 'timeline' | 'createdAt' | 'updatedAt'>): Complaint {
    const complaints = CivicStore.getComplaints();
    // Generate realistic demo ticket ID e.g. PCMC-2026-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `PCMC-2026-${randomSuffix}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newComplaint: Complaint = {
      ...data,
      id: newId,
      status: 'Submitted',
      internalNotes: [],
      timeline: [
        {
          id: `tl_${Date.now()}`,
          status: 'Submitted',
          timestamp: formattedDate,
          updatedBy: data.citizenName || 'Citizen User',
          notes: 'Civic complaint submitted through PCMC Citizen Connect.'
        }
      ],
      createdAt: formattedDate,
      updatedAt: formattedDate
    };

    const updated = [newComplaint, ...complaints];
    localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(updated));

    // Add audit log
    CivicStore.addAuditLog({
      action: 'COMPLAINT_CREATED',
      performedBy: `Citizen: ${data.citizenName || 'Anonymous'}`,
      details: `Filed ${newId} (${data.category}) in ${data.locality}`,
      entityId: newId
    });

    triggerStoreUpdate();
    return newComplaint;
  },

  updateComplaintStatus(
    id: string,
    status: ComplaintStatus,
    publicNotes?: string,
    internalNote?: string,
    updatedBy: string = 'Municipal Officer'
  ): boolean {
    const complaints = CivicStore.getComplaints();
    const index = complaints.findIndex(c => c.id === id);
    if (index === -1) return false;

    const current = complaints[index];
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const updatedTimeline = [
      ...current.timeline,
      {
        id: `tl_${Date.now()}`,
        status,
        timestamp: formattedDate,
        updatedBy,
        notes: publicNotes || `Status updated to ${status}.`
      }
    ];

    const updatedInternalNotes = internalNote
      ? [...current.internalNotes, `[${formattedDate}] ${updatedBy}: ${internalNote}`]
      : current.internalNotes;

    complaints[index] = {
      ...current,
      status,
      publicResolutionNotes: publicNotes || current.publicResolutionNotes,
      internalNotes: updatedInternalNotes,
      timeline: updatedTimeline,
      updatedAt: formattedDate
    };

    localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(complaints));

    CivicStore.addAuditLog({
      action: 'STATUS_UPDATED',
      performedBy: updatedBy,
      details: `Changed ${id} status from ${current.status} to ${status}`,
      entityId: id
    });

    triggerStoreUpdate();
    return true;
  },

  assignComplaint(
    id: string,
    departmentName: string,
    staffId: string,
    staffName: string,
    assignedBy: string = 'Admin Dispatcher'
  ): boolean {
    const complaints = CivicStore.getComplaints();
    const index = complaints.findIndex(c => c.id === id);
    if (index === -1) return false;

    const current = complaints[index];
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newStatus: ComplaintStatus = current.status === 'Submitted' ? 'Assigned' : current.status;

    complaints[index] = {
      ...current,
      status: newStatus,
      assignedDepartment: departmentName,
      assignedStaffId: staffId,
      assignedStaffName: staffName,
      timeline: [
        ...current.timeline,
        {
          id: `tl_${Date.now()}`,
          status: newStatus,
          timestamp: formattedDate,
          updatedBy: assignedBy,
          notes: `Assigned to ${departmentName} (${staffName}).`
        }
      ],
      updatedAt: formattedDate
    };

    localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(complaints));

    CivicStore.addAuditLog({
      action: 'OFFICER_ASSIGNED',
      performedBy: assignedBy,
      details: `Assigned ${id} to ${staffName} (${departmentName})`,
      entityId: id
    });

    triggerStoreUpdate();
    return true;
  },

  addFeedback(id: string, rating: number, comment: string): boolean {
    const complaints = CivicStore.getComplaints();
    const index = complaints.findIndex(c => c.id === id);
    if (index === -1) return false;

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    complaints[index].feedback = {
      rating,
      comment,
      submittedAt: formattedDate
    };

    localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(complaints));

    CivicStore.addAuditLog({
      action: 'FEEDBACK_SUBMITTED',
      performedBy: complaints[index].citizenName || 'Citizen',
      details: `Submitted rating: ${rating}/5 for ${id}`,
      entityId: id
    });

    triggerStoreUpdate();
    return true;
  },

  // Notices
  getNotices(): Notice[] {
    if (typeof window === 'undefined') return INITIAL_NOTICES;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTICES);
      return data ? JSON.parse(data) : INITIAL_NOTICES;
    } catch {
      return INITIAL_NOTICES;
    }
  },

  createNotice(notice: Omit<Notice, 'id' | 'publishedDate'>): Notice {
    const notices = CivicStore.getNotices();
    const now = new Date().toISOString().split('T')[0];
    const newNotice: Notice = {
      ...notice,
      id: `NOT-2026-${Math.floor(100 + Math.random() * 900)}`,
      publishedDate: now
    };
    const updated = [newNotice, ...notices];
    localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(updated));

    CivicStore.addAuditLog({
      action: 'NOTICE_PUBLISHED',
      performedBy: notice.author || 'Admin',
      details: `Published public notice: "${notice.title.en.substring(0, 35)}..."`,
      entityId: newNotice.id
    });

    triggerStoreUpdate();
    return newNotice;
  },

  toggleNoticeStatus(id: string): boolean {
    const notices = CivicStore.getNotices();
    const index = notices.findIndex(n => n.id === id);
    if (index === -1) return false;

    const current = notices[index];
    const newStatus = current.status === 'published' ? 'archived' : 'published';
    notices[index].status = newStatus;
    localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(notices));

    CivicStore.addAuditLog({
      action: 'NOTICE_STATUS_TOGGLED',
      performedBy: 'Admin',
      details: `Notice ${id} set to ${newStatus}`,
      entityId: id
    });

    triggerStoreUpdate();
    return true;
  },

  deleteNotice(id: string): boolean {
    const notices = CivicStore.getNotices();
    const filtered = notices.filter(n => n.id !== id);
    localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(filtered));

    CivicStore.addAuditLog({
      action: 'NOTICE_DELETED',
      performedBy: 'Admin',
      details: `Deleted notice ${id}`,
      entityId: id
    });

    triggerStoreUpdate();
    return true;
  },

  // Audit Logs
  getAuditLogs(): AuditLogEntry[] {
    if (typeof window === 'undefined') return INITIAL_AUDIT_LOGS;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      return data ? JSON.parse(data) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  },

  addAuditLog(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) {
    if (typeof window === 'undefined') return;
    const logs = CivicStore.getAuditLogs();
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newEntry: AuditLogEntry = {
      ...entry,
      id: `aud_${Date.now()}`,
      timestamp: formattedDate
    };
    const updated = [newEntry, ...logs.slice(0, 49)]; // keep recent 50
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(updated));
  },

  // Subscribe to updates across components
  subscribe(callback: () => void): () => void {
    if (typeof window === 'undefined') return () => {};
    window.addEventListener(EVENT_NAME, callback);
    return () => window.removeEventListener(EVENT_NAME, callback);
  }
};
