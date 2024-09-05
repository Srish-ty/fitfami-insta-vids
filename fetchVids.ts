// to get saved media of user

async function getSavedMedia(accessToken: string) {
  const url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,timestamp&access_token=${accessToken}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export { getSavedMedia };