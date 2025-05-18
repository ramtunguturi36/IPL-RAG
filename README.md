# IPL RAG (Retrieval-Augmented Generation) System

A comprehensive IPL (Indian Premier League) analytics system using local RAG implementation for intelligent cricket data processing and analysis.

## Features

### Backend Features
- Local RAG implementation for IPL data analysis
- FastAPI backend with ngrok tunneling for remote access
- Comprehensive cricket data processing
- Intelligent query processing using Phi-3-mini model
- Vector-based semantic search using FAISS
- Real-time match summaries and player analysis

### Frontend Features
- Modern React-based user interface
- Interactive query input with real-time suggestions
- Match timeline visualization
- Player statistics dashboard
- Team performance comparison
- Match prediction analytics
- Historical data exploration
- Responsive design for all devices
- Dark/Light theme support
- User authentication and profile management
- Favorite matches and players tracking
- Customizable data filters and views
- Export functionality for match reports
- Real-time updates for live matches
- Interactive charts and graphs for analytics
- User preference settings
- Notification system for match updates
- Social sharing capabilities

## Architecture

### Backend (RAG Implementation)

1. **Data Processing**
   - Reads and processes IPL data from multiple sources
   - Uses RecursiveCharacterTextSplitter for text chunking
   - Implements FAISS vector store for efficient similarity search

2. **RAG Components**
   - **Retrieval**: Uses FAISS with cosine similarity for context retrieval
   - **Augmentation**: Combines retrieved context with user queries
   - **Generation**: Uses Phi-3-mini model for response generation

3. **API Layer**
   - FastAPI backend with CORS support
   - ngrok tunneling for public access
   - RESTful API endpoints for query processing

### Frontend

1. **User Interface**
   - Modern React components with Tailwind CSS
   - Responsive layout for all screen sizes
   - Interactive data visualization
   - User-friendly navigation
   - Real-time updates

2. **Data Visualization**
   - Match statistics charts
   - Player performance graphs
   - Team comparison visualizations
   - Historical trends analysis
   - Interactive timelines

3. **User Experience**
   - Smooth animations and transitions
   - Intuitive search interface
   - Customizable layouts
   - Quick access to frequently used features
   - Context-aware suggestions

4. **Performance**
   - Optimized loading times
   - Efficient data fetching
   - Caching mechanisms
   - Lazy loading for large datasets
   - Offline support for cached data

## Setup Instructions

1. **Install Dependencies**
```bash
pip install datasets tqdm pandas matplotlib langchain sentence_transformers faiss-gpu langchain-community torch accelerate
pip install fastapi uvicorn pyngrok
```

2. **Run the Backend**
```bash
python rag.py
```

3. **Frontend Setup**
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

4. **Access the API**
- The ngrok public URL will be displayed upon startup
- Use this URL to access the API endpoints
- Frontend will automatically connect to the backend API

## API Endpoints

- `POST /query`: Main query endpoint for processing IPL-related questions
  - Request Body: `{ "query": "your question here" }`
  - Response: `{ "question": "your question", "answer": "generated response" }`

- `GET /matches`: Get list of matches
- `GET /players`: Get player statistics
- `GET /teams`: Get team information
- `GET /stats`: Get various cricket statistics

## Data Sources

The system processes and analyzes data from:
- Match summaries
- Team information
- Player statistics
- Historical IPL data
- Live match updates
- Player performance metrics
- Team rankings and standings

## Technology Stack

### Backend
- **Framework**: Python with FastAPI
- **RAG Components**:
  - FAISS for vector storage
  - Phi-3-mini for text generation
  - Sentence Transformers for embeddings
- **Data Processing**: LangChain
- **API**: FastAPI with ngrok

### Frontend
- **Framework**: React 18
- **UI**: Tailwind CSS
- **State Management**: React Context
- **Routing**: React Router
- **Development**: Vite
- **Build Tools**: ESLint, Prettier
- **Icons**: Heroicons
- **Charts**: Chart.js
- **Authentication**: JWT
- **API Client**: Axios

## Usage Example

```python
import requests

# Replace with your ngrok URL
url = "YOUR_NGROK_URL"

response = requests.post(
    f"{url}/query",
    json={"query": "What was the result of the match between Mumbai Indians and Rajasthan Royals on 2009-05-14?"}
)

print(response.json())
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Architecture

### Backend (RAG Implementation)

1. **Data Processing**
   - Reads and processes IPL data from multiple sources
   - Uses RecursiveCharacterTextSplitter for text chunking
   - Implements FAISS vector store for efficient similarity search

2. **RAG Components**
   - **Retrieval**: Uses FAISS with cosine similarity for context retrieval
   - **Augmentation**: Combines retrieved context with user queries
   - **Generation**: Uses Phi-3-mini model for response generation

3. **API Layer**
   - FastAPI backend with CORS support
   - ngrok tunneling for public access
   - RESTful API endpoints for query processing

### Frontend

- React-based modern UI
- Real-time query processing
- Interactive cricket data visualization
- User-friendly interface for IPL analytics

## Setup Instructions

1. **Install Dependencies**
```bash
pip install datasets tqdm pandas matplotlib langchain sentence_transformers faiss-gpu langchain-community torch accelerate
pip install fastapi uvicorn pyngrok
```

2. **Run the Backend**
```bash
python rag.py
```

3. **Access the API**
- The ngrok public URL will be displayed upon startup
- Use this URL to access the API endpoints

## API Endpoints

- `POST /query`: Main query endpoint for processing IPL-related questions
  - Request Body: `{ "query": "your question here" }`
  - Response: `{ "question": "your question", "answer": "generated response" }`

## Data Sources

The system processes and analyzes data from:
- Match summaries
- Team information
- Player statistics
- Historical IPL data

## Technology Stack

- **Backend**: Python with FastAPI
- **RAG Components**:
  - FAISS for vector storage
  - Phi-3-mini for text generation
  - Sentence Transformers for embeddings
- **Data Processing**: LangChain
- **API**: FastAPI with ngrok

## Usage Example

```python
import requests

# Replace with your ngrok URL
url = "YOUR_NGROK_URL"

response = requests.post(
    f"{url}/query",
    json={"query": "What was the result of the match between Mumbai Indians and Rajasthan Royals on 2009-05-14?"}
)

print(response.json())
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.
