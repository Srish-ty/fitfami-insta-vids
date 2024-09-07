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

app.get("/saved", async (req: Request, res: Response) => {
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
