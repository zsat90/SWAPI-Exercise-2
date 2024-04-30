# SWAPI Node Exercise

## Description
This repository contains a backend project built using Express and Axios to interact with the Star Wars API (SWAPI). The goal is to retrieve information about people, planets, and films from SWAPI.

## Tasks completed
- Consume and manipulate API data
- Use pagination to get the complete list of all of a resource at once. (Swapi's people endpoint returns 10 at a time by default. We need the full list of 80+ but this count changes from time to time. It needs to be dynamic.)
- Sort an array of objects.
- Replace object field values with more appropriate data.

## Technologies Used
- Express: A fast, unopinionated web framework for Node.js that simplifies building APIs.
- Axios: A promise-based HTTP client for making requests to external APIs.
- SWAPI: The Star Wars API, which provides data related to the Star Wars universe.

## Getting Started
1. Clone the Repository:

        git clone https://github.com/your-username/swapi-node-practice.git

2. Install Dependencies:

        npm install

3. Run the Server:

        npm start

4. Endpoints:

        People: /people
        Planets: /planets
        Films: /films

5. Testing Endpoints: 

   You can use the included .rest file to test the endpoints using Visual Studio Code’s REST Client extension. Alternatively, you can use tools like curl or Postman.
