# torok_tamas_set008101_coursework_2

In order to showcase my second coursework project some preparations are needed. I used mongoDB as my dabase, Express and Node.js, which comes with packages that need to be installed first. I am also using a CSS library called Semantic-UI which unfortunately is quite large.

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for testing purposes. 

## Prerequisites

#### To install the packages the Terminal will be needed.

```
Access the terminal on a Mac Cmd + Spacebar and search for 'Terminal' or 'Hyper'
```

#### We also need Node.js which can be installed as seen in the lab work which you showed us :)

#### MongoDB is also needed to run the database

* [MongoDB for Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)-Follow this link if you are using windows
* [MongoDB for MacOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)--Follow this link if you are using MacOs

### Installing

A step by step series of examples that tell you have to get the app.js running

Step 1: Open up the Terminal and cd into the project folder

```
Example
cd ExampleDocument/torok_tamas_set008101_coursework2/docs

```

Step 2: Install the packages

```
npm install package.json

? It looks like you have a semantic.json file already. (Use arrow keys)
❯ Yes, extend my current settings. 
  Skip install 
```

   press Enter
    
```
? Set-up Semantic UI (Use arrow keys)
❯ Automatic (Use default locations and all components) 
  Express (Set components and output folder) 
  Custom (Customize all src/dist values) 
```  
  press again Enter
```  
? We detected you are using NPM Nice! Is this your project folder? /Users/tamastorok/Doc
uments/Napier Uni/Web Tech/coursework_2/try2 (Use arrow keys)
  Yes 
  No, let me specify 
```  
and the Down arrow key to Yes, after that Enter again

```
? Where should we put Semantic UI inside your project? (semantic/)
```

Enter for the last time  

```

Run mongoDB in a different tab for your terminal Cmd+T or Ctrl+T

```
In the new tab run
```
mongod
```
In the original tab run the app.js with node
```
node app.js
```
If everything runs correctly you should see in your Terminal 
```
'The server has started'
Added Blogs
Added Blogs
Added Blogs
several times...
```
If for some reason the server needs restarting please acces app.js with your text editor of choice and comment out 
```
//SeedDB();
```
if not, the server will create multiple copies of the same blog

## On the web

Open up your browser of choice and go to:
```
localhost:3000
```
When on the website some blogs will be already available to see, since without it there would be some issues running the website



### Creating a blog

In order to create a new post signing up is necessary and afterwards (CRUD) creating posts, commenting, editing, updating and deleting posts is possible.Making it easier to sign up and have some example photos you can access [Imgur Photo Examples](https://tamastomy.imgur.com/), where there's some CC photos taken from Unsplash which can be used as example content. To create a user the user needs to have a profile picture, so this can be taken from Imgur if there's no photo available to use, just access the People album and copy a link from there. When pasting it in the field add ".jpg" to the end of the link, the same use applies for the content photos. 

## Authors

* **Thomas Torok** - [NapierStudent](https://github.com/napierstudent)



## Acknowledgments

* **Learning how to set up a dynamic webiste with templated content** - [Udemy The Web Developer Bootcamp](https://www.udemy.com/the-web-developer-bootcamp/learn/v4/overview)
* **Thousand thanks to** - [Google](https://google.com)
* **And of course it wouldn't have been possible without** - [Stackoverflow](https://stackoverflow.com)
* **The photos are from Unsplash**-[Unsplash](https://unsplash.com)
* **The text  is just basic lorem ipsum, thanks for that** - [Lipsum](http://lipsum.com)
* **The CSS library used for this website is Semantic UI** - [Semantic UI](https://semantic-ui.com/)
