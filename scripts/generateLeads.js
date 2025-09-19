import fs from "fs";
import path from "path";

const firstNames = [
  "Alice",
  "Brian",
  "Carla",
  "David",
  "Elena",
  "Felipe",
  "Grace",
  "Henry",
  "Isabella",
  "James",
  "Karen",
  "Lucas",
  "Maria",
  "Nina",
  "Oscar",
  "Paula",
  "Quentin",
  "Rita",
  "Samuel",
  "Tara",
];
const lastNames = [
  "Johnson",
  "Lee",
  "Mendes",
  "Zhang",
  "Rossi",
  "Duarte",
  "Wong",
  "Clark",
  "Costa",
  "ONeill",
  "Müller",
  "Silva",
  "Gomez",
  "Petrov",
  "Brown",
  "Rivera",
  "Laurent",
  "Singh",
  "Johnson",
  "Wilson",
];
const companies = [
  "TechNova",
  "GreenWave",
  "FinEdge",
  "MediCore",
  "BluePeak",
  "AgroMax",
  "CloudSphere",
  "BuildRight",
  "SmartBank",
  "NextGen Solar",
  "BioLife",
  "EduTech",
  "AutoDrive",
  "PharmaPlus",
  "EcoHome",
  "FinTrack",
  "RoboWorks",
  "AgriCore",
  "MedLink",
  "SkyLogix",
];
const sources = ["Website", "Referral", "Conference", "LinkedIn", "Cold Email"];
const statuses = ["New", "Qualified", "Contacted", "Disqualified"];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const leads = Array.from({ length: 100 }, (_, i) => {
  const firstName = getRandom(firstNames);
  const lastName = getRandom(lastNames);
  const company = getRandom(companies);
  return {
    id: i + 1,
    name: `${firstName} ${lastName}`,
    company,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company
      .replace(/\s/g, "")
      .toLowerCase()}.com`,
    source: getRandom(sources),
    score: Math.floor(Math.random() * 100) + 1,
    status: getRandom(statuses),
    amount: Math.floor(Math.random() * 50000) + 1000,
  };
});

// __dirname is not defined in ES modules, so use this workaround:
const filePath = path.resolve(
  new URL(".", import.meta.url).pathname,
  "../src/data/leads.json"
);

fs.writeFileSync(filePath, JSON.stringify(leads, null, 2));

console.log(`Generated ${leads.length} leads at ${filePath}`);
