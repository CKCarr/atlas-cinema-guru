# atlas-cinema-guru
 This project is an implementation of an app with React to build the interface and show data from an API. atlas-cinema-guru is a pocket movie app in which we will keep track of our favorite movies and set up a watch later list.

 Tise <a href="https://www.figma.com/design/x0aU9AfF2yxGqLeUG2RTqE/Holbertonschool---Cinema-Guru-(Copy)?node-id=0-1&t=4eSrMpAHNtHs8jLc-1" title="Figma Design" target="_blank">Figma</a> link contains the main components of the design and detailed information about the project.</li>

##### Recommended Steps for Testers

## Create a folder
Set up Folder to place the backend and frontend clones

``` bash
Copy code

mkdir cinema-guru
cd cinema-guru
```


## Cloning the Repositories:

### Clone the backend API repository:

``` bash
Copy code
git clone https://github.com/atefMck/holbertonschool-cinema-guru-API.git
```

### Clone the frontend repository:

```bash
Copy code
git clone https://github.com/CKCarr/atlas-cinema-guru.git
```

## Running the Backend API:

### Navigate into the API directory:

``` bash
Copy code

cd holbertonschool-cinema-guru-API
```

### Build and run the Docker containers:

``` bash
Copy code

docker-compose build --no-cache --force-rm
docker-compose up -d
```

## Running the Frontend:

### Navigate into the frontend project directory:

``` bash
Copy code

cd ../atlas-cinema-guru
```

## Install dependencies:

```bash
Copy code

yarn install
```

### Start the development server:

``` bash
Copy code

yarn start
```

This setup will allow testers to run the backend and frontend simultaneously and interact with the full application.
