# A.D.A Solar Backend

Backend API built with Next.js and Prisma ORM for the A.D.A Solar Management System.

## Features

- REST API with Next.js
- PostgreSQL database with Prisma ORM
- Type-safe database operations
- API endpoints for Users, Solar Panels, and Energy Readings

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file and configure your database:
```
DATABASE_URL="postgresql://user:password@localhost:5432/ada_solar_db"
```

3. Run Prisma migrations:
```bash
npm run prisma:migrate
```

4. Start the development server:
```bash
npm run dev
```

The server will run at `http://localhost:3000`

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user

### Solar Panels
- `GET /api/solar-panels` - Get all solar panels
- `POST /api/solar-panels` - Create new solar panel

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:push` - Push schema to database
