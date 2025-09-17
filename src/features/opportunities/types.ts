export interface Opportunity {
  id: number;
  name: string;
  stage:
    | "Qualification"
    | "Proposal"
    | "Negotiation"
    | "Closed Won"
    | "Closed Lost";
  amount?: number;
  accountName: string;
}
