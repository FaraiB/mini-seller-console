export interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: "New" | "Contacted" | "Qualified" | "Disqualified" | "Converted";
}
