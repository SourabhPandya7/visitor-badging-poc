# Visitor Badging POC

A Proof of Concept (POC) web application for visitor badging with HubSpot integration. Visitors fill out a form, and their information is checked against HubSpot to prevent duplicates. If the visitor is new, a badge is generated and their details are added to HubSpot.

## Features

- Simple web form for visitor details (Name, Company, Email)
- Checks for duplicate visitors in HubSpot by email or name+company
- Creates new contacts in HubSpot if not found
- Displays a visitor badge on successful submission
- Error handling and duplicate notifications

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **CRM Integration:** HubSpot API

## Getting Started

### Prerequisites

- Node.js and npm installed
- HubSpot Private App Access Token

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/SourabhPandya7/visitor-badging-poc.git
   cd visitor-badging-poc
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the project root:
     ```
     HUBSPOT_API_KEY=your_hubspot_private_app_token
     ```
   - Replace `your_hubspot_private_app_token` with your actual HubSpot token.

4. **Start the backend server:**
   ```sh
   node server.js
   ```

5. **Run the frontend:**
   - Open `index.html` in your browser, or use a local server (e.g., VS Code Live Server).

## Usage

1. Fill out the visitor form with Name, Company, and Email.
2. Submit the form.
3. The app checks HubSpot for duplicates:
   - If duplicate: You’ll see a duplicate warning.
   - If new: A badge is generated and the visitor is added to HubSpot.

## Troubleshooting

- **500 Internal Server Error:**  
  Check your `.env` file and HubSpot token. Make sure the backend server is running.
- **CORS issues:**  
  Ensure you are not opening `index.html` directly as a file; use a local server.
- **Push errors with Git:**  
  Run `git pull origin main` before pushing.

## License

MIT

## Author