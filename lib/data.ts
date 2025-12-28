export type University = {
  id: string;
  name: string;
  location: string;
  country: string;
  tuition: number; // Approximate yearly tuition in USD
  ranking: number; // Global ranking (mock/approx)
  courses: string[];
  focus: string;
  website: string; // Official website URL
  image?: string;
};

export const universitiesData: University[] = [
  // --- GERMANY ---
  { id: "de-1", name: "Technical University of Munich", location: "Munich, Germany", country: "Germany", tuition: 3000, ranking: 30, courses: ["Engineering", "Data Science", "Physics"], focus: "Engineering · Low cost", website: "https://www.tum.de/en/" },
  { id: "de-2", name: "LMU Munich", location: "Munich, Germany", country: "Germany", tuition: 1000, ranking: 35, courses: ["Physics", "Medicine", "Humanities"], focus: "Research · Tradition", website: "https://www.lmu.de/en/" },
  { id: "de-3", name: "Heidelberg University", location: "Heidelberg, Germany", country: "Germany", tuition: 3500, ranking: 45, courses: ["Medicine", "Law", "Biology"], focus: "Oldest in Germany · Research", website: "https://www.uni-heidelberg.de/en" },
  { id: "de-4", name: "RWTH Aachen", location: "Aachen, Germany", country: "Germany", tuition: 1500, ranking: 90, courses: ["Mechanical Engineering", "Automotive", "Technology"], focus: "Top Engineering · Industry links", website: "https://www.rwth-aachen.de/" },
  { id: "de-5", name: "TU Berlin", location: "Berlin, Germany", country: "Germany", tuition: 1000, ranking: 140, courses: ["Architecture", "Computer Science", "Urban Planning"], focus: "Innovation · Startups", website: "https://www.tu.berlin/en/" },
  { id: "de-6", name: "KIT Karlsruhe", location: "Karlsruhe, Germany", country: "Germany", tuition: 3000, ranking: 130, courses: ["Informatics", "Engineering", "Energy"], focus: "Tech Focus · Research", website: "https://www.kit.edu/english/" },
  { id: "de-7", name: "University of Freiburg", location: "Freiburg, Germany", country: "Germany", tuition: 3000, ranking: 100, courses: ["Medicine", "Environment", "Social Sciences"], focus: "Green City · Sustainability", website: "https://uni-freiburg.de/en/" },
  { id: "de-8", name: "Humboldt University", location: "Berlin, Germany", country: "Germany", tuition: 800, ranking: 120, courses: ["Arts", "Humanities", "Philosophy"], focus: "Cultural Heart · History", website: "https://www.hu-berlin.de/en" },
  { id: "de-9", name: "University of Hamburg", location: "Hamburg, Germany", country: "Germany", tuition: 700, ranking: 135, courses: ["Law", "Business", "Media"], focus: "Port City · International", website: "https://www.uni-hamburg.de/en.html" },
  { id: "de-10", name: "TU Dresden", location: "Dresden, Germany", country: "Germany", tuition: 600, ranking: 150, courses: ["Microelectronics", "Materials", "Engineering"], focus: "Silicon Saxony · Tech", website: "https://tu-dresden.de/?set_language=en" },

  // --- CANADA ---
  { id: "ca-1", name: "University of Toronto", location: "Toronto, Canada", country: "Canada", tuition: 45000, ranking: 21, courses: ["Computer Science", "Engineering", "Business"], focus: "Research heavy · Top tier", website: "https://www.utoronto.ca/" },
  { id: "ca-2", name: "University of British Columbia", location: "Vancouver, Canada", country: "Canada", tuition: 40000, ranking: 40, courses: ["Forestry", "Business", "Economics"], focus: "Scenic campus · High employability", website: "https://www.ubc.ca/" },
  { id: "ca-3", name: "McGill University", location: "Montreal, Canada", country: "Canada", tuition: 35000, ranking: 30, courses: ["Medicine", "Law", "Music"], focus: "Prestige · Culture", website: "https://www.mcgill.ca/" },
  { id: "ca-4", name: "University of Waterloo", location: "Waterloo, Canada", country: "Canada", tuition: 42000, ranking: 110, courses: ["Computer Science", "Engineering", "Mathematics"], focus: "Co-op Programs · Tech", website: "https://uwaterloo.ca/" },
  { id: "ca-5", name: "University of Alberta", location: "Edmonton, Canada", country: "Canada", tuition: 28000, ranking: 110, courses: ["Petroleum Eng", "AI", "Health"], focus: "Energy · AI Research", website: "https://www.ualberta.ca/en/index.html" },
  { id: "ca-6", name: "McMaster University", location: "Hamilton, Canada", country: "Canada", tuition: 32000, ranking: 140, courses: ["Health Sciences", "Engineering", "Business"], focus: "Research Intensive · Medical", website: "https://www.mcmaster.ca/" },
  { id: "ca-7", name: "University of Montreal", location: "Montreal, Canada", country: "Canada", tuition: 25000, ranking: 100, courses: ["AI", "Law", "French Studies"], focus: "AI Hub · French", website: "https://www.umontreal.ca/en/" },
  { id: "ca-8", name: "Western University", location: "London, Canada", country: "Canada", tuition: 38000, ranking: 170, courses: ["Business", "Medicine", "Social Sci"], focus: "Student Experience · Ivey Business", website: "https://www.uwo.ca/" },
  { id: "ca-9", name: "University of Calgary", location: "Calgary, Canada", country: "Canada", tuition: 27000, ranking: 180, courses: ["Energy", "Business", "Engineering"], focus: "Entrepreneurial · Energy", website: "https://www.ucalgary.ca/" },
  { id: "ca-10", name: "Queen's University", location: "Kingston, Canada", country: "Canada", tuition: 39000, ranking: 200, courses: ["Business", "Law", "Engineering"], focus: "Community · Tradition", website: "https://www.queensu.ca/" },

  // --- USA ---
  { id: "us-1", name: "Georgia Institute of Technology", location: "Atlanta, USA", country: "USA", tuition: 33000, ranking: 45, courses: ["Computer Science", "Aerospace", "Industrial Engineering"], focus: "STEM · Strong placements", website: "https://www.gatech.edu/" },
  { id: "us-2", name: "Stanford University", location: "California, USA", country: "USA", tuition: 60000, ranking: 2, courses: ["Computer Science", "Business", "Law"], focus: "Innovation · Entrepreneurship", website: "https://www.stanford.edu/" },
  { id: "us-3", name: "MIT", location: "Massachusetts, USA", country: "USA", tuition: 58000, ranking: 1, courses: ["Engineering", "Physics", "CS"], focus: "World Leader · Innovation", website: "https://www.mit.edu/" },
  { id: "us-4", name: "University of California, Berkeley", location: "Berkeley, USA", country: "USA", tuition: 44000, ranking: 10, courses: ["CS", "Business", "Chemistry"], focus: "Public Ivy · Activism", website: "https://www.berkeley.edu/" },
  { id: "us-5", name: "University of Michigan", location: "Ann Arbor, USA", country: "USA", tuition: 50000, ranking: 20, courses: ["Engineering", "Business", "Sports"], focus: "Large Alumni Network · Sports", website: "https://umich.edu/" },
  { id: "us-6", name: "Carnegie Mellon University", location: "Pittsburgh, USA", country: "USA", tuition: 57000, ranking: 25, courses: ["AI", "Robotics", "Drama"], focus: "Tech & Arts · AI Pioneer", website: "https://www.cmu.edu/" },
  { id: "us-7", name: "University of Washington", location: "Seattle, USA", country: "USA", tuition: 38000, ranking: 30, courses: ["CS", "Medicine", "Bioengineering"], focus: "Tech Hub · Research", website: "https://www.washington.edu/" },
  { id: "us-8", name: "UCLA", location: "Los Angeles, USA", country: "USA", tuition: 43000, ranking: 15, courses: ["Film", "Engineering", "Psychology"], focus: "Campus Life · Academics", website: "https://www.ucla.edu/" },
  { id: "us-9", name: "University of Texas at Austin", location: "Austin, USA", country: "USA", tuition: 39000, ranking: 40, courses: ["Business", "Engineering", "CS"], focus: "Tech City · Value", website: "https://www.utexas.edu/" },
  { id: "us-10", name: "Purdue University", location: "West Lafayette, USA", country: "USA", tuition: 31000, ranking: 90, courses: ["Aviation", "Engineering", "CS"], focus: "STEM Giant · Affordable", website: "https://www.purdue.edu/" },

  // --- UK ---
  { id: "uk-1", name: "University of Edinburgh", location: "Edinburgh, UK", country: "UK", tuition: 38000, ranking: 27, courses: ["Artificial Intelligence", "Humanities", "Law"], focus: "Data + AI · 1-year Masters", website: "https://www.ed.ac.uk/" },
  { id: "uk-2", name: "Imperial College London", location: "London, UK", country: "UK", tuition: 50000, ranking: 6, courses: ["Medicine", "Engineering", "Science"], focus: "STEM focus · Prestige", website: "https://www.imperial.ac.uk/" },
  { id: "uk-3", name: "University of Oxford", location: "Oxford, UK", country: "UK", tuition: 45000, ranking: 3, courses: ["Philosophy", "PPE", "Medicine"], focus: "Historic · Collegiate", website: "https://www.ox.ac.uk/" },
  { id: "uk-4", name: "University of Cambridge", location: "Cambridge, UK", country: "UK", tuition: 46000, ranking: 4, courses: ["Math", "Science", "Law"], focus: "Scientific Discovery · Elite", website: "https://www.cam.ac.uk/" },
  { id: "uk-5", name: "UCL", location: "London, UK", country: "UK", tuition: 40000, ranking: 9, courses: ["Architecture", "Education", "Law"], focus: "Global University · Research", website: "https://www.ucl.ac.uk/" },
  { id: "uk-6", name: "LSE", location: "London, UK", country: "UK", tuition: 35000, ranking: 45, courses: ["Economics", "Politics", "Finance"], focus: "Social Sciences · Political", website: "https://www.lse.ac.uk/" },
  { id: "uk-7", name: "King's College London", location: "London, UK", country: "UK", tuition: 36000, ranking: 35, courses: ["Medicine", "War Studies", "Law"], focus: "Central London · Health", website: "https://www.kcl.ac.uk/" },
  { id: "uk-8", name: "University of Manchester", location: "Manchester, UK", country: "UK", tuition: 32000, ranking: 30, courses: ["Business", "Engineering", "Physics"], focus: "Industrial Links · Large", website: "https://www.manchester.ac.uk/" },
  { id: "uk-9", name: "University of Warwick", location: "Coventry, UK", country: "UK", tuition: 33000, ranking: 60, courses: ["Business", "Economics", "Manufacturing"], focus: "Industry · Campus", website: "https://warwick.ac.uk/" },
  { id: "uk-10", name: "University of Bristol", location: "Bristol, UK", country: "UK", tuition: 31000, ranking: 55, courses: ["Engineering", "Education", "Veterinary"], focus: "Creative City · Research", website: "https://www.bristol.ac.uk/" },

  // --- AUSTRALIA ---
  { id: "au-1", name: "University of Melbourne", location: "Melbourne, Australia", country: "Australia", tuition: 42000, ranking: 33, courses: ["Business", "Law", "Medicine"], focus: "Business · Scholarships available", website: "https://www.unimelb.edu.au/" },
  { id: "au-2", name: "University of Sydney", location: "Sydney, Australia", country: "Australia", tuition: 43000, ranking: 40, courses: ["Architecture", "Medicine", "Law"], focus: "Beautiful Campus · City", website: "https://www.sydney.edu.au/" },
  { id: "au-3", name: "UNSW Sydney", location: "Sydney, Australia", country: "Australia", tuition: 41000, ranking: 45, courses: ["Engineering", "Solar Energy", "Business"], focus: "Tech · Innovation", website: "https://www.unsw.edu.au/" },
  { id: "au-4", name: "Australian National University", location: "Canberra, Australia", country: "Australia", tuition: 39000, ranking: 30, courses: ["Politics", "Sociology", "Earth Science"], focus: "Research · Policy", website: "https://www.anu.edu.au/" },
  { id: "au-5", name: "University of Queensland", location: "Brisbane, Australia", country: "Australia", tuition: 38000, ranking: 50, courses: ["Biology", "Environment", "Mining"], focus: "Science · Lifestyle", website: "https://www.uq.edu.au/" },
  { id: "au-6", name: "Monash University", location: "Melbourne, Australia", country: "Australia", tuition: 40000, ranking: 55, courses: ["Pharmacy", "Education", "Engineering"], focus: "Large · International", website: "https://www.monash.edu/" },
  
  // --- ASIA/OTHERS ---
  { id: "sg-1", name: "National University of Singapore", location: "Singapore", country: "Asia", tuition: 28000, ranking: 8, courses: ["Engineering", "Business", "Computing"], focus: "Global programs · Fast intake", website: "https://www.nus.edu.sg/" },
  { id: "sg-2", name: "Nanyang Technological University", location: "Singapore", country: "Asia", tuition: 27000, ranking: 15, courses: ["Materials Science", "Engineering", "Education"], focus: "Tech · Young University", website: "https://www.ntu.edu.sg/" },
  { id: "ch-1", name: "ETH Zurich", location: "Zurich, Switzerland", country: "Europe", tuition: 2000, ranking: 9, courses: ["Physics", "Computer Science", "Architecture"], focus: "World class research · Low tuition", website: "https://ethz.ch/en.html" },
  { id: "nl-1", name: "University of Amsterdam", location: "Amsterdam, Netherlands", country: "Europe", tuition: 15000, ranking: 55, courses: ["Media", "Psychology", "Economics"], focus: "Social sciences · English programs", website: "https://www.uva.nl/en" },
  { id: "jp-1", name: "University of Tokyo", location: "Tokyo, Japan", country: "Asia", tuition: 12000, ranking: 23, courses: ["Engineering", "Science", "Law"], focus: "Research · Tradition", website: "https://www.u-tokyo.ac.jp/en/" }
];
