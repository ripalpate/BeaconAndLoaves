# Beacon And Loaves
This app was created by Ripal Patel, Rob Rice and Shane D Wilson as our final group project for our C#/.Net back-end course work at Nashville Software School. Beacon and Loaves is a short term rental app for the light house (or nuclear silo) enthusiast.

After authorization the database is checked for an existing Firebase ID. If none is found, the registration page mounts and the user must register AND provide a payment account. User profiles are editable or they may be soft deleted.

A user of the app can be both a renter and/or owner of properties. Properties may be edited or soft deleted.

A property may be added to a liked properties list for future research. A property may be rented.

Dates before the current date and any dates already rented on a property are inaccessible.

The user may examine their future and past trips on their profile.

The user may examine their future and past property rentals on their profile.

Property rental data is graphed on the owner dashboard.

## Tech Used
* React.js
* C#/.Net/
* Boostrap
* SCSS
* Reactstrap
* React libraries including React Search Field and React Animated CSS
* Planning with Github Projects

## Screenshots
![Auth Screenshot](./screenshots/beacon-and-loaves-auth.png)
![Home Screenshot](./screenshots/beacon-and-loaves-home.png)
![Profile Screenshot](./screenshots/beacon-and-loaves-profile.png)
![Dashboard Screenshot](./screenshots/beacon-and-loaves-dashboard.png)
![Property Screenshot](./screenshots/beacon-and-loaves-property.png)

## How to run this project:

* Setup Firebase  
  -Create a firebase project  
  -Enable 'Google Authentication'  
  -Create an apiKeys.js file (an example file exists in the 'helpers' folder)
  -Copy firebase keys from firebase web app settings into apiKeys.js

* Clone or download the repo

* Browse to the repo directory in your terminal

* In the ClientApp folder of the project run ```npm install``` to install necessary dependencies

* Run the project from Visual Studio

## Thank You To:
* Nathan Gonzalez (NSS E8 Backend Chief Badass)
* Martin Cross (NSS E8 Backend Assistant Badass)
* Adam Wieckert (NSS E8 Backend Assistant Badass)
