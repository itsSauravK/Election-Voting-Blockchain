# Instructions to run the project

`npm i` at the root folder.
`npm i` in the frontend folder.
Go to backend/config/ and make a file 'config.env'

## config.env variables

PORT = 4000  
DB_LOCAL_URL = mongodb://localhost:27017/election

JWT_SECRET =  
JWT_EXPIRE_TIME = 7d  
COOKIE_EXPIRES_TIME = 7

SMTP_HOST = smtp.mailtrap.io  
SMTP_PORT = 2525  
SMTP_AUTH_USER =  
SMTP_AUTH_PASS =  
SMTP_FROM_EMAIL = admin@election.com  
SMTP_FROM_NAME = Admin

CLOUDINARY_CLOUD_NAME =  
CLOUDINARY_API_KEY =  
CLOUDINARY_API_SECRET =

SENDGRID_API_KEY =  
SENDER_EMAIL =

> Put your own JWT_SECRET, SMTP_AUTH_USER, SMTP_AUTH_PASS

Go to root folder and make .env file

## .env variables

ACCOUNT_MNEMONIC= <br>
RINKEBY_ENDPOINT=

> Frontend designed using Tailwind

Go to React root folder and make .env file.

## .env variables.

REACT_APP_Contract =  
REACT_APP_BE_URL = 'http://localhost:4000/api'

> Put your own account mnemoic and rinkeby endpoint

### To get the contract address, do the following in root folder

```
node ethereum/compile.js
node ethereum/deploy.js
```

### To run the project

`npm start` at the root folder to start the backend of the application  
`npm run client` to start the fronend <br>
`npm run dev` to start both frontend and backend

# To contribute

## Setting up Branch

```
git checkout -b <branch name>
git push --set-upstream origin <branch name>

```

## If you are behind main branch in commits, run this

`git pull origin main`

After you have pushed your commit. Go to github, repository and create a pull request

> There might be conflicts which you have to fix manually

# Problem Statement
Elections and voting are the basic mechanisms of a democratic system. There have been various attempts to make modern elections more flexible by using digital technologies. Basic characteristics of free and fair elections are intractability, immutable, transparency and the privacy of the involved actors. This corresponds to a few of the many features of blockchain-like decentralized ownership, the immutability of chain, anonymity and distributed ledger. My problem statement is “To create a robust blockchain based election mechanism that will not only be reliable and secure but also flexible according to the current needs”. The main aim of this proposal is to present a robust blockchain-based election mechanism that not only will be reliable but also flexible according to present needs.

# Architecture

<img width="405" alt="image" src="https://github.com/itsSauravK/Election-Voting-Blockchain/assets/47532084/1563e0df-bf60-48ec-ac5c-6c621b72bb2a">

# About 

A secured online voting system built using mongoDB, ExpressJS, ReactJS, NodeJS (MERN), Solidity (Smart Contracts), and web3JS. In this application, the admin can start elections, add candidate, manage users and end elections. The user will able to vote and see all the results of the election held till now.

# Ouput

## Landing Page

![landing page](https://user-images.githubusercontent.com/47532084/158785605-a27959d8-0bfa-4ed8-9144-33a05b00119e.png)

## Login Page

![login-1](https://user-images.githubusercontent.com/47532084/158785678-3b90575b-b9fa-45c1-86fe-37da09de7eff.png)
![login-2](https://user-images.githubusercontent.com/47532084/158785696-1cd9c50d-e624-4607-a9a2-59207d0ba72a.png)
![login-3](https://user-images.githubusercontent.com/47532084/158785703-dbf7b5a8-8521-4058-86a8-c90513867968.png)

## All users , Register User and Edit Profile

### Deleting user and registering new user can only be performed by admin before election starts. Profile editing can be done by all users before election starts.

### All users

![all-users page before starting](https://user-images.githubusercontent.com/47532084/158787034-ddd6d0ed-342b-48ae-a1b1-bdc27d37aa93.png)

### Register User

![Register user](https://user-images.githubusercontent.com/47532084/158787043-8a0ca171-74b2-4442-b9de-ecb39af3c08a.png)

### Edit Profile

![Edit profile](https://user-images.githubusercontent.com/47532084/158787362-d504e411-e452-488b-bb63-204120275220.png)

> Ethereum address should be corrected before election has started as the user cannot change it later. Election related functions will only be permitted with the ethereum address they are registered with.

## Adding Election

> The Ethereum account used to add election is the only account authorized to add candidates, start election and end election

![Add Election](https://user-images.githubusercontent.com/47532084/158789206-9076bdbe-1344-4ec4-986c-816792a297ac.png)

### Payment

<img width="1440" alt="add election -2" src="https://user-images.githubusercontent.com/47532084/158789253-64efd4dd-a4a3-493b-bbe9-88589b4a00cb.png">

![add election -3](https://user-images.githubusercontent.com/47532084/158789265-d7008017-8078-447d-b530-eee30199cb08.png)

## Adding Candidates

![addCandidate1](https://user-images.githubusercontent.com/47532084/158790306-c38fb6f6-3ae1-444a-a62a-10ae1d273656.png)

### Payment

<img width="1440" alt="Add Candidate-2" src="https://user-images.githubusercontent.com/47532084/158790291-9558b1e6-a62d-4e9e-856f-a20e88a59bd1.png">

> If any election functionality like adding election, starting election, adding candidates, voting and ending election is done with different ethereum address than what the user is registered with, then the user will get this error

![add candidate-3](https://user-images.githubusercontent.com/47532084/158790598-c8c61703-e834-4b6c-8145-546e77db6aa1.png)

![add candidate-4](https://user-images.githubusercontent.com/47532084/158791174-0d90ed1a-9d49-4ff9-b35e-e9246e43487b.png)

# Starting Election

> After starting an election, admin will not be able to add candidates and, register and delete users, and all users will not be able to edit their profile

## Payment

<img width="1440" alt="Start-Election 1" src="https://user-images.githubusercontent.com/47532084/158793183-1d8dd0a1-c7d4-4072-be88-9c8e19fc7ab7.png">

<img width="1440" alt="startElection-2" src="https://user-images.githubusercontent.com/47532084/158793285-e8bf855e-6721-4582-a509-ff22b17ee5b3.png">

## Email

![start-election3](https://user-images.githubusercontent.com/47532084/158793400-86f911e9-2791-41e5-a688-62a00afa05dc.png)

## Voting

### Voting from admin account

<img width="1440" alt="Vote 1" src="https://user-images.githubusercontent.com/47532084/158801826-442b8cb4-11b6-4490-a84d-db46bf393d1f.png">

![vote-2](https://user-images.githubusercontent.com/47532084/158801830-e2deb5e1-a112-4750-8f5a-5312116dd8c0.png)

### Voting from user account

<img width="1440" alt="VOTE-3" src="https://user-images.githubusercontent.com/47532084/158801843-b3fd43c6-91d7-4a46-8be7-106dc39e9b83.png">

![vote-4](https://user-images.githubusercontent.com/47532084/158802020-13f75949-52b4-4dfc-8988-0ed7d8686ab6.png)

### All users after voting

![All user after-vote](https://user-images.githubusercontent.com/47532084/158802211-a7385bcb-88d8-4340-a663-2d0935a7df07.png)

## Ending Election

### Payment

<img width="1440" alt="End election-1" src="https://user-images.githubusercontent.com/47532084/158805535-2f149afd-936b-4bee-8cc5-fe80734e306d.png">

<img width="1440" alt="End-Election-2" src="https://user-images.githubusercontent.com/47532084/158805545-5fb23539-3346-4cd4-87e2-db6ab03067c5.png">

### Email

![end-election-3](https://user-images.githubusercontent.com/47532084/158805558-e98f5fbb-ea68-4768-810f-586ba077b59a.png)

## Results

### We can view all the results conducted in past in this web application

![Results-1](https://user-images.githubusercontent.com/47532084/158806050-f7ee66ab-d850-4b50-9203-5c0cba5490ac.png)

### Result of the election

![Result 2](https://user-images.githubusercontent.com/47532084/158806065-0b6f8d10-b20d-492b-8b3a-39f481ef07db.png)

### The election process is transparent. All the transactions are visible in Ether Scan <a href="https://rinkeby.etherscan.io/address/0x4b6556C9db0808DeE6684d9c8e74bc91265b7655">-Link</a>

![result -2](https://user-images.githubusercontent.com/47532084/158806070-1108e50d-abaf-4b92-a6a5-3d2b34e4026f.png)

## Starting new Election

> Now the admin can start a new election while making any changes in the user list as required

![after-election1](https://user-images.githubusercontent.com/47532084/158806626-42584f08-e840-4868-a492-9227f9b23446.png)

## Flexible designing

> The interface is flexible for all types of devices

![Flexible-1](https://user-images.githubusercontent.com/47532084/158806791-c24bbe3e-640f-4d74-967a-fdc878cd2857.png)

![flexible2](https://user-images.githubusercontent.com/47532084/158806794-249a2140-70fc-4bc1-9b18-b5f85db06f31.png)
