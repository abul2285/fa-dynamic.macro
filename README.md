# Babel Macro for Dynamic Font Awesome Icon Import

## Introduction

This is a Babel macro that automatically imports Font Awesome icons based on a given configuration. With this macro, you no longer need to manually import each individual icon in your project. The macro will scan the specified directory and import all icons automatically according to the provided configuration.

## Features

- Automatically imports icons from Font Awesome based on given configuration
- Supports importing icons from different Font Awesome packages (e.g., `free`, `pro`, `solid`, `regular`, etc.)
- Scans a specified directory for icons and imports them automatically

## Installation

To use this macro, you need to install it in your project:

```bash
npm install --save-dev fa-dynamic.macro
```

## Usage

Here's an example of how to use the macro:

```javascript
import importFaIcons from 'fa-dynamic.macro';

importFaIcons({
  path: 'src',
  license: 'pro',
});
```

In the above example, all icons inside the "src" directory will be automatically loaded. You don't have to import them manually. The license option determines whether to import icons from the free or pro version of Font Awesome.

## Configuration Options

The macro accepts the following configuration options:

- `path` (required): The relative path to the directory containing the icons.
- `license` (optional): The Font Awesome license to use. Available options are 'free' and 'pro'. If not provided, the free version will be used by default.

## Getting Help

If you encounter any issues while using this macro, you can reach out to me via GitHub or email. My GitHub username is abul2285 and you can find my email address at mdabulhossain780@gmail.com. You can also visit my portfolio website at [abul.dev](https://abul.dev).

## Acknowledgements

I would like to acknowledge the creators of Font Awesome for providing such a great icon library. This macro simplifies the process of importing icons and enhances the development experience.
