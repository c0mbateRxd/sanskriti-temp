export type StateCategory = 'Cultural' | 'Heritage' | 'Festive' | 'Artistic' | 'Culinary';

export interface StateCulture {
  id: string;
  name: Record<string, string>;
  description: Record<string, string>;
  dance: string;
  textile: string;
  art: string;
  category: StateCategory;
  tags: string[];
  image: string;
  gradient: string;
}

export const STATES_DATA: StateCulture[] = [
  {
    id: 'karnataka',
    name: { en: 'Karnataka', hi: 'कर्नाटक', kn: 'ಕರ್ನಾಟಕ' },
    description: {
      en: 'A land of diverse cultures, from the tech hub of Bengaluru to the architectural splendors of Hampi and the coffee-scented hills of Coorg.',
      hi: 'विविध संस्कृतियों की भूमि, बेंगलुरु के टेक हब से लेकर हंपी के वास्तुशिल्प वैभव और कूर्ग की कॉफी-सुगंधित पहाड़ियों तक।',
      kn: 'ಬೆಂಗಳೂರಿನ ತಾಂತ್ರಿಕ ಕೇಂದ್ರದಿಂದ ಹಂಪಿಯ ವಾಸ್ತುಶಿಲ್ಪದ ವೈಭವ ಮತ್ತು ಕೊಡಗಿನ ಕಾಫಿಯ ಪರಿಮಳಯುಕ್ತ ಬೆಟ್ಟಗಳವರೆಗೆ ವಿವಿಧ ಸಂಸ್ಕೃತಿಗಳ ನಾಡು.'
    },
    dance: 'Yakshagana',
    textile: 'Mysore Silk',
    art: 'Channapatna Toys',
    category: 'Heritage',
    tags: ['Coastal', 'Temples', 'Nature'],
    image: 'https://images.unsplash.com/photo-1600443152227-88e2d4076711?auto=format&fit=crop&q=80&w=800',
    gradient: 'from-orange-500 to-red-600'
  },
  {
    id: 'tamil-nadu',
    name: { en: 'Tamil Nadu', hi: 'तमिलनाडु', kn: 'ತಮಿಳುನಾಡು' },
    description: {
      en: 'The gateway to South Indian culture, home to magnificent Dravidian temples and the vibrant tradition of Bharatanatyam.',
      hi: 'दक्षिण भारतीय संस्कृति का प्रवेश द्वार, शानदार द्रविड़ मंदिरों और भरतनाट्यम की जीवंत परंपरा का घर।',
      kn: 'ದಕ್ಷಿಣ ಭಾರತದ ಸಂಸ್ಕೃತಿಯ ಪ್ರವೇಶದ್ವಾರ, ಭವ್ಯವಾದ ದ್ರಾವಿಡ ದೇವಾಲಯಗಳು ಮತ್ತು ಭರತನಾಟ್ಯದ ರೋಮಾಂಚಕ ಸಂಪ್ರದಾಯದ ಮನೆ.'
    },
    dance: 'Bharatanatyam',
    textile: 'Kanchipuram Silk',
    art: 'Tanjore Painting',
    category: 'Cultural',
    tags: ['Temples', 'Classical', 'Coastal'],
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800',
    gradient: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'rajasthan',
    name: { en: 'Rajasthan', hi: 'राजस्थान', kn: 'ರಾಜಸ್ಥಾನ' },
    description: {
      en: 'The land of kings, famous for its majestic forts, sprawling deserts, and colorful traditional costumes.',
      hi: 'राजाओं की भूमि, अपने राजसी किलों, विस्तृत रेगिस्तानों और रंगीन पारंपरिक परिधानों के लिए प्रसिद्ध।',
      kn: 'ರಾಜರ ನಾಡು, ತನ್ನ ಭವ್ಯವಾದ ಕೋಟೆಗಳು, ವಿಸ್ತಾರವಾದ ಮರುಭೂಮಿಗಳು ಮತ್ತು ವರ್ಣರಂಜಿತ ಸಾಂಪ್ರದಾಯಿಕ ಉಡುಪುಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾಗಿದೆ.'
    },
    dance: 'Ghoomar',
    textile: 'Bandhani',
    art: 'Phad Painting',
    category: 'Heritage',
    tags: ['Desert', 'Forts', 'Royalty'],
    image: 'https://images.unsplash.com/photo-1477584289137-09961629dede?auto=format&fit=crop&q=80&w=800',
    gradient: 'from-yellow-500 to-amber-600'
  },
  {
    id: 'kerala',
    name: { en: 'Kerala', hi: 'केरल', kn: 'ಕೇರಳ' },
    description: {
      en: "Known as 'God's Own Country', Kerala is famous for its backwaters, Ayurvedic treatments, and the classical dance Kathakali.",
      hi: "'ईश्वर का अपना देश' के रूप में जाना जाने वाला केरल अपने बैकवाटर, आयुर्वेदिक उपचार और शास्त्रीय नृत्य कथकली के लिए प्रसिद्ध है।",
      kn: "'ದೇವರ ಸ್ವಂತ ನಾಡು' ಎಂದು ಕರೆಯಲ್ಪಡುವ ಕೇರಳವು ತನ್ನ ಹಿನ್ನೀರು, ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸೆಗಳು ಮತ್ತು ಶಾಸ್ತ್ರೀಯ ನೃತ್ಯ ಕಥಕ್ಕಳಿಗೆ ಪ್ರಸಿದ್ಧವಾಗಿದೆ."
    },
    dance: 'Kathakali',
    textile: 'Kasavu Saree',
    art: 'Mural Paintings',
    category: 'Artistic',
    tags: ['Backwaters', 'Ayurveda', 'Coastal'],
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    id: 'gujarat',
    name: { en: 'Gujarat', hi: 'गुजरात', kn: 'ಗುಜರಾತ್' },
    description: {
      en: 'A state of festivals and vibrant commercial spirit, home to the Great Rann of Kutch and various handicraft traditions.',
      hi: 'त्योहारों और जीवंत वाणिज्यिक भावना का राज्य, कच्छ के महान रण और विभिन्न हस्तशिल्प परंपराओं का घर।',
      kn: 'ಹಬ್ಬಗಳ ಮತ್ತು ರೋಮಾಂಚಕ ವಾಣಿಜ್ಯ ಮನೋಭಾವದ ರಾಜ್ಯ, ಕಚ್‌ನ ಮಹಾನ್ ರನ್ ಮತ್ತು ವಿವಿಧ ಕರಕುಶಲ ಸಂಪ್ರದಾಯಗಳ ಮನೆ.'
    },
    dance: 'Garba',
    textile: 'Patola Silk',
    art: 'Rogan Art',
    category: 'Festive',
    tags: ['Business', 'Coastal', 'White Desert'],
    image: 'https://images.unsplash.com/photo-1599933333333-333333333333?auto=format&fit=crop&q=80&w=800',
    gradient: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'punjab',
    name: { en: 'Punjab', hi: 'पंजाब', kn: 'ಪಂಜಾಬ್' },
    description: {
      en: 'The land of five rivers, known for its high-energy music, hearty cuisine, and the Golden Temple.',
      hi: 'पांच नदियों की भूमि, अपने उच्च-ऊर्जा संगीत, हार्दिक व्यंजन और स्वर्ण मंदिर के लिए जानी जाती है।',
      kn: 'ಐದು ನದಿಗಳ ನಾಡು, ಅದರ ಹೈ-ಎನರ್ಜಿ ಸಂಗೀತ, ಹೃತ್ಪೂರ್ವಕ ಪಾಕಪದ್ಧತಿ ಮತ್ತು ಸ್ವರ್ಣಮಂದಿರಕ್ಕೆ ಹೆಸರುವಾಸಿಯಾಗಿದೆ.'
    },
    dance: 'Bhangra',
    textile: 'Phulkari',
    art: 'Punjabi Jutti',
    category: 'Festive',
    tags: ['Agriculture', 'Spiritual', 'Food'],
    image: 'https://images.unsplash.com/photo-1514222139-b57c44ce91b2?auto=format&fit=crop&q=80&w=800',
    gradient: 'from-amber-400 to-yellow-600'
  },
  {
    id: 'west-bengal',
    name: { en: 'West Bengal', hi: 'पश्चिम बंगाल', kn: 'ಪಶ್ಚಿಮ ಬಂಗಾಳ' },
    description: {
      en: 'The cultural capital of India, rich in literature, arts, and home to the majestic Sundarbans and tea gardens of Darjeeling.',
      hi: 'भारत की सांस्कृतिक राजधानी, साहित्य, कला में समृद्ध और राजसी सुंदरबन और दार्जिलिंग के चाय बागानों का घर।',
      kn: 'ಭಾರತದ ಸಾಂಸ್ಕೃತಿಕ ರಾಜಧಾನಿ, ಸಾಹಿತ್ಯ, ಕಲೆಗಳಲ್ಲಿ ಶ್ರೀಮಂತವಾಗಿದೆ ಮತ್ತು ಭವ್ಯವಾದ ಸುಂದರಬನಗಳು ಮತ್ತು ಡಾರ್ಜಿಲಿಂಗ್‌ನ ಚಹಾ ತೋಟಗಳ ಮನೆ.'
    },
    dance: 'Chhau',
    textile: 'Jamdani',
    art: 'Terracotta Art',
    category: 'Artistic',
    tags: ['Literature', 'Nature', 'Classical'],
    image: 'https://images.unsplash.com/photo-1558431382-27e30043132e?auto=format&fit=crop&q=80&w=800',
    gradient: 'from-red-500 to-rose-700'
  },
  {
    id: 'assam',
    name: { en: 'Assam', hi: 'असम', kn: 'ಅಸ್ಸಾಂ' },
    description: {
      en: 'A gateway to North East India, famous for its sprawling tea estates, silk production, and the one-horned rhino.',
      hi: 'उत्तर पूर्व भारत का एक प्रवेश द्वार, अपने विशाल चाय बागानों, रेशम उत्पादन और एक सींग वाले गैंडे के लिए प्रसिद्ध।',
      kn: 'ಲಕ್ಷಾಂತರ ಚಹಾ ತೋಟಗಳು, ರೇಷ್ಮೆ ಉತ್ಪಾದನೆ ಮತ್ತು ಒಂದು ಕೊಂಬಿನ ಘೇಂಡಾಮೃಗಕ್ಕೆ ಹೆಸರಾದ ಈಶಾನ್ಯ ಭಾರತದ ಪ್ರವೇಶದ್ವಾರ.'
    },
    dance: 'Bihu',
    textile: 'Muga Silk',
    art: 'Bell Metal Craft',
    category: 'Heritage',
    tags: ['Tea', 'Wildlife', 'River'],
    image: 'https://images.unsplash.com/photo-1590050752117-23a9d7fc2113?auto=format&fit=crop&q=80&w=800',
    gradient: 'from-teal-500 to-emerald-700'
  },
  {
    id: 'andhra-pradesh',
    name: { en: 'Andhra Pradesh', hi: 'आंध्र प्रदेश', kn: 'ಆಂಧ್ರಪ್ರದೇಶ' },
    description: {
      en: 'The Rice Bowl of India, known for its spicy cuisine, the world-famous Tirupati temple, and the elegant Kuchipudi dance.',
      hi: 'भारत का चावल का कटोरा, अपने तीखे व्यंजनों, विश्व प्रसिद्ध तिरुपति मंदिर और सुरुचिपूर्ण कुचिपुड़ी नृत्य के लिए जाना जाता है।',
      kn: 'ಭಾರತದ ಅನ್ನದ ಬಟ್ಟಲು, ಅದರ ಮಸಾಲೆಯುಕ್ತ ಪಾಕಪದ್ಧತಿ, ವಿಶ್ವಪ್ರಸಿದ್ಧ ತಿರುಪತಿ ದೇವಾಲಯ ಮತ್ತು ಸೊಗಸಾದ ಕೂಚಿಪುಡಿ ನೃತ್ಯಕ್ಕೆ ಹೆಸರುವಾಸಿಯಾಗಿದೆ.'
    },
    dance: 'Kuchipudi',
    textile: 'Dharmavaram Silk',
    art: 'Kondapalli Toys',
    category: 'Cultural',
    tags: ['Spiritual', 'Coastline', 'Spice'],
    image: 'https://images.unsplash.com/photo-1623945952451-f76239cb3229?auto=format&fit=crop&q=80&w=800',
    gradient: 'from-orange-400 to-yellow-600'
  },
  {
    id: 'bihar',
    name: { en: 'Bihar', hi: 'बिहार', kn: 'ಬಿಹಾರ' },
    description: {
      en: 'The land of enlightenment where Lord Buddha attained nirvana. Home to the ancient Nalanda University and stunning Madhubani art.',
      hi: 'ज्ञान की भूमि जहां भगवान बुद्ध ने निर्वाण प्राप्त किया। प्राचीन नालंदा विश्वविद्यालय और शानदार मधुबनी कला का घर।',
      kn: 'ಭಗವಾನ್ ಬುದ್ಧನು ನಿರ್ವಾಣವನ್ನು ಪಡೆದ ಜ್ಞಾನೋದಯದ ಭೂಮಿ. ಪ್ರಾಚೀನ ನಳಂದಾ ವಿಶ್ವವಿದ್ಯಾಲಯ ಮತ್ತು ಅದ್ಭುತ ಮಧುಬನಿ ಕಲೆಯ ಮನೆ.'
    },
    dance: 'Jat-Jatin',
    textile: 'Bhagalpuri Silk',
    art: 'Madhubani Painting',
    category: 'Heritage',
    tags: ['Buddhist', 'Ancient', 'Spiritual'],
    image: 'https://images.unsplash.com/photo-1596701062351-be12993bcc81?auto=format&fit=crop&q=80&w=800',
    gradient: 'from-yellow-600 to-amber-700'
  },
  {
    id: 'maharashtra',
    name: { en: 'Maharashtra', hi: 'महाराष्ट्र', kn: 'ಮಹಾರಾಷ್ಟ್ರ' },
    description: {
      en: 'The land of Marathas, known for its historic caves like Ajanta and Ellora, vibrant Ganpati festivals, and Bollywood.',
      hi: 'मराठों की भूमि, अजंता और एलोरा जैसी ऐतिहासिक गुफाओं, जीवंत गणपति उत्सवों और बॉलीवुड के लिए जानी जाती है।',
      kn: 'ಮರಾಠರ ನಾಡು, ಅಜಂತಾ ಮತ್ತು ಎಲ್ಲೋರಾದಂತಹ ಐತಿಹಾಸಿಕ ಗುಹೆಗಳು, ರೋಮಾಂಚಕ ಗಣಪತಿ ಹಬ್ಬಗಳು ಮತ್ತು ಬಾಲಿವುಡ್‌ಗೆ ಹೆಸರುವಾಸಿಯಾಗಿದೆ.'
    },
    dance: 'Lavani',
    textile: 'Paithani Silk',
    art: 'Warli Painting',
    category: 'Festive',
    tags: ['Caves', 'Cinema', 'Heritage'],
    image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&q=80&w=800',
    gradient: 'from-orange-600 to-red-700'
  },
  {
    id: 'odisha',
    name: { en: 'Odisha', hi: 'ओडिशा', kn: 'ಒಡಿಶಾ' },
    description: {
      en: 'The soul of India, famous for the Konark Sun Temple, the annual Jagannath Rath Yatra, and the graceful Odissi dance.',
      hi: 'भारत की आत्मा, कोणार्क सूर्य मंदिर, वार्षिक जगन्नाथ रथ यात्रा और सुरुचिपूर्ण ओडिसी नृत्य के लिए प्रसिद्ध।',
      kn: 'ಭಾರತದ ಆತ್ಮ, ಕೋನಾರ್ಕ್ ಸೂರ್ಯ ದೇವಾಲಯ, ವಾರ್ಷಿಕ ಜಗನ್ನಾಥ ರಥಯಾತ್ರೆ ಮತ್ತು ಆಕರ್ಷಕ ಒಡಿಸ್ಸಿ ನೃತ್ಯಕ್ಕೆ ಹೆಸರುವಾಸಿಯಾಗಿದೆ.'
    },
    dance: 'Odissi',
    textile: 'Sambalpuri Silk',
    art: 'Pattachitra',
    category: 'Heritage',
    tags: ['Temples', 'Coastal', 'Tribal'],
    image: 'https://images.unsplash.com/photo-1533221216134-c793138b7e01?auto=format&fit=crop&q=80&w=800',
    gradient: 'from-blue-500 to-cyan-700'
  },
  {
    id: 'madhya-pradesh',
    name: { en: 'Madhya Pradesh', hi: 'मध्य प्रदेश', kn: 'ಮಧ್ಯಪ್ರದೇಶ' },
    description: {
      en: "The Heart of India, home to the temples of Khajuraho, the Sanchi Stupa, and the dense tigers-filled forests of Kanha.",
      hi: "भारत का हृदय, खजुराहो के मंदिरों, सांची स्तूप और कान्हा के घने बाघों से भरे जंगलों का घर।",
      kn: "ಭಾರತದ ಹೃದಯಭಾಗ, ಖಜುರಾಹೊ ದೇವಾಲಯಗಳು, ಸಾಂಚಿ ಸ್ತೂಪ ಮತ್ತು ಕಾನ್ಹಾದ ದಟ್ಟವಾದ ಹುಲಿಗಳಿಂದ ಕೂಡಿದ ಕಾಡುಗಳಿಗೆ ನೆಲೆಯಾಗಿದೆ."
    },
    dance: 'Matki',
    textile: 'Chanderi Silk',
    art: 'Gond Art',
    category: 'Artistic',
    tags: ['Wildlife', 'Ancient', 'Forest'],
    image: 'https://images.unsplash.com/photo-1596701062351-be12993bcc81?auto=format&fit=crop&q=80&w=800',
    gradient: 'from-emerald-500 to-teal-700'
  },
  {
    id: 'uttar-pradesh',
    name: { en: 'Uttar Pradesh', hi: 'उत्तर प्रदेश', kn: 'ಉತ್ತರ ಪ್ರದೇಶ' },
    description: {
      en: 'The most populous state, home to the Taj Mahal, the spiritual city of Varanasi, and the birthplace of Lord Rama and Krishna.',
      hi: 'सबसे अधिक आबादी वाला राज्य, ताजमहल का घर, वाराणसी का आध्यात्मिक शहर और भगवान राम और कृष्ण की जन्मभूमि।',
      kn: 'ಅತಿ ಹೆಚ್ಚು ಜನಸಂಖ್ಯೆ ಹೊಂದಿರುವ ರಾಜ್ಯ, ತಾಜ್ ಮಹಲ್, ವಾರಣಾಸಿಯ ಆಧ್ಯಾತ್ಮಿಕ ನಗರ ಮತ್ತು ಭಗವಾನ್ ರಾಮ ಮತ್ತು ಕೃಷ್ಣನ ಜನ್ಮಸ್ಥಳ.'
    },
    dance: 'Kathak',
    textile: 'Banarasi Silk',
    art: 'Chikankari',
    category: 'Heritage',
    tags: ['Spiritual', 'Architecture', 'Historic'],
    image: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=800',
    gradient: 'from-orange-700 to-amber-900'
  },
  {
    id: 'goa',
    name: { en: 'Goa', hi: 'गोवा', kn: 'ಗೋವಾ' },
    description: {
      en: 'A sun-drenched paradise known for its pristine beaches, Portuguese heritage, and vibrant nightlife.',
      hi: 'अपने प्राचीन समुद्र तटों, पुर्तगाली विरासत और जीवंत नाइटलाइफ़ के लिए जाना जाने वाला धूप से सराबोर स्वर्ग।',
      kn: 'ಪ್ರಾಚೀನ ಕಡಲತೀರಗಳು, ಪೋರ್ಚುಗೀಸ್ ಪರಂಪರೆ ಮತ್ತು ರೋಮಾಂಚಕ ರಾತ್ರಿಜೀವನಕ್ಕೆ ಹೆಸರುವಾಸಿಯಾದ ಬಿಸಿಲಿನ ಸ್ವರ್ಗ.'
    },
    dance: 'Fugdi',
    textile: 'Kunbi Weave',
    art: 'Shell Craft',
    category: 'Festive',
    tags: ['Beach', 'Portugeuse', 'Relaxing'],
    image: 'https://images.unsplash.com/photo-1512789677070-60d5b71db9b0?auto=format&fit=crop&q=80&w=800',
    gradient: 'from-blue-400 to-cyan-600'
  },
  {
    id: 'himachal-pradesh',
    name: { en: 'Himachal Pradesh', hi: 'हिमाचल प्रदेश', kn: 'ಹಿಮಾಚಲ ಪ್ರದೇಶ' },
    description: {
      en: 'The Abode of Snow, famous for its breathtaking mountain landscapes, apple orchards, and serene Buddhist monasteries.',
      hi: 'बर्फ का निवास, अपने लुभावने पहाड़ी परिदृश्य, सेब के बागों और शांत बौद्ध मठों के लिए प्रसिद्ध।',
      kn: 'ಹಿಮದ ವಾಸಸ್ಥಾನ, ಅದರ ಉಸಿರುಕಟ್ಟುವ ಪರ್ವತ ಭೂದೃಶ್ಯಗಳು, ಸೇಬಿನ ತೋಟಗಳು ಮತ್ತು ಪ್ರಶಾಂತ ಬೌದ್ಧ ಮಠಗಳಿಗೆ ಹೆಸರುವಾಸಿಯಾಗಿದೆ.'
    },
    dance: 'Nati',
    textile: 'Kullu Shawls',
    art: 'Chamba Rumal',
    category: 'Heritage',
    tags: ['Mountains', 'Apples', 'Snow'],
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800',
    gradient: 'from-sky-500 to-blue-700'
  },
  {
    id: 'manipur',
    name: { en: 'Manipur', hi: 'मणिपुर', kn: 'ಮಣಿಪುರ' },
    description: {
      en: 'The Jewel of India, home to the world\'s only floating national park and the graceful Raas Leela dance.',
      hi: 'भारत का गहना, दुनिया के एकमात्र तैरते हुए राष्ट्रीय उद्यान और सुरुचिपूर्ण रास लीला नृत्य का घर।',
      kn: 'ಭಾರತದ ಆಭರಣ, ವಿಶ್ವದ ಏಕೈಕ ತೇಲುವ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನವನ ಮತ್ತು ಆಕರ್ಷಕ ರಾಸಲೀಲಾ ನೃತ್ಯದ ಮನೆ.'
    },
    dance: 'Raas Leela',
    textile: 'Phanek',
    art: 'Kauna Craft',
    category: 'Cultural',
    tags: ['Jewel', 'Floating Lake', 'Classical'],
    image: 'https://images.unsplash.com/photo-1590424745343-4e4b77f80695?auto=format&fit=crop&q=80&w=800',
    gradient: 'from-pink-500 to-fuchsia-700'
  },
  {
    id: 'meghalaya',
    name: { en: 'Meghalaya', hi: 'मेघालय', kn: 'ಮೇಘಾಲಯ' },
    description: {
      en: 'The Abode of Clouds, famous for being the wettest place on earth, its living root bridges, and matrilineal society.',
      hi: 'बादलों का निवास, पृथ्वी पर सबसे नम स्थान होने, इसके जीवित जड़ पुलों और मातृसत्तात्मक समाज के लिए प्रसिद्ध।',
      kn: 'ಮೋಡಗಳ ವಾಸಸ್ಥಾನ, ಭೂಮಿಯ ಮೇಲಿನ ಅತ್ಯಂತ ತೇವಾಂಶವುಳ್ಳ ಪ್ರದೇಶ, ಅದರ ಜೀವಂತ ಬೇರು ಸೇತುವೆಗಳು ಮತ್ತು ಮಾತೃಪ್ರಧಾನ ಸಮಾಜಕ್ಕೆ ಹೆಸರುವಾಸಿಯಾಗಿದೆ.'
    },
    dance: 'Wangala',
    textile: 'Eri Silk',
    art: 'Cane & Bamboo Craft',
    category: 'Heritage',
    tags: ['Clouds', 'Nature', 'Rain'],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fee74a52?auto=format&fit=crop&q=80&w=800',
    gradient: 'from-indigo-600 to-violet-800'
  },
  {
    id: 'delhi',
    name: { en: 'Delhi', hi: 'दिल्ली', kn: 'ದೆಹಲಿ' },
    description: {
      en: 'The heart of the nation, where history meets modernity. Home to monuments from the Mughals to the British Raj.',
      hi: 'देश का दिल, जहां इतिहास आधुनिकता से मिलता है। मुगलों से लेकर ब्रिटिश राज तक के स्मारकों का घर।',
      kn: 'ರಾಷ್ಟ್ರದ ಹೃದಯಭಾಗ, ಅಲ್ಲಿ ಇತಿಹಾಸವು ಆಧುನಿಕತೆಯನ್ನು ಸಂಧಿಸುತ್ತದೆ. ಮೊಘಲರಿಂದ ಬ್ರಿಟಿಷ್ ರಾಜ್ ವರೆಗಿನ ಸ್ಮಾರಕಗಳ ಮನೆ.'
    },
    dance: 'Kathak (Delhi Gharana)',
    textile: 'Zardozi',
    art: 'Meenakari',
    category: 'Heritage',
    tags: ['Capital', 'History', 'Food'],
    image: 'https://images.unsplash.com/photo-1587474260584-1f20d430c33a?auto=format&fit=crop&q=80&w=800',
    gradient: 'from-orange-500 to-amber-700'
  },
  {
    id: 'jammu-kashmir',
    name: { en: 'Jammu & Kashmir', hi: 'जम्मू और कश्मीर', kn: 'ಜಮ್ಮು ಮತ್ತು ಕಾಶ್ಮೀರ' },
    description: {
      en: 'Paradise on Earth, famous for its houseboats on Dal Lake, snow-capped mountains, and exquisite pashmina shawls.',
      hi: 'पृथ्वी पर स्वर्ग, डल झील पर इसके हाउसबोट, बर्फ से ढके पहाड़ों और उत्तम पश्मीना शॉल के लिए प्रसिद्ध।',
      kn: 'ಭೂಮಿಯ ಮೇಲಿನ ಸ್ವರ್ಗ, ದಾಲ್ ಸರೋವರದ ಮೇಲಿರುವ ಆಕರ್ಷಕ ಹೌಸ್ ಬೋಟ್ ಗಳು, ಹಿಮದಿಂದ ಆವೃತವಾದ ಪರ್ವತಗಳು ಮತ್ತು ಸೊಗಸಾದ ಪಶ್ಮೀನಾ ಶಾಲುಗಳಿಗೆ ಹೆಸರುವಾಸಿಯಾಗಿದೆ.'
    },
    dance: 'Rouf',
    textile: 'Pashmina',
    art: 'Paper Mache',
    category: 'Cultural',
    tags: ['Paradise', 'Snow', 'Crafts'],
    image: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&q=80&w=800',
    gradient: 'from-blue-200 to-indigo-400'
  }
];
