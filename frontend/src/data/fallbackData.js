export const FALLBACK_CONDITIONS_DB = [
  {
    "id": "fever-cold",
    "name": "Fever & Common Cold",
    "hindi_name": "बुखार और सर्दी-जुकाम",
    "category": "General & Respiratory",
    "icon": "Thermometer",
    "severity_level": "Mild to Moderate",
    "brief": "Elevated temperature, shivering, runny nose, or body aches.",
    "red_flags": [
      "Temperature > 103°F (39.4°C) lasting > 3 days",
      "Shortness of breath or severe chest tightness",
      "Extreme lethargy, confusion, or stiff neck"
    ],
    "allopathy": {
      "title": "Allopathy (Modern Medicine)",
      "badge_color": "blue",
      "medicines": [
        {"name": "Paracetamol (500mg - 650mg)", "type": "Antipyretic / Analgesic", "dose": "1 tablet every 6 hrs after food (Max 3g/day)", "purpose": "Reduces fever and relieves body pain"},
        {"name": "Cetirizine (10mg)", "type": "Antihistamine", "dose": "1 tablet at bedtime", "purpose": "Stops sneezing and watery nose"},
        {"name": "ORS / Electrolyte Drink", "type": "Hydration Support", "dose": "Sip 1-2 liters throughout day", "purpose": "Prevents dehydration and weakness"}
      ],
      "precautions": ["Avoid taking multiple paracetamol products together", "Stay well-hydrated"],
      "doctor_visit": "Consult physician if fever persists > 48 hours."
    },
    "ayurveda": {
      "title": "Ayurveda (Natural & Dosha Balance)",
      "badge_color": "emerald",
      "dosha": "Pitta-Kapha Imbalance (Jwara)",
      "medicines": [
        {"name": "Maha Sudarshan Vati", "type": "Classical Tablet", "dose": "1-2 tablets twice daily with warm water", "purpose": "Natural antipyretic & immune booster"},
        {"name": "Giloy (Guduchi) Ghanvati", "type": "Herbal Extract", "dose": "1 tablet twice daily", "purpose": "Purifies blood and builds vitality (Ojas)"},
        {"name": "Sitopaladi Churna", "type": "Herbal Powder", "dose": "1 tsp with 1/2 tsp pure honey twice daily", "purpose": "Soothes throat irritation and cough"}
      ],
      "ahara_vihara": ["Drink warm water boiled with fresh ginger and tulsi leaves", "Eat light khichdi or moong dal soup; avoid cold, oily foods", "Take adequate rest and steam inhalation"]
    },
    "homeopathy": {
      "title": "Homeopathy (Constitutional Care)",
      "badge_color": "amber",
      "medicines": [
        {"name": "Aconitum Napellus 30C", "potency": "30C", "dose": "4 pills, 3 times a day", "purpose": "Best at sudden onset after exposure to cold air/wind"},
        {"name": "Belladonna 30C", "potency": "30C", "dose": "4 pills every 4 hours", "purpose": "High fever with red flushed face, throbbing head, and heat"},
        {"name": "Gelsemium 30C", "potency": "30C", "dose": "4 pills twice daily", "purpose": "Fever with heavy eyelids, chills, and intense tiredness"}
      ],
      "rule": "Place pills under the tongue without touching. Avoid eating/drinking 15 minutes before and after."
    }
  },
  {
    "id": "cough-throat",
    "name": "Cough & Sore Throat",
    "hindi_name": "खांसी और गले में खराश",
    "category": "Respiratory",
    "icon": "Wind",
    "severity_level": "Mild",
    "brief": "Dry throat irritation, persistent hacking, or phlegm cough.",
    "red_flags": [
      "Coughing up blood (hemoptysis)",
      "Wheezing or gasping for air",
      "Barking cough with stridor in children"
    ],
    "allopathy": {
      "title": "Allopathy (Modern Medicine)",
      "badge_color": "blue",
      "medicines": [
        {"name": "Dextromethorphan Syrup (Dry Cough)", "type": "Antitussive", "dose": "5-10 ml twice daily after food", "purpose": "Calms dry, hacking ticklish cough"},
        {"name": "Guaifenesin + Ambroxol Syrup (Wet Cough)", "type": "Expectorant", "dose": "10 ml thrice daily with warm water", "purpose": "Thins and expels chest mucus"},
        {"name": "Chlorhexidine / Povidone Iodine Gargle", "type": "Antiseptic Gargle", "dose": "Gargle 30 seconds twice daily", "purpose": "Clears throat bacterial colonies"}
      ],
      "precautions": ["Do not take dry cough suppressants for deep productive wet cough", "Drink lukewarm fluids"],
      "doctor_visit": "Visit OPD if cough lasts more than 2 weeks."
    },
    "ayurveda": {
      "title": "Ayurveda (Natural & Dosha Balance)",
      "badge_color": "emerald",
      "dosha": "Vata-Kapha Kasa (Throat Irritation)",
      "medicines": [
        {"name": "Khadiradi Vati", "type": "Chewable Lozenge", "dose": "Keep 1 tablet in mouth and suck slowly", "purpose": "Immediate relief from hoarseness and throat pain"},
        {"name": "Talisadi Churna", "type": "Herbal Powder", "dose": "1/2 tsp mixed with warm honey", "purpose": "Relieves chest congestion and persistent cough"},
        {"name": "Vasavaleha", "type": "Herbal Jam", "dose": "1 teaspoonful morning and evening", "purpose": "Strengthens lungs and clears bronchus"}
      ],
      "ahara_vihara": ["Turmeric (Haldi) milk with a pinch of black pepper at bedtime", "Steam inhalation with 2 drops of Eucalyptus oil", "Strictly avoid refrigerated drinks and curd at night"]
    },
    "homeopathy": {
      "title": "Homeopathy (Constitutional Care)",
      "badge_color": "amber",
      "medicines": [
        {"name": "Drosera 30C", "potency": "30C", "dose": "4 globules thrice daily", "purpose": "Spasmodic, paroxysmal cough that worsens when lying down"},
        {"name": "Rumex Crispus 30C", "potency": "30C", "dose": "4 globules, 3 times a day", "purpose": "Incessant tickle in pit of throat triggered by inhaling cool air"},
        {"name": "Antimonium Tartaricum 30C", "potency": "30C", "dose": "4 globules twice daily", "purpose": "Chest full of rattling mucus that is hard to bring up"}
      ],
      "rule": "Dissolve directly on tongue. Keep container away from strong aromas like camphor and garlic."
    }
  },
  {
    "id": "acidity-gerd",
    "name": "Acidity, Gas & Heartburn",
    "hindi_name": "एसिडिटी, गैस और पेट की जलन",
    "category": "Digestive",
    "icon": "Flame",
    "severity_level": "Mild to Moderate",
    "brief": "Burning in chest or throat, sour burping, bloating, and nausea.",
    "red_flags": [
      "Chest pain radiating to left arm or jaw (Rule out heart attack!)",
      "Black tarry stools or vomiting coffee-ground blood",
      "Inability to swallow food or sudden unexplainable weight loss"
    ],
    "allopathy": {
      "title": "Allopathy (Modern Medicine)",
      "badge_color": "blue",
      "medicines": [
        {"name": "Pantoprazole (40mg)", "type": "Proton Pump Inhibitor (PPI)", "dose": "1 tablet empty stomach 30 mins before breakfast", "purpose": "Suppresses stomach acid production"},
        {"name": "Antacid Gel (Magaldrate + Simethicone)", "type": "Oral Suspension", "dose": "2 tsp 1 hour after meals and at bedtime", "purpose": "Neutralizes acid and expels trapped gas bubbles"},
        {"name": "Domperidone (10mg) [If nausea]", "type": "Prokinetic", "dose": "1 tablet before food if prescribed", "purpose": "Prevents reflux and aids gastric emptying"}
      ],
      "precautions": ["Do not lie down immediately after dinner", "Keep head elevated 15 degrees"],
      "doctor_visit": "Seek emergency care if chest burning is accompanied by cold sweat or dizziness."
    },
    "ayurveda": {
      "title": "Ayurveda (Natural & Dosha Balance)",
      "badge_color": "emerald",
      "dosha": "High Pitta (Amlapitta)",
      "medicines": [
        {"name": "Avipattikar Churna", "type": "Herbal Digestive Powder", "dose": "1 tsp with cool water before meals", "purpose": "Neutralizes stomach burning and regulates bowel flow"},
        {"name": "Kamdudha Ras (Mukta Yukta)", "type": "Mineral-Herbal Calmer", "dose": "1 tablet twice daily with water", "purpose": "Potent alkaline cooling agent for burning sensation"},
        {"name": "Amla (Indian Gooseberry) Juice", "type": "Natural Cooling Tonic", "dose": "20 ml with equal water in morning", "purpose": "Rebuilds gut lining and balances digestive fire (Agni)"}
      ],
      "ahara_vihara": ["Sip fennel (Saunf) & coriander seed water throughout the day", "Avoid spicy, fried, deep-fried snacks, vinegar, and late-night heavy dinners", "Eat meals at consistent timings; do not stay starved for prolonged hours"]
    },
    "homeopathy": {
      "title": "Homeopathy (Constitutional Care)",
      "badge_color": "amber",
      "medicines": [
        {"name": "Nux Vomica 30C", "potency": "30C", "dose": "4 pills at night", "purpose": "Number one remedy for acidity from overeating, alcohol, spicy foods, or late nights"},
        {"name": "Carbo Vegetabilis 30C", "potency": "30C", "dose": "4 pills twice daily", "purpose": "Severe bloating in upper abdomen, desires fresh air or being fanned"},
        {"name": "Robinia Pseudacacia 30C", "potency": "30C", "dose": "4 pills after meals", "purpose": "Intense sour vomiting, sour belching, and burning in stomach and throat"}
      ],
      "rule": "Avoid raw onions, mint, and strong coffee during homeopathic treatment."
    }
  },
  {
    "id": "joint-pain",
    "name": "Joint & Knee Pain (Arthritis / Stiffness)",
    "hindi_name": "जोड़ों और घुटनों का दर्द",
    "category": "Musculoskeletal",
    "icon": "Activity",
    "severity_level": "Moderate",
    "brief": "Knee ache, morning stiffness, difficulty climbing stairs or swollen joints.",
    "red_flags": [
      "Hot, red, dramatically swollen joint with high fever (Septic arthritis alert)",
      "Sudden complete inability to bear weight after fall",
      "Loss of bowel or bladder control accompanying back/leg pain"
    ],
    "allopathy": {
      "title": "Allopathy (Modern Medicine)",
      "badge_color": "blue",
      "medicines": [
        {"name": "Aceclofenac (100mg) + Paracetamol (325mg)", "type": "NSAID Analgesic", "dose": "1 tablet after meals (SOS or max 3-5 days)", "purpose": "Fast reduction of joint inflammation and pain"},
        {"name": "Glucosamine + Diacerein Capsule", "type": "Cartilage Protector", "dose": "1 capsule daily after breakfast", "purpose": "Supports joint lubricant and slows cartilage wear"},
        {"name": "Diclofenac Sodium 1% Gel", "type": "Topical Analgesic", "dose": "Gently massage over painful area 2-3 times/day", "purpose": "Local relief without stomach irritation"}
      ],
      "precautions": ["Always take painkiller pills with food and an antacid to prevent stomach ulcers", "Limit prolonged use"],
      "doctor_visit": "Visit orthopedic OPD if swelling or deformity develops."
    },
    "ayurveda": {
      "title": "Ayurveda (Natural & Dosha Balance)",
      "badge_color": "emerald",
      "dosha": "Vata Vyadhi (Sandhigata Vata / Amavata)",
      "medicines": [
        {"name": "Yograj Guggulu", "type": "Classical Resin Compound", "dose": "2 tablets twice daily with warm milk or water", "purpose": "Detoxifies joints, improves flexibility, and calms Vata"},
        {"name": "Shallaki (Boswellia Serrata 500mg)", "type": "Anti-inflammatory Extract", "dose": "1 capsule twice daily", "purpose": "Reduces joint swelling naturally and eases movement"},
        {"name": "Mahanarayan Taila", "type": "Medicated Massage Oil", "dose": "Apply warm oil gently; do not massage vigorously", "purpose": "Nourishes joint tissue and dispels morning stiffness"}
      ],
      "ahara_vihara": ["Apply hot fomentation (warm compression) after oil application", "Avoid cold baths, sour foods, fermentations, and exposure to chilly drafts", "Gentle low-impact walking and isometric quad exercises"]
    },
    "homeopathy": {
      "title": "Homeopathy (Constitutional Care)",
      "badge_color": "amber",
      "medicines": [
        {"name": "Rhus Toxicodendron 30C", "potency": "30C", "dose": "4 pills thrice daily", "purpose": "Pain worse during first movement, but gets better with continued motion"},
        {"name": "Bryonia Alba 30C", "potency": "30C", "dose": "4 pills thrice daily", "purpose": "Pain made worse by the slightest movement; wants complete rest"},
        {"name": "Ruta Graveolens 30C", "potency": "30C", "dose": "4 pills twice daily", "purpose": "Deep aching in tendons, ligaments, and bruised feeling in knees"}
      ],
      "rule": "Store away from electronic devices and strong sunlight. Do not swallow whole with water."
    }
  },
  {
    "id": "headache-migraine",
    "name": "Headache & Migraine",
    "hindi_name": "सिरदर्द और माइग्रेन",
    "category": "Neurological",
    "icon": "Zap",
    "severity_level": "Mild to Moderate",
    "brief": "One-sided throbbing, tension band ache, light sensitivity, or stress headache.",
    "red_flags": [
      "'Thunderclap' sudden catastrophic headache (worst headache of life)",
      "Accompanied by slurred speech, facial drooping, or vision loss",
      "Headache accompanied by high fever and stiff neck"
    ],
    "allopathy": {
      "title": "Allopathy (Modern Medicine)",
      "badge_color": "blue",
      "medicines": [
        {"name": "Naproxen (250mg) or Ibuprofen (400mg)", "type": "NSAID", "dose": "1 tablet after meals at early onset of headache", "purpose": "Relieves acute vascular throbbing and tension"},
        {"name": "Paracetamol (650mg) + Caffeine", "type": "Analgesic Enhancer", "dose": "1 tablet SOS", "purpose": "Constricts dilated vessels and eases tension headache"},
        {"name": "Domperidone (10mg) [If nausea occurs]", "type": "Antiemetic", "dose": "1 tablet with painkiller", "purpose": "Prevents migraine-related nausea and gastric stasis"}
      ],
      "precautions": ["Do not overuse painkillers more than 2-3 times/week to prevent rebound headaches", "Rest in dark quiet room"],
      "doctor_visit": "Visit neurology OPD if headache patterns change or wake you up from sleep."
    },
    "ayurveda": {
      "title": "Ayurveda (Natural & Dosha Balance)",
      "badge_color": "emerald",
      "dosha": "Pitta-Vata Shiroroga (Ardhavabhedaka)",
      "medicines": [
        {"name": "Shirashooladi Vajra Ras", "type": "Classical Herbomineral", "dose": "1 tablet twice daily with goat milk or warm water", "purpose": "Addresses severe chronic headaches and migraines"},
        {"name": "Brahmi Vati", "type": "Nervine Tonic", "dose": "1 tablet at bedtime with warm water", "purpose": "Calms mental over-exhaustion, anxiety, and tension"},
        {"name": "Anu Taila Nasya", "type": "Nasal Drops", "dose": "2 drops in each nostril every morning", "purpose": "Clears nasal pathways, relieves sinus pressure and headaches"}
      ],
      "ahara_vihara": ["Apply sandalwood or mint paste over temples for cooling relief", "Drink coconut water and stay away from bright flickering screens and loud noise", "Practice Anulom-Vilom pranayama 10 minutes daily"]
    },
    "homeopathy": {
      "title": "Homeopathy (Constitutional Care)",
      "badge_color": "amber",
      "medicines": [
        {"name": "Belladonna 30C", "potency": "30C", "dose": "4 pills every 2 hours during acute phase", "purpose": "Intense throbbing headache, blood rushing to head, sensitive to light/noise"},
        {"name": "Spigelia 30C", "potency": "30C", "dose": "4 pills thrice daily", "purpose": "Left-sided headache beginning in morning and ending at sunset"},
        {"name": "Sanguinaria Canadensis 30C", "potency": "30C", "dose": "4 pills twice daily", "purpose": "Right-sided migraine starting from nape of neck settling over right eye"}
      ],
      "rule": "Take on clean palate. Do not touch medicine with bare hands."
    }
  }
];

export const FALLBACK_TOKENS = [
  {
    "token_id": "MED-101",
    "timestamp": "08:45 AM",
    "name": "Ramesh Verma",
    "age": 52,
    "gender": "Male",
    "abha_id": "91-4829-1029-4412",
    "chief_complaint": "Acidity, Gas & Heartburn",
    "duration": "4 days",
    "severity": "Moderate",
    "triage_priority": "P3 - Routine",
    "triage_color": "emerald",
    "red_flag_alert": false,
    "preferred_pathy": "Ayurveda & Allopathy",
    "preliminary_notes": "Epigastric burning post meals, no chest radiation. Normal vitals. Prescribed Avipattikar & Pantoprazole."
  },
  {
    "token_id": "MED-102",
    "timestamp": "09:05 AM",
    "name": "Sunita Devi",
    "age": 44,
    "gender": "Female",
    "abha_id": "91-3019-8812-9014",
    "chief_complaint": "Joint & Knee Pain",
    "duration": "3 weeks",
    "severity": "Moderate",
    "triage_priority": "P2 - Priority",
    "triage_color": "amber",
    "red_flag_alert": false,
    "preferred_pathy": "Ayurveda & Homeopathy",
    "preliminary_notes": "Bilateral knee stiffness, aggravated in morning. Vata aggravation. Suggesting Yograj Guggulu & Rhus Tox."
  }
];
