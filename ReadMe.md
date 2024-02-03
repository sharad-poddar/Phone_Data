# npm run builds
The script npm run build:ui builds the frontend and copies the production version under the backend repository. npm run deploy:full contains also the necessary git commands to update the backend repository.

``` json
{
  "scripts": {
    //...
    "build:ui": "rm -rf dist && cd ../frontend && npm run build && cp -r dist ../backend",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push"
  }
}
```


# MongoDB
We could use the database directly from our JavaScript code with the official MongoDB Node.js driver library, but it is quite cumbersome to use. We will instead use the Mongoose library that offers a higher-level API.

Mongoose could be described as an object document mapper (ODM), and saving JavaScript objects as Mongo documents is straightforward with this library.

Let's install Mongoose in our notes project backend:



# git commands
git rm .env --cached
git commit -m "Stopped tracking .env File"