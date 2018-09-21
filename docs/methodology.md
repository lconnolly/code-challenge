
# Elephant Code Challenge Task Breakdown


## General Notes
- no JS frameworks
- SASS / LESS allowed, but no mixin libraries
- Chrome only
- CODE MUST RUN after `npm install && npm start`
- zip file must be `LukeConnolly_ElephantFrontendCodingChallenge.zip`


## Tasks
1. Prepare base markup (index.html)

2. Prepare SCSS architecture
    - install SCSS / nodemon
    - configure watch script
    - document SCSS components installed / watch script
    - create SCSS partials
    - add public compiled stylesheet to application template

3. Add preliminary content (markup) & styles and responsive behavior
    - typographic details from readme
    - 768 breakpoint behavior (offscreen -> header navigation)
    - open and closed off screen states
    - desktop dropdown navigation states

4. Add preliminary scripts (navigation states)

5. Adjust UI transitions / animations






## History

### SCSS local development (it's 2018 duh)
1. Install `node-sass` and `nodemon` packages, and save as dev dependencies
    - `npm install -D node-sass nodemon`

2. Configured `build-css`, `watch-css`, and `start-watch` commands
    - `build-css`: one-time compliation of primary `application.scss` stylesheet (to `application.css`)
    - `watch-css`: runs `build-css` and watches for changes
    - `start-dev` runs `npm run start` and `npm run watch-css` for local development

3. Built SCSS partials structure
    - `_reset.scss`
        - contains global, cross-browser "reset" styles (border box, etc)
    - `_vars.scss`
        - contains reusable values for colors, type sizes, etc
    - 

### 