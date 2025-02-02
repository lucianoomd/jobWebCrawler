This small app is an example how to implement a web crawler.

I wanted to apply to a company as soon as it has a new job opening for React Native,
so I made this crawler to get the job list and email me as soon as a RN job appears.

I'm adding here some bottlenecks and solutions I found among this implementation.

Here what I used to implement:

- axios: to make the requests.
- cheerio: to get the elements I wanted to inspect
- nodemailer: to send email with gmail
- cron: to schedule the crawler to run several times a day
- dotenv: to handle the env vars and not expose any sensitive data
- Heroku: to host the app

Bottlenecks and solutions:

    - Sending email:
        Gmail was not accepting sending email with user and pass itself, so I needed to
        enable 2-step verification and generate an app password(https://myaccount.google.com/apppasswords);

    - dotenv not getting values:
        This was simpler one, just needed to add 'require("dotenv").config()' to the start of the app.

    - Deploying on Heroku
        - 'git push heroku main':
            Gave me the error 'Do not authenticate with username and password using git'
            Log in heroku: 'heroku login'
            Type 'heroku auth:token' and copy the output with prefix 'HRKU-...'
            Use 'git push heroku main', for login used heroku login email and for password used the token from previous command

        - npm start:
            The app nedds this script added in package json to start the application.(Just if you want to have web page,
            in my case I just wanted to run the server, but I kept this anyways);

        - Error R10 (Boot timeout) -> Web process failed to bind to $PORT within 60 seconds of launch:
            The app needs to be set to a port, so I need to use the port with:
            process.env.PORT(As mentioned previously this app does not need this, so I didn't add);

        - Procfile:
            To solve the two previous errors just added to the Procfile
            'worker: node index.js'
            And in Heroku app Resources tab disable 'web npm start' and enable 'worker node index.js';
