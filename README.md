# [redux-storage-decorator-debounce][]

[![build](https://travis-ci.org/michaelcontento/redux-storage-decorator-debounce.svg)](https://travis-ci.org/michaelcontento/redux-storage-decorator-debounce)
[![dependencies](https://david-dm.org/michaelcontento/redux-storage-decorator-debounce.svg)](https://david-dm.org/michaelcontento/redux-storage-decorator-debounce)
[![devDependencies](https://david-dm.org/michaelcontento/redux-storage-decorator-debounce/dev-status.svg)](https://david-dm.org/michaelcontento/redux-storage-decorator-debounce#info=devDependencies)

[![license](https://img.shields.io/npm/l/redux-storage-decorator-debounce.svg?style=flat-square)](https://www.npmjs.com/package/redux-storage-decorator-debounce)
[![npm version](https://img.shields.io/npm/v/redux-storage-decorator-debounce.svg?style=flat-square)](https://www.npmjs.com/package/redux-storage-decorator-debounce)
[![npm downloads](https://img.shields.io/npm/dm/redux-storage-decorator-debounce.svg?style=flat-square)](https://www.npmjs.com/package/redux-storage-decorator-debounce)
[![Code Climate](https://codeclimate.com/github/michaelcontento/redux-storage-decorator-debounce/badges/gpa.svg)](https://codeclimate.com/github/michaelcontento/redux-storage-decorator-debounce)

Debounce decorator for [redux-storage][] to delay & combine the expensive
`engine.save` operation.

## Installation

    npm install --save redux-storage-decorator-debounce

## Usage

This decorator will delay the expensive save operation for the given ms. Every
new change to the state tree will reset the timeout!

```js
import debounce from 'redux-storage'

engine = debounce(engine, 1500);
```

## License

    The MIT License (MIT)

    Copyright (c) 2015 Michael Contento

    Permission is hereby granted, free of charge, to any person obtaining a copy of
    this software and associated documentation files (the "Software"), to deal in
    the Software without restriction, including without limitation the rights to
    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
    FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
    COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
    IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  [redux-storage]: https://github.com/michaelcontento/redux-storage
  [redux-storage-decorator-debounce]: https://github.com/michaelcontento/redux-storage-decorator-debounce
