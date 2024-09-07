import express, { Request, Response } from 'express';
import { config } from "dotenv";
import { getSavedMedia } from './fetchVids.ts';

config();

interface Media {
  id: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  timestamp: string;
}

const app = express();
const PORT = process.env.PORT || 3000;
const accessToken = process.env.ACCESS_TOKEN;
const verifyToken = process.env.VERIFY_TOKEN || 'mySecureToken123';  

app.get("/saved", async (req: Request, res: Response) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === verifyToken) {
      console.log('Webhook verified');
      return res.status(200).send(challenge);
    } else {
      return res.status(403).send('Forbidden: Incorrect verify token');
    }
  }

  try {
    if (!accessToken) {
      return res.status(500).json({ error: "Access token not found" });
    }

    const mediaList: Media[] = await getSavedMedia(accessToken);

    const videoUrls = mediaList
      .filter((media) => media.media_type === "VIDEO")
      .map((media) => media.media_url);

    res.json({ videos: videoUrls });
  } catch (error) {
    console.error("Error fetching media:", error);
    res.status(500).json({ error: "Failed to fetch media" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
