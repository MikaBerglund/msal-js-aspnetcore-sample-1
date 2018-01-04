MSAL JS ASP.NET Core Sample 1
===============================

A small ASP.NET Core sample application that uses the MSAL JS library for authenticating the user completely client side.

The application uses Microsoft Authentication Library for JavaScript (MSAL.js) to authenticate users completely on the client-side using only JavaScript (written in TypeScript of course).


Prerequisites
-------------

This sample application is created and edited with the following tools. If you want to reproduce the sample for your own projects, you need to have these.

1. .NET Core command-line tools (.NET CLI). [[read more...](https://github.com/dotnet/cli)]
2. Node Package Manager (`npm`) [[read more...](https://www.npmjs.com/)]
3. A text editor suited for web development, such as Visual Studio Code [[read more...](https://code.visualstudio.com/)]


Basic MSAL usage
----------------

For more information on how to use MSAL in your application, see [MSAL Usage](MSAL-Usage.md).

Recreating the sample
---------------------

To recreate this project, you start off with the .NET Core CLI tools. Create a folder for your application, navigate into that folder from a command-line prompt, and type the following command.

    dotnet new react


This will create the project for you. Remember to restore all node modules after you create the project with the following command.

    npm install

The only run-time package you need to install is `MSAL` itself. That's easy to install with the following command.

    npm install msal --save

This completes the absolute minimum setup you need for your application.


### Additional tasks

To better write `MSAL.js` applications, it is recommended to complete the following steps.


#### Install ES6 Promise types

MSAL uses [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) for performing tasks that mimic async behaviour. Install the required TypeScript type definitions to get better design-time support for promises using the following command.

    npm install @types/es6-promise --save-dev

Note that these are only type definitions that you need when you develop your application, but no longer at runtime, which is why you use the `--save-dev` switch.


#### TypeScript compiler configuration

Change the following properties in `tsconfig.json`.

    "module": "es2015",
    "target": "es2015",
    "strict": false,

Then, also add `"es6-promise"` to the `"types"` array, so that it looks something like this.

    "types": ["webpack-env", "es6-promise"]
    
