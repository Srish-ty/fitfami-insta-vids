import { getSavedMedia } from "./fetchVids";

interface Media {
  id: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  timestamp: string;
}

async function displaySavedMedia() {
  const accessToken = "YOUR_ACCESS_TOKEN"; // Get this after OAuth login
  const mediaList: Media[] = await getSavedMedia(accessToken);

  mediaList.forEach((media) => {
    if (media.media_type === "VIDEO") {
      console.log(`Displaying video: ${media.media_url}`);
    }
  });
}
