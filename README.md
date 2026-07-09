# A.D.A Solar - Solar Energy Management System

Complete monorepo application for managing solar panel installations and monitoring energy production.

## Project Structure

```
A.D.A solar/
├── backend/          # Next.js API with Prisma ORM
├── frontend/         # Angular web application
├── package.json      # Monorepo root configuration
└── .env.example      # Environment variables template
```

## Technology Stack

### Backend
- **Next.js 14** - React framework for production
- **Prisma ORM** - Database management
- **PostgreSQL** - Relational database
- **TypeScript** - Type-safe JavaScript

### Frontend
- **Angular 17** - Modern web framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Responsive utility-first CSS
- **Axios** - HTTP client
- **Geolocation API** - GPS tracking
- **Battery Status API** - Device battery monitoring

## Prerequisites

- **Node.js** 18+ 
- **npm** 9+ or **yarn**
- **PostgreSQL** 12+

## Installation

1. **Clone or extract the project**

2. **Install root dependencies:**
```bash
npm install
```

3. **Backend Setup**

Navigate to the `backend` folder:
```bash
cd backend
```

Create `.env.local` file:
```
DATABASE_URL="postgresql://user:password@localhost:5432/ada_solar_db"
```

Run Prisma migrations:
```bash
npm run prisma:migrate
```

4. **Frontend Setup**

Navigate to the `frontend` folder:
```bash
cd frontend
npm install
```

## Running the Application

### Start Both Backend and Frontend (from root):
```bash
npm run dev
```

### Start Only Backend:
```bash
npm run dev:backend
```

The backend API will run at `http://localhost:3000`

### Start Only Frontend:
```bash
npm run dev:frontend
```

The frontend will run at `http://localhost:4200`

## API Endpoints

### Health Check
- `GET /api/health` - Backend health status

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
  - Body: `{ "email": "user@example.com", "name": "User Name" }`

### Solar Panels
- `GET /api/solar-panels` - Get all solar panels
- `POST /api/solar-panels` - Create new solar panel
  - Body: `{ "name": "Panel 1", "location": "Roof", "capacity": 10 }`

### Energy Readings
- Data structure ready for energy monitoring (expand with GET/POST endpoints as needed)

## Database Schema

### Users Table
- `id` - Primary key
- `email` - Unique email
- `name` - User name
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

### SolarPanel Table
- `id` - Primary key
- `name` - Panel name
- `location` - Installation location
- `capacity` - Power capacity in kW
- `status` - Panel status (active/inactive)
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

### EnergyReading Table
- `id` - Primary key
- `panelId` - Foreign key to SolarPanel
- `wattage` - Power output in watts
- `timestamp` - Reading timestamp
- `createdAt` - Timestamp

## Frontend Pages

### Dashboard
- System status overview
- Count of solar panels
- Count of users
- Backend connectivity check

### Solar Panels
- View all installed solar panels
- Add new solar panels
- View panel details and status

### Users
- View all users
- Create new user accounts
- View user information

## Development

### Backend Development
- API routes are in `backend/pages/api/`
- Database models are defined in `backend/prisma/schema.prisma`
- API service layer recommended for business logic

### Frontend Development
- Components are in `frontend/src/app/components/`
- Services are in `frontend/src/app/services/`
- Routes are defined in `frontend/src/app/app.routes.ts`

## Useful Commands

### Backend Commands
```bash
cd backend

# Start development server
npm run dev

# Build for production
npm run build

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Push schema to database
npm run prisma:push

# Seed database (optional)
npm run prisma:seed
```

### Frontend Commands
```bash
cd frontend

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Run linter
npm run lint
```

## Environment Variables

Create `.env.local` in the `backend` folder:

```
DATABASE_URL="postgresql://user:password@localhost:5432/ada_solar_db"
NODE_ENV=development
```

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Configure database in `backend/.env.local`
3. ✅ Run migrations: `cd backend && npm run prisma:migrate`
4. ✅ Start development: `npm run dev`
5. ✅ Access frontend at `http://localhost:4200`
6. ✅ Access backend at `http://localhost:3000`

## Troubleshooting

**Backend won't start:**
- Check PostgreSQL is running
- Verify DATABASE_URL in `.env.local`
- Run `npm run prisma:push` to sync schema

**Frontend can't connect to backend:**
- Ensure backend is running on port 3000
- Check API service URL in `frontend/src/app/services/api.service.ts`
- Check browser console for CORS errors

**Database connection error:**
- Verify PostgreSQL credentials in DATABASE_URL
- Ensure database exists
- Run `npm run prisma:push` to create tables

## License

MIT
