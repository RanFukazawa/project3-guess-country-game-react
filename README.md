# Final Project: Guess Country Game (Extended ver.)

## Project Objective
The objective of this project is to develop an enhanced full-stack educational web application that builds upon Project 3 by implementing dual game modes (Flag to Country and Country to Flag), a forgiving two-attempt system with partial scoring, and a comprehensive review page for performance analysis. The project aims to demonstrate proficiency in modern web development by creating a secure authentication system protecting an intuitive admin panel, implementing complex React state management for multi-attempt tracking, designing reusable components supporting multiple game modes, and integrating all features into a cohesive, user-friendly application that effectively balances educational value with engaging gameplay.

## Screenshot
<img width="800" height="600" alt="A thumbnail of Guess Country Game App (home screen)" src="https://raw.githubusercontent.com/RanFukazawa/project3-guess-country-game-react/final-project-branch/final_project_thumbnail_1.png" />
<img width="800" height="600" alt="A thumbnail of Guess Country Game App (game screen)" src="https://raw.githubusercontent.com/RanFukazawa/project3-guess-country-game-react/final-project-branch/final_project_thumbnail_2.png" />

## Tech Requirements
### Frontend
- React (v19.1.1)
- React Router DOM (v7.9.6)
- Vite (v7.1.7)
- React BootStrap (v2.10.10)
- Bootstrap (v5.3.8)

### Backend
- Node.js (v22.x)
- Express.js (v4.16.1)
- MongoDB Driver (v7.0.0)
- ES6 Modules

### Database
- MongoDB Atlas (cloud database)

### External Services
- [Flagpedia CDN](https://flagcdn.com) for country flag images

### Deployment
- Render (web service platform)

## How to Install/Use Locally
### Prerequisites
- Node.js (v22.x or higher)
- MongoDB Atlas account (free tier)

### Installation Steps
1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/RanFukazawa/project3-guess-country-game-react
   cd project3-guess-country-game-react

2. Switch to the final-project-branch:
   ```bash
   git checkout final-project-branch

3. Install backend dependencies:
   ```bash
   cd backend
   npm install

4. Install frontend dependencies:
    ```bash
    cd ../frontend
    npm install

5. Set up environment variables: Create a `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@countriesdata.bljv4ed.mongodb.net/guessCountryGame?retryWrites=true&w=majority
   PORT=3000
   NODE_ENV=production

6. Populate the database with initial country data (15-20 countries) via the Admin Panel after starting the servers.

7. Start the backend server:
    ```bash
    cd backend
    npm start
    # Backend will run on http://localhost:3000

8. Start the frontend development server (in a new terminal):
    ```bash
    cd frontend
    npm run dev
    # Frontend will run on http://localhost:5173

9. Open your browser and navigate to:
    ```bash
    http://localhost:5173

## How to Deploy to Render

### Prerequisites
- Render account (free tier works)
- MongoDB Atlas account (free tier works)
- GitHub repository with your code

### Deployment Steps
1. Set up MongoDB Atlas:
    - Create a free cluster at MongoDB Atlas
    - Create a database named `guessCountryGame`
    - Create a database user with read/write permissions    
    - Whitelist all IPs (0.0.0.0/0) under Network Access
    - Get your connection string

2. Prepare your repository:
    - Ensure your code is pushed to GitHub
    - Verify `.env` is in `.gitignore` (never commit credenitals!)
    - Update `backend/server.js` to server static React files in production

3. Deploy via Render Dashboard:
    - Go to render.com
    - Click "New+" -> "Web Service"
    - Connect to your GitHub repository
    - Select "final-project-branch"
    - Configure project settings:
        - **Name**: final-guess-country-game-react
        - **Runtime**: Node
        - **Build Command**:
        ```bash
        cd frontend && npm install --include=dev && npm run build && cd ../backend && npm install
        ```
        - **Start Command**:
        ```bash
        cd backend && npm start

4. Add environment variables in Render:
- Go to Environment tab
- Add the following variables:
    - `NODE_ENV` = `production`
    - `MONGODB_URI` = `mongodb+srv://<username>:<password>@countriesdata.bljv4ed.mongodb.net/guessCountryGame?retryWrites=true&w=majority`
    - Click "Save Changes"

5. Deploy:
    - Render will automatically build and deploy your application
    - Wait for the build to complete (5-10 minutes)

6. Access your live app:
    ```bash
    https://final-guess-country-game-react.onrender.com/

7. Populate the database:
    - Navigate to `/admin` on your deployed site
    - Login to the admin page: username: `admin` password: `admin-only`
    - Add 15-20 countries through the admin panel

## Author
Ran Fukazawa

[Visit Guess Country Game App](https://final-guess-country-game-react.onrender.com/)

## Reference
This project was created as part of [CS5610 Final Project](https://northeastern.instructure.com/courses/225993/assignments/2901096) coursework.

## Video Demonstration
[Link to video](https://youtu.be/sO2PpWLALbo)

## Generative AI Usage
This project used **Claude.ai Sonnet 4.5** (by Anthropic) for assistance in the following areas:

1. **Multi-Attempt Game Logic Implementation**  
   - **Prompt:**  
     *"I want to implement a second chance attempt system where users get full points on first try and half points on second try. How can I track attempts and update scoring accordingly?"*  
   - **Outcome:** Implemented attempt tracking with useState, created conditional scoring logic (1.0 for first attempt, 0.5 for second), designed delayed feedback system that re-enables options for second attempts, and structured record keeping to capture both attempts for review.

2. **Component Refactoring and State Management**  
   - **Prompt:**  
     *"I have this QuizGame logic that handles checking answers. I want to add another game mode (Country to Flag), but I'm not sure how to organize the code. Should I separate the files?"*  
   - **Outcome:** Learned lifting state up pattern to share game logic across modes, refactored into parent QuizGame with mode-specific child components (FlagToCountry, CountryToFlag), implemented shared props pattern for score tracking and question progression, and created reusable ResultsScreen supporting multiple game modes.

3. **Backend API Enhancement**  
   - **Prompt:**  
     *"For CountryToFlag mode, I need flag URLs of all 4 countries, but getRandomCountry() only returns country names in options. Can I call it 4 times or should I modify the backend?"*  
   - **Outcome:** Created new getRandomCountryWithFlags() function in MongoDB module, implemented backend route for /api/quiz/random-with-flags endpoint, ensured unique country selection using MongoDB $sample aggregation, and structured response to include flag metadata for all options.

4. **Complex Review System with Multiple Attempts**  
   - **Prompt:**  
     *"In the ResultsScreen, when user attempted incorrectly for both two attempts, the first attempt flag is showing the second attempt flag. How do I fix this?"*  
   - **Outcome:** Identified missing firstAttemptFlagUrl state variable in CountryToFlag component, implemented proper storage of first attempt flag URL before second attempt, updated record structure to include both firstAttemptFlagUrl and selectedFlagUrl, and modified ResultsScreen to display correct flag images for each attempt.

5. **Documentation**  
   - **Prompt:**  
     *"I need to update the project objective in README.md. Here is the one for Project 3... For the final project, I additionally implemented [features]."*  
   - **Outcome:** Crafted comprehensive project objective highlighting enhancements over Project 3, documented dual game modes and two-attempt system, explained technical implementations and learning goals, and structured documentation to emphasize both educational value and technical proficiency.

