# laravel-mix-pug-to-html

Laravel mix extension to build html pages from pug files and partials

## Installation

```
npm i -D @fngr/mix-pug-to-html
```

## Usage

Require mix as asual and also this package. Now you can use it via `mix.pug('srcdir', 'distdir', {options...})`. Options are not working yet, but will be added soon!

```javascript
const mix = require("laravel-mix");
require("@fngr/mix-pug-to-html");

mix.pug("src/views", "dist", { minify: true });
```
