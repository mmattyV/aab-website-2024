import { v4 as uuidv4 } from "uuid";

// ✅ Expanded Placeholder Data with Unique UUIDs

const brothers = [
  // 🔵 Class of 2025
  {
    id: uuidv4(),
    first_name: "Matthew",
    last_name: "Kim",
    personal_email: "matthew.kim@example.com",
    school_email: "mkim@harvard.edu",
    brother_name: "MK",
    house: "Cabot House",
    year: 2025,
    birthday: "2003-04-15",
    location: "Cambridge, MA",
    phone: "+1 617-555-1234",
    tagline: "Live with honor",
    position: "President",
    bio: "Passionate about leadership and community building.",
    instagram: "matthew.kim",
    image_url: "/profile-image.jpg"
  },
  {
    id: uuidv4(),
    first_name: "Daniel",
    last_name: "Nguyen",
    personal_email: "daniel.nguyen@example.com",
    school_email: "dnguyen@harvard.edu",
    brother_name: "D-Nguy",
    house: "Adams House",
    year: 2025,
    birthday: "2004-06-20",
    location: "Boston, MA",
    phone: "+1 617-555-5678",
    tagline: "Success through discipline",
    position: "Vice President",
    bio: "Driven by technology and making an impact.",
    instagram: "daniel.nguyen",
    image_url: "/profile-image.jpg"
  },

  // 🟢 Class of 2026
  {
    id: uuidv4(),
    first_name: "Sophia",
    last_name: "Martinez",
    personal_email: "sophia.martinez@example.com",
    school_email: "smartinez@harvard.edu",
    brother_name: "Sophie",
    house: "Lowell House",
    year: 2026,
    birthday: "2005-07-10",
    location: "San Francisco, CA",
    phone: "+1 415-555-7890",
    tagline: "Work hard, play hard",
    position: "Treasurer",
    bio: "Loves finance and philanthropy.",
    instagram: "sophia.martinez",
    image_url: "/profile-image.jpg"
  },
  {
    id: uuidv4(),
    first_name: "David",
    last_name: "Smith",
    personal_email: "david.smith@example.com",
    school_email: "dsmith@harvard.edu",
    brother_name: "D-Smitty",
    house: "Winthrop House",
    year: 2026,
    birthday: "2005-09-05",
    location: "New York, NY",
    phone: "+1 212-555-2345",
    tagline: "Think big",
    position: "Recruitment Chair",
    bio: "Focused on bringing new talent to the brotherhood.",
    instagram: "david.smith",
    image_url: "/profile-image.jpg"
  },

  // 🔴 Class of 2027
  {
    id: uuidv4(),
    first_name: "Lucas",
    last_name: "Johnson",
    personal_email: "lucas.johnson@example.com",
    school_email: "ljohnson@harvard.edu",
    brother_name: "LJ",
    house: "Kirkland House",
    year: 2027,
    birthday: "2006-02-18",
    location: "Los Angeles, CA",
    phone: "+1 310-555-6789",
    tagline: "Innovation starts with a dream",
    position: "New Brother",
    bio: "Excited to be part of the brotherhood!",
    instagram: "lucas.johnson",
    image_url: "/profile-image.jpg"
  }
];

const recruits = [
  // 🔵 Class of 2025
  {
    id: uuidv4(),
    first_name: "James",
    last_name: "Lee",
    email: "james.lee@example.com",
    phone: "+1 617-555-9876",
    year: 2025,
    room: "Lowell E13",
    image_url: "/profile-image.jpg"
  },
  {
    id: uuidv4(),
    first_name: "Olivia",
    last_name: "Brown",
    email: "olivia.brown@example.com",
    phone: "+1 617-555-7654",
    year: 2025,
    room: "Cabot C21",
    image_url: "/profile-image.jpg"
  },

  // 🟢 Class of 2026
  {
    id: uuidv4(),
    first_name: "Ethan",
    last_name: "Williams",
    email: "ethan.williams@example.com",
    phone: "+1 617-555-5432",
    year: 2026,
    room: "Adams A12",
    image_url: "/profile-image.jpg"
  },
  {
    id: uuidv4(),
    first_name: "Sophia",
    last_name: "Taylor",
    email: "sophia.taylor@example.com",
    phone: "+1 617-555-6781",
    year: 2026,
    room: "Kirkland B10",
    image_url: "/profile-image.jpg"
  },

  // 🔴 Class of 2027
  {
    id: uuidv4(),
    first_name: "Benjamin",
    last_name: "Miller",
    email: "benjamin.miller@example.com",
    phone: "+1 617-555-9012",
    year: 2027,
    room: "Winthrop D15",
    image_url: "/profile-image.jpg"
  }
];

const recruitComments = [
  {
    id: uuidv4(),
    recruit_id: recruits[0].id,
    brother_id: brothers[0].id,
    comment: "James has a great attitude and strong work ethic.",
    red_flag: "None"
  },
  {
    id: uuidv4(),
    recruit_id: recruits[1].id,
    brother_id: brothers[1].id,
    comment: "Olivia is very social and engaging, but unsure of long-term interest.",
    red_flag: "Commitment concerns"
  },
  {
    id: uuidv4(),
    recruit_id: recruits[3].id,
    brother_id: brothers[2].id,
    comment: "Sophia has excellent leadership skills.",
    red_flag: "None"
  },
  {
    id: uuidv4(),
    recruit_id: recruits[4].id,
    brother_id: brothers[3].id,
    comment: "Benjamin is interested but lacks confidence in social settings.",
    red_flag: "Confidence concerns"
  }
];

export { brothers, recruits, recruitComments };