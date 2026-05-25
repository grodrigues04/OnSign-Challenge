<h1 align="center">
  <a href="#"> OnSign TV Challenger </a>
</h1>
Project completed for the OnSign internship challenge.

## Descripition

The goal of the project was to test algorithm skills by transforming data received from an API and then displaying it on the frontend. The data, as well as the authentication token, were provided through an API supplied by OnSign TV.

### Installation

Make sure you have Node.js 18+ installed on your computer.

- Clone the project using the following command:

```bash
$ git clone https://github.com/grodrigues04/OnSign-Challenge.git
```

- Navigate to the "OnSign-Challenge" folder.
- In the project root directory, run the following command to install the dependencies:

```bash
$ npm install
```

- To run the project, simply execute:

```bash
$ npm run dev
```

## About the Choice of React

The challenge did not require any specific development stack or framework. Therefore, I chose to use React.js, as it is the frontend technology I am most comfortable with. In addition, the interface was relatively simple, and React allowed me to separate the responsibilities of each component in a more organized way, avoiding code coupling and improving maintainability.

## Code Organization and Reasoning

Even though this is a simple project, organization is essential for future maintenance. Therefore, I applied SOLID principles when structuring the folders and components. The project organization was designed as follows:

```txt
OnSignChallenge /
├── src/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── pages/
│   └── services/
├── public/
└── App.jsx
└── main.jsx
└── .env
├── package.json
└── README.md
```

## Project Highlights

```txt
OnSignChallenge /
├── src/
│ ├── hooks/useGetUsers.jsx
```

Following the SOLID principles, especially the Single Responsibility Principle, a dedicated custom hook was created specifically to handle API data fetching. In addition, since the API had an approximate failure rate of 10%, it was necessary to implement a retry mechanism capable of retrying the request up to three times with a one-second interval between attempts.

Beyond separating responsibilities, this request flow also required slightly more complex logic. In a scenario where multiple APIs shared the same behavior, using a dedicated hook would make abstraction even more valuable. This approach would allow, for example, passing the endpoint and additional configurations as parameters, making the solution more reusable, maintainable, and scalable.

```txt
OnSignChallenge /
├── src/
│ ├── services/processUserData.jsx
```

Talvez o arquivo mais importante da aplicação

Perhaps the most important file in the application, as it contains the core logic responsible for processing friendships and interests.

- `mapFriends()`  
  Responsible for performing the initial friendship mapping between users.

- `mapFriendsOfFriends()`  
  Responsible for generating friend recommendations for each user based on mutual connections.

- `mapInterests()`  
  Responsible for mapping the interests associated with each user.

- `getNames()`  
  Responsible for mapping each user ID to its corresponding name.

- `mapWithId()`  
  Responsible for attaching friend and interest suggestions to the final user object based on each user's ID.

### Observations:

At the beginning of the challenge, I had some doubts regarding how friendship relationships should be interpreted. The PDF stated that _"The array of 'friends' represents friendship connections between users"_, which suggested that the relationships were bidirectional. However, it also mentioned that _"Each pair is a connection from the 'id' in the first value to the 'id' in the second value"_, which seemed to indicate a unidirectional relationship.
