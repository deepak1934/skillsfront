# LearnPath — find your way to any skill

I built LearnPath because I've personally been in that spot where you want to learn something — say, Machine Learning — and you have no idea what to actually learn *first*. You end up jumping between ten blog posts and a dozen YouTube tabs, hoping you're not skipping something important.

LearnPath fixes that. Search for any topic and it shows you the full chain of things you need to learn before it, what it unlocks once you know it, and a few good videos for each step.

This was built as a take-home assignment for Wexa AI, using **CognoDB** — a managed graph database — as the data layer.

---

## What's in this README
- [The idea](#the-idea)
- [Why I used a graph database](#why-i-used-a-graph-database)
- [How the data is modeled](#how-the-data-is-modeled)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [How to run it yourself](#how-to-run-it-yourself)
- [The main queries](#the-main-queries)
- [Screenshots](#screenshots)
- [Live demo](#live-demo)

---

## The idea

Learning paths are basically a web of "you need this before that." That's true whether you're learning to code, learning math, or picking up any new skill — some things are foundational, and other things build on top of them.

LearnPath lets you:
- Search a course/skill and see everything you need to learn first, in order
- See what a course unlocks once you've learned it
- Find the shortest path between any two topics
- Watch curated videos for each step, right where you need them

It's not doing anything magical or AI-driven behind the scenes — it's just following a graph of relationships I set up ahead of time, and doing it fast.

## Why I used a graph database

The whole point of this app is chasing chains of "requires this, which requires that." That's a graph traversal problem at its core, not a row-lookup problem.

If I'd built this with a normal SQL database, following a prerequisite chain more than one level deep would mean recursive self-joins on a prerequisites table — which gets messy and slow fast. And finding the *shortest path* between two random courses? SQL doesn't really have a clean way to do that at all — you'd end up hand-rolling graph logic in your application code anyway.

With CognoDB (Cypher), both of these are just... built in:
- Following a chain of prerequisites, no matter how deep, is one `MATCH` pattern.
- Shortest path between two courses is one call to `shortestPath()`.

So it's not that I picked a graph database because the assignment told me to — the data genuinely *is* a graph (courses connected by "requires" relationships), so I modeled it and queried it as one.

## How the data is modeled

**Nodes:**

| Label | What it stores |
|---|---|
| `Course` | id, name, description, difficulty, category |
| `Video` | title, url, platform, duration |

**Relationships:**

| Relationship | Meaning |
|---|---|
| `(Course)-[:REQUIRES]->(Course)` | This course needs that one first |
| `(Course)-[:HAS_RESOURCE]->(Video)` | This video helps you learn this course |

Here's roughly what a chain looks like:

```
Machine Learning --REQUIRES--> Statistics --REQUIRES--> Python
       |                            |                       |
   HAS_RESOURCE                HAS_RESOURCE            HAS_RESOURCE
       v                            v                       v
"ML Course for              "Stats for Data          "Python Crash
   Beginners"                   Science"                 Course"
```

## Tech stack

- **Database:** CognoDB (managed graph database, speaks Cypher over Bolt)
- **Backend:** Node.js + Express, using the official `neo4j-driver`
- **Frontend:** React (Vite), React Router, Axios
- **Hosting:** Render — one Node service that runs Express, which also serves the built React app. Kept it to a single deploy so there's no CORS juggling between two hosts.

## Project structure

```
learnpath/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── api/
│   └── dist/                # production build, served by Express
├── server/                  # Express backend
│   ├── index.js               # entry point — API + serves the React build
│   ├── db.js                   # CognoDB connection
│   ├── routes/                  # API routes
│   └── seed.js                   # one-time script to load the graph data
├── .env                      # COGNODB_URI, COGNODB_PASSWORD — not committed
├── .gitignore
└── README.md
```

## How to run it yourself

**1. Clone it**
```bash
git clone https://github.com/<your-username>/learnpath.git
cd learnpath
```

**2. Spin up a CognoDB instance**
- Sign up free at [console.cognodb.com/signup](https://console.cognodb.com/signup) — no card needed
- Create a free `c0` instance
- Grab your connection URI (`bolt+s://<instance-id>.databases.cognodb.cloud`) and the password for user `cognodb` — it's shown once, so save it right away

**3. Add your `.env` file** inside `server/`
```
COGNODB_URI=bolt+s://<your-instance-id>.databases.cognodb.cloud
COGNODB_USER=cognodb
COGNODB_PASSWORD=<your-password>
PORT=5000
```

**4. Install everything**
```bash
cd server && npm install
cd ../client && npm install
```

**5. Seed the database** (loads the courses, relationships, and videos)
```bash
cd ../server
node seed.js
```

**6. Run it locally**

Terminal 1:
```bash
cd server
npm run dev
```
Terminal 2:
```bash
cd client
npm run dev
```
React runs at `http://localhost:5173`, talking to the API at `http://localhost:5000`.

**7. Build for production**
```bash
cd client
npm run build
```
Express is set up to serve the resulting `client/dist` folder, so once it's built, `npm start` in `server/` runs the whole app from one place.

## The main queries

**Full prerequisite path for a course** — the multi-hop one
```cypher
MATCH path = (target:Course {id: $courseId})-[:REQUIRES*1..10]->(prereq:Course)
RETURN path
```

**What a course unlocks**
```cypher
MATCH (c:Course {id: $courseId})<-[:REQUIRES]-(unlocked:Course)
RETURN unlocked
```

**Shortest path between two courses** — the one that's genuinely painful in SQL
```cypher
MATCH (start:Course {id: $startId}), (end:Course {id: $endId}),
      p = shortestPath((start)-[:REQUIRES*]-(end))
RETURN p
```

**Videos for a course**
```cypher
MATCH (c:Course {id: $courseId})-[:HAS_RESOURCE]->(v:Video)
RETURN v
```

All of these run as parameterized Cypher through the official driver — no raw string concatenation anywhere.

## Screenshots

*(adding these once the final UI is polished — search page, course detail page, and the prerequisite path view)*

## Live demo

- **App:** `https://skillsfront.vercel.app/`
- **Screen recording:** `https://drive.google.com/file/d/1e498oumEcNJwsHMbUn0Wvkbu-Fet2MQI/view?usp=sharing`
-**GitHUbID** `https://github.com/deepak1934`

---

Built by `Deepak Kumawat` for the Wexa AI take-home assignment.