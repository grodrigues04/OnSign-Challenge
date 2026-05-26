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

Even though this is a simple project, I tried to structure it in a clean and organized way, keeping possible future maintenance and new implementations in mind. The project organization was designed as follows:

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

To reduce the component’s responsibilities and allow it to focus solely on displaying data, I created a dedicated hook responsible for handling API data fetching. Additionally, since the API had an approximate failure rate of 10%, it was necessary to implement a retry mechanism capable of retrying requests up to three times, with a one-second interval between attempts.

Beyond separating responsibilities, this request flow also required slightly more complex logic. In a scenario where multiple APIs shared the same behavior, using a dedicated hook would make abstraction even more valuable. This approach would allow, for example, passing the endpoint and additional configurations as parameters, making the solution more reusable, maintainable, and scalable.

```txt
OnSignChallenge /
├── src/
│ ├── services/processUserData.jsx
```

Perhaps the most important file in the application, as it contains the core logic responsible for processing friendships and interests.

- `processAndSetUsers()`  
  This is the main function exported to the components, responsible for generating the suggested friends and interests lists.

Initially, I developed an algorithm that repeatedly traversed the friends array using nested loops. The logic consisted of searching for connections through iterative methods, comparing differences between collections, and storing the results in a Set. Although the solution worked correctly, a larger dataset returned by the API would quickly lead to noticeable performance bottlenecks. In addition, I was relying on the difference() operation to compare sets, but later discovered that it is a relatively new feature and is still not supported by some browsers.

To address both performance and scalability concerns, I completely refactored the data transformation logic by approaching the problem as a graph traversal and leveraging hash maps for efficient lookups.

At the root of the project, I left the oldServices file, which was not used by the frontend but was essential for the initial reasoning behind a possible implementation. Once the solution was completed, it became clear that the approach could be significantly improved, especially when observing sections of the code with O(n³) time complexity, which, as mentioned previously, could lead to noticeable application slowdowns or freezes when handling larger API datasets.

## Deploy

Project deployment was neither a requirement nor a suggestion, but I decided to do it anyway. The application is available at: [https://on-sign-challenge.vercel.app/](https://on-sign-challenge.vercel.app/)

### Observations:

At the beginning of the challenge, I had some doubts regarding how friendship relationships should be interpreted. The PDF stated that _"The array of 'friends' represents friendship connections between users"_, which suggested that the relationships were bidirectional. However, it also mentioned that _"Each pair is a connection from the 'id' in the first value to the 'id' in the second value"_, which seemed to indicate a unidirectional relationship.Considering the provided example, the user Charlie was not recommended to Bob. Therefore, I assumed that, in this case, the relationship should be treated as unilateral.
