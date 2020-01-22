# Pipelines Marketplace/frontend 
Pipelines Marketplace is a web based platform for developers to discover, share and contribute tasks and pipelines for Tekton. Tekton is an open-source project for providing a set of shared and standard components for building Kubernetes-style CI/CD systems.

## Key features
* Display Task and Pipelines in a curated way
* Filter tasks on basis of tags
* Search a task on basis of name
* Sort tasks on name, rating and downloads
* Rate a task
* Upload a task

Backend service can be found on : <https://github.com/Pipelines-Marketplace/backend>


## Run locally
Fork and clone the application in local:
```
git clone https://github.com/Pipelines-Marketplace/frontend/
```

Go into the project folder and type the following command and further install the npm packages

```
cd frontend/
npm install
```

Create a .env file and use the backend service route and give it to the environment variable REACT_APP_BACKEND_API 

Build the application 

```
npm run build
```

Run the proxy server.The application is exposed on port 3000

```
node server.js
```


