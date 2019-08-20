# fiveo
[![Build Status](https://travis-ci.org/june07/fiveo.svg?branch=master)](https://travis-ci.org/june07/fiveo)

![Fiveo Demonstration](https://i.imgur.com/Lad67se.gif)
https://youtu.be/q9c3ZXq75Kg

A tiny JavaScript library to add some sweetness to Node's core inspector module.  Adds some key missing features:
* Adding the ability to start the inspector via the [SIGNAL method](https://nodejs.org/api/process.html) using ANY PORT and not just 9229.  Opens up the possible debug applications and workflows tremendously.
* STOPPING the inspector instance using the SIGUSR2 signal (will stop both sessions started with SIGUSR2 and the native SIGUSR1).  It's likely that leavning the inspector listening (production environments...) is a bad idea. 

## Installation
```bash
$ npm install fiveo
```

## Usage
`fiveo` simply needs to be required in your code.

Example:

```js
require('fiveo');
// The rest of your code...
```


## Environment Variables
When running through Node.js, you can set a few environment variables that will
change the behavior of the debug logging:

| Name      | Syntax | Purpose                                | Examples         |
|-----------|--------|-----------------------------------------|----------------|
| `INSPECT` | [hostname:port] | Declares which host:port you want the inspector to listen on. | 9230 or localhost:9230

__Note:__ The default value for INSPECT is `localhost:9229`.

