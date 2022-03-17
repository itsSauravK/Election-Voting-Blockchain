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

> Put your own JWT_SECRET, SMTP_AUTH_USER, SMTP_AUTH_PASS

Go to root folder and make .env file

## .env variables

ACCOUNT_MNEMONIC= <br>
RINKEBY_ENDPOINT=

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
