export const REGISTRATION_LINKS = {
  dataforge: "https://docs.google.com/forms/d/e/1FAIpQLSe-dataforge-2026/viewform",
  dataduals: "https://docs.google.com/forms/d/e/1FAIpQLSe-dataduals-2026/viewform",
  datamodelling: "https://docs.google.com/forms/d/e/1FAIpQLSe-datamodelling-2026/viewform",
  dataarena: "https://docs.google.com/forms/d/e/1FAIpQLSe-dataarena-2026/viewform",
  general: "https://docs.google.com/forms/d/e/1FAIpQLSe-dsphere-all-events-2026/viewform"
}

export const FESTIVAL_STATS = [
  { label: "Flagship Events", value: "04", suffix: "+", icon: "Layers" },
  { label: "Total Prize Pool", value: "₹50,000", suffix: "+", icon: "Trophy" },
  { label: "Expected Delegates", value: "500", suffix: "+", icon: "Users" },
  { label: "Colleges Represented", value: "40", suffix: "+", icon: "Building2" },
]

export const EVENTS = [
  {
    slug: 'dataforge',
    name: 'DataForge',
    tagline: 'Forge Ideas. Train Models. Solve Problems.',
    category: 'Machine Learning / AI',
    iconName: 'Cpu',
    date: '21 August 2026',
    day: 'Day 1',
    time: '09:30 AM — 04:30 PM',
    venue: 'Advanced AI & Data Science Computing Lab, TGPCET',
    themeColor: '#00F0FF',
    accentGradient: 'from-cyan-500 to-blue-600',
    shortDesc: 'A flagship machine learning hackathon where participants build predictive models and end-to-end data pipelines for real-world industry problems.',
    description: 'DataForge is the premier machine learning and artificial intelligence challenge of DSphere 2026. Teams will be provided with curated raw datasets and domain problem statements at the start of the event. Over a high-intensity 7-hour sprint, participants must cleanse data, engineer features, evaluate multiple model architectures, optimize hyper-parameters, and deploy an interactive inference prototype.',
    teamSize: '1 — 3 Members',
    entryFee: '₹150 / Team',
    prizePool: '₹18,000 Total Prize Pool',
    prizes: [
      { position: '1st Place (Champion)', reward: '₹10,000 + Trophy + Certificate of Excellence' },
      { position: '2nd Place (Runner Up)', reward: '₹5,000 + Trophy + Certificate of Excellence' },
      { position: 'Best Innovation / SOTA Model', reward: '₹3,000 + Special Certificate' },
    ],
    tracks: [
      { title: 'Predictive Health & Bio-Informatics', desc: 'Classification and risk assessment using clinical dataset attributes.' },
      { title: 'Computer Vision & Real-time Detection', desc: 'Object detection and segmentation for autonomous and smart safety systems.' },
      { title: 'NLP & LLM Applications', desc: 'RAG pipelines, sentiment intelligence, and semantic search interfaces.' },
      { title: 'Fintech & Fraud Detection', desc: 'Anomaly detection on high-throughput transactional records.' }
    ],
    evaluationRubric: [
      { criteria: 'Model Accuracy & Quantitative Metrics (F1 / ROC-AUC / RMSE)', weight: '35%' },
      { criteria: 'Feature Engineering & Data Pipeline Integrity', weight: '25%' },
      { criteria: 'Innovation, Novelty & Architecture Selection', weight: '20%' },
      { criteria: 'Final Pitch, Demo UI & Live Inference Presentation', weight: '20%' }
    ],
    rules: [
      'Teams must consist of 1 to 3 members currently enrolled in an accredited undergraduate or diploma program.',
      'Datasets and evaluation benchmarks will be released on the morning of August 21, 2026 at 09:30 AM.',
      'Participants must bring their own laptops. High-speed campus Wi-Fi and power outlets will be provided.',
      'Usage of open-source libraries (PyTorch, TensorFlow, Scikit-Learn, HuggingFace, XGBoost) is permitted.',
      'Pre-trained foundation weights are allowed only if declared explicitly during the pitch and documented in GitHub.',
      'Plagiarism or sharing code between competing teams will lead to instant disqualification.',
      'Final code repository with reproducible Jupyter notebook must be submitted before the deadline.'
    ],
    coordinators: [
      { name: 'Prof. Aniket Sharma', role: 'Faculty Coordinator', phone: '+91 98230 45678', email: 'aniket.sharma@tgpcet.com' },
      { name: 'Shashank Deshmukh', role: 'Student Lead (CSE-DS)', phone: '+91 87654 32109', email: 'shashank.ds26@tgpcet.com' },
      { name: 'Riya Kulkarni', role: 'Technical Sub-Lead', phone: '+91 91234 56780', email: 'riya.ds26@tgpcet.com' }
    ],
    faqs: [
      { q: 'Can beginner data science students participate?', a: 'Yes! We provide structured baseline templates and mentor support to guide you through data preprocessing.' },
      { q: 'Will cloud compute / GPU credits be provided?', a: 'Participants can use Google Colab or Kaggle GPU environments; local execution on laptops is also standard.' },
      { q: 'Do all team members need to be from the same college?', a: 'Inter-college teams are welcome, provided all members hold valid student IDs.' }
    ],
    registration: REGISTRATION_LINKS.dataforge
  },
  {
    slug: 'dataduals',
    name: 'DataDuals',
    tagline: 'Two Sides. One Topic. Unlimited Arguments.',
    category: 'Technology Debate & Critical Thinking',
    iconName: 'MessageSquare',
    date: '21 August 2026',
    day: 'Day 1',
    time: '11:00 AM — 03:30 PM',
    venue: 'Central Seminar Hall 1, TGPCET',
    themeColor: '#8B5CF6',
    accentGradient: 'from-violet-500 to-purple-600',
    shortDesc: 'A high-octane parliamentary technical debate where sharp minds clash over AI ethics, AGI governance, data sovereignty, and technological philosophy.',
    description: 'DataDuals is the ultimate verbal battleground for tech enthusiasts, policy thinkers, and critical analysts. In an era where AI is rewriting industry norms, DataDuals challenges speakers to argue the affirmative and negative of provocative technological propositions before a panel of esteemed jury members.',
    teamSize: '2 Members (Speaker 1 + Speaker 2)',
    entryFee: '₹100 / Team',
    prizePool: '₹10,000 Total Prize Pool',
    prizes: [
      { position: '1st Place (Winning Duo)', reward: '₹6,000 + Trophy + Certificate of Excellence' },
      { position: '2nd Place (Runners Up)', reward: '₹3,000 + Trophy + Certificate of Excellence' },
      { position: 'Best Orator Award (Individual)', reward: '₹1,000 + Memento + Certificate' },
    ],
    tracks: [
      { title: 'AGI & Existential AI Risk', desc: 'Is autonomous superintelligence an existential threat or the greatest catalyst for human flourishing?' },
      { title: 'Data Privacy vs. State Security', desc: 'Balancing digital surveillance, citizen encryption rights, and national intelligence.' },
      { title: 'Generative AI & Intellectual Property', desc: 'Copyright ownership, fair use in model training, and the future of human creative industries.' },
      { title: 'Autonomous Weapons & Drone Warfare', desc: 'Ethical redlines in delegating lethal targeting decisions to algorithmic systems.' }
    ],
    evaluationRubric: [
      { criteria: 'Technical Substance, Factual Backing & Depth of Argument', weight: '35%' },
      { criteria: 'Rebuttal Sharpness, Cross-Examination & Counter-defense', weight: '30%' },
      { criteria: 'Rhetorical Eloquence, Diction & Stage Presence', weight: '20%' },
      { criteria: 'Adherence to Parliamentary Time & Decorum', weight: '15%' }
    ],
    rules: [
      'Each team consists of exactly 2 members: One lead constructive speaker and one rebuttal/closing speaker.',
      'Topics for Round 1 will be released 30 minutes before the start of the session for quick prep.',
      'Constructive Speech: 3 minutes per speaker | Crossfire / POIs: 2 minutes | Rebuttal & Closing: 2 minutes.',
      'Use of unparliamentary language or personal attacks against opponents will result in immediate disqualification.',
      'Electronic devices are allowed during the 30-minute preparation window only; no live prompting during speeches.'
    ],
    coordinators: [
      { name: 'Dr. Pallavi Narkhede', role: 'Faculty Coordinator', phone: '+91 94221 67890', email: 'pallavi.n@tgpcet.com' },
      { name: 'Aditya Verma', role: 'Student Moderator', phone: '+91 89898 12345', email: 'aditya.duals@tgpcet.com' },
      { name: 'Neha Joshi', role: 'Student Coordinator', phone: '+91 76543 21098', email: 'neha.ds@tgpcet.com' }
    ],
    faqs: [
      { q: 'What language is the debate conducted in?', a: 'English is the official language of the debate championship.' },
      { q: 'How is the affirmative/negative side allocated?', a: 'A digital coin toss occurs during the 30-minute prep window.' }
    ],
    registration: REGISTRATION_LINKS.dataduals
  },
  {
    slug: 'datamodelling',
    name: 'DataModelling',
    tagline: 'Imagine It. Model It. Build It.',
    category: 'CAD / 3D Digital Twin / Engineering',
    iconName: 'Box',
    date: '22 August 2026',
    day: 'Day 2',
    time: '10:00 AM — 02:30 PM',
    venue: 'Digital Design & CAD Centre, Mechanical Block, TGPCET',
    themeColor: '#00FF9D',
    accentGradient: 'from-emerald-400 to-teal-600',
    shortDesc: 'A flagship 3D CAD and digital twin design competition testing precision parametric modeling, generative mechanical assemblies, and photorealistic rendering.',
    description: 'DataModelling merges engineering rigor with artistic digital fabrication. Participants receive technical orthographic blueprints and functional design briefs to model complex assemblies, simulate kinematic motion, and produce photorealistic renders using industry-standard engineering suites.',
    teamSize: '1 — 2 Members',
    entryFee: '₹120 / Team',
    prizePool: '₹12,000 Total Prize Pool',
    prizes: [
      { position: '1st Place (Design Champion)', reward: '₹7,000 + Trophy + Certificate of Excellence' },
      { position: '2nd Place (Design Runner Up)', reward: '₹3,500 + Trophy + Certificate of Excellence' },
      { position: 'Best Ergonomic & Photorealistic Render', reward: '₹1,500 + Memento' },
    ],
    tracks: [
      { title: 'Generative Automotive & Aerodynamic Shells', desc: 'Lightweight aerospace or EV chassis components modeled for optimized drag coefficient.' },
      { title: 'Industrial Robotics & Kinematic Grippers', desc: 'Multi-axis robotic arm linkages with kinematic joint constraints.' },
      { title: 'Digital Twin & Smart Architecture', desc: 'IoT sensor housing and modular sustainable hardware enclosures.' }
    ],
    evaluationRubric: [
      { criteria: 'Geometric Dimensional Accuracy & Parametric Constraint Tree', weight: '40%' },
      { criteria: 'Assembly Kinematics, Tolerance Fit & Exploded View', weight: '25%' },
      { criteria: 'Render Lighting, Material Texturing & Aesthetic Presentation', weight: '20%' },
      { criteria: 'Speed of Completion & Clean Geometry', weight: '15%' }
    ],
    rules: [
      'Permitted Software: SolidWorks, CATIA V5/3DEXPERIENCE, Autodesk Inventor, Fusion 360, AutoCAD, Blender, or MATLAB Simulink.',
      'All 3D models must be built from a clean origin within the designated competition time limit (3.5 hours).',
      'Using pre-downloaded 3D model assets (GrabCAD, Thingiverse, TurboSquid) is strictly forbidden.',
      'Participants must submit the native CAD parametric file (.SLDPRT, .CATPart, .f3d, .blend) along with a .STEP exchange file and two high-res PNG renders.'
    ],
    coordinators: [
      { name: 'Prof. Manish Chawla', role: 'Faculty Coordinator', phone: '+91 97654 32190', email: 'manish.cad@tgpcet.com' },
      { name: 'Kunal Borkar', role: 'Student CAD Head', phone: '+91 90909 87654', email: 'kunal.cad@tgpcet.com' },
      { name: 'Tanvi Raut', role: 'Student Coordinator', phone: '+91 88776 65544', email: 'tanvi.ds26@tgpcet.com' }
    ],
    faqs: [
      { q: 'Can I bring my own workstation or laptop?', a: 'Yes! You are encouraged to use your personal laptop with your preferred CAD software, or use lab systems.' },
      { q: 'Is 3D printing available for winning designs?', a: 'Yes, top-ranking designs may be selected for sample 3D printing in the TGPCET Innovation Lab!' }
    ],
    registration: REGISTRATION_LINKS.datamodelling
  },
  {
    slug: 'dataarena',
    name: 'DataArena',
    tagline: 'Enter the Arena. Play to Dominate.',
    category: 'Esports Championship',
    iconName: 'Gamepad2',
    date: '22 August 2026',
    day: 'Day 2',
    time: '11:30 AM — 05:30 PM',
    venue: 'Auditorium Main Stage & Esports Arena, TGPCET',
    themeColor: '#F43F5E',
    accentGradient: 'from-rose-500 to-amber-500',
    shortDesc: 'A pulse-pounding collegiate esports tournament featuring battle royale and tactical shooter showdowns with live stage casting and bracket elimination.',
    description: 'DataArena is where tactical coordination, split-second reflexes, and esports mastery take center stage. Featuring premier competitive titles (BGMI Squad Battles & Valorant / FIFA 1v1 Brackets), top college squads will fight through group stages, semi-final clashes, and a high-stakes Grand Final broadcasted live on campus LED screens.',
    teamSize: 'Squad: 4 Players (+1 Sub) | Solo: 1 Player',
    entryFee: '₹200 / Squad | ₹80 / Solo',
    prizePool: '₹15,000 Total Prize Pool',
    prizes: [
      { position: '1st Place (Squad Champions)', reward: '₹8,000 + Championship Trophy + Medals' },
      { position: '2nd Place (Squad Runners Up)', reward: '₹4,500 + Trophy + Medals' },
      { position: 'MVP of the Tournament (Highest Frags)', reward: '₹2,500 + Gaming Gear + Memento' },
    ],
    tracks: [
      { title: 'BGMI Mobile Squad Championship', desc: 'Erangel & Miramar tactical battle royale lobby matches with official points table.' },
      { title: 'Valorant 5v5 Tactical Clashes', desc: 'Competitive plant/defuse bracket tournament on high-performance LAN rigs.' },
      { title: 'FIFA / EA FC 26 Solo Knockout', desc: '1v1 tournament with single-elimination rounds on PS5 controllers.' }
    ],
    evaluationRubric: [
      { criteria: 'Placement Points & Survival Bracket Standing', weight: '50%' },
      { criteria: 'Total Kill / Frag Points', weight: '40%' },
      { criteria: 'Sportsmanship & Match Fairplay Conduct', weight: '10%' }
    ],
    rules: [
      'All players must have registered game IDs and valid college identification cards.',
      'Use of emulators, third-party APKs, aimbot, trigger accessories, or wall hacks will lead to immediate ban and forfeit of fees.',
      'Custom room ID and passwords will be shared on the official DSphere Discord and WhatsApp tournament broadcast 15 minutes prior to match.',
      'All players must maintain stable 4G/5G or use designated campus high-speed gaming Wi-Fi; disconnects mid-game cannot be restarted unless server-side.',
      'Referees decisions in dispute matches are final and binding.'
    ],
    coordinators: [
      { name: 'Prof. Rahul Meshram', role: 'Faculty Coordinator', phone: '+91 98900 11223', email: 'rahul.esports@tgpcet.com' },
      { name: 'Harshwardhan Patil', role: 'Esports Lead', phone: '+91 80077 12345', email: 'harsh.arena@tgpcet.com' },
      { name: 'Sameer Sheikh', role: 'Tournament Admin', phone: '+91 93250 99887', email: 'sameer.arena@tgpcet.com' }
    ],
    faqs: [
      { q: 'Will matches be casted live?', a: 'Yes! The finals will be casted live in the TGPCET Auditorium with dynamic spectator feeds!' },
      { q: 'Can non-TGPCET college teams participate?', a: 'Yes, DSphere esports is open to students from all registered universities and colleges.' }
    ],
    registration: REGISTRATION_LINKS.dataarena
  }
]
