# Crucible - Agentic AI Startup Validator

![Crucible Dashboard](./landing.png)

**Crucible** is an advanced AI-powered platform designed to validate startup ideas. By leveraging agentic workflows and generative AI, it provides deep insights, market analysis, and actionable feedback to help entrepreneurs refine their concepts before writing a single line of code.

## 🚀 Features

-   **Idea Validation**: Submit your startup concept and receive instant, AI-driven feedback.
-   **Market Analysis**: Get detailed reports on market size, competitors, and trends.
-   **Agentic Workflows**: Autonomous agents research and synthesize data to provide comprehensive insights.
-   **PDF Reports**: Generate professional, branded PDF reports of your validation results.
-   **Futuristic UI**: A sleek, modern interface designed for a premium user experience.

## 🛠️ Tech Stack

-   **Frontend**: Next.js 15, React 19, TailwindCSS, Framer Motion
-   **Backend**: Node.js, Express, TypeScript
-   **AI**: Google Gemini API
-   **Database**: Firebase / Firestore
-   **DevOps**: Docker, Docker Compose

## 🏁 Getting Started

You can run Crucible locally using Docker (recommended) or by installing dependencies manually.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18+)
-   [Docker](https://www.docker.com/) & Docker Compose (optional)
-   Google Gemini API Key
-   Firebase Service Account Key

### Option 1: Run with Docker 🐳 (Recommended)

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/crucible.git
    cd crucible
    ```

2.  **Set up environment variables:**
    -   Create a `.env` file in `backend/` and add your keys:
        ```env
        GEMINI_API_KEY=your_api_key
        FIREBASE_SERVICE_ACCOUNT=your_service_account_json
        ```

3.  **Start the application:**
    ```bash
    docker-compose up --build
    ```

4.  **Access the app:**
    -   Frontend: `http://localhost:3000`
    -   Backend: `http://localhost:3001`

### Option 2: Run Locally 💻

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/crucible.git
    cd crucible
    ```

2.  **Install dependencies:**
    ```bash
    npm run install:all
    ```

3.  **Set up environment variables:**
    -   Create `.env` in `backend/` as shown above.

4.  **Start the development servers:**
    ```bash
    npm run dev
    ```
    This command runs both frontend and backend concurrently.

## 📂 Project Structure

```
crucible/
├── backend/            # Node.js/Express API
│   ├── src/            # Source code
│   └── Dockerfile      # Backend Docker configuration
├── frontend/           # Next.js Application
│   ├── src/            # Source code
│   └── Dockerfile      # Frontend Docker configuration
├── docker-compose.yml  # Docker orchestration
├── package.json        # Root scripts
└── README.md           # Project documentation
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
