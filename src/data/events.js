export const REGISTRATION_LINKS = {
  dataforge: "https://forms.gle/yCawnFhu4iSxzmTy8",
  dataduals: "https://forms.gle/iDaoSGSKoUDAD77Q9",
  datamodelling: "https://forms.gle/DMNUiGNK7ns8PNY56",
  general: "https://forms.gle/yCawnFhu4iSxzmTy8"
}

export const FESTIVAL_STATS = [
  { label: "Flagship Events", value: "03", suffix: "", icon: "Layers" },
  { label: "Prizes & Rewards", value: "Exciting", suffix: " Rewards", icon: "Award" },
  { label: "Expected Delegates", value: "500", suffix: "+", icon: "Users" },
  { label: "Colleges Represented", value: "40", suffix: "+", icon: "Building2" },
]

export const EVENTS = [
  {
    slug: 'dataforge',
    name: 'DataForge',
    tagline: 'Forge Ideas. Train Models. Solve Problems.',
    category: 'Machine Learning / AI Hackathon',
    iconName: 'Cpu',
    date: '22 August 2026',
    day: '22 Aug 2026',
    time: '10:30 AM onwards',
    venue: 'Advanced AI & Data Science Lab, TGPCET',
    themeColor: '#00F0FF',
    accentGradient: 'from-cyan-500 to-blue-600',
    shortDesc: 'A premier machine learning hackathon where participants build predictive models and end-to-end data pipelines for real-world industry problems.',
    description: 'DataForge is the premier machine learning and artificial intelligence challenge of DSphere 2026. Participants (individuals or teams) will build an end-to-end Machine Learning model to solve a given or chosen problem statement, working through data cleaning, EDA, feature engineering, model training, and hyperparameter optimization to maximize Accuracy and F1-Score while documenting their dataset and approach.',
    teamSize: '1 — 3 Members',
    entryFee: '₹150 / Team',
    prizePool: 'Exciting Prizes & Rewards',
    prizes: [
      { position: '1st Place (Champion)', reward: 'Gold Medals + Premium Tech Gadgets + Reward Vouchers + Certificate of Excellence' },
      { position: '2nd Place (Runner Up)', reward: 'Silver Medals + Exclusive Rewards Hampers + Vouchers + Certificate of Excellence' },
      { position: 'Best Innovation / SOTA Model', reward: 'Special Recognition Kit + Reward Vouchers + Certificate of Merit' },
    ],
    objectives: [
      'Identify a real-world problem and a suitable dataset.',
      'Perform data cleaning, preprocessing, and Exploratory Data Analysis (EDA).',
      'Build, train, and optimize an ML model.',
      'Improve model performance (Accuracy, F1-Score, and other relevant metrics).',
      'Present results with clear reasoning and real-world relevance.'
    ],
    tracks: [
      { title: 'Predictive Health & Bio-Informatics', desc: 'Classification and risk assessment using clinical dataset attributes.' },
      { title: 'Computer Vision & Real-time Detection', desc: 'Object detection and segmentation for autonomous and smart safety systems.' },
      { title: 'NLP & LLM Applications', desc: 'RAG pipelines, sentiment intelligence, and semantic search interfaces.' },
      { title: 'Fintech & Fraud Detection', desc: 'Anomaly detection on high-throughput transactional records.' }
    ],
    evaluationRubric: [
      { criteria: 'Model Accuracy, F1-Score & Quantitative Benchmarks', weight: '35%' },
      { criteria: 'Data Cleaning, EDA & Pipeline Integrity', weight: '25%' },
      { criteria: 'Innovation, Architecture Selection & Optimization', weight: '20%' },
      { criteria: 'Final Pitch, Demo UI & Live Inference Presentation', weight: '20%' }
    ],
    rules: [
      'Overview: Participants (individuals or teams) will build a Machine Learning model to solve a given or chosen problem statement, working through data preprocessing, model building, and optimization to maximize Accuracy and F1-Score, while clearly documenting their dataset and approach.',
      'Team Guidelines: Team size is 1 to 3 members. Each team must register with a team name and problem statement/domain. Cross-team code sharing is not allowed; plagiarism leads to immediate disqualification.',
      'Dataset Rules: Teams may use a public dataset (Kaggle, UCI ML Repository, government open data, etc.) or a provided dataset (if the hackathon supplies one). Dataset source/link must be disclosed in the final submission. Custom/scraped datasets are allowed but must include a data collection description. Data leakage (using test data in training) is strictly prohibited.',
      'Technical Guidelines: Any language/framework allowed: Python (Scikit-learn, TensorFlow, PyTorch, XGBoost, etc.), R, etc. Maintain a clean, commented notebook or script.',
      'Pretrained Models: Use of pretrained models/transfer learning is allowed unless stated otherwise — must be explicitly disclosed in the submission and pitch. Code must be reproducible (shared via GitHub/Colab notebook).',
      'Submission Requirements: Final submission must include Problem statement document, Dataset link or file, EDA notebook/report, Model training code, Final metrics report (Accuracy, F1-Score, Confusion Matrix), and PPT/report explaining approach.'
    ],
    submissionChecklist: [
      'Problem statement document',
      'Dataset with source link or file',
      'EDA notebook / report',
      'Model training code',
      'Final metrics report (Accuracy, F1-Score, Confusion Matrix)',
      'PPT / report explaining approach'
    ],
    coordinators: [
      { name: 'Prof. Aniket Sharma', role: 'Faculty Coordinator', phone: '+91 98230 45678', email: 'aniket.sharma@tgpcet.com' },
      { name: 'Shashank Deshmukh', role: 'Student Lead (CSE-DS)', phone: '+91 87654 32109', email: 'shashank.ds26@tgpcet.com' },
      { name: 'Riya Kulkarni', role: 'Technical Sub-Lead', phone: '+91 91234 56780', email: 'riya.ds26@tgpcet.com' }
    ],
    faqs: [
      { q: 'Can beginner data science students participate?', a: 'Yes! We provide structured baseline templates and mentor support to guide you through data preprocessing and baseline models.' },
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
    date: '22 August 2026',
    day: '22 Aug 2026',
    time: '01:00 PM onwards',
    venue: 'Seminar Hall 1, TGPCET',
    themeColor: '#8B5CF6',
    accentGradient: 'from-violet-500 to-purple-600',
    shortDesc: 'A high-octane parliamentary technical debate where sharp minds clash over AI ethics, AGI governance, data sovereignty, and technological philosophy.',
    description: 'DataDuals is the ultimate verbal battleground for tech enthusiasts, policy thinkers, and critical analysts. In an era where AI is rewriting industry norms, DataDuals challenges speakers to argue the affirmative and negative of provocative technological propositions before a panel of esteemed jury members.',
    teamSize: '2 Members (Speaker 1 + Speaker 2)',
    entryFee: 'Free (No Entry Fee)',
    prizePool: 'Exciting Prizes & Rewards',
    prizes: [
      { position: '1st Place (Winning Duo)', reward: 'Gold Medals + Tech Hampers + Reward Vouchers + Certificate of Excellence' },
      { position: '2nd Place (Runners Up)', reward: 'Silver Medals + Exclusive Reward Vouchers + Certificate of Excellence' },
      { position: 'Best Orator Award (Individual)', reward: 'Best Orator Medal + Reward Voucher + Certificate of Merit' },
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
    category: '3D Modelling Competition',
    iconName: 'Box',
    date: '22 August 2026',
    day: '22 Aug 2026',
    time: '12:00 PM onwards',
    venue: 'Digital Design & CAD Centre, Mechanical Block, TGPCET',
    themeColor: '#00FF9D',
    accentGradient: 'from-emerald-400 to-teal-600',
    shortDesc: 'A flagship 3D modelling and CAD engineering competition testing precision modeling, assembly creation, and photorealistic rendering.',
    description: 'DataModelling is open to students from all engineering branches. Participants create an original 3D model based on the given theme or problem statement using industry-standard engineering, architectural, or creative 3D design suites. Participants demonstrate their design rationale, modelling approach, and engineering concepts live before the judges.',
    teamSize: '1 — 2 Members',
    entryFee: '₹100 / Team',
    prizePool: 'Exciting Prizes & Rewards',
    prizes: [
      { position: '1st Place (Design Champion)', reward: 'Gold Medal + Premium Tech Gadgets + Reward Vouchers + Certificate of Excellence' },
      { position: '2nd Place (Design Runner Up)', reward: 'Silver Medal + Exclusive Rewards Hampers + Vouchers + Certificate of Excellence' },
      { position: 'Best Ergonomic & Photorealistic Render', reward: 'Special Design Medal + Reward Voucher + Certificate of Merit' },
    ],
    supportedSoftware: [
      {
        domain: '⚙️ CAD & Engineering Design',
        tools: ['Autodesk Fusion 360', 'SolidWorks', 'CATIA', 'Autodesk Inventor', 'Creo']
      },
      {
        domain: '🏗️ Architecture & Civil',
        tools: ['AutoCAD', 'Autodesk Revit', 'Civil 3D', 'SketchUp', 'ArchiCAD']
      },
      {
        domain: '⚡ Electrical & Electronics',
        tools: ['AutoCAD Electrical', 'EPLAN', 'SolidWorks Electrical', 'KiCad', 'EasyEDA', 'Proteus']
      },
      {
        domain: '🎨 3D Visualization & Creative Modelling',
        tools: ['Blender', 'SketchUp', 'Unity', 'Tinkercad']
      },
      {
        domain: '✈️ Aerospace / Advanced Modelling',
        tools: ['CATIA', 'Siemens NX', 'SolidWorks', 'Fusion 360', 'OpenVSP']
      }
    ],
    submissionRequirements: [
      {
        title: '1. Final 3D Model',
        desc: 'The completed model/project created during the competition.'
      },
      {
        title: '2. Source File',
        desc: 'The original editable project file of the software used.'
      },
      {
        title: '3. Rendered Output',
        desc: 'At least 2–3 clear views of the final model.'
      },
      {
        title: '4. Project Description',
        desc: 'A brief explanation covering: Problem/Theme, Proposed solution, Software used, Key features, and Engineering application.'
      },
      {
        title: '5. Live Demonstration',
        desc: 'Participants should be prepared to open and demonstrate their model if requested by the judges.'
      }
    ],
    importantNote: 'The model should be created during the competition period unless the organizers specifically permit pre-built components or templates. Participants should have preinstalled software on their own laptops, be prepared to explain their modelling process, and demonstrate ownership of their work.',
    tracks: [
      { title: 'Generative Mechanical & Automotive Shells', desc: 'Lightweight aerospace, EV chassis components, and mechanical assemblies.' },
      { title: 'Industrial Robotics & Kinematic Mechanisms', desc: 'Multi-axis robotic linkages with kinematic constraints.' },
      { title: 'Digital Twin & Smart Sustainable Architecture', desc: 'Architectural blueprints, IoT sensor housings, and modular hardware enclosures.' }
    ],
    evaluationRubric: [
      { criteria: 'Geometric Dimensional Accuracy & Parametric Quality', weight: '35%' },
      { criteria: 'Creativity, Technical Understanding & Practical Applicability', weight: '25%' },
      { criteria: 'Render Quality, Material Texturing & Aesthetic Presentation', weight: '20%' },
      { criteria: 'Live Demonstration & Design Explanation to Judges', weight: '20%' }
    ],
    rules: [
      'The competition is open to students from all engineering branches.',
      'Participants may participate individually or in teams (1 — 2 Members) as specified by the organizers.',
      'Participants must create an original 3D model based on the given theme/problem statement.',
      'The model must be created using one of the supported software/tools (Autodesk Fusion 360, SolidWorks, CATIA, AutoCAD, Revit, Blender, Creo, etc.).',
      'Participants are allowed to use reference images, tutorials, documentation, and publicly available resources for learning.',
      'Direct submission of downloaded or pre-existing 3D models is strictly prohibited.',
      'AI-assisted tools may be used for ideation and reference, but the final 3D model must be created and customized by the participant.',
      'Participants should be able to explain their design, modelling approach, and engineering concept to the judges.',
      'Models should demonstrate creativity, technical understanding, accuracy, and practical applicability.',
      'Participants must submit their model/project within the time limit specified by the organizers.',
      'Participants should keep their project files saved regularly to avoid loss of work.',
      'The final submission must contain the editable/source project file along with required rendered images/screenshots.',
      'Participants may be asked to demonstrate their model live during evaluation.',
      'Any form of plagiarism, copied designs, or misrepresentation of work may lead to disqualification.',
      'Judges\' decisions regarding evaluation and final rankings will be final and binding.',
      'Organizers reserve the right to modify rules, themes, or submission requirements if necessary.'
    ],
    coordinators: [
      { name: 'Prof. Manish Chawla', role: 'Faculty Coordinator', phone: '+91 97654 32190', email: 'manish.cad@tgpcet.com' },
      { name: 'Kunal Borkar', role: 'Student CAD Head', phone: '+91 90909 87654', email: 'kunal.cad@tgpcet.com' },
      { name: 'Tanvi Raut', role: 'Student Coordinator', phone: '+91 88776 65544', email: 'tanvi.ds26@tgpcet.com' }
    ],
    faqs: [
      { q: 'Can I use other professional CAD/3D software not in the list?', a: 'Yes, participants may use another professional 3D modelling/CAD tool if suitable and approved by organizers.' },
      { q: 'Can I bring my own laptop?', a: 'Yes! Participants should have preinstalled software on their own laptops.' },
      { q: 'Is 3D printing available for winning designs?', a: 'Yes, top-ranking designs may be selected for sample 3D printing in the TGPCET Innovation Lab!' }
    ],
    registration: REGISTRATION_LINKS.datamodelling
  }
]
