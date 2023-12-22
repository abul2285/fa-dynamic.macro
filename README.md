## Table of Contents

- [Babel Macro for Dynamic Font Awesome Icon Import](#babel-macro-for-dynamic-font-awesome-icon-import)

  - [Introduction](#introduction)
  - [Features](#features)
  - [Installation](#installation)
    - [Free Icons Styles](#free-icons-styles)
    - [Pro Icons Styles](#pro-icons-styles)
  - [Usage](#usage)
  - [Configuration Options](#configuration-options)
  - [Contact Information](#contact-information)

## Babel Macro for Dynamic Font Awesome Icon Import

### Introduction

This Babel macro automates the process of importing Font Awesome icons based on a provided configuration. No more manual imports; the macro scans the specified directory and imports icons automatically.

### Features

- Automatically imports icons from Font Awesome based on the given configuration.
- Supports importing icons from different Font Awesome packages (e.g., `solid`, `regular`, `light`, `thin`, `duotone` etc.).
- Scans a specified directory for icons and imports them automatically.

### Installation

To use this macro, install it in your project:

```bash
npm install --save-dev fa-dynamic.macro
```

#### Free icons styles

```bash
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/free-regular-svg-icons
npm i --save @fortawesome/free-brands-svg-icons
```

#### Pro icons styles

Create an `.npmrc` file in your project root with the following content, replacing `FONT-AWESOME-PACKAGE-FONT-AWESOME-PACKAGE-FONT-AWESOME-PACKAGE-FONT-AWESOME-PACKAGE-TOKEN` with your actual Font Awesome package token:

```js
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=FONT-AWESOME-PACKAGE-FONT-AWESOME-PACKAGE-FONT-AWESOME-PACKAGE-FONT-AWESOME-PACKAGE-TOKEN
```

#### Then, install the pro icons styles

```bash
npm i --save @fortawesome/pro-solid-svg-icons
npm i --save @fortawesome/pro-regular-svg-icons
npm i --save @fortawesome/pro-light-svg-icons
npm i --save @fortawesome/pro-thin-svg-icons
npm i --save @fortawesome/pro-duotone-svg-icons
npm i --save @fortawesome/sharp-solid-svg-icons
npm i --save @fortawesome/sharp-regular-svg-icons
npm i --save @fortawesome/sharp-light-svg-icons
npm i --save @fortawesome/sharp-thin-svg-icons
```

## Usage

```js
// index.js

import importFaIcons from 'fa-dynamic.macro';
import App from './App';

importFaIcons({
  path: 'src',
  license: 'pro',
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

```js
// App.js

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <FontAwesomeIcon icon={['far', 'calendar']} />
        <FontAwesomeIcon icon={['fas', 'times']} />
        <FontAwesomeIcon icon={['fal', 'chevron-right']} />
        <FontAwesomeIcon icon={['fat', 'backpack']} />
      </header>
    </div>
  );
}

export default App;
```

In this example, all icons inside the `src` directory will be automatically loaded, eliminating the need for manual importation. The license option determines whether to import icons from the free or pro version of Font Awesome.

## Configuration Options

The macro accepts the following configuration options:

- path `(required)`: The relative path to the directory containing the icons.
- license `(optional)`: The Font Awesome license to use. Available options are 'free' and 'pro'. If not provided, the free version will be used by default.

## Contact Information

- **GitHub Username:** [abul2285](https://github.com/abul2285)
- **Email:** [mdabulhossain780@gmail.com](mailto:mdabulhossain780@gmail.com)
- **Portfolio Website:** [abul.dev](https://abul.dev)
