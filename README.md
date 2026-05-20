# 🎬 MovieMatrix

MovieMatrix is a sleek and modern web application for discovering movies. Built with React and styled with Tailwind CSS, it leverages The Movie Database (TMDB) API to provide a rich, interactive user experience for exploring, searching, and filtering through a vast collection of films.

<br>

<img width="1436" height="816" alt="Screenshot 2025-08-20 at 5 15 39 PM" src="https://github.com/user-attachments/assets/59cdf975-00fd-49a2-81a4-312389c317d4" />


<br>

---

## ✨ Features

-   **GenAI Vibe Search:** Describe a mood in natural language (e.g. *"cozy rainy night thriller"*) and GPT-4o-mini translates it into TMDB discover parameters — no title needed.
-   **Hero Section:** A visually appealing hero section featuring top-rated movies in a scrolling marquee.
-   **Movie Discovery:** Browse through the most popular movies with a clean, grid-based layout.
-   **Advanced Search:** Instantly search for any movie by title.
-   **Smart Filtering:** Filter the movie collection by genre and release year.
-   **Detailed Movie Pages:** Click on any movie to see a dedicated page with its poster, backdrop, overview, cast, and official trailer.
-   **Pagination:** Easily navigate through multiple pages of movie results.
-   **Responsive Design:** A fully responsive and mobile-friendly interface that looks great on all devices.
-   **Smooth Animations:** Subtle animations and transitions for an enhanced user experience.

---

## 🛠️ Tech Stack

This project is built using a modern and powerful set of technologies:

-   **Frontend:** [React](https://reactjs.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **GenAI:** [OpenAI GPT-4o-mini](https://platform.openai.com/) (vibe → TMDB query translation)
-   **API:** [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Deployment:** [Vercel](https://vercel.com/) (serverless `/api/vibe-search`)

---

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 14 or later) and npm installed on your machine.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/snehaaadn/MovieMatrix.git
    cd MovieMatrix
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   Copy `.env.example` to `.env`
    -   Sign up for a free account at [The Movie Database (TMDB)](https://www.themoviedb.org/signup) and add your API key
    -   *(Optional but recommended for GenAI demo)* Add an [OpenAI API key](https://platform.openai.com/api-keys) as `OPENAI_API_KEY`

    ```bash
    cp .env.example .env
    ```

    ```env
    VITE_TMDB_API_KEY=your_tmdb_key
    OPENAI_API_KEY=your_openai_key   # optional — demo mode works without it
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will now be running on `http://localhost:5173` (or the next available port).

Or You can also check the website here: [Live Demo](https://movie-matrix-lilac.vercel.app/)

---

## 📁 Project Structure

The project is organized with a clean and scalable structure to separate concerns effectively.

```
/api
|-- vibe-search.js  # Vercel serverless — GenAI vibe → TMDB discover
/lib
|-- vibeSearch.js   # OpenAI parsing + TMDB query builder
/src
|-- /components     # UI (VibeSearch, MovieCard, Header, etc.)
|-- /pages          # HomePage, MovieDetailsPage
|-- /services       # Client API helpers (vibeSearch.js)
|-- /routes         # App routing
```

### How Vibe Search Works

1. User describes a mood in the **Vibe Search** panel
2. `POST /api/vibe-search` sends the query to **GPT-4o-mini**, which returns structured TMDB discover params (genres, era, sort order)
3. The server fetches matching movies from TMDB and returns results + an AI explanation
4. Without `OPENAI_API_KEY`, a keyword-based demo mode still runs so you can preview the UX locally

---

##  CONTACT

Created by Sneha Debnath

-   **GitHub:** [@snehaaadn](https://github.com/snehaaadn)
-   **LinkedIn:** [Sneha Debnath](https://www.linkedin.com/in/sneha-debnath-521867289/)

