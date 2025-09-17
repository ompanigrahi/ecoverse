# Ecoverse Frontend

This is the frontend repository for the **Ecoverse** project. It is built with **React** and uses **AWS S3** to upload files.

---

## Prerequisites

- **Node.js** version 22
- **npm** or **yarn**
- **AWS Credentials** (Access Key ID and Secret Access Key)
- **Git**

---

## Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/ompanigrahi/ecoverse.git
cd ecoverse/Frontend


2. Install dependencies
npm install
# or
yarn install

3. Configure environment variables

Create a .env file in the root of the Frontend folder with the following content:

REACT_APP_AWS_ACCESS_KEY_ID=your_access_key_here
REACT_APP_AWS_SECRET_ACCESS_KEY=your_secret_key_here
REACT_APP_AWS_REGION=us-east-1
REACT_APP_S3_BUCKET_NAME=eco-docs


⚠️ Do not commit .env to GitHub! It contains sensitive information.

4. Run the development server
npm start
# or
yarn start


The app should open at http://localhost:5173
.

Project Structure
Frontend/
├── src/
│   ├── pages/
│   │   └── SubmissionForm.jsx
│   ├── components/
│   └── App.jsx
├── public/
├── package.json
└── .env


SubmissionForm.jsx — The main form page that uploads files to AWS S3.

.env — Stores your AWS credentials and bucket information.

public/ — Static assets.

Notes

The form uploads files directly to S3. Make sure the bucket CORS is configured to allow your frontend URL.

This setup is for prototype/demo purposes only. Never expose AWS keys in production.

AWS S3 CORS Configuration

Example CORS policy for local development:

[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT", "POST", "GET"],
    "AllowedOrigins": ["http://localhost:5173"],
    "ExposeHeaders": ["ETag"]
  }
]

Author

Om Panigrahi
