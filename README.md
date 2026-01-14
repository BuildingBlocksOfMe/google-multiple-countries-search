# Google Search - Multi Country Comparison

A web application that allows you to compare Google search results from multiple countries side by side. Select from 15 major countries and view up to 30 search results per country with search history tracking.

## Features

- 🌍 **Multi-Country Search Comparison**: Compare Google search results from any two of 15 countries simultaneously
- 🎯 **Country Selection**: Choose from 15 major countries including US, Japan, UK, Germany, France, China, South Korea, India, and more
- 📊 **Extended Results**: Display up to 30 search results per country (3 pages)
- 📜 **Search History**: Save past searches with country combinations and re-run them with a single click
- 🎨 **Modern UI**: Beautiful and intuitive design powered by TailwindCSS
- 💾 **Persistent Storage**: Search history stored in SQLite database

## Supported Countries

🇺🇸 United States | 🇯🇵 Japan | 🇬🇧 United Kingdom | 🇩🇪 Germany | 🇫🇷 France
🇨🇳 China | 🇰🇷 South Korea | 🇮🇳 India | 🇧🇷 Brazil | 🇨🇦 Canada
🇦🇺 Australia | 🇲🇽 Mexico | 🇪🇸 Spain | 🇮🇹 Italy | 🇷🇺 Russia

## Tech Stack

### Frontend
- React 18
- Vite
- TailwindCSS
- Axios

### Backend
- Node.js
- Express
- SQLite3
- Google Custom Search API

## Setup Instructions

### 1. Google Custom Search API Configuration

#### Obtain API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Navigate to "APIs & Services" → "Library" and search for "Custom Search API"
4. Enable "Custom Search API"
5. Go to "APIs & Services" → "Credentials" and create an "API Key"

#### Obtain Custom Search Engine ID
1. Visit [Google Programmable Search Engine](https://programmablesearchengine.google.com/)
2. Click "Add" to create a new search engine
3. Search scope: Select "Search the entire web"
4. Search engine name: Enter any name
5. After creation, copy the "Search Engine ID (CX)"

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp env.example.txt .env

# Edit .env file and add your credentials
# GOOGLE_API_KEY=your_api_key_here
# GOOGLE_CX_ID=your_custom_search_engine_id
# PORT=3001
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

## Running the Application

### Start Backend Server

```bash
cd backend
npm start
```

The server will start at `http://localhost:3001`

### Start Frontend

In a separate terminal:

```bash
cd frontend
npm run dev
```

The frontend will start at `http://localhost:3000`

### Access the Application

Open your browser and navigate to `http://localhost:3000`

## How to Use

1. **Select Countries**: Choose two countries from the dropdown menus (Country 1 and Country 2)
2. **Enter Search Query**: Type your search keywords in the search bar
3. **Click Search**: Press the search button to execute the query
4. **View Results**: Results from both countries will be displayed side by side (up to 30 results each)
5. **Check History**: Your search history appears in the left sidebar
6. **Re-run Searches**: Click any history item to re-execute that search

## Project Structure

```
google-search-multiple-countries/
├── backend/                    # Backend API
│   ├── database/
│   │   └── db.js              # SQLite database configuration
│   ├── routes/
│   │   └── search.js          # Search API endpoints
│   ├── server.js              # Express server
│   ├── package.json
│   └── .env                   # Environment variables (create this)
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx         # Search input form with country selector
│   │   │   ├── CountrySelector.jsx   # Country dropdown component
│   │   │   ├── ResultsPanel.jsx      # Search results display
│   │   │   └── SearchHistory.jsx     # Search history sidebar
│   │   ├── services/
│   │   │   └── api.js         # API communication
│   │   ├── App.jsx            # Main application
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## API Endpoints

### POST /api/search
Execute a search and return results from two countries.

**Request:**
```json
{
  "query": "search keywords",
  "country1": "us",
  "country2": "jp"
}
```

**Response:**
```json
{
  "query": "search keywords",
  "countries": {
    "country1": "us",
    "country2": "jp"
  },
  "results": {
    "country1": [
      {
        "title": "Result Title",
        "link": "URL",
        "snippet": "Description",
        "displayLink": "example.com"
      }
    ],
    "country2": [...]
  }
}
```

### GET /api/history
Retrieve search history.

**Query Parameters:**
- `limit`: Number of records to retrieve (default: 20)

**Response:**
```json
[
  {
    "id": 1,
    "query": "search keywords",
    "country1": "US",
    "country2": "JP",
    "timestamp": "2026-01-14T12:00:00.000Z"
  }
]
```

## Important Notes

### Google Custom Search API Limits
- **Free Tier**: 100 queries per day
- **Current Configuration**: Each search uses 6 queries (3 pages × 2 countries)
- **Daily Search Limit**: Approximately 16-17 searches per day with free tier
- To use beyond the free tier, enable billing in Google Cloud Platform
- Results may differ from regular Google search

### Adjusting Results Count

To reduce API usage or adjust result count, modify `backend/routes/search.js`:

```javascript
// Current: 3 pages (30 results) → 6 queries per search
const results1Items = await fetchMultiplePages(config1, 3);
const results2Items = await fetchMultiplePages(config2, 3);

// Option 1: 2 pages (20 results) → 4 queries per search (25 searches/day)
const results1Items = await fetchMultiplePages(config1, 2);
const results2Items = await fetchMultiplePages(config2, 2);

// Option 2: 1 page (10 results) → 2 queries per search (50 searches/day)
const results1Items = await fetchMultiplePages(config1, 1);
const results2Items = await fetchMultiplePages(config2, 1);
```

### Development Environment
- Node.js 18 or higher recommended
- npm or yarn

### Security
- **Never commit** the `.env` file to Git
- Use proper environment variable management in production
- Keep your API keys secure

## Troubleshooting

### API Key Errors
- Verify `.env` file exists in the backend directory
- Check that `GOOGLE_API_KEY` and `GOOGLE_CX_ID` are correctly set
- Confirm Custom Search API is enabled in Google Cloud Console

### No Search Results
- Ensure backend server is running (check `http://localhost:3001/health`)
- Check browser console for errors
- Verify you haven't exceeded the free tier limit (100 queries/day)

### Port Already in Use
- Backend: Change `PORT` in `.env` file
- Frontend: Modify `server.port` in `vite.config.js`

## License

ISC

## Author

DIY App Development Project
