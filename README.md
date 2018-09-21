# Elephant Front-end Coding Challenge

## Overview

This exercise will have the candidate build a responsive site navigation driven by an AJAX request.

Here are the guidelines for this exercise, please follow closely:

* No javascript frameworks or libraries (e.g. jQuery, Angular, React).
* CSS Pre-Compilers are fine (LESS, SASS), but no mixin libraries (Compass, Bourbon, Neat, Foundation, etc.)
* Chrome compliance is all that's required, all functions and features available in Chrome are in play.
* Navigation must be responsive and page should look good across all viewport sizes.
* Code must run after the following command, please ensure your code runs as you expect it to from a fresh checkout with these commands before submission.
```bash
$ npm install && npm start
```
* ZIP file and contained folder must be YourName_ElephantFrontendCodingChallenge.zip.
* Please do not include node_modules folder in the ZIP.

Nice to haves (things that we look for):

* Adherence to accessibility standards
* Unit and/or E2E tests
* Documentation
* Methodology

At a high level the navigation will have two main states:

* <768px: Mobile. Hamburger icon will display in the top-left of the page. Clicking the hamburger will cause a card to slide in and overlay the content from the left. The card will contain navigation and sub-navigation items defined in the JSONP response
* \>= 768px: Desktop. The navigation will display as a horizontal navigation. Top level navigation items will display sub-navigation items when clicked. No hamburger will be shown.

## Directory Structure
```bash
.
├── bin                  # Node executables that are installed into the PATH environment variable.
├── data                 # Data to drive the Application.
├── node_modules         # Vendor Packages.
├── public               # Served Assets.
├── storage              # Extra Assets.
├── .gitignore           # Specifies intentionally untracked files to ignore.
├── package-lock.json    # A manifestation of the manifest. Describes the exact tree of vendor packages that were generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates.
├── package.json         # Specifics of npm's package.json handling.
├── README.md            # Project README.
└── server.js            # Application entry point.
```

## API

* GET /api/navigation - returns a JSON response representing the items in the navigation.

## Get Started

### Requirements
* Node.js and npm (You get both when you [install Node.js](https://docs.npmjs.com/getting-started/installing-node).)

### Install the exercise locally

* Unzip supplied ElephantFrontendCodingChallenge.zip

```
$ cd {USER_PATH}/ElephantFrontendCodingChallenge
$ npm install && npm start
```

## Design Specifications

### Colors

* **White** #fff
* **Gray (Light)** #eee
* **Gray (Dark)** #333
* **Black** #000
* **Translucent Black** rgba(0, 0, 0, 0.5)

### Typography

#### Desktop

* **Logo** 13 Founders Grotesk Regular
* **Primary Navigation** 18/24/2 Founders Grotesk Light
* **Secondary Navigation** 13/18/1 Founders Grotesk Light
* **Headline** 112/124/2 Founders Grotesk Regular
* **Body Copy** 18/28/1 Founders Grotesk Light

#### Mobile

* **Logo** 12 Founders Grotesk Regular
* **Primary Navigation** 18/24/1 Founders Grotesk Regular
* **Secondary Navigation** 13/16/1 Founders Grotesk Light
* **Headline** 44/48/1 Founders Grotesk Medium
* **Body Copy** 16/24/1 Founders Grotesk Light
* **Copyright** 12/16 Helvetica Neue Regular

### Measurements

Measurements are specified in pixels. Dimensions are fluid unless specified.

### Interactions

#### Desktop

* On hover, Primary Navigation changes color (black/white).
* On click, if item contains a URL, Primary Navigation navigates to a new page.
* On click, if item contains other items, Secondary Navigation appears (see Desktop, Secondary Navigation).
* Menu appears containing Secondary Navigation.
* Translucent mask appears over content, behind menu.
* On hover in, Secondary Navigation changes color (dark-gray/light-gray).
* On click, Secondary navigates to a new page.
* On click outside of menu, menu and mask are hidden.

#### Mobile

* When a user clicks the navigation (“hamburger”), the menu,  Elephant logo and navigation should “push” from left to right.
* The navigation (“hamburger”) should change from the toggle open to toggle close icon (“x”).
* Translucent mask appears over content, right of navigation.
* The Primary Navigation should include link items and menu items.
* When a user clicks a Primary Navigation link item, the browser should navigate to a new page.
* When a user clicks a Primary Navigation menu item, the Secondary Navigation should “push” down, the chevron should rotate * 180°.
* When a user clicks a Secondary Navigation item, browser should navigate to a new page.
* When a user clicks outside of the navigation, the navigation should close.
* When the navigation closes:
    * the menu, Elephant logo and navigation should “pull” from right to left
    * the navigation (“hamburger”) should change from the toggle close ("X") to toggle open icon
    * the translucent mask should be hidden
