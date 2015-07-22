# Frontend Boilerplate

This project is designed to provide a starting point for static website builds. It comes with some commonly used dependencies and the [Gulp task runner](https://github.com/gulpjs/gulp) configured out of the box.

---

## Prerequisites
* [Node.js](https://nodejs.org/download/) and npm (Node Package Manager, which now comes bundled with Node).
* A terminal. If you're on Windows and don't already have one I recommend Git Bash, which comes with [Git for Windows](https://msysgit.github.io/) and is easy to setup.


## Installation
* `git clone https://github.com/danielmorgan/frontend-boilerplate.git`
* Run `npm install` to install dependencies defined in `package.json`. This will install Gulp and all the plugins it needs to do things like compile Sass to CSS.
* `gulp` to run the default Gulp task. [BrowserSync](https://github.com/BrowserSync/browser-sync) will start up a server at `http://localhost:3000` and open it in your default browser.
* Make changes in your favourite editor. When you save a file Gulp will run the defined tasks on it and BrowserSync will refresh your browser.


## Gulp tasks
* `gulp` - Starts up BrowserSync then watches files for changes, running the relevant tasks.
* `gulp css` - Compiles main.scss to one minified css file (with sourcemaps) and copies it to the dist folder.
* `gulp js` - Compiles JavaScript files (defined in the gulpfile, `path.scripts.includes`) to one minified JavaScript file with sourcemaps and copies it to the dist folder. You will need to modify `gulpfile.js` and restart the `gulp` task everytime you add a new JavaScript file.
* `gulp fonts` - Copies fonts from `app/assets/font` to `dist/assets/font`.
* `gulp images` - Copies images from `app/assets/img` to `dist/assets/img`.
* `gulp html` - Copies anything directly in the `app/` directory to `dist/`, i.e. `index.html` and `.htaccess`.
* `gulp deploy` - Runs through all the tasks and creates a ready to go `dist/` folder for deployment.


## Tips
* Keep Sass files small, with a single responsibility, and a clear name.
* Don't go too deep with nested definitions, if it starts looking like a sideways pyramid, it might make sense to move some of it to a new file.
* Comment out the bits of Twitter Bootstrap you don't need in `app/assets/scss/vendor/bootstrap-custom.scss` to keep the final stylesheet free of bloat.
* File paths are defined at the top of `gulpfile.js` if you wish to change the folder structure of the project.
* Use 4 spaces instead of tabs for consistence, trim trailing whitespace and add a newline character at end of file.
* Don't rigidly stick to the project organisation I've laid out here if it doesn't make sense for the project you're working on. It's just a suggestion!


## Recommended Reading
* [How to structure a Sass project](http://thesassway.com/beginner/how-to-structure-a-sass-project)
* [Scalable and Modular Architecture for CSS](https://smacss.com/)
