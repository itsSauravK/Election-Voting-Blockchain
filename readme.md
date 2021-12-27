# Instructions to run the project

`npm i` at the root folder

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
SMTP_AUTH_PASS  =   
SMTP_FROM_EMAIL = admin@election.com  
SMTP_FROM_NAME = Admin  

> Put your own JWT_SECRET, SMTP_AUTH_USER, SMTP_AUTH_PASS

`npm start` at the root folder to start the application  

# To contribute 

## Setting up Branch
```
git checkout -b <branch name>
git push --set-upstream origin <branch name>

```

## If you are behind main branch in commit, run this

`git pull origin master`

>There might be conflicts which you have to fix manually