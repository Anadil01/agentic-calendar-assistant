# Agentic Calendar Assistant 🗓️🤖

> **An AI-powered calendar agent that understands natural language, checks availability, schedules meetings, and safely handles destructive actions with human approval.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://agentic-calendar-assistant.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Anadil01/agentic-calendar-assistant)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

---

## ✨ Overview

**Agentic Calendar Assistant** is a full-stack AI calendar application that lets users manage Google Calendar through natural-language conversations.

Instead of navigating multiple calendar screens, users can simply ask:

> "What's on my calendar today?"
>
> "Find me a free 30-minute slot tomorrow morning."
>
> "Schedule a project discussion tomorrow at 10 AM."
>
> "Cancel the Test Meeting."

The application uses an **agentic workflow** to understand the request, select the appropriate calendar tool, execute the operation, and stream the result back to the user.

Destructive actions such as cancellation use a **human-in-the-loop approval flow** before the calendar event is permanently removed.

### 🔗 Links

- **Live Demo:** https://agentic-calendar-assistant.vercel.app
- **GitHub:** https://github.com/Anadil01/agentic-calendar-assistant

---

## 🚀 Features

### 🤖 Agentic Calendar Management

Interact with your calendar using natural language.

- View upcoming meetings
- View today's agenda
- Check calendar availability
- Find free time slots
- Create meetings
- Generate Google Meet links
- Reschedule meetings
- Cancel meetings
- Send calendar invitations

---

### 🧠 AI Agent + Tool Calling

The application uses **Gemini + Mastra** to transform natural-language requests into structured tool calls.

Example:

```text
User
  ↓
"Find a free 30-minute slot tomorrow morning"
  ↓
Gemini Agent
  ↓
checkCalendarBusy()
  ↓
Google Calendar API
  ↓
Available time slot
  ↓
Streaming response
```

### 💾 Persistent Agent Memory
Mastra memory stores conversational context across threads.
This allows the assistant to maintain useful context such as:
- Previous conversations
- Meeting preferences
- Frequently used information
- Conversation history

Mastra working memory is backed by LibSQL.

### ⚡ Real-Time Streaming
Agent responses are streamed to the frontend using Server-Sent Events (SSE).
The UI can receive:
- Agent progress
- Tool execution states
- Response tokens
- Approval requests
- Completion events
- Errors

This creates a more interactive agent experience instead of waiting for the entire response.

### 🔐 Authentication & Google Calendar OAuth
Authentication is handled through Descope.
Google Calendar is connected through Descope's outbound OAuth integration.
The application does not store raw Google OAuth credentials in application tables.
The backend retrieves the appropriate Google Calendar access token when calendar operations are required.

### 🛡️ Human-in-the-Loop Safety
Destructive calendar operations require explicit user approval.
For example:

```text
User:
Cancel my Test Meeting.
        ↓
Agent:
Cancellation requested.
        ↓
User:
Confirm
        ↓
Google Calendar:
Event cancelled
```
This prevents an AI agent from silently performing destructive calendar operations.

### 🔌 MCP Server
The application exposes calendar functionality through the Model Context Protocol (MCP).
The MCP server is authenticated using Descope MCP.
Current MCP endpoint:
`POST /mcp`
Production:
`https://agentic-calendar-backend.onrender.com/mcp`

The current MCP implementation exposes the `listUpcomingMeetings` tool and uses authenticated user context when accessing Google Calendar.

### 🧩 Tech Stack

**Frontend**
<p>
  <img src="https://skillicons.dev/icons?i=nextjs,react,typescript,tailwind" />
</p>

- Next.js 16 — App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Base UI
- Lucide Icons
- React Markdown
- Remark GFM
- Descope Next.js SDK

**Backend**
<p>
  <img src="https://skillicons.dev/icons?i=nodejs,express,typescript" />
</p>

- Node.js
- Express 5
- TypeScript
- tsx
- Zod
- Server-Sent Events (SSE)

**AI & Agent Infrastructure**
<p>
  <img src="https://skillicons.dev/icons?i=google" />
</p>

- Google Gemini
- Gemini 3.6 Flash
- Mastra
- Mastra Memory
- LibSQL
- AI SDK
- Function / tool calling
- Streaming agent execution

**Authentication & Integrations**
- Descope
- Descope Outbound OAuth
- Descope MCP
- Google Calendar OAuth
- Google Calendar API v3
- Google Meet

**Database**
<p>
  <img src="https://skillicons.dev/icons?i=postgresql" />
</p>

- PostgreSQL
- SQL migrations
- Connection state tracking
- Pending action tracking
- User records

**Deployment**
<p>
  <img src="https://skillicons.dev/icons?i=vercel,render,docker,github" />
</p>

- Vercel — Frontend
- Render — Backend
- Render PostgreSQL — Production database
- Docker Compose — Local PostgreSQL
- GitHub — Source control

---

## 🏗️ Architecture

### 🔄 Agent Workflow
The assistant follows a tool-driven workflow rather than directly manipulating calendar data from the UI.

Example: Finding Availability
```text
User Request
     │
     ▼
"Find a free 30-minute slot tomorrow morning"
     │
     ▼
Mastra Agent
     │
     ▼
Gemini decides which tool is required
     │
     ▼
checkCalendarBusy()
     │
     ▼
Google Calendar FreeBusy API
     │
     ▼
Available time calculated
     │
     ▼
SSE stream
     │
     ▼
Frontend response
```

### 🛡️ Authorization Flow
Calendar access is tied to the authenticated user.
```text
User
 │
 ▼
Descope Authentication
 │
 ▼
Authenticated Session
 │
 ▼
Backend validates session
 │
 ▼
Resolve application user
 │
 ▼
Retrieve Google Calendar token
 │
 ▼
Google Calendar API

For MCP requests:
MCP Client
    │
    ▼
Descope MCP Authentication
    │
    ▼
Authenticated MCP Context
    │
    ▼
Calendar Tool
    │
    ▼
Google Calendar
```

---

## 📁 Project Structure

```text
agentic-calendar-assistant/
│
├── docker-compose.yml
├── README.md
├── LICENSE
│
├── backend/
│   │
│   ├── scripts/
│   │   └── migrate.ts
│   │
│   ├── sql/
│   │   ├── 001_users.sql
│   │   ├── 002_connections.sql
│   │   └── 003_pending_actions.sql
│   │
│   ├── src/
│   │   │
│   │   ├── config/
│   │   │   ├── descope.ts
│   │   │   └── ...
│   │   │
│   │   ├── db/
│   │   │   └── ...
│   │   │
│   │   ├── mcp/
│   │   │   ├── calendar-tools.ts
│   │   │   └── mount.ts
│   │   │
│   │   ├── middleware/
│   │   │   └── requireSession.ts
│   │   │
│   │   ├── repositories/
│   │   │   └── ...
│   │   │
│   │   ├── routes/
│   │   │   ├── agent.routes.ts
│   │   │   └── connection.routes.ts
│   │   │
│   │   └── services/
│   │       ├── agent.service.ts
│   │       ├── agent-tools.service.ts
│   │       ├── calendar.service.ts
│   │       └── token.service.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    │
    ├── src/
    │   │
    │   ├── app/
    │   │   ├── dashboard/
    │   │   ├── sign-in/
    │   │   ├── globals.css
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   │
    │   ├── components/
    │   │   ├── chat-panel.tsx
    │   │   ├── connection-panel.tsx
    │   │   └── ...
    │   │
    │   └── lib/
    │       ├── agent.ts
    │       ├── connections.ts
    │       └── ...
    │
    ├── package.json
    └── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have:
- Node.js 20+
- npm
- Docker & Docker Compose
- PostgreSQL
- Descope account
- Google Cloud project
- Google Calendar OAuth configuration
- Gemini API key

### 1. Clone Repository
```bash
git clone https://github.com/Anadil01/agentic-calendar-assistant.git
cd agentic-calendar-assistant
```

### 🐘 2. Start PostgreSQL
Run:
```bash
docker compose up -d
```
The local PostgreSQL instance runs on: `localhost:5442`

### ⚙️ 3. Configure Backend
```bash
cd backend
npm install
```
Create: `backend/.env`
Example:
```env
PORT=4000

APP_URL=http://localhost:3000
SERVER_URL=http://localhost:4000

DATABASE_URL=postgresql://postgres:postgres@localhost:5442/agentic_calendar_app_db

# Descope
DESCOPE_PROJECT_ID=your_descope_project_id
DESCOPE_MANAGEMENT_KEY=your_descope_management_key
DESCOPE_CALENDAR_CONNECTION_ID=google-calendar

# Gemini
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
AI_MODEL=gemini-3.6-flash

# MCP
DESCOPE_MCP_SERVER_WELL_KNOWN_URL=
```
Never commit `.env` files or API keys to GitHub.

### 4. Run Database Migrations
```bash
npm run migrate
```
This applies the SQL migrations in: `backend/sql/`

### 5. Start Backend
```bash
npm run dev
```
Backend: `http://localhost:4000`
Health check: `GET /health`

### 💻 6. Configure Frontend
Open another terminal:
```bash
cd frontend
npm install
```
Create: `frontend/.env`
```env
NEXT_PUBLIC_DESCOPE_PROJECT_ID=your_descope_project_id
NEXT_PUBLIC_API_URL=http://localhost:4000
```
Start the frontend:
```bash
npm run dev
```
Open: `http://localhost:3000`

---

## 💬 Usage

**View Today's Agenda**
> What's on my calendar today?

**Find Availability**
> Find me a free 30-minute slot tomorrow morning.

**Create Meeting**
> Create a 30-minute meeting tomorrow at 10 AM called Project Discussion.
The application can automatically create a Google Meet link.

**Reschedule**
> Move my 3 PM meeting to 4:30 PM.

**Cancel**
> Cancel the Test Meeting.
Cancellation requires explicit confirmation before the event is deleted.

---

## 🔌 MCP
The application exposes calendar functionality through the Model Context Protocol.

**Production Endpoint**
`POST /mcp`
`https://agentic-calendar-backend.onrender.com/mcp`

**Current MCP Tool**
`listUpcomingMeetings`
Supported input:
```json
{
  "maxResults": 10,
  "todayOnly": true
}
```
The MCP server uses Descope authentication and retrieves the authenticated user's calendar context before executing the tool.

---

## 📡 API Reference

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/health` | Backend + database health | Public |
| GET | `/api/connections` | Get calendar connection status | Required |
| POST | `/api/connections/connect` | Start Google Calendar OAuth | Required |
| POST | `/api/connections/refresh-status` | Refresh calendar connection state | Required |
| GET | `/api/agent/threads` | Get user's conversation threads | Required |
| GET | `/api/agent/threads/:threadId` | Get thread messages | Required |
| POST | `/api/agent/chat` | Stream agent response using SSE | Required |
| POST | `/api/agent/approval/confirm` | Confirm pending action | Required |
| POST | `/api/agent/approval/reject` | Reject pending action | Required |
| POST | `/mcp` | MCP server endpoint | Descope MCP |

---

## 🧪 Available Scripts

### Backend
- `npm run dev`: Run development server with tsx watch.
- `npm run build`: Build TypeScript into dist.
- `npm start`: Run production build.
- `npm run migrate`: Run PostgreSQL migrations.

### Frontend
- `npm run dev`: Start Next.js development server.
- `npm run build`: Create production build.
- `npm run start`: Start production Next.js server.

---

## ☁️ Deployment

The production application is deployed using:

```text
Frontend
   ↓
Vercel

Backend
   ↓
Render

Database
   ↓
Render PostgreSQL
```

**Production URLs**
- Frontend: https://agentic-calendar-assistant.vercel.app
- Backend: https://agentic-calendar-backend.onrender.com
- MCP: https://agentic-calendar-backend.onrender.com/mcp

---

## 🔐 Security
The application implements several security mechanisms:
- Descope session authentication
- Authenticated backend routes
- User-specific Google Calendar access
- OAuth-based Google Calendar connection
- Zod input validation
- Human approval before cancellation
- Environment-based secret management
- MCP authentication through Descope
- PostgreSQL-backed application state

Secrets should always be provided through environment variables.

---

## 📸 Screenshots
**Landing Page**
> Add screenshot here.

**AI Calendar Dashboard**
> Add screenshot here.

**Calendar Connection**
> Add screenshot here.

**Human Approval Flow**
> Add screenshot here.

---

## 🧠 What This Project Demonstrates
This project demonstrates practical experience with:
- Agentic AI application development
- LLM tool calling
- AI streaming
- Persistent agent memory
- MCP server implementation
- OAuth integrations
- Authentication and authorization
- Google Calendar API
- Human-in-the-loop workflows
- Server-Sent Events
- PostgreSQL
- Full-stack TypeScript
- Next.js App Router
- Production deployment

---

## 📌 Engineering Highlights

### Natural Language → Tool Execution
The assistant converts conversational requests into structured operations.
```text
Natural Language
      ↓
LLM Reasoning
      ↓
Tool Selection
      ↓
Validated Tool Input
      ↓
External API
      ↓
Structured Result
      ↓
Natural Language Response
```

### Human Approval for Destructive Actions
Calendar cancellation is treated differently from read-only operations.
```text
Read Calendar
     ↓
Execute directly


Cancel Calendar Event
     ↓
Create pending action
     ↓
Request user approval
     ↓
Confirm
     ↓
Execute cancellation
```

---

## 🗺️ Roadmap
Potential future improvements:
- More MCP calendar tools
- Richer calendar event cards
- Multi-calendar support
- Time-zone aware scheduling improvements
- Recurring event support
- More advanced agent preferences
- Calendar analytics
- Improved MCP client interoperability

---

## 📄 License
This project is licensed under the MIT License.
See LICENSE.

---

## 👨‍💻 Author
**Anadil Gazi**
Full-Stack MERN / TypeScript Developer
Building AI-powered products and developer-focused applications.

<p align="center">
  Built with Next.js, TypeScript, Gemini, Mastra, Descope, Google Calendar, PostgreSQL & MCP.
</p>