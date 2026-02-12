# Meeting Action Items Tracker

A lightweight web app to **extract, manage, and track action items** from meeting transcripts.  
Paste your meeting transcript, get action items automatically, edit/add/delete tasks, mark them done, and keep a history of your last 5 meetings.

---

## Features

- Paste a meeting transcript and **extract action items** (task + owner + due date if available).
- **Edit, add, or delete** action items.
- **Mark tasks as done** and filter by status (All / Open / Done).
- View a **history of the last 5 transcripts** processed.
- Responsive and clean UI, inspired by premium SaaS apps.

---

## Live Demo

https://meeting-action-items-tracker-eta.vercel.app/

---

## Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend / API:** Node.js + Express (for action item processing)
- **Database:** Supabase
- **AI Integration:** OpenAI API to extract action items from transcripts
- **Build Tools:** Vite, TypeScript

---

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/karusaini/meeting-action-items-tracker.git
   cd meeting-action-items-tracker
   ```

Install dependencies

npm install
Environment variables

Copy variables from .env.example:

SUPABASE_URL=
SUPABASE_KEY=
OPENAI_API_KEY=
Fill in your Supabase project URL/Key and OpenAI API key.

Run the app in development mode

npm run dev

Build for production

npm run build

🧪 How It Was Tested

Extracting action items from sample transcripts.

Editing, adding, deleting, marking tasks as done.

History of last 5 transcripts verified.

Filters (Open/Done/All) working correctly.

Responsive UI on desktop and mobile.

Made with ❤️ by Karina Saini
