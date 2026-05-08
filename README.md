# U-Commerce
## Overview
E-Commerce website designed for and used by 5-college students where they can sell used furniture, class materials, advertise off-campus housing, sell student-made products, advertise student services, and more!

## Features
- Post Listings (buy/sell)
- Comment/Review Lisitngs
- Personalize Profile
- Wishlist + notifications
- Email notifications

## Tech Stack
PERN (Postgres (via Supabase), ExpressKS, ReactJS, NodeJS)

## Quickstart

### Environment Variables

#### Server `.env`
Create a `.env` file inside the **server/** directory with:
```sh
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_service_role_key
MAILERSEND_API_KEY==your_mailersend_api_key
```
### Installation

#### 1. Clone the repository
```sh
git clone https://github.com/BakingPancakes/U-Commerce.git
cd U-Commerce
```

#### 2. Install Backend Dependencies
```sh
cd server/
npm install
```

#### 3. Install Frontend Dependencies
```sh
cd client/
npm install
```

### Running the Application

#### 1. Start the Backend
```sh
cd server/
npm run dev
```

#### 2. Start the Frontend
```sh
cd client/
npm run dev
```

#### 3. Access the App
Open your preferred browser at:
```sh
http://localhost:5173
```

## Repo Structure
- /client
- /server

## Documentation
See client/README.md and server/README.md.

