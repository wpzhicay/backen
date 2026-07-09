# A.D.A Solar - Development Instructions

## Project Overview
A monorepo application for managing solar panel installations and energy monitoring:
- **Backend**: Next.js 14 + Prisma + PostgreSQL
- **Frontend**: Angular 17
- **Purpose**: Solar energy management system

## Project Structure
```
A.D.A solar/
├── backend/              # Next.js API
│   ├── pages/api/       # API routes
│   ├── prisma/          # Database schema
│   └── package.json     # Backend dependencies
├── frontend/            # Angular app
│   ├── src/app/         # Angular components & services
│   ├── src/index.html   # Main HTML
│   └── angular.json     # Angular config
└── package.json         # Root monorepo config
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Database Setup**
   - Edit `backend/.env.local` with your PostgreSQL connection
   - Run: `cd backend && npm run prisma:migrate`

3. **Run Development**
   ```bash
   npm run dev          # Both backend and frontend
   npm run dev:backend  # Backend only (port 3000)
   npm run dev:frontend # Frontend only (port 4200)
   ```

## Development Guidelines

### Backend (Next.js + Prisma)
- API routes: `backend/pages/api/`
- Database models: `backend/prisma/schema.prisma`
- Always use Prisma for database operations
- Migrate: `npm run prisma:migrate` after schema changes

### Frontend (Angular)
- Components: `frontend/src/app/components/`
- Services: `frontend/src/app/services/`
- API base URL: Update in `api.service.ts` if needed

## Key Commands

```bash
# From root directory
npm run dev              # Start both backend and frontend
npm run build            # Build both projects
npm run build:backend    # Build backend only
npm run build:frontend   # Build frontend only

# Backend only
cd backend
npm run dev              # Development server
npm run prisma:migrate   # Database migrations
npm run prisma:push      # Sync schema to DB

# Frontend only
cd frontend
npm start                # Development server
npm run build            # Production build
npm test                 # Run tests
```

## Database

**Schema Locations:**
- `backend/prisma/schema.prisma`

**Tables:**
- `User` - User accounts
- `SolarPanel` - Installed solar panels
- `EnergyReading` - Power generation data

**Migrations:**
```bash
cd backend
npm run prisma:migrate  # Create and run migrations
npm run prisma:push     # Sync schema without migrations
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/users` - List users
- `POST /api/users` - Create user
- `GET /api/solar-panels` - List solar panels
- `POST /api/solar-panels` - Create solar panel

## Frontend Features

- **Dashboard**: System status and statistics
- **Solar Panels**: View and manage panels
- **Users**: User management

## Common Tasks

### Add a New API Endpoint
1. Create file: `backend/pages/api/[resource].ts`
2. Handle HTTP methods (GET, POST, etc.)
3. Use Prisma for DB operations

### Add a New Angular Component
1. Create files: `frontend/src/app/components/[name]/`
2. Define in `app.routes.ts`
3. Use ApiService for backend calls

### Modify Database Schema
1. Edit `backend/prisma/schema.prisma`
2. Run: `npm run prisma:migrate`
3. Select migration description

## Environment Variables

**Backend** (`backend/.env.local`):
```
DATABASE_URL="postgresql://user:password@localhost:5432/ada_solar_db"
NODE_ENV=development
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | Check PostgreSQL running, verify DATABASE_URL |
| Frontend can't reach API | Ensure backend on port 3000, check CORS settings |
| Prisma errors | Run `npm run prisma:push` to sync schema |
| Port conflicts | Change port in `backend/next.config.js` or `frontend/angular.json` |

## Notes

- Monorepo uses npm workspaces
- Standalone Angular components (no NgModules)
- Prisma handles all database operations
- CORS configured for localhost:4200 → localhost:3000
