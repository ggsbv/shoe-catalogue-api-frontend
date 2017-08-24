# Shoe Store App

If you run a shoe store and haven't expanded into cyber-space yet, then you might be interested to know that this
application will help you manage your stock, as well as give your customers the opportunity to interface with your
store from the comfort of their own home!

# Consumer Section

## Customers:

__Features:__

* Search through stock to find your dream shoes
* Add all shoes that you want to purchase to a cart
* Checkout with your cart

### Usage:

1. Navigate to the home page

2. Choose your preferred brand, size, color, or just search through all shoes that are available by clicking the
"SEARCH" button after making your decision(s).

3. Browse through the available shoes.

4. If you like anything you see, click "ADD TO CART".

5. After you are finished shopping, you can open your cart by clicking on the "Cart" section on the navigation bar.

6. If you are happy with your choices and are ready to check out, click on the "CHECKOUT" button, which will direct
you to the next steps.

7. Enjoy your shoes!

## Managers:

__Features:__

* Add new shoes to your stock
* When a sale is made, stock is automatically adjusted accordingly
* Total is calculated, so the the customer would just need to be redirected to the appropriate checkout service.

### Usage:

1. Navigate to the home page

2. Click on the "Admin" section on the navigation bar.

3. Fill out the form.

4. Submit the form by clicking the "ADD" button.

* __NOTE:__ The "price" field of the form should not include the currency identifier. Only input numbers!

# Developer Section

Want to contribute to and/or extend the application? Then this section's for you!

## Prerequisites

* [Node & npm](https://nodejs.org/en/) or [Yarn](https://yarnpkg.com/en/docs/install) must be installed.

## Installation Guide

1. Fork the repository.

2. Clone the repository onto your dev machine.

3. Navigate to the project root directory.

4. Run ` npm install ` or ` yarn ` in the project root. This will install all dependencies that are included in 
the package.json.

  Tools that are included in this app are:
  * Lodash / Lodash-CLI
  * Rollup
  * Rollup Buble plugin
  
5. Use npm to install http-server:
```
npm install http-server
```

6. Run the application by typing the following command in your terminal from the project root:
```
http-server -c-1
```
  
## Using a Transpiler and Module Bundler

This application is modular and written using ES6 standards. This makes for clean code, but has the unfortunate side-effect
of not being browser-friendly. Most browsers understand a single JS file, written in ES5. Therefore, in order to make an app 
browser friendly, while still maintaining a semblance of modularity, we introduce Rollup.

Rollup is a module bundler. It processes all the modules in your project, and outputs a single javascript file that can be
served to the browser. However, once again, Rollup is only a module bundler. Even though it does the work of outputting a
single JS file for distribution, it does not (inherently) "translate" ES6 to the ES5 format necessary for the browsers to use.
For this, we can use a transpiler, which will do the work of converting ES6 to the browser-friendly ES5.

The transpiler used for this application is a rollup plugin called "Buble", which is made by the author of rollup.

### Using Rollup

1. Make any changes you want inside of the src folder.
2. Run the following command in the terminal:
```
rollup -c > dist/main.dist.js
```
3. Repeat steps 1 and 2!
