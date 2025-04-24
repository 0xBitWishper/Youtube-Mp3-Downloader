// Import libraries using ES module syntax
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

// Define the RAPID API KEY
const RAPID_API_KEY = "[YOUR RAPID API]";

const app = express();
app.use(cors());
app.use(express.static('.')); // Serve static files

// Middleware untuk logging request
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Function to fetch video title from YouTube
async function getYoutubeVideoTitle(videoId) {
  try {
    const apiUrl = `https://youtube-mp3-audio-video-downloader.p.rapidapi.com/video/${videoId}`;
    
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-rapidapi-key": RAPID_API_KEY,
        "x-rapidapi-host": "youtube-mp3-audio-video-downloader.p.rapidapi.com",
      },
    });

    if (!response.ok) {
      return `YouTube Audio - ${videoId}`;
    }

    const data = await response.json();
    return data.title || `YouTube Audio - ${videoId}`;
  } catch (error) {
    return `YouTube Audio - ${videoId}`;
  }
}

// Endpoint to handle both video IDs and URLs
app.get("/api/download", async (req, res) => {
  let videoId = req.query.id;
  
  // If it's a URL, extract the video ID
  if (videoId && videoId.includes('youtube.com')) {
    try {
      const url = new URL(videoId);
      videoId = url.searchParams.get('v');
    } catch (error) {
      return res.status(400).json({ error: "Invalid YouTube URL" });
    }
  } else if (videoId && videoId.includes('youtu.be')) {
    try {
      videoId = videoId.split('/').pop().split('?')[0];
    } catch (error) {
      return res.status(400).json({ error: "Invalid YouTube URL" });
    }
  }
  
  if (!videoId) {
    return res.status(400).json({ error: "Video ID is required" });
  }

  try {
    // Fetch the video title
    const videoTitle = await getYoutubeVideoTitle(videoId);
    
    // Create proxy URL for downloading MP3
    const proxyUrl = `/api/download-mp3/${videoId}`;
    
    return res.json({
      title: videoTitle,
      link: proxyUrl,
      videoId: videoId
    });
    
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Proxy endpoint to stream the MP3 file to the client
app.get("/api/download-mp3/:videoId", async (req, res) => {
  const videoId = req.params.videoId;
  
  try {
    const apiUrl = `https://youtube-mp3-audio-video-downloader.p.rapidapi.com/download-mp3/${videoId}?quality=low`;
    
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-rapidapi-key": RAPID_API_KEY,
        "x-rapidapi-host": "youtube-mp3-audio-video-downloader.p.rapidapi.com",
      },
    });

    if (!response.ok) {
      return res.status(response.status).send("Failed to download MP3");
    }

    // Get the content type from response
    const contentType = response.headers.get('content-type');
    
    // Check if the response is an actual audio file or JSON
    if (contentType && (contentType.includes('application/json'))) {
      // Handle JSON response
      const data = await response.json();
      return res.json(data);
    }
    
    // Handle binary data (audio file)
    const contentLength = response.headers.get('content-length');
    
    // Set appropriate headers for streaming the audio file
    res.setHeader('Content-Type', contentType || 'audio/mpeg');
    if (contentLength) {
      res.setHeader('Content-Length', contentLength);
    }
    
    // Get video title to use in the filename
    const videoTitle = await getYoutubeVideoTitle(videoId);
    const safeFilename = videoTitle.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_');
    
    res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}.mp3"`);
    
    // Stream the response to the client
    const stream = response.body;
    stream.pipe(res);
  } catch (error) {
    res.status(500).send("Error streaming MP3");
  }
});

app.listen(3000, () => console.log("Server listening on http://localhost:3000"));
