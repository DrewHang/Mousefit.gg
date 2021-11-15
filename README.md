# Mousefit.gg

![mousefit](https://user-images.githubusercontent.com/82345254/141868900-5af820a0-da7e-4ad4-8310-c070c039cbd4.gif)

# Inspiration

Unlike clothing and shoes, mouses are difficult to “try” on and test. There aren’t many physical stores to buy mouses from and most purchases are usually online. The problem with this is that people often have to purchase a mouse one at a time, and if they don’t like it they have to return it within a number of days. The only way to minimize this problem is to do a deep dive into the mouse the user is looking at.

Mousefit.gg was made to help users narrow down the mouse of their choice and forces users to think of important questions that may often be overlooked such as weight, grip, size, price, and more. We do this with the hope that when a user chooses their mouse for the first time, they will be more informed and choose their desired mouse on the first try.

# What it does
Mousefit.gg is a quiz that helps users with their gaming mouse purchasing decisions. Based on user inputs, it filters a database and recommends a mouse according to the answers imputed in the mouse quiz.

# How we built it

We first started with a comprehensive google sheet which had hundreds of gaming mouse data. From there, we cleaned the data and imported the data into our MongoDB. We used the data in MongoDB to make a quiz which filtered out the database every time the user chooses an answer until ultimately there was one mouse remaining. We then transfer this mouse data to the result page where it’s traits are listed and a youtube review video of the mouse is displayed.

# Challenges we ran into
We didn’t have time to make our data more comprehensive. We wanted to, but it was out of scope to scrape each large mouse brand’s website for their mouses and then add this data into our database. The animated star background caused some issues with layout and spacing issues. The 3d model rotating mouse lagged our page alot (turn hardware acceleration on in google so the mouse model isn’t laggy) Not able to deploy the scraped data on Heroku due to scraping taking longer than 30s. So results page wont load

# Accomplishments that we're proud of
We managed to keep the app to a single page and just have it conditionally render. Able to plan, finish and deploy our project all within 5 days. Our entire team learned how to code only 5 month ago and were able to make this so we’re surprised at ourselves!

# What we learned
We familiarized ourself more with MaterialUI and learned/incorporated Redux within a week. Scraping with puppeteer is really useful and helped give our product one more important feature

# What's next for MouseFit.gg
We want to funnel this quiz into a mouse rental business eventually where people can rent and try used mouses in bulk. Kind of like Stitch Fix but for gaming mice.

# Try it out!

<a href="mousefitgg.herokuapp.com">mousefitgg.herokuapp.com</a>

# Built With

  <img src="https://img.shields.io/badge/ThreeJs-black?style=for-the-badge&logo=three.js&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=Puppeteer&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" />
  
  


