const LOGO_SRC = '';

const PACKAGES = [
  {
    id: 'growing',
    name: 'Growing Minds',
    emoji: '🌱',
    color: '#16A34A',
    pale: 'rgba(22,163,74,0.10)',
    tag: 'Children 4–11',
    tagline: 'Build confidence and safety skills from an early age.',
    desc: 'Ten courses across two age ranges both included in one payment. Early Years (4–7) and Junior (8–11) covering road safety, body safety, online safety, anti-bullying, and stranger danger.',
    isBundle: true,
    subPackages: [
      {
        id: 'growing-early',
        name: 'Growing Minds: Early Years',
        emoji: '🌱',
        color: '#16A34A',
        pale: 'rgba(22,163,74,0.10)',
        tag: 'Ages 4–7',
        ageRange: '4–7',
        tagline: 'Simple, nurturing safety lessons designed to be read aloud with your child.',
        desc: 'Five gentle, age-appropriate courses covering road safety, anti-bullying, online safety, stranger danger, and body safety written specifically for children aged 4–7 to read together with a parent or carer.',
      },
      {
        id: 'growing-junior',
        name: 'Growing Minds: Junior',
        emoji: '🌿',
        color: '#15803D',
        pale: 'rgba(21,128,61,0.10)',
        tag: 'Ages 8–11',
        ageRange: '8–11',
        tagline: 'Deeper safety education for growing, more independent children.',
        desc: 'Five comprehensive courses for children aged 8–11, building on core safety skills with greater depth from cycling safely to recognising grooming, online risks, and the right to say no.',
      },
    ],
  },
  { id: 'nest', name: 'Nest Breaking', emoji: '🚀', color: '#0284C7', pale: 'rgba(2,132,199,0.10)', tag: 'Young Adults 16–25', tagline: 'Real-world safety skills for life on your own.', desc: 'Five practical courses for young adults night-out safety, spatial awareness, digital identity, AI impersonation, and living independently.' },
  { id: 'roaming', name: 'Roaming Free', emoji: '🌍', color: '#EA580C', pale: 'rgba(234,88,12,0.10)', tag: 'Travellers', tagline: 'Stay safe anywhere in the world.', desc: 'Five expert courses covering everything from pre-trip planning to scam avoidance, technology security, and trusting your instincts abroad.' },
  { id: 'aging', name: 'Aging Wisdom', emoji: '🧠', color: '#7C3AED', pale: 'rgba(124,58,237,0.10)', tag: 'Older Adults 60+', tagline: 'Confidence and independence in a complex world.', desc: 'Five respectful, practical courses covering phone and email scams, online banking, staying connected safely, phishing, and home security.' },
  { id: 'parents', name: 'Family Anchor', emoji: '❤️', color: '#1E62C8', pale: 'rgba(30,98,200,0.10)', tag: 'Whole Family', tagline: 'The essential guide for parents, carers, and the whole family.', desc: 'Five specialist courses covering bullying, grooming and abuse prevention, drug awareness, eating disorders, and how to have the difficult conversations that matter most.' },
];

const COURSES = [
  // ── Growing Minds: Early Years (4–7) ──
  {
    id: 'c26', title: 'Road & Outdoor Safety', pkg: 'growing', subPkg: 'growing-early', ageGroup: '4-7',
    pkgName: 'Growing Minds', subPkgName: 'Early Years', color: '#16A34A', pale: 'rgba(22,163,74,0.10)', emoji: '🌱',
    lessons: ['Crossing Roads Safely', 'Playing Outdoors Safely', 'Water Safety', 'Animal Safety', 'Keeping Safe When Getting Help'],
  },
  {
    id: 'c27', title: 'Anti-Bullying', pkg: 'growing', subPkg: 'growing-early', ageGroup: '4-7',
    pkgName: 'Growing Minds', subPkgName: 'Early Years', color: '#16A34A', pale: 'rgba(22,163,74,0.10)', emoji: '🌱',
    lessons: ['What is Bullying?', 'Different Kinds of Bullying', 'What To Do if Someone is Being Mean to You', 'Being a Good Friend and Helping Others', 'Thinking About How Others Feel'],
  },
  {
    id: 'c28', title: 'Online Safety', pkg: 'growing', subPkg: 'growing-early', ageGroup: '4-7',
    pkgName: 'Growing Minds', subPkgName: 'Early Years', color: '#16A34A', pale: 'rgba(22,163,74,0.10)', emoji: '🌱',
    lessons: ['What is the Internet?', 'Keeping Your Details Private', 'What To Do if Something Scary Happens Online', 'Being Kind Online'],
  },
  {
    id: 'c29', title: 'Stranger Danger & Safe Adults', pkg: 'growing', subPkg: 'growing-early', ageGroup: '4-7',
    pkgName: 'Growing Minds', subPkgName: 'Early Years', color: '#16A34A', pale: 'rgba(22,163,74,0.10)', emoji: '🌱',
    lessons: ['What is a Stranger?', 'Who Are Your Safe Grown-Ups?', 'Never Go Anywhere Without Asking', 'What To Do if You Feel Lost', 'Secrets vs Surprises', 'What To Do if You Feel Scared', 'What To Do if Someone Tries to Grab You'],
  },
  {
    id: 'c30', title: 'Body Safety & Saying No', pkg: 'growing', subPkg: 'growing-early', ageGroup: '4-7',
    pkgName: 'Growing Minds', subPkgName: 'Early Years', color: '#16A34A', pale: 'rgba(22,163,74,0.10)', emoji: '🌱',
    lessons: ['Your Body Belongs to You', 'Private Parts are Private', 'Safe Touch vs Unsafe Touch', 'It is Always Okay to Say No', 'Telling a Safe Grown-Up if Something Happens', 'What Happens After You Tell Someone'],
  },

  // ── Growing Minds: Junior (8–11) ──
  {
    id: 'c1', title: 'Road & Outdoor Safety', pkg: 'growing', subPkg: 'growing-junior', ageGroup: '8-11',
    pkgName: 'Growing Minds', subPkgName: 'Junior', color: '#15803D', pale: 'rgba(21,128,61,0.10)', emoji: '🌿',
    lessons: ['Crossing Roads Safely and Being Seen by Drivers', 'Cycling Safely', 'Water Safety', 'Playing Outdoors Safely and Knowing Your Boundaries', 'Animal Safety and Outdoor Emergencies'],
  },
  {
    id: 'c2', title: 'Anti-Bullying', pkg: 'growing', subPkg: 'growing-junior', ageGroup: '8-11',
    pkgName: 'Growing Minds', subPkgName: 'Junior', color: '#15803D', pale: 'rgba(21,128,61,0.10)', emoji: '🌿',
    lessons: ['What is Bullying Really?', 'What To Do if You're Being Bullied', 'Being an Upstander and Your Own Behaviour'],
  },
  {
    id: 'c3', title: 'Online Safety & Screen Time', pkg: 'growing', subPkg: 'growing-junior', ageGroup: '8-11',
    pkgName: 'Growing Minds', subPkgName: 'Junior', color: '#15803D', pale: 'rgba(21,128,61,0.10)', emoji: '🌿',
    lessons: ['What is the Internet and How Does it Work?', 'Personal Information What to Keep Private and Why', 'Safe vs Unsafe Online Behaviour Strangers, Links, and Risks', 'When Something Online Upsets or Scares You', 'Being Kind Online Your Words Have Real Impact'],
  },
  {
    id: 'c4', title: 'Stranger Danger & Safe Adults', pkg: 'growing', subPkg: 'growing-junior', ageGroup: '8-11',
    pkgName: 'Growing Minds', subPkgName: 'Junior', color: '#15803D', pale: 'rgba(21,128,61,0.10)', emoji: '🌿',
    lessons: ['What is a Stranger Really? And Safe Strangers in Your Community', 'What Makes an Adult Safe? Understanding Trusted Adults', 'The Never Go Anywhere Rule and Secrets vs Surprises'],
  },
  {
    id: 'c5', title: 'Body Safety & Saying No', pkg: 'growing', subPkg: 'growing-junior', ageGroup: '8-11',
    pkgName: 'Growing Minds', subPkgName: 'Junior', color: '#15803D', pale: 'rgba(21,128,61,0.10)', emoji: '🌿',
    lessons: ['Your Body Belongs to You', 'Private Parts and Safe vs Unsafe Touch', 'Your Right to Say No Even to Adults', 'Telling a Trusted Adult Why It Matters and What Happens'],
  },

  // ── Nest Breaking ──
  { id: 'c6', title: 'Living Alone for the First Time', pkg: 'nest', pkgName: 'Nest Breaking', color: '#0284C7', pale: 'rgba(2,132,199,0.10)', emoji: '🚀', lessons: ['Securing Your New Home', 'Fire Safety Essentials', 'Understanding Your Neighbourhood', 'Managing Household Emergencies', 'Financial Safety and Avoiding Scams', 'Mental Wellbeing When Living Independently', 'Building a Local Support Network', 'Home Security Beyond Locks', 'Emergency Contacts and Planning Ahead', 'Review: Living Safely on Your Own'] },
  { id: 'c7', title: 'Night Out Safety', pkg: 'nest', pkgName: 'Nest Breaking', color: '#0284C7', pale: 'rgba(2,132,199,0.10)', emoji: '🚀', lessons: ['Planning a Safe Night Out', 'Drink Safety and Spiking', 'Getting Home Safely', 'Situational Awareness on a Night Out', 'Looking After Your Friends', 'Understanding Consent on a Night Out', 'Night Out Safety for Different Scenarios', 'If Something Goes Wrong on a Night Out', 'Personal Safety Technology', 'Review: Night Out Safety'] },
  { id: 'c8', title: 'Spatial Awareness', pkg: 'nest', pkgName: 'Nest Breaking', color: '#0284C7', pale: 'rgba(2,132,199,0.10)', emoji: '🚀', lessons: ['What Is Spatial Awareness?', 'Reading Your Environment', 'Body Language and Non-Verbal Signals', 'Trusting Your Gut', 'Safe Routes and Exit Strategies', 'Transport Safety', 'De-escalation and Conflict Avoidance', 'Digital Spatial Awareness', 'Spatial Awareness at Work and on Campus', 'Review: Spatial Awareness'] },
  { id: 'c9', title: 'Social Media & Digital Identity', pkg: 'nest', pkgName: 'Nest Breaking', color: '#0284C7', pale: 'rgba(2,132,199,0.10)', emoji: '🚀', lessons: ['Your Digital Footprint', 'Privacy Settings: What They Actually Do', 'Online Predators and Manipulation', 'What Not to Share and Why', 'Sextortion and Image-Based Abuse', 'Scams on Social Media', 'Online Harassment and Stalking', 'Managing Your Online Reputation', 'Staying Safe on Dating Apps and Platforms', 'Review: Social Media and Digital Identity'] },
  { id: 'c10', title: 'AI Impersonation Awareness', pkg: 'nest', pkgName: 'Nest Breaking', color: '#0284C7', pale: 'rgba(2,132,199,0.10)', emoji: '🚀', lessons: ['What Is AI Impersonation?', 'AI Voice Cloning: How It Works and How to Spot It', 'Deepfake Video: What to Look For', 'Protecting Your Voice and Image', 'Family Safety Codes and Verification Protocols', 'AI-Generated Phishing and Text Scams', 'AI Scams Targeting Older Family Members', 'Deepfakes and Misinformation', 'Reporting and Responding to AI Impersonation', 'Review: AI Impersonation Awareness'] },

  // ── Roaming Free ──
  { id: 'c11', title: 'Pre-Trip Safety Planning', pkg: 'roaming', pkgName: 'Roaming Free', color: '#EA580C', pale: 'rgba(234,88,12,0.10)', emoji: '🌍', lessons: ['Research Your Destination', 'Travel Insurance: What It Is and Why You Need It', 'Document Safety Before You Go', 'Health Preparation for Travel', 'Communication Planning', 'Accommodation Safety', 'Money and Budget Safety', 'Travelling Safely with Others', 'What To Do If Things Go Wrong', 'Review: Pre-Trip Safety Planning'] },
  { id: 'c12', title: 'Staying Safe in Unfamiliar Places', pkg: 'roaming', pkgName: 'Roaming Free', color: '#EA580C', pale: 'rgba(234,88,12,0.10)', emoji: '🌍', lessons: ['Arriving Safely in a New City', 'Reading Your Environment Abroad', 'Common Tourist Scams and How to Avoid Them', 'Transport Safety Abroad', 'Solo Travel Safety', 'Staying Safe in Specific Environments', 'Food and Water Safety', 'Cultural Sensitivity and Staying Respectful', 'If You Feel Unsafe Abroad', 'Review: Staying Safe in Unfamiliar Places'] },
  { id: 'c13', title: 'Technology Safety While Travelling', pkg: 'roaming', pkgName: 'Roaming Free', color: '#EA580C', pale: 'rgba(234,88,12,0.10)', emoji: '🌍', lessons: ['Public Wi-Fi: Risks and Safe Use', 'Device Security While Travelling', 'Social Media Safety While Travelling', 'Protecting Against Digital Theft and Fraud', 'Digital Emergency Preparation', 'Staying Connected Safely', 'Photography and Privacy Abroad', 'Lost Device Protocol', 'Cybersecurity Essentials for Travellers', 'Review: Technology Safety While Travelling'] },
  { id: 'c14', title: 'Trusting Your Instincts Abroad', pkg: 'roaming', pkgName: 'Roaming Free', color: '#EA580C', pale: 'rgba(234,88,12,0.10)', emoji: '🌍', lessons: ['Your Instincts in a New Environment', 'The Rationalisation Problem', 'Specific Scenarios: Reading Situations Abroad', 'High-Pressure Situations and Fast Decisions', 'Cultural Context vs Safety Signal', 'When Others Tell You It Is Fine', 'When to Ask for Help', 'Practical Instinct Training', 'After an Incident: Processing and Moving Forward', 'Review: Trusting Your Instincts Abroad'] },
  { id: 'c15', title: 'Valuables & Documents Security', pkg: 'roaming', pkgName: 'Roaming Free', color: '#EA580C', pale: 'rgba(234,88,12,0.10)', emoji: '🌍', lessons: ['What to Protect and Why', 'How and Where to Carry Valuables', 'Hotel and Accommodation Security for Valuables', 'Passport Security', 'Card and Cash Security', 'Device Security on the Road', 'Pickpocket Awareness in Practice', 'If Your Valuables Are Stolen', 'Technology for Valuables Security', 'Review: Valuables and Documents Security'] },

  // ── Aging Wisdom ──
  { id: 'c16', title: 'Recognising Phone & Email Scams', pkg: 'aging', pkgName: 'Aging Wisdom', color: '#7C3AED', pale: 'rgba(124,58,237,0.10)', emoji: '🧠', lessons: ['Why Older Adults Are Targeted', 'The Classic Phone Scam Patterns', 'Email Scam Patterns', 'The Psychology of Scams: Why They Work', 'What to Do During a Suspicious Call', 'Impersonation: When Scammers Pretend to Be People You Know', 'Doorstep Scams', 'Reporting Scams and Getting Help', 'Protecting People You Know', 'Review: Recognising Phone and Email Scams'] },
  { id: 'c17', title: 'Safe Online Banking & Shopping', pkg: 'aging', pkgName: 'Aging Wisdom', color: '#7C3AED', pale: 'rgba(124,58,237,0.10)', emoji: '🧠', lessons: ['Is Online Banking Safe?', 'Setting Up Online Banking Securely', 'Recognising Safe Shopping Websites', 'Passwords and Account Security', 'What Your Bank Can and Cannot Do', 'Safe Practices for Online Shopping', 'When Something Goes Wrong', 'Online Banking Safety for Specific Situations', 'Staying Safe on Online Marketplaces', 'Review: Safe Online Banking and Shopping'] },
  { id: 'c18', title: 'Staying Connected Safely', pkg: 'aging', pkgName: 'Aging Wisdom', color: '#7C3AED', pale: 'rgba(124,58,237,0.10)', emoji: '🧠', lessons: ['Smartphones: Getting Started Safely', 'Safe Communication with Family', 'Social Media: Using It Safely', 'Email Safety for Everyday Use', 'Online Scams Targeting Older Adults: Specific Patterns', 'Protecting Your Privacy Online', 'Staying Connected with Family Technology', 'When Something Goes Wrong Online', 'Maintaining Your Independence and Confidence Online', 'Review: Staying Connected Safely'] },
  { id: 'c19', title: 'Understanding Phishing Messages', pkg: 'aging', pkgName: 'Aging Wisdom', color: '#7C3AED', pale: 'rgba(124,58,237,0.10)', emoji: '🧠', lessons: ['What Is Phishing?', 'Email Phishing: Detailed Recognition', 'SMS and Text Phishing (Smishing)', 'Phone Call Phishing (Vishing)', 'Social Media Phishing', 'QR Code and Link Safety', 'What Happens After You Click: Understanding the Risk', 'Protecting Yourself from Phishing: Practical Steps', 'Phishing in Context: Real-Life Scenarios', 'Review: Understanding Phishing Messages'] },
  { id: 'c20', title: 'Home & Routine Security', pkg: 'aging', pkgName: 'Aging Wisdom', color: '#7C3AED', pale: 'rgba(124,58,237,0.10)', emoji: '🧠', lessons: ['Home Security Foundations', 'Answering the Door Safely', 'Staying Safe in Your Daily Routine', 'Managing Health Safely', 'Financial Safety in Everyday Life', 'Community Safety and Neighbours', 'Personal Safety When Out Alone', 'Emergency Preparedness at Home', 'Legal and Financial Planning for Safety', 'Review: Home and Routine Security'] },

  // ── Family Anchor ──
  { id: 'c21', title: 'Recognising & Preventing Bullying', pkg: 'parents', pkgName: 'Family Anchor', color: '#1E62C8', pale: 'rgba(30,98,200,0.10)', emoji: '❤️', lessons: ['What Bullying Is and What It Is Not', 'Signs Your Child May Be Being Bullied', 'How to Talk to Your Child About Bullying', 'Working with Schools on Bullying', 'Cyberbullying: Understanding and Responding', 'Supporting Your Child Through Bullying', 'When Your Child Is the One Bullying', 'Building Bullying Resilience', 'Online Safety and Preventing Cyberbullying', 'Review: Recognising and Preventing Bullying'] },
  { id: 'c22', title: 'Grooming & Sexual Abuse Prevention', pkg: 'parents', pkgName: 'Family Anchor', color: '#1E62C8', pale: 'rgba(30,98,200,0.10)', emoji: '❤️', lessons: ['Understanding Grooming', 'Warning Signs of Grooming', 'Teaching Children About Body Safety', 'Online Safety and Grooming Prevention', 'What to Do If You Are Concerned', 'Supporting a Child After Disclosure', 'Safeguarding at Clubs, Schools, and Activities', 'Child Sexual Exploitation (CSE)', 'Having Protective Conversations', 'Review: Grooming and Sexual Abuse Prevention'] },
  { id: 'c23', title: 'Drug & Alcohol Awareness for Parents', pkg: 'parents', pkgName: 'Family Anchor', color: '#1E62C8', pale: 'rgba(30,98,200,0.10)', emoji: '❤️', lessons: ['Why Young People Use Drugs and Alcohol', 'Recognising Signs of Drug and Alcohol Use', 'Having Conversations About Drugs and Alcohol', 'Specific Substances: What Parents Need to Know', 'Responding to Discovery of Use', 'Responding to a Drug or Alcohol Emergency', 'When Use Becomes a Problem', 'Alcohol Culture and Social Norms', 'Cannabis: Specific Guidance for Parents', 'Review: Drug and Alcohol Awareness for Parents'] },
  { id: 'c24', title: 'Eating Disorders: Signs, Support & Prevention', pkg: 'parents', pkgName: 'Family Anchor', color: '#1E62C8', pale: 'rgba(30,98,200,0.10)', emoji: '❤️', lessons: ['Understanding Eating Disorders', 'Early Warning Signs', 'How to Talk to Your Child About Your Concerns', 'Accessing Professional Help', 'Supporting Your Child Through Treatment', 'Prevention and Positive Body Image', 'Male Eating Disorders', 'Family Recovery: Looking After Yourself', 'The Role of Social Media and Diet Culture', 'Review: Eating Disorders: Signs, Support and Prevention'] },
  { id: 'c25', title: 'Talking to Children About Difficult Topics', pkg: 'parents', pkgName: 'Family Anchor', color: '#1E62C8', pale: 'rgba(30,98,200,0.10)', emoji: '❤️', lessons: ['Why These Conversations Matter', 'How to Have Difficult Conversations Well', 'Talking About Sex and Relationships', 'Talking About Mental Health', 'Talking About Family Change and Difficult Life Events', 'Talking About Death and Grief', 'Creating a Family Culture of Open Communication', 'When Children Do Not Want to Talk', 'When to Seek Professional Help', 'Review: Talking to Children About Difficult Topics'] },
];

const QUIZ_POOL = [
  { q: 'What should you do if you feel unsafe?', opts: ['Ignore the feeling', 'Trust your instincts and move away', 'Wait and see', 'Keep it to yourself'], correct: 1, expl: 'Trusting your instincts is one of the most powerful safety tools you have.' },
  { q: 'Best first step if you receive a suspicious call asking for personal information?', opts: ['Give the information', 'Hang up and call back on an official number', 'Stay on the line', 'Pass the phone to someone else'], correct: 1, expl: 'Always hang up and independently verify by calling the official number.' },
  { q: 'What does body autonomy mean?', opts: ['Only adults have rights over their bodies', 'You must always do what adults say', 'You have the right to say what happens to your own body', 'Parents own your body until 18'], correct: 2, expl: 'Body autonomy means your body belongs to you. You always have the right to say no.' },
  { q: 'Which is a sign of a phishing email?', opts: ['Known email address', 'Well-written with no errors', 'Creates urgency and asks you to click a link', 'Includes your full name'], correct: 2, expl: 'Urgency and unexpected links are classic phishing tactics to make you act without thinking.' },
  { q: 'Safest way to use public Wi-Fi?', opts: ['Connect to any network', 'Use a VPN', 'Avoid all websites', 'Share your password'], correct: 1, expl: 'A VPN encrypts your connection, protecting your data on public networks.' },
];

module.exports = { LOGO_SRC, PACKAGES, COURSES, QUIZ_POOL };
