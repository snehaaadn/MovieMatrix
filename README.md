# 🎬 MovieMatrix

MovieMatrix is a sleek and modern web application for discovering movies. Built with React and styled with Tailwind CSS, it leverages The Movie Database (TMDB) API to provide a rich, interactive user experience for exploring, searching, and filtering through a vast collection of films.

<br>

<img width="1436" height="816" alt="Screenshot 2025-08-20 at 5 15 39 PM" src="https://github.com/user-attachments/assets/59cdf975-00fd-49a2-81a4-312389c317d4" />


<br>

---

## ✨ Features

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
-   **API:** [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Deployment:** [Vercel](https://vercel.com/)

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

3.  **Set up your TMDB API Key:**
    -   Sign up for a free account at [The Movie Database (TMDB)](https://www.themoviedb.org/signup).
    -   Go to your account settings, find the "API" section, and generate a new API key.
    -   In the project, navigate to the `src/pages/` directory. You will need to replace the placeholder API key in both `HomePage.jsx` and `MovieDetailsPage.jsx`.

    Find this line in both files:
    ```javascript
    const TMDB_API_KEY = 'YOUR_TMDB_API_KEY';
    ```
    And replace `'YOUR_TMDB_API_KEY'` with your actual TMDB API key.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will now be running on `http://localhost:5173` (or the next available port).

---

## 📁 Project Structure

The project is organized with a clean and scalable structure to separate concerns effectively.

```
/src
|-- /assets         # Static assets like images and SVGs
|-- /components     # Reusable UI components (Header, Footer, SearchIcon, MovieCard, etc.)
|-- /pages          # Top-level page components (HomePage, MovieDetailsPage)
|-- /routes         # Routing logic for the application
|-- App.jsx         # Main application component
|-- index.css       # Global styles and Tailwind CSS imports
|-- main.jsx        # Entry point of the React application
```

---

##  CONTACT

Created by Sneha Debnath

-   **GitHub:** [@snehaaadn](https://github.com/snehaaadn)
-   **LinkedIn:** [Sneha Debnath](https://www.linkedin.com/in/sneha-debnath-521867289/)

