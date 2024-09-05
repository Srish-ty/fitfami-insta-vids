# FitFami:

# Importing Instagram videos

Status: Draft
Figma: link
PRD: Link
Rough Wireframes: Link

## Info:

Third-party apps
Repost, ReShare Story, and InsTake are apps that allow users to download Instagram videos. InsTake is available on Android and iOS, and doesn't require a paid upgrade.

# Steps to be followed :

## 1. Create an Instagram App

1.1 Access Meta for Developers
Go to Meta for Developers and log in with your Facebook account.
1.2 Create a New App
Click on "Create App" and choose "For Everything Else" as the app type.
Fill in details such as App Display Name, Email Address, and App Purpose, and then create the app.
1.3 Add Instagram Basic Display
Once your app is created, navigate to the "Add a Product" section.
Find "Instagram" and select "Set Up" under Instagram Basic Display to enable Instagram authentication.
1.4 Configure OAuth Redirect
In the Instagram Basic Display settings, add your OAuth Redirect URI. This is the URL where Instagram will redirect users after login (e.g., https://your-app.com/auth/redirect).
Save the App Secret and Client ID as they will be required for authentication.
1.5 Request Permissions
Ensure that your app requests the following permissions when users authenticate:
user_profile: To access basic profile details.
user_media: To access saved media (including videos and reels).

## 2. Implement Instagram OAuth Authentication in Your App

2.1 Generate OAuth Login URL
Construct the Instagram OAuth URL with necessary query parameters like client_id, redirect_uri, and scope to request user authorization for accessing their saved media.
2.2 Handle OAuth Redirect
Once the user logs in, Instagram will redirect to the specified redirect_uri with an authorization code in the URL. This code needs to be exchanged for an access token.
2.3 Obtain Access Token
After obtaining the authorization code, make a server-side request to exchange the code for an access token. The access token will allow you to make API requests on behalf of the user.

## 3. Fetch User's Saved Media

3.1 Request Saved Media via API
With the access token, make requests to the Instagram Graph API to fetch the user's saved media. The API will return media items, including videos and reels, with associated metadata such as media_url, media_type, and timestamp.
3.2 Filter and Display Videos/Reels
Filter the media items based on their type (e.g., videos and reels), and retrieve the relevant URLs for display in your app. You can also obtain additional information like the thumbnail URL for reels.

## 4. Display Videos/Reels in the Frontend

4.1 Create Video Elements
Once the media URLs are retrieved, dynamically generate HTML elements (e.g., video players) in the frontend of your app to display the saved videos or reels.
4.2 Handle Thumbnails
For reels, use the provided thumbnail_url to display thumbnails for a better user experience before the videos are played.

## 5. Access Token Management

5.1 Access Token Expiration
Instagram's short-lived access tokens expire after a short period (usually an hour), so implement logic to either refresh the token or prompt the user to log in again when the token expires.
5.2 Long-Lived Access Tokens
Consider implementing the token refresh flow to obtain long-lived access tokens (up to 60 days) if needed, reducing the frequency with which users must log in.

## 6. Error Handling and API Rate Limits

6.1 Handle Token Expiration
Implement error handling for cases where the access token has expired. Prompt the user to re-authenticate if necessary.
6.2 Rate Limiting
Instagram's Graph API enforces rate limits, so ensure your app is built to handle responses indicating the rate limit has been exceeded. Implement retries or back-off mechanisms to avoid disruptions.

## 7. Testing and Deployment

7.1 Test the Full OAuth Flow
Test the entire flow: user login, token exchange, API calls to retrieve saved media, and displaying videos/reels in your app. Ensure that all scenarios (e.g., token expiration) are covered.
7.2 Deploy the App
After testing, deploy your app to a hosting platform (such as Vercel, Netlify, etc.). Ensure that the OAuth redirect URI is correctly configured in the Instagram App settings to match the live environment.
