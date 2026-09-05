"""
MediKiosk Multi-Pathy Clinical Database
Structured, concise solutions across Allopathy, Ayurveda, and Homeopathy.
Kept crisp and easy to understand to reduce cognitive overload.
"""

CONDITIONS_DB = [
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
    },
    {
        "id": "skin-rash-allergy",
        "name": "Skin Rash, Itching & Allergy",
        "hindi_name": "त्वचा में खुजली, दाने और एलर्जी",
        "category": "Dermatological",
        "icon": "ShieldAlert",
        "severity_level": "Mild",
        "brief": "Hives, red itchy patches, seasonal allergies, or contact dermatitis.",
        "red_flags": [
            "Swelling of lips, tongue, or difficulty breathing (Anaphylaxis shock - CALL 108/112!)",
            "Blistering skin peeling over large body surface",
            "Rapidly spreading red hot streak indicating cellulitis"
        ],
        "allopathy": {
            "title": "Allopathy (Modern Medicine)",
            "badge_color": "blue",
            "medicines": [
                {"name": "Levocetirizine (5mg) or Fexofenadine (120mg)", "type": "Non-sedating Antihistamine", "dose": "1 tablet once daily (evening)", "purpose": "Rapidly blocks histamine and stops itching and hives"},
                {"name": "Calamine Lotion + Aloe", "type": "Soothing Topical Lotion", "dose": "Apply thin layer over affected skin 2-3 times/day", "purpose": "Cools skin surface and prevents scratching"},
                {"name": "Hydrocortisone 1% Cream (Short-term)", "type": "Mild Topical Steroid", "dose": "Apply sparingly once daily for max 5 days", "purpose": "Reduces localized allergic dermatitis"}
            ],
            "precautions": ["Avoid hot water baths; use lukewarm or cool water", "Do not scratch to avoid secondary bacterial infection"],
            "doctor_visit": "Immediate emergency room visit if facial swelling or throat tightness begins."
        },
        "ayurveda": {
            "title": "Ayurveda (Natural & Dosha Balance)",
            "badge_color": "emerald",
            "dosha": "Pitta-Rakta Dushti (Kushta / Sheetapitta)",
            "medicines": [
                {"name": "Khadirarishtha", "type": "Fermented Herbal Tonic", "dose": "15-20 ml with equal water twice daily after meals", "purpose": "Master blood purifier and chronic allergy reliever"},
                {"name": "Neem Ghanvati", "type": "Blood Purifier Extract", "dose": "1 tablet twice daily", "purpose": "Antimicrobial, reduces systemic heat and clears eruptions"},
                {"name": "Haridra Khanda", "type": "Turmeric Granules", "dose": "1 teaspoonful with warm milk twice daily", "purpose": "Superb anti-allergic formulation for recurrent urticaria"}
            ],
            "ahara_vihara": ["Apply pure virgin coconut oil infused with camphor on itchy areas", "Avoid sour curd, pickles, fermented foods, seafood, and excessive salt", "Wear loose cotton clothes; avoid tight synthetic fabrics"]
        },
        "homeopathy": {
            "title": "Homeopathy (Constitutional Care)",
            "badge_color": "amber",
            "medicines": [
                {"name": "Apis Mellifica 30C", "potency": "30C", "dose": "4 globules every 3 hours", "purpose": "Red, puffy, stinging hives relieved by cold water application"},
                {"name": "Rhus Toxicodendron 30C", "potency": "30C", "dose": "4 globules thrice daily", "purpose": "Intense itching with small blister-like eruptions, relieved by hot baths"},
                {"name": "Sulphur 30C", "potency": "30C", "dose": "4 globules once in the morning", "purpose": "Severe itching and burning made significantly worse by water/washing and warmth of bed"}
            ],
            "rule": "Avoid handling pellets; tip directly from bottle cap onto tongue."
        }
    },
    {
        "id": "stress-sleep",
        "name": "Stress, Anxiety & Sleeplessness",
        "hindi_name": "तनाव, चिंता और नींद न आना",
        "category": "Mental Wellness & Sleep",
        "icon": "Moon",
        "severity_level": "Mild to Moderate",
        "brief": "Restless mind, difficulty falling asleep, workplace fatigue, palpitation.",
        "red_flags": [
            "Thoughts of self-harm or despair (Call National Helpline 14416 / Tele-MANAS)",
            "Severe panic attack with chest pain mimicking infarction",
            "Hallucinations or acute disorientation"
        ],
        "allopathy": {
            "title": "Allopathy (Modern Medicine)",
            "badge_color": "blue",
            "medicines": [
                {"name": "Melatonin (3mg - 5mg)", "type": "Circadian Regulator", "dose": "1 tablet 30-45 minutes before sleep", "purpose": "Resets sleep-wake cycle naturally without chemical dependency"},
                {"name": "Magnesium Glycinate (250mg)", "type": "Nerve Relaxant Mineral", "dose": "1 tablet at dinner", "purpose": "Calms neuromuscular tension and eases anxiety"},
                {"name": "Vitamin B-Complex + L-Theanine", "type": "Neuro-Support Supplement", "dose": "1 capsule in morning with breakfast", "purpose": "Improves daytime focus and stress resilience"}
            ],
            "precautions": ["Avoid prescription sedatives (benzodiazepines) without formal psychiatrist oversight", "Cut caffeine after 3 PM"],
            "doctor_visit": "Visit psychiatry / clinical psychology OPD if insomnia lasts > 3 weeks."
        },
        "ayurveda": {
            "title": "Ayurveda (Natural & Dosha Balance)",
            "badge_color": "emerald",
            "dosha": "Vata-Prana Vayu Imbalance (Anidra / Manas Roga)",
            "medicines": [
                {"name": "Ashwagandha Churna / Capsule (500mg)", "type": "Adaptogenic Rasayana", "dose": "1 capsule with warm milk at bedtime", "purpose": "Lowers cortisol, strengthens nerves, and promotes deep restorative sleep"},
                {"name": "Brahmi Vati / Shankhpushpi Syrup", "type": "Medhya Rasayana", "dose": "10 ml syrup or 1 tablet twice daily", "purpose": "Quietens racing thoughts and enhances memory & tranquility"},
                {"name": "Ksheerabala Taila (Pada Abhyanga)", "type": "Foot Massage Oil", "dose": "Massage soles of feet for 5 minutes before bed", "purpose": "Grounds hyperactivity and initiates instant sleep reflex"}
            ],
            "ahara_vihara": ["Drink warm nutmeg (Jaiphal) spiced milk 30 minutes before sleep", "Zero screen time (phone/laptop) 1 hour prior to bedtime", "5-5-5 Box breathing or Bhramari pranayama for 7 minutes"]
        },
        "homeopathy": {
            "title": "Homeopathy (Constitutional Care)",
            "badge_color": "amber",
            "medicines": [
                {"name": "Passiflora Incarnata Mother Tincture (Q)", "potency": "Q (Mother Tincture)", "dose": "15-20 drops in 1/4 cup lukewarm water before bed", "purpose": "Gentle herbal hypnotic that produces peaceful, refreshing natural sleep"},
                {"name": "Coffea Cruda 30C", "potency": "30C", "dose": "4 pills at bedtime", "purpose": "Mind over-active with rapid influx of ideas; wide awake and nervous"},
                {"name": "Aconitum Napellus 30C", "potency": "30C", "dose": "4 pills during acute restlessness", "purpose": "Sudden anxiety attacks, restlessness, and fearfulness"}
            ],
            "rule": "For mother tincture, use clean glass with clean drinking water. Keep 15 mins gap from meals."
        }
    },
    {
        "id": "stomach-diarrhea",
        "name": "Diarrhea, Loose Stools & Stomach Cramps",
        "hindi_name": "दस्त, पेट मरोड़ और दस्त लगना",
        "category": "Digestive",
        "icon": "Droplet",
        "severity_level": "Moderate",
        "brief": "Watery loose stools, abdominal cramping, nausea, dehydration.",
        "red_flags": [
            "Signs of severe dehydration (sunken eyes, no urine in 8 hours, fainting)",
            "Blood or pus in stools (dysentery)",
            "High fever with persistent uncontrolled vomiting"
        ],
        "allopathy": {
            "title": "Allopathy (Modern Medicine)",
            "badge_color": "blue",
            "medicines": [
                {"name": "WHO-Formula ORS (Oral Rehydration Salts)", "type": "Electrolyte Solution", "dose": "Drink 200ml after every loose bowel movement", "purpose": "Crucial: Prevents dehydration and cardiac electrolyte collapse"},
                {"name": "Zinc Sulphate (20mg)", "type": "Gut Mucosa Supplement", "dose": "1 tablet daily for 14 days", "purpose": "Repairs intestinal lining and shortens diarrhea duration"},
                {"name": "Probiotic (Bacillus Clausii / L. Rhamnosus)", "type": "Microbiome Restorer", "dose": "1 mini bottle or sachet twice daily", "purpose": "Restores healthy gut bacteria and suppresses pathogens"}
            ],
            "precautions": ["Do not take anti-motility drugs (e.g. Loperamide) if stools contain blood or high fever is present", "Drink safe boiled water"],
            "doctor_visit": "Immediate hospital visit if patient cannot keep fluids down or urine stops."
        },
        "ayurveda": {
            "title": "Ayurveda (Natural & Dosha Balance)",
            "badge_color": "emerald",
            "dosha": "Pitta-Vata Atisara (Digestive Fire Weakness)",
            "medicines": [
                {"name": "Kutajghan Vati", "type": "Bark Formulation", "dose": "2 tablets twice daily with water", "purpose": "Legendary Ayurvedic astringent that binds loose stools and kills gut amoeba"},
                {"name": "Bilvadi Churna (Bael Fruit)", "type": "Fruit Formulation", "dose": "1 teaspoonful with buttermilk twice daily", "purpose": "Soothes inflamed intestines and stops painful spasms"},
                {"name": "Mustarishta", "type": "Fermented Digestive", "dose": "15 ml with equal water after light food", "purpose": "Rekindles Agni and relieves cramps and gas"}
            ],
            "ahara_vihara": ["Drink fresh spiced buttermilk (Takra) with roasted cumin and rock salt", "Eat soft banana, boiled apple, and thin rice congee with pinch of salt", "Strictly avoid milk, greasy gravies, raw salads, and sugary sodas"]
        },
        "homeopathy": {
            "title": "Homeopathy (Constitutional Care)",
            "badge_color": "amber",
            "medicines": [
                {"name": "Podophyllum 30C", "potency": "30C", "dose": "4 pills after every loose stool (up to 3 times/day)", "purpose": "Profuse, watery, gushing painless morning diarrhea with gurgling in abdomen"},
                {"name": "Arsenicum Album 30C", "potency": "30C", "dose": "4 pills thrice daily", "purpose": "Diarrhea and vomiting caused by spoiled food/water with burning pain and great prostration"},
                {"name": "Merc Sol 30C", "potency": "30C", "dose": "4 pills twice daily", "purpose": "Stools with straining, mucous, never-get-done feeling"}
            ],
            "rule": "Take separately from meals. Keep pills dry."
        }
    },
    {
        "id": "diabetes-support",
        "name": "Diabetes & Blood Sugar Support",
        "hindi_name": "मधुमेह और ब्लड शुगर नियंत्रण",
        "category": "Metabolic & Lifestyle",
        "icon": "PieChart",
        "severity_level": "Chronic / Supportive",
        "brief": "High fasting glucose, sweet cravings, frequent urination, fatigue.",
        "red_flags": [
            "Blood glucose > 300 mg/dL or ketones in urine",
            "Fruity-smelling breath, deep rapid breathing, vomiting (Diabetic Ketoacidosis)",
            "Non-healing foot ulcer with redness or discoloration"
        ],
        "allopathy": {
            "title": "Allopathy (Modern Medicine)",
            "badge_color": "blue",
            "medicines": [
                {"name": "Metformin (500mg SR)", "type": "Biguanide (Prescription Standard)", "dose": "As prescribed by doctor with dinner", "purpose": "Increases insulin sensitivity and reduces liver glucose release"},
                {"name": "Alpha Lipoic Acid + Methylcobalamin", "type": "Diabetic Nerve Support", "dose": "1 capsule daily with lunch", "purpose": "Prevents tingling, numbness, and diabetic peripheral neuropathy"},
                {"name": "Home Blood Glucose Monitor", "type": "Diagnostic Kit", "dose": "Check Fasting (<100 mg/dL) & Post-Meal (<140 mg/dL)", "purpose": "Essential for tracking therapy success"}
            ],
            "precautions": ["Never change or stop prescription medication without consulting your diabetologist", "Inspect feet daily"],
            "doctor_visit": "Regular 3-month HbA1c check-up and annual eye/kidney screening."
        },
        "ayurveda": {
            "title": "Ayurveda (Natural & Dosha Balance)",
            "badge_color": "emerald",
            "dosha": "Kapha-Medo Dushti (Madhumeha / Prameha)",
            "medicines": [
                {"name": "Chandraprabha Vati", "type": "Classical Herbomineral", "dose": "2 tablets twice daily with water", "purpose": "Strengthens urinary tract, cleanses metabolic toxins, and reduces fatigue"},
                {"name": "Madhumehantak Churna", "type": "Bitter Herbal Blend", "dose": "1 tsp with warm water 30 mins before meals", "purpose": "Potent blend of Karela, Jamun, and Gurmar that stimulates pancreatic beta cells"},
                {"name": "Shilajit Shuddha (Capsule/Resin)", "type": "Rejuvenator (Rasayana)", "dose": "1 capsule daily morning with milk/water", "purpose": "Boosts stamina, cellular energy, and combats chronic weakness"}
            ],
            "ahara_vihara": ["Sip fenugreek (Methi) seed water soaked overnight every morning", "Replace refined white rice/wheat with barley (Yava), millets (Ragi/Bajra), and oats", "Brisk walking 40 minutes every morning without fail"]
        },
        "homeopathy": {
            "title": "Homeopathy (Constitutional Care)",
            "badge_color": "amber",
            "medicines": [
                {"name": "Syzygium Jambolanum 1X / Q", "potency": "Mother Tincture / 1X", "dose": "10-15 drops in 1/4 cup water thrice daily", "purpose": "Most prompt homeopathic remedy to reduce sugar in urine and blood"},
                {"name": "Gymnema Sylvestre Q", "potency": "Mother Tincture", "dose": "10 drops twice daily", "purpose": "Suppresses craving for sweets and supports healthy glycemic index"},
                {"name": "Uranium Nitricum 30C", "potency": "30C", "dose": "4 pills twice daily", "purpose": "Frequent urination, great thirst, dry tongue, and rapid emaciation"}
            ],
            "rule": "Take 20 mins apart from allopathy medicines. Do not skip regular physician monitoring."
        }
    },
    {
        "id": "hypertension-bp",
        "name": "High BP & Cardiac Wellness Support",
        "hindi_name": "उच्च रक्तचाप और हृदय स्वास्थ्य",
        "category": "Cardiovascular & Lifestyle",
        "icon": "Heart",
        "severity_level": "Chronic / Supportive",
        "brief": "Occasional dizziness, neck stiffness, elevated systolic/diastolic readings.",
        "red_flags": [
            "Severe chest pain, pressure, radiating to back, neck, or arm (Call 108/112 emergency!)",
            "Blood pressure > 180/120 mmHg (Hypertensive crisis)",
            "Sudden numbness or paralysis in one side of the face/body"
        ],
        "allopathy": {
            "title": "Allopathy (Modern Medicine)",
            "badge_color": "blue",
            "medicines": [
                {"name": "Telmisartan (40mg) / Amlodipine (5mg)", "type": "Antihypertensive (Prescription)", "dose": "As prescribed by physician (strictly once daily)", "purpose": "Relaxes arterial walls and prevents strokes and heart failure"},
                {"name": "Coenzyme Q10 + Omega-3", "type": "Cardio-Nutritional Support", "dose": "1 softgel daily after breakfast", "purpose": "Improves heart muscle energetics and endothelial elasticity"},
                {"name": "Digital BP Monitor", "type": "Home Monitoring", "dose": "Record readings morning & evening at rest (<120/80 mmHg)", "purpose": "Enables accurate dosage titration by doctor"}
            ],
            "precautions": ["Strictly limit daily sodium/salt intake (< 5g / 1 tsp per day)", "Never discontinue BP tablets abruptly"],
            "doctor_visit": "Monthly physician consultation until blood pressure stabilizes."
        },
        "ayurveda": {
            "title": "Ayurveda (Natural & Dosha Balance)",
            "badge_color": "emerald",
            "dosha": "Vata-Pitta Raktavrita (Uchha Raktachapa)",
            "medicines": [
                {"name": "Arjunarishta (or Arjuna Kwath)", "type": "Cardioprotective Tonic", "dose": "15 ml with equal water twice daily after meals", "purpose": "Terminalia Arjuna strengthens myocardium and regulates arterial pressure"},
                {"name": "Sarpagandha Ghanvati", "type": "Classical Alkaloid Tablet", "dose": "1 tablet at bedtime under Ayurvedic doctor guidance", "purpose": "Potent natural antihypertensive and sedative"},
                {"name": "Brahmi Vati", "type": "Anti-Stress Rasayana", "dose": "1 tablet twice daily with water", "purpose": "Relieves anxiety-induced sympathetic spikes in blood pressure"}
            ],
            "ahara_vihara": ["Garlic clove crushed and taken in warm water in the morning", "Low sodium diet: eliminate papads, pickles, canned soups, and salty chips", "Daily 20 mins Shavasana (Corpse pose) and deep diaphragmatic breathing"]
        },
        "homeopathy": {
            "title": "Homeopathy (Constitutional Care)",
            "badge_color": "amber",
            "medicines": [
                {"name": "Rauwolfia Serpentina Q", "potency": "Mother Tincture", "dose": "10-15 drops in 1/4 cup water twice daily", "purpose": "Known physiological remedy for high blood pressure with irritability and restlessness"},
                {"name": "Crataegus Oxyacantha Q", "potency": "Heart Tonic", "dose": "10 drops in water twice daily", "purpose": "Strengthens heart muscle, dissolves crustaceous deposits in arteries"},
                {"name": "Glonoinum 30C", "potency": "30C", "dose": "4 pills during sudden throbbing rush of blood to head", "purpose": "Surge of blood to head with throbbing carotids and dizziness"}
            ],
            "rule": "Take tinctures in fresh non-metallic cup. Continue prescribed routine medicines."
        }
    }
]

# Quick helper indices
CONDITIONS_MAP = {c["id"]: c for c in CONDITIONS_DB}

def get_all_conditions():
    """Return list of conditions with basic metadata for fast UI rendering."""
    return [
        {
            "id": c["id"],
            "name": c["name"],
            "hindi_name": c["hindi_name"],
            "category": c["category"],
            "icon": c["icon"],
            "severity_level": c["severity_level"],
            "brief": c["brief"],
            "red_flags_count": len(c["red_flags"])
        }
        for c in CONDITIONS_DB
    ]

def get_condition_details(condition_id: str):
    """Return full solutions (Allopathy, Ayurveda, Homeopathy) for a condition."""
    return CONDITIONS_MAP.get(condition_id)

def search_conditions(query: str):
    """Search conditions by symptom or illness name."""
    q = query.lower().strip()
    if not q:
        return get_all_conditions()
    results = []
    for c in CONDITIONS_DB:
        if (q in c["name"].lower() or 
            q in c["hindi_name"].lower() or 
            q in c["brief"].lower() or 
            q in c["category"].lower()):
            results.append(c)
    return results
