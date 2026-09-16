# Agentic Calendar Assistant 🗓️🤖

An intelligent, AI-powered meeting and calendar assistant built with modern agentic workflows. It integrates **Google Calendar** using **Descope Out-of-the-Box (OOB) / Integrations**, leverages **Mastra AI** with persistent working memory and streaming tool-calling capabilities, and provides a polished, interactive chat dashboard built with **Next.js 16**, **Tailwind CSS**, and **shadcn/ui**. It also exposes calendar tools via the **Model Context Protocol (MCP)** server standard.

---

## 🌟 Key Features

- **Conversational Calendar Management**: Schedule, reschedule, cancel, and inspect meetings naturally via chat.
- **Agentic Decision Making**: Powered by Mastra AI agent with function calling (Google Calendar APIs).
- **Persistent Agent Memory**: Mastra LibSQL working memory stores conversational context and lasting preferences (e.g. preferred meeting durations, working hours, frequent invitees).
- **Real-Time Streaming**: Server-Sent Events (SSE) stream agent thoughts, tool execution states, and response tokens in real-time.
- **Secure Authentication & Google Integration**: Descope handles user authentication and Google Calendar OAuth tokens securely without saving raw Google credentials in application tables.
- **MCP Server Support**: Exposes calendar tools over standard Model Context Protocol via `@descope/mcp-express` for AI clients.
- **Rich Dashboard UI**: Next.js App Router frontend with dark theme support, markdown rendering for meeting agendas, and calendar connection health monitoring.

---

## 🏗️ Architecture & Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + `@tailwindcss/postcss`
- **Component Library**: shadcn/ui & `@base-ui/react`, Lucide Icons
- **Auth SDK**: `@descope/nextjs-sdk`
- **Markdown**: `react-markdown` + `remark-gfm`

### Backend
- **Runtime**: Node.js + TypeScript (`tsx`)
- **Server**: Express 5
- **AI / Agent Framework**: `@mastra/core`, `@mastra/memory`, `@mastra/libsql`
- **LLM Provider**: OpenAI / Compatible models (default: `gpt-4o-mini`)
- **Database**: PostgreSQL 16 (for user & connection state tracking) + LibSQL (Mastra working memory)
- **Authentication & OAuth**: Descope SDK & Descope Outbound Integration / `@descope/mcp-express`
- **Google APIs**: `googleapis` (Google Calendar API v3)


---

## 📁 Repository Structure

```text
agentic-calendar-assistant/
├── docker-compose.yml          # Local PostgreSQL database container
├── backend/
│   ├── scripts/
│   │   └── migrate.ts          # SQL schema migration script
│   ├── sql/
│   │   ├── 001_users.sql       # Users table definition
│   │   └── 002_connections.sql # Connections table definition
│   ├── src/
│   │   ├── config/             # Agent instructions, Descope client, memory config
│   │   ├── db/                 # Postgres connection pool
│   │   ├── mcp/                # Descope MCP server tools & endpoints
│   │   ├── middleware/         # Descope session authentication middleware
│   │   ├── repositories/       # User & connection database access
│   │   ├── routes/             # Express routes (/api/agent, /api/connections)
│   │   └── services/           # Calendar service, agent service, token service
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/                # Next.js App Router (dashboard, sign-in, layout)
│   │   ├── components/         # Chat panel, connection panel, UI components
│   │   └── lib/                # API clients, Descope helpers, TypeScript types
│   └── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v20 or higher
- **Docker & Docker Compose**: to run PostgreSQL locally
- **Descope Account**: [Descope Console](https://app.descope.com/) project with Google Calendar Outbound Integration enabled
- **OpenAI API Key**: For the Mastra AI agent

---

### 1. Start the PostgreSQL Database

Launch the local PostgreSQL container via Docker Compose:

```bash
docker compose up -d
```

This starts PostgreSQL on port `5442` (database: `agentic_calendar_app_db`).


---

### 2. Configure and Run Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` configuration in `backend/.env`:
   ```env
   PORT=4000
   APP_URL=http://localhost:3000
   DATABASE_URL=postgresql://postgres:postgres@localhost:5442/agentic_calendar_app_db

   # Descope Configuration
   DESCOPE_PROJECT_ID=your_descope_project_id
   DESCOPE_MANAGEMENT_KEY=your_descope_management_key
   DESCOPE_CALENDAR_CONNECTION_ID=google-calendar

   # LLM Configuration
   OPENAI_API_KEY=your_openai_api_key
   AI_MODEL=gpt-4o-mini

   # Optional MCP Configuration
   SERVER_URL=http://localhost:4000
   DESCOPE_MCP_SERVER_WELL_KNOWN_URL=
   ```

4. Run the database migration script:
   ```bash
   npm run migrate
   ```

5. Start the backend development server:
   ```bash
   npm run dev
   ```

The backend server will run on [http://localhost:4000](http://localhost:4000). You can check health at `GET /health`.

---

### 3. Configure and Run Frontend

1. Navigate to the frontend directory in a separate terminal:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` configuration in `frontend/.env`:
   ```env
   NEXT_PUBLIC_DESCOPE_PROJECT_ID=your_descope_project_id
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to open the web dashboard.



---

## 💬 Usage & Agent Capabilities

1. **Sign In**: Navigate to `http://localhost:3000/sign-in` and authenticate via Descope.
2. **Connect Calendar**: On the dashboard side panel, click **Connect Google Calendar** to grant Google Calendar scopes via Descope.
3. **Interact with the Assistant**:
   - **View Schedule**: *"What's on my agenda today?"* or *"List my meetings for this week."*
   - **Check Availability**: *"Am I free tomorrow afternoon between 2 PM and 4 PM?"*
   - **Book Meetings**: *"Schedule a sync with team@example.com tomorrow at 10 AM for 30 minutes."* (Automatically includes Google Meet links).
   - **Reschedule**: *"Move my 3 PM meeting to 4:30 PM."*
   - **Cancel**: *"Cancel the sync meeting tomorrow morning."*

---

## 🛠️ API Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/health` | Server and PostgreSQL health status | No |
| `GET` | `/api/connections` | Retrieve user's Google Calendar connection state | Yes (Session Bearer) |
| `POST` | `/api/connections/connect` | Generate Descope OAuth redirect URL for Calendar | Yes (Session Bearer) |
| `POST` | `/api/connections/refresh-status` | Refresh and verify connection status from Descope | Yes (Session Bearer) |
| `GET` | `/api/agent/threads` | Fetch conversation threads for user | Yes (Session Bearer) |
| `GET` | `/api/agent/threads/:threadId` | Fetch message history of a specific thread | Yes (Session Bearer) |
| `POST` | `/api/agent/chat` | Send a prompt and stream agent execution (SSE) | Yes (Session Bearer) |
| `ALL` | `/mcp` | Mount point for Model Context Protocol tools | Via Descope MCP Bearer |

---

## 📜 Available Scripts

### Backend (`/backend`)
- `npm run dev` - Run development server with live reload (`tsx watch src/index.ts`).
- `npm run build` - Transpile TypeScript to JavaScript (`dist/`).
- `npm run start` - Run transpiled production build.
- `npm run migrate` - Execute database migration SQL scripts against PostgreSQL.

### Frontend (`/frontend`)
- `npm run dev` - Start Next.js development server.
- `npm run build` - Create optimized production Next.js build.
- `npm run start` - Start production Next.js server.

---

## 🛡️ License

This project is licensed under the [MIT License](LICENSE).

