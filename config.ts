const CLIENT_ID ="YOUR_CLIENT";
const REDIRECT_URI = "YOUR_REDIRECT_URI";

const loginUrl = `https://api.instagram.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
