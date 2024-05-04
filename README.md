
<img src="https://raw.githubusercontent.com/PieCodeing/Lacaphe-Website/develop/ICONS/logo.png" width="50%" height="50%">

Lacàphê serves as a sanctuary for coffee and tea enthusiasts in San Jose, California, specializing in authentic Vietnamese beverages as well as Boba tea. The café not only offers an array of unique drinks like Egg Coffee and Eggspresso Hanoi but also provides a bustling atmosphere that resonates with the local community. It is a popular destination for those who seek variety in their caffeinated experiences.

## Our goal

The website will serve as a valuable online presence, offering information about the shop, its menu, promotions, and a means for customers to place online orders. This website will help increase the shop's visibility, customer engagement, and sales. The website will showcase items on the menu and include their prices on multiple different web pages. There will be an "About" page where customers will be able to gain insights into the shop's motto, core beliefs, and decisions behind establishing a boba tea shop. It will also feature an online order page that will connect the customer to a different website, such as Doordash, to order items through an on-demand food delivery platform. Online ordering will be done through a third-party website. The website will feature links to the shop's social media profiles, increasing their social media visibility and promoting their business. The customers will have the ability to create an account and log in. The client will be able to create an account that they will be able to log into. Some features, such as the ability to edit and add pictures, write item descriptions, and set or change the prices of items, will be available exclusively for the client. A tracker to track the number of customers visiting the website on a weekly, monthly, or yearly basis.

**Goal requirements**

- Information Pages
- Online Ordering
- Client-Specific Features
- Social Media Integration

**Stretch goals**

- Feedback and Reviews
- Mobile browser compatibility
- Map widget


## Mockup via Figma
![Lacaphe](/PHOTOS/figma1.png)
![Lacaphe](/PHOTOS/figma2.png)

## Final Product
![Lacaphe](/PHOTOS/HOMEPAGE.png)
![Lacaphe](/PHOTOS/HOMEPAGE2.png)
![Lacaphe](/PHOTOS/DRINKS.png)
![Lacaphe](/PHOTOS/DRINKS2.png)
![Lacaphe](/PHOTOS/LOGIN.png)

## Entity Relationship Diagram (ERD)
![Lacaphe](/PHOTOS/ERD.jpg)

## Technologies

**Frontend**

- HTML
- CSS
- Vanilla JS
- Visual Studio/Visual Studio Code

**Backend**

- Express.js
- Node.js
- Relational Database - MySQL

**Version Control**

- Git
- Github

**Servers**

- Google Cloud Run + SQL (with backup)

Costing $90 per month

## Testing
We have done numerous system tests on the website itself. Which involves us manually testing each button and feature on the website. Every button or link should be working as intended.

We have also done some unit testing with JEST on our website. We have a separate branch just for unit testing, which will house all of the unit test scripts and files that cannot be found on the main branch.

In Bash, Powershell, Teminal, or zsh clone the project with
```
git clone https://github.com/PieCodeing/Lacaphe-Website.git
```

Then switch over to the test branch with
```
git checkout Test
```

In your IDE, run the command below to install the node packages.
```
npm install
```

Then, to run a specific test, use the following formula:
```
npm run test ./Test/<Name of Test>
```
Example:
```
npm run test ./Test/verifyNewAcount.test.js
```

## Deployment
In order to run the website locally, you will need to clone the project, which can be seen in our testing section above. But once you have the project cloned, in the IDE's terminal, run the command
```
node server.js
```
And this will start the server or not, depending on whether there are errors. But once it is working, you can view the website locally on
```
localhost:3000
```



## Timeline

**Sprint 02**

We used this sprint to setup the project on Jira and Github and begin some light coding. Also, we used this sprint to familiarize ourselves with the workflow and how to use Jira and Github.

- Created Github Repo
- Testing commits
- Deciding on the environment and tech stack

**Sprint 03**

The goal of this sprint is to develop the website. Everyone will be assigned positions for the part of the project they will be working on.

- Pages were created.
- Setting up servers and databases

**Sprint 04**

Our goal for this sprint is to continue development and have a rough prototype to present to the product owner or university.

- Testing the database
- Page refinement
- Refactor repo


**Sprint 05**

We came back from a small winter break, so mostly this sprint would be us trying to familiarize ourselves with the process again. We tackled smaller tasks, which consist of:

- CSS Changes
- Header and Footer
- Start of the Popup

**Sprint 06**

In this sprint, we started with the main chunk of the login proportion of the project, which includes:

- Create pop-up with formatting.
- Basic working login UI

We also did more CSS changes, fixing, and adjusting photos.

**Sprint 07**

In this sprint, we began to work on the admin page, which will include features only available to admins. But other than that, this includes more cleaner UI/CSS changes to get closer to the figma.

**Sprint 08**

In this sprint, we started on more features that we stated at the beginning of the sprint, which include:

- Review Page
- Mobile device compatibility

**Sprint 09**

Sprint 09 was the last sprint that involved coding for the website. We started to deploy the website to the host and made sure that the website was working properly for users. Also performing small tweaks to photos and CSS.

## Team Members
![Lacaphe](/PHOTOS/DEMBOYS.jpg)

-Brian Duong
-Paul Ventimiglia
-Jaspreet Singh
-Liberio Mukdani
-Brandon Barragan
-Ramell Davis
-Subhan Mehmood
-Hien Nguyen