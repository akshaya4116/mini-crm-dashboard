# Mini CRM Dashboard

A full-stack Mini CRM Dashboard built to manage leads efficiently. It allows users to add, view, update, search, filter, and delete leads through a clean and responsive interface.

## Live Demo

- **Frontend:** https://mini-crm-dashboard-rho.vercel.app
- **Backend API:** https://mini-crm-dashboard-13p9.onrender.com
- **GitHub Repository:** https://github.com/akshaya4116/mini-crm-dashboard

## Features

- **Dashboard Overview:** View total leads, new leads, and converted customers.
- **Lead Management:** Add, edit, and delete leads.
- **Search:** Find leads using their name or email.
- **Status Filtering:** Filter leads by New, Contacted, and Converted.
- **Status Updates:** Change a lead's status directly from the dashboard.
- **Persistent Storage:** Store lead information in a Turso database.
- **Responsive Design:** Access the dashboard across different screen sizes.
- **API Integration:** Connect the React frontend with the Express backend.

## Tech Stack

| Category | Technology |
|---|---|
| Frontend | React.js, Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Backend | Node.js, Express.js |
| Database | Turso (SQLite) |
| API | REST API |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |
| Version Control | Git & GitHub |

## Project Structure

```text
mini-crm/
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
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

## Getting Started

### Prerequisites

- Node.js and npm
- A Turso database
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/akshaya4116/mini-crm-dashboard.git
cd mini-crm-dashboard
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
TURSO_DATABASE_URL=your_turso_database_url
TURSO_AUTH_TOKEN=your_turso_auth_token
FRONTEND_URL=http://localhost:5173
```

Add your own Turso database credentials. Never commit your `.env` file.

Start the backend:

```bash
npm run dev
```

The backend runs at:

`http://localhost:5000`

### 3. Set Up the Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## API Endpoints

Base URL: `/api/leads`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/leads` | Retrieve all leads |
| POST | `/api/leads` | Add a new lead |
| PUT | `/api/leads/:id` | Update an existing lead |
| DELETE | `/api/leads/:id` | Delete a lead |

### Lead Fields

- Name
- Email
- Phone
- Business Name
- Status

Available statuses: `New`, `Contacted`, `Converted`.

## Database

The application uses **Turso**, a hosted SQLite-compatible database.

The `leads` table stores lead information, including a unique ID and creation timestamp. Database initialization is handled by the backend.

## Deployment

- Frontend deployed using Vercel.
- Backend deployed using Render.
- Database hosted using Turso.

Environment variables are configured separately in the deployment platforms to keep credentials secure.

## Future Improvements

- User authentication and authorization.
- Lead activity tracking.
- Export leads to CSV.
- Advanced analytics and reporting.
- Role-based access control.

## Author

**Akshaya Reddy**

Mini CRM Dashboard — SHL Tech Internship Task 1.