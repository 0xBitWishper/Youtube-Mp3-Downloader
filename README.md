# YouTube to MP3 Downloader With NodeJs

A simple web application that allows users to download MP3 audio from YouTube videos using RapidAPI's YouTube MP3 Audio Video Downloader service.

## Features

- Convert YouTube videos to MP3 format
- Support for both YouTube video URLs and video IDs
- Simple and intuitive user interface
- Auto-extract video IDs from various YouTube URL formats
- Real-time download with progress indication
- Debug logging panel for troubleshooting

## Installation

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/0xBitWishper/Youtube-Mp3-Downloader.git
   cd Youtube-Mp3-Downloader
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. The API key is already configured in the `server.js` file.

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

1. Open the application in your web browser
2. Paste a YouTube URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ) or just the video ID (e.g., dQw4w9WgXcQ)
3. Click on the "Convert to MP3" button
4. Wait for the processing to complete
5. Click on the "Download MP3" button that appears

## API Endpoints

The backend provides the following API endpoints:

### GET /api/download

Get the MP3 download link for a YouTube video.

#### Parameters:

- `id` (required): YouTube video ID or URL

#### Response:

```json
{
  "title": "YouTube Video Title",
  "link": "/api/download-mp3/VIDEO_ID",
  "videoId": "VIDEO_ID"
}
```

### GET /api/download-mp3/:videoId

Stream the MP3 file to the client.

#### Parameters:

- `videoId` (required): YouTube video ID

#### Response:
Binary data stream of the MP3 file

## API Source

This project uses the [YouTube MP3 Audio Video Downloader API](https://rapidapi.com/ytjar/api/youtube-mp3-audio-video-downloader/) from RapidAPI. The API provides the following features:

- Download YouTube videos as MP3 audio files
- Get video metadata
- Support various quality options

To use your own API key:
1. Sign up at [RapidAPI](https://rapidapi.com/)
2. Subscribe to the [YouTube MP3 Audio Video Downloader API](https://rapidapi.com/ytjar/api/youtube-mp3-audio-video-downloader/)
3. Replace the API key in `server.js`

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- External APIs: YouTube MP3 Audio Video Downloader API (RapidAPI)
- Dependencies:
  - express: Web server framework
  - node-fetch: HTTP client for API calls
  - cors: Cross-Origin Resource Sharing support

## License

ISC

## Copyright

© 2025 0xBit. All rights reserved.

## Support Development

If you find this tool useful, consider supporting the development by donating TON:

```
UQCcYieLec0K-xwbvEoqYxMu3IMTDUTSj3jqhW8o5lKtMsLw
```

## Disclaimer

This tool is for personal use only. Please respect YouTube's terms of service and copyright laws. Do not download copyrighted content without permission.
EOL