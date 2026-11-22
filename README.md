# Mini CRM Dashboard

A Mini Customer Relationship Management (CRM) Dashboard built to manage leads, track customer interactions, and monitor business performance.

## Features

- **Dashboard Overview:** View total leads, new leads, and converted customers.
- **Lead Management:** Add, view, edit, and delete leads.
- **Search:** Search leads by name or email.
- **Status Filtering:** Filter leads by New, Contacted, and Converted status.
- **Quick Status Update:** Change lead status directly from the table.
- **Data Persistence:** Store lead information using SQLite.
- **Responsive UI:** Dashboard layout adapts to different screen sizes.
- **Form Validation:** Validate required fields and email addresses.

## Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS
- Lucide React

**Backend**
- Node.js
- Express.js
- REST API

**Database**
- SQLite
- better-sqlite3

## Project Structure

```text
mini-crm/
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
│
├── backend/
│   ├── database/
│   │   └── db.js
│   ├── routes/
│   │   └── leads.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd mini-crm
```

### 2. Setup the backend

```bash
cd backend
npm install
npm run dev
```

Backend runs at:

`http://localhost:5000`

### 3. Setup the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

`http://localhost:5173`

### 4. Database Setup

SQLite database is created automatically when the backend starts for the first time.

No separate database installation or manual table creation is required.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/leads` | Retrieve all leads |
| POST | `/api/leads` | Create a new lead |
| PUT | `/api/leads/:id` | Update a lead |
| DELETE | `/api/leads/:id` | Delete a lead |

## Lead Fields

- Name
- Email
- Phone
- Business Name
- Status (New, Contacted, Converted)

## Future Improvements

- User authentication and authorization
- Lead activity history
- Advanced analytics and reporting
- Pagination for large lead lists
- Deployment with a cloud-hosted database

## Author

Developed as part of the SHL Tech Internship Task 1 – Mini CRM Dashboard.
