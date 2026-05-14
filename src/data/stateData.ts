export const STATE_CULTURAL_DATA = {
  "IN-KA": {
    name: "Karnataka",
    banner: "https://images.unsplash.com/photo-1541014285461-84067980ea0a?q=80&w=1200&auto=format&fit=crop",
    tradition: "Yakshagana",
    folklore: "The Legend of the Stone Chariot in Hampi",
    dance: "Dollu Kunitha",
    festival: "Mysuru Dasara",
    food: "Bisi Bele Bath",
    art: "Mysore Painting",
    desc: "A land of ancient empires and vibrant folk traditions, where the stone tells stories of the Vijayanagara legacy.",
    recommendations: ["Theyyam (Kerala)", "Kathakali (Kerala)"]
  },
  "IN-KL": {
    name: "Kerala",
    banner: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop",
    tradition: "Koodiyattam",
    folklore: "The Legend of Mahabali",
    dance: "Kathakali & Theyyam",
    festival: "Onam",
    food: "Sadhya",
    art: "Mural Painting",
    desc: "Known as God's Own Country, it preserves the most ancient Sanskrit theatre in the world.",
    recommendations: ["Yakshagana (Karnataka)", "Bharatanatyam (Tamil Nadu)"]
  },
  "IN-RJ": {
    name: "Rajasthan",
    banner: "https://images.unsplash.com/photo-1599661046289-e31887846eac?q=80&w=1200&auto=format&fit=crop",
    tradition: "Ghoomar",
    folklore: "The Valor of Padmini",
    dance: "Kalbelia",
    festival: "Pushkar Mela",
    food: "Dal Baati Churma",
    art: "Blue Pottery",
    desc: "The desert land of kings, marked by formidable forts and the rhythmic clack of puppets.",
    recommendations: ["Bhangra (Punjab)", "Garba (Gujarat)"]
  },
  "IN-MH": {
    name: "Maharashtra",
    banner: "https://images.unsplash.com/photo-1562121307-88d01f807205?q=80&w=1200&auto=format&fit=crop",
    tradition: "Lavani",
    folklore: "Sagas of Chhatrapati Shivaji",
    dance: "Dhangari Gaja",
    festival: "Ganesh Chaturthi",
    food: "Puran Poli",
    art: "Warli Painting",
    desc: "A powerhouse of culture spanning from the high cliffs of Sahyadri to the bustling streets of Mumbai.",
    recommendations: ["Matki Dance (MP)", "Yakshagana (Karnataka)"]
  },
  "IN-PB": {
    name: "Punjab",
    banner: "https://images.unsplash.com/photo-1514222139-b576bb5ce003?q=80&w=1200&auto=format&fit=crop",
    tradition: "Giddha",
    folklore: "Heer Ranjha",
    dance: "Bhangra",
    festival: "Baisakhi",
    food: "Sarson ka Saag",
    art: "Phulkari",
    desc: "The land of five rivers, celebrated for its high energy, massive harvests, and colorful crafts.",
    recommendations: ["Ghoomar (Rajasthan)", "Bihu (Assam)"]
  },
  "IN-UP": {
    name: "Uttar Pradesh",
    banner: "https://images.unsplash.com/photo-1564507592316-56d8f5d6bb83?q=80&w=1200&auto=format&fit=crop",
    tradition: "Kathak",
    folklore: "Tales of the Ramayana",
    dance: "Charkula",
    festival: "Holi in Mathura",
    food: "Galouti Kebab",
    art: "Chikan Embroidery",
    desc: "The spiritual heartland where history and faith flow together like the Ganges.",
    recommendations: ["Odissi (Odisha)", "Kathakali (Kerala)"]
  },
  "IN-WB": {
    name: "West Bengal",
    banner: "https://images.unsplash.com/photo-1558431382-bb7b38c49051?q=80&w=1200&auto=format&fit=crop",
    tradition: "Baul Sangeet",
    folklore: "The Bonbibi Myth",
    dance: "Chhau Dance",
    festival: "Durga Puja",
    food: "Machher Jhol",
    art: "Kantha Stitch",
    desc: "India's intellectual capital, blending colonial history with deep-rooted mystical art forms.",
    recommendations: ["Manipuri (Manipur)", "Bihu (Assam)"]
  },
  "IN-GJ": {
    name: "Gujarat",
    banner: "https://images.unsplash.com/photo-1594950195709-a14f66c241d7?q=80&w=1200&auto=format&fit=crop",
    tradition: "Garba",
    folklore: "The Legend of Krishna in Dwarka",
    dance: "Dandiya Raas",
    festival: "Navratri",
    food: "Dhokla",
    art: "Lippan Art",
    desc: "A coastal state of merchants and saints, world-famous for its circular white desert and colorful dance.",
    recommendations: ["Lavani (Maharashtra)", "Ghoomar (Rajasthan)"]
  },
  "IN-TN": {
    name: "Tamil Nadu",
    banner: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop",
    tradition: "Bharatanatyam",
    folklore: "The Epic of Silappatikaram",
    dance: "Karakattam",
    festival: "Pongal",
    food: "Dosa & Sambhar",
    art: "Tanjore Painting",
    desc: "Guardian of the classical Dravidian civilization, home to towering granite temples and timeless art.",
    recommendations: ["Kuchipudi (Andhra)", "Kathakali (Kerala)"]
  },
  "IN-AS": {
    name: "Assam",
    banner: "https://images.unsplash.com/photo-1571217030800-48301bc613d5?q=80&w=1200&auto=format&fit=crop",
    tradition: "Bihu",
    folklore: "The Story of Tejimola",
    dance: "Sattriya",
    festival: "Bhogali Bihu",
    food: "Masor Tenga",
    art: "Muga Silk Weaving",
    desc: "The gateway to the Northeast, defined by tea gardens, rhinos, and the mighty Brahmaputra.",
    recommendations: ["Raas Leela (Manipur)", "Chhau (Bengal)"]
  }
};

export type StateCode = keyof typeof STATE_CULTURAL_DATA;
