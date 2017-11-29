<h1 align="center">
  <br>
  GitHub Stalk
  <br>
  Rafael Mantilla
  <br>
</h1>

## About

This is a very small page that lets you see who someone is following on Github. Then you can navigate through the people they follow and so on. 
The page collects the data overtime in hopes that it will take longer for us to reach the Github API limit. (and it's a great excuse to use MongoDB)

I'm currently working on several projects that use TDA to understand networks and other kinds of data.
This app recolects some knowledge of the Github follower graph (from your queries!) and anonymizes it, providing it to you so you can run all kinds of crazy scripts on it.

My special sauce then is the caching to avoid hitting the API imit and the anonymized graph of followers.

To run the git code, run two instances of 'npm install' and 'npm start', one from the root of the client folder, and the other from the root of the backend folder. The proxy is currently set for the backend to run on the port 5002, and the client on the default port (3000).
