import { EVENTS, FESTIVAL_STATS, REGISTRATION_LINKS } from '../../data/events'
import { SCHEDULE_DAYS } from '../../data/schedule'
import { GENERAL_GUIDELINES, DISQUALIFICATION_POLICY } from '../../data/rules'
import { DEPARTMENT_INFO } from '../../data/department'

export function getAuthoritativeKnowledge() {
  return {
    festival: {
      name: 'DSPHERE 2026',
      subtitle: 'National Technical Convergence',
      edition: '2K26',
      date: 'Saturday, 22 August 2026',
      college: DEPARTMENT_INFO.collegeName,
      accreditation: DEPARTMENT_INFO.collegeAccreditation,
      department: DEPARTMENT_INFO.departmentName,
      location: DEPARTMENT_INFO.location.address,
      landmark: DEPARTMENT_INFO.location.landmark,
      stats: FESTIVAL_STATS,
      registrationLinks: REGISTRATION_LINKS,
    },
    events: EVENTS,
    schedule: SCHEDULE_DAYS[0].timeline,
    rules: {
      guidelines: GENERAL_GUIDELINES,
      disqualification: DISQUALIFICATION_POLICY,
    },
    department: DEPARTMENT_INFO,
  }
}

export function buildSystemKnowledgeText() {
  const k = getAuthoritativeKnowledge()
  return `
=== AUTHORITATIVE DSPHERE 2026 EVENT KNOWLEDGE BASE ===
Festival: ${k.festival.name} (${k.festival.subtitle})
Date: ${k.festival.date}
Institution: ${k.festival.college} (${k.festival.accreditation})
Department: ${k.festival.department}
Location: ${k.festival.location} (Landmark: ${k.festival.landmark})
Transit: Airport ~14km, Railway ~22km, Khapri Metro Station ~10km.

--- 1. DATAFORGE (FLAGSHIP ML / AI HACKATHON) ---
- Tagline: Forge Ideas. Train Models. Solve Problems.
- Category: Machine Learning / AI Hackathon
- Time: 10:30 AM onwards (22 Aug 2026)
- Venue: Advanced AI & Data Science Lab, TGPCET
- Team Size: 1 — 3 Members
- Entry Fee: ₹150 / Team
- Prize Pool: Gold/Silver Medals + Premium Tech Gadgets + Reward Vouchers + Certificate of Excellence
- Tracks:
  1. Predictive Health & Bio-Informatics (Clinical risk modeling & diagnostic classification)
  2. Computer Vision & Real-time Detection (Object detection & segmentation)
  3. NLP & LLM Applications (RAG pipelines, sentiment analysis, semantic search)
  4. Fintech & Fraud Detection (High-throughput anomaly detection)
- Evaluation Rubric:
  * Model Accuracy, F1-Score & Quantitative Benchmarks — 35%
  * Data Cleaning, EDA & Pipeline Integrity — 25%
  * Innovation, Architecture Selection & Optimization — 20%
  * Final Pitch, Demo UI & Live Inference Presentation — 20%
- Allowed Tech: Python (Scikit-learn, TensorFlow, PyTorch, XGBoost, etc.), R, Jupyter, Colab.
- Coordinators: Prof. Aniket Sharma (Faculty Coordinator, +91 98230 45678), Shashank Deshmukh (Student Lead, +91 87654 32109), Riya Kulkarni (Technical Sub-Lead, +91 91234 56780).
- Registration Form Link: ${REGISTRATION_LINKS.dataforge}

--- 2. DATADUALS (FLAGSHIP TECH DEBATE CHAMPIONSHIP) ---
- Tagline: Two Sides. One Topic. Unlimited Arguments.
- Category: Technology Debate & Critical Thinking
- Time: 01:00 PM onwards (22 Aug 2026)
- Venue: Seminar Hall 1, TGPCET
- Team Size: Exactly 2 Members (Speaker 1: Constructive Lead + Speaker 2: Rebuttal/Closing)
- Entry Fee: Free (No Entry Fee / ₹0)
- Language: English
- Prize Pool: Gold/Silver Medals + Tech Hampers + Reward Vouchers + Certificate of Excellence + Best Orator Award
- Debate Topics / Tracks:
  1. AGI & Existential AI Risk (Threat vs Human Flourishing)
  2. Data Privacy vs State Security (Surveillance vs Encryption rights)
  3. Generative AI & Intellectual Property (Copyright & Training Ethics)
  4. Autonomous Weapons & Drone Warfare (Algorithmic targeting ethics)
- Evaluation Rubric:
  * Technical Substance, Factual Backing & Depth of Argument — 35%
  * Rebuttal Sharpness, Cross-Examination & Counter-defense — 30%
  * Rhetorical Eloquence, Diction & Stage Presence — 20%
  * Adherence to Parliamentary Time & Decorum — 15%
- Rules: 30 min prep window after topic release; 3 min constructive speech, 2 min crossfire/POIs, 2 min rebuttal.
- Coordinators: Dr. Pallavi Narkhede (Faculty Coordinator, +91 94221 67890), Aditya Verma (Student Moderator, +91 89898 12345), Neha Joshi (Student Coordinator, +91 76543 21098).
- Registration Form Link: ${REGISTRATION_LINKS.dataduals}

--- 3. DATAMODELLING (FLAGSHIP 3D CAD & DIGITAL TWIN CHALLENGE) ---
- Tagline: Imagine It. Model It. Build It.
- Category: 3D CAD Modelling & Engineering Challenge
- Time: 12:00 PM onwards (22 Aug 2026)
- Venue: Digital Design & CAD Centre, Mechanical Block, TGPCET
- Team Size: 1 — 2 Members
- Entry Fee: ₹100 / Team
- Prize Pool: Gold/Silver Medals + Premium Tech Gadgets + Reward Vouchers + Certificate of Excellence + Best Ergonomic Render Award
- Supported Software: Autodesk Fusion 360, SolidWorks, CATIA, Autodesk Inventor, Creo, AutoCAD, Revit, Civil 3D, Blender, SketchUp, Tinkercad, Siemens NX.
- Tracks:
  1. Generative Mechanical & Automotive Shells
  2. Industrial Robotics & Kinematic Mechanisms
  3. Digital Twin & Smart Sustainable Architecture
- Evaluation Rubric:
  * Geometric Dimensional Accuracy & Parametric Quality — 35%
  * Creativity, Technical Understanding & Practical Applicability — 25%
  * Render Quality, Material Texturing & Aesthetic Presentation — 20%
  * Live Demonstration & Design Explanation to Judges — 20%
- Submission Checklist: Final 3D Model, Editable Source File, 2-3 Rendered Views, Project Description, Live Demo.
- Coordinators: Prof. Manish Chawla (Faculty Coordinator, +91 97654 32190), Kunal Borkar (Student CAD Head, +91 90909 87654), Tanvi Raut (Student Coordinator, +91 88776 65544).
- Registration Form Link: ${REGISTRATION_LINKS.datamodelling}

--- COMPLETE EVENT DAY SCHEDULE (22 AUGUST 2026) ---
- 09:30 AM: Participant Reporting & Kit Distribution (TGPCET Campus)
- 10:00 AM: Grand Inauguration Ceremony & Final Event Briefing (Main Auditorium)
- 10:30 AM: DataForge (ML/AI Hackathon) Sprint Begins (Advanced AI & DS Lab)
- 11:00 AM: Keynote Guest Lecture (Main Auditorium)
- 12:00 PM: DataModelling (3D CAD Challenge) Begins (CAD Centre, Mech Block)
- 01:00 PM: DataDuals (Tech Debate Championship) Begins (Seminar Hall 1)
- 03:00 PM: Judging, Project Review & Presentations across all 3 tracks
- 04:00 PM: Grand Valedictory Ceremony & Prize Distribution (Main Auditorium)

--- RULES, ELIGIBILITY & DISQUALIFICATION ---
- Eligibility: All bona fide undergraduate (B.Tech/BE), postgraduate (M.Tech/MCA/MBA), and diploma engineering students from any recognized university/AICTE/UGC college.
- Identity: Mandatory original college ID card + government photo ID (Aadhaar/PAN/Driving License).
- Punctuality: Reporting mandatory 45 minutes before event start. Late arrival beyond 15 minutes forfeits registration without refund.
- Disqualifications: Plagiarism, copied/pre-existing code or 3D models, unparliamentary language, tampering with lab systems, sharing problem statements prematurely.
- Certificates: Official digital participation certificates for all active participants; merit certificates & medals for winners.

--- INSTITUTIONAL & STUDENT COMMITTEE DETAILS ---
- Head of Department: Prof. Sayra Bano Sheikh (CSE - Data Science)
- Convener: Prof. Abhimanyu Dutonde (Convener & HOD)
- Student Core Committee:
  * Aditya Korde (Forum President, +91 84469 05836)
  * Vedant Nanoti (Forum Secretary, +91 99601 16568)
  * Ram Dhote (Forum Treasurer, +91 82082 68304)
  * Shreyash Nannaware (Technical Head, +91 87673 04109)
  * Om Komujwar (Joint Secretary, +91 93702 07152)
  * Rohit Chute (Event Head, +91 78756 47302)
  * Om Bokade (Media Head, +91 91583 99325)
  * Sourabh Wanjari (Discipline Head, +91 90219 23172)
`
}
