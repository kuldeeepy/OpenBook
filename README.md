# OpenBook

OpenBook is a web app where you can browse, read, and download books in PDF format for free. Explore genres, search top titles, and enjoy seamless access to your favorite reads. Perfect for book lovers!

## Directory Structure

```
OpenBook/
├── backend/
│   ├── .dockerignore
│   ├── .gitignore
│   ├── Dockerfile
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
|
├── frontend/
│   ├── src/
│   │   ├── components/
|   |   |   ├── BookCard.jsx
|   |   |   ├── Collection.jsx
|   |   |   ├── Footer.jsx
|   |   |   ├── Layout.jsx
|   |   |   ├── Loader.jsx
|   |   |   ├── Nav.jsx
│   │   |   └── Private.jsx
│   │   ├── context/
│   │   |   └── AuthContext.jsx
│   │   ├── pages/
|   |   |   ├── Book.jsx
|   |   |   ├── Home.jsx
|   |   |   ├── Login.jsx
|   |   |   ├── Signup.jsx
│   │   |   └── Verify.jsx
|   |   ├── services/
│   │   |    └── service.jsx
│   |   ├── App.jsx
│   |   ├── index.css
│   |   └── main.jsx
│   ├── index.html
│   ├── vercel.json
│   └── vite.config.js
├── README.md
└── package.json
```

## Endpoints

```https
  Primary URL https://openlibrary.org
```

#### Get books by Subject

```https
  GET /subjects/fantasy.json?limit=10&offset=0
  GET /subjects/kids.json?limit=10&offset=0
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `subjects` | `string` | **Required**. to fetch item |

#### Search books by name

```https
  GET /search.json?q=the+lord+of+the+rings
  GET /search.json?title=harry+potter
```

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `q`       | `string` | **Required**. to fetch item |
| `title`   | `string` | **Required**. to fetch item |

## Getting started locally

To set-up on your local system, enter the following commands in your terminal:

```bash
# clone the repository
git clone https://github.com/kuldeeepy/OpenBook.git

# move into directory
cd OpenBook

# Add the following environment variables to your .env file
`VITE_ENDPOINT` | `VITE_API_KEY` | `VITE_IMAGE_URL` |
`VITE_FALLBACK_URL` | `VITE_FIREBASE_URL`

Enjoy, happy coding!
```

## Snapshot

![App Screenshot](https://snipboard.io/LRXblm.jpg)

### [Quick demo &#11118;](https://www.youtube.com)

### Get in touch

[![Website](https://img.shields.io/badge/portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://iamkuldeep.vercel.app)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kuldeeep-yadav)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=x&logoColor=white)](https://x.com/iamkuldeepY)
