Mini Seller Console

A simple CRM-like web app for managing leads and converting them into opportunities. Built with React, Vite, and Tailwind CSS, the app provides a lightweight interface for triaging leads, editing details, and generating opportunities.

Features

Leads Management:

View, search, filter, and sort leads.

Edit lead details in a slide-over panel.

Convert leads into opportunities.

Opportunities Table:

Displays converted leads with ID, Name, Stage, Amount, and Account Name.

Amounts are randomly generated and hardcoded for demonstration.

Persistence:

Filters, search queries, and sort order persist in local storage.

Responsive Design:

Fully responsive layout.

Tables support horizontal scroll on mobile due to complexity.

Loading & Error States:

Simulated latency with a timeout to demonstrate loading states.

Error handling for failed lead processing.

Scripts:

A script is included to generate leads in src/data/leads.json.

Each lead optionally includes a random amount to simulate real-world opportunities.

Architectural Choices

React + Vite: Fast development and hot reload with Vite.

Tailwind CSS: Utility-first styling for responsive and sleek UI.

Local Storage Hooks: Persist UI state (filters, search, sort) across sessions.

Slide-over Panel: Non-intrusive edit form inspired by lead detail panels.

Horizontal Scroll for Tables: Simplest solution for mobile responsiveness while maintaining readability of complex tables.

Randomized Amounts: For opportunities, amounts are randomly generated to simulate real-world scenarios.

Folder Structure
src/
├─ data/
│ └─ leads.json
├─ features/
│ ├─ leads/
│ │ ├─ LeadDetailPanel.tsx
│ │ ├─ LeadsPage.tsx
│ │ └─ LeadsTable.tsx
│ ├─ opportunities/
│ │ ├─ OpportunitiesPage.tsx
│ │ └─ types.ts
├─ hooks/
│ └─ useLocalStorage.ts
├─ layouts/
│ └─ DashboardLayout.tsx
└─ App.tsx

Getting Started
Prerequisites

Node.js >= 18

npm or yarn

Installation

# Clone the repository

git clone <repository-url>
cd mini-seller-console

# Install dependencies

npm install

# or

yarn

Running the App

# Start the development server

npm run dev

# or

yarn dev

Open http://localhost:5173
in your browser to view the app.

Generating Leads

A script is included to populate src/data/leads.json with sample leads.
Run the script (if included in package.json):

npm run generate-leads

# or

yarn generate-leads

This will create a list of leads with randomized scores and amounts.

Notes

The amount field for leads is optional; when converted to opportunities, it is randomly assigned.

A simulated delay is used to showcase loading states.

Due to table complexity, horizontal scrolling is enabled on smaller screens.

Technologies Used

React for UI development

Vite for fast build & dev server

Tailwind CSS for styling

TypeScript for type safety
