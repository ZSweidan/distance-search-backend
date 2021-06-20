
## Setup

First, checkout this project locally and then follow these steps:

0. Go through the Docker [installation](https://docs.docker.com/installation/) and [getting started guide](https://docs.docker.com/mac/started/) before you start.
1. Install the [Docker Toolbox](https://www.docker.com/docker-toolbox).
2. Start a "Quickstart Terminal" session (see the getting started guide).
3. Build the Docker image: `docker build -t node-backend .`
4. Run the image in a container: `docker run -d -p 9001:9000 node-backend`
  - The `-d` flag says to run the container in the background (daemon mode).
  - The `-p` flag maps port 4000 from the container to port 4001 on the docker machine.
5. View your new container: `docker ps -a`
6. Check the logs for your container: `docker logs <container-id>`
7. Check the port of the container: `docker port <container-id>`
8. Open the app running on the docker machine: `open http://$(docker-machine ip default):9001`

## File Structure

Within the download you'll find the following directories and files:

```

nodeapp/
┣ handlers/
┃ ┗ company.js
┣ app.js
┣ Dockerfile
┣ package.json
┣ partners.json
┗ README.md

```