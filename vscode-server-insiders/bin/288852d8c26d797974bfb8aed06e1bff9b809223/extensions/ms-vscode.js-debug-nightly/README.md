> **This is a nightly version of this extension for early feedback and testing. This extension works best with [VS Code Insiders](https://code.visualstudio.com/insiders)**

<h1>
  <img alt="vscode-js-debug" src="https://github.com/Microsoft/vscode-pwa/raw/master/resources/readme/logo-with-text.png" width="500">
  <br>
  <a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode.js-debug-nightly" alt="Click to visit marketplace">
    <img src="https://vsmarketplacebadge.apphb.com/version-short/ms-vscode.js-debug-nightly.svg">
    <img src="https://vsmarketplacebadge.apphb.com/rating-star/ms-vscode.js-debug-nightly.svg">
  </a>
</h1>

The new, upcoming JavaScript debugger for VS Code. This extension debugs Node.js and web applications (in Edge and Chrome), and will eventually become the built-in debugger for VS Code. You can install this extension by:

1. Installing the `js-debug-nightly` extension from the marketplace.
1. Adding `"debug.javascript.usePreview": true` to your user settings.

Then you should be able to run and debug your existing programs without changing your launch config. If you can't, then please file an issue.

## What's new?

In `js-debug` we aim to provide rich debugging for modern applications, with no or minimal configuration required. Here are a few new features that js-debug brings:

### Debug child process and workers

In Node.js, child processes will automatically be debugged. In browsers, service workers, webworkers, and iframes will be debugged as well.

<img src="https://github.com/Microsoft/vscode-pwa/raw/master/resources/readme/web-worker.png" width="302">

While debugging workers, you can also step through `postMessage()` calls.

### Debug Node.js processes in the terminal

You can debug any Node.js process you run in the terminal with our revamped Auto Attach. If auto attach isn't on, you can run the command `Debug: Toggle Auto Attach` to turn it on. Next time you run a command like `npm start`, we'll debug it.

<img src="https://github.com/Microsoft/vscode-pwa/raw/master/resources/readme/auto-attach.png" width="554">

Once enabled, you can toggle Auto Attach by clicking the `Auto Attach: On/Off` button in the status bar on the bottom of your screen.

You can also create a one-off terminal for debugging via the `Debug: Create JavaScript Debug Terminal` command.

In the previous debugger, you had to remember to add the `--inspect` flag when you ran a command, and couldn't hit breakpoints early in the program since attachment was asynchronous.

### Profiling Support

You can capture and view performance profiles natively in VS Code, by clicking on the ⚪ button in the Call Stack view, or through the `Debug: Take Performance Profile` command. The profile information collected through VS Code is sourcemap-aware.

<img src="https://github.com/Microsoft/vscode-pwa/raw/master/resources/readme/flame-chart.png" width="845">

### Easy npm script debugging

You can debug npm scripts by clicking the code lens shown in the package.json, or by running the `Debug: Debug NPM Script` command/

<img src="https://github.com/Microsoft/vscode-pwa/raw/master/resources/readme/npm-code-lens.png" width="306">

You can configure where and if the code lens is displayed in the `debug.javascript.codelens.npmScripts` setting.

### Automatic browser debugging

By default, any links you click through the JavaScript debug terminal (`Debug: Create JavaScript Debug Terminal` command) will open in debug mode. If you'd like, you can enable this for all terminals, or disable it, by setting `debug.javascript.debugByLinkOptions` to `always` or `off`, respectively.

<img src="https://github.com/Microsoft/vscode-pwa/raw/master/resources/readme/link-debugging.gif">

### Instrumentation breakpoints

When debugging web apps, you can configure instrumentation breakpoints from VS Code in the "Browser Breakpoints" view.

<img src="https://github.com/Microsoft/vscode-pwa/raw/master/resources/readme/instrumentation-breakpoints.png" width="367">
<img src="https://github.com/Microsoft/vscode-pwa/raw/master/resources/readme/instrumentation-breakpoints2.png" width="602">

### Better autocompletion in debug console

Autocomplete in the debug console has been significantly improved. You can expect better suggestions for more complex expressions than VS Code was able to handle before.

<img src="https://github.com/Microsoft/vscode-pwa/raw/master/resources/readme/repl-improvements.png" width="507">

### Return value interception

On a function's return statement, you can use, inspect, and modify the `$returnValue`.

<img src="https://github.com/Microsoft/vscode-pwa/raw/master/resources/readme/returnvalue.png">

Note that you can use and modify properties on the `$returnValue`, but not assign it to--it is effectively a `const` variable.

### Top-Level `await`

You can use `await` at the top level in the debug console.

<img src="https://github.com/Microsoft/vscode-pwa/raw/master/resources/readme/top-level-await.png" width="861">

However, like the Chrome devtools, if you use `await` while paused on a breakpoint, you'll only get a pending `Promise` back. This is because the JavaScript event loop is paused while on a breakpoint.

### Pretty-print minified sources

The debugger can now pretty print files, especially useful when dealing with minified sources. It will show a prompt when you step into or open a file that looks minified, and you can also trigger pretty printing manually via the `Debug: Pretty print for debugging` command.

[Click to view gif](https://code.visualstudio.com/assets/updates/1_43/js-debug-pretty-printing.gif)

You can turn off the suggestion prompt by selecting Never, or changing the setting debug.javascript.suggestPrettyPrinting to false.

### Support for Microsoft Edge and WebView2

We support launching the [new Microsoft Edge browser](https://www.microsoft.com/edge), via the `pwa-msedge` debug type. It supports all the same configuration settings as `chrome` does.

<img src="https://github.com/Microsoft/vscode-pwa/raw/master/resources/readme/webview2.png" width="584">

With this comes support for the [WebView2](https://docs.microsoft.com/microsoft-edge/hosting/webview2) control in desktop Windows applications. Check out our [webview demo](https://github.com/microsoft/vscode-js-debug/tree/master/demos/webview) to learn how to set this up.

### Better sourcemap and breakpoint behavior

Js-debug has a rewritten suite of sourcemap handling and breakpoint resolution logic. This results in more reliable breakpoint behavior in more cases. For example:

- We are guaranteed to set breakpoints before hitting them, where there were previously scenarios where this did not happen.
- We can handle sources present in multiple compiled files. This is common when dealing with split bundles in web apps.
- We now support in-place transpilation (such as `ts-node` and `@babel/register`).

### Copy values in call stack view

VS Code has long had an action to "Copy Value" from the Variables view. However, previously this was truncated for object or long values. Changes in VS Code and js-debug allow us to losslessly copy the full expressions as JSON.

### Other small things

js-debug is a cleanroom rewrite of a JavaScript debugger, so there are a large number of small improvements. Here are some more that are unworthy of their own heading:

- Console output is now improved. Promises, ArrayViews/ArrayBuffers, and other complex data structures are better supported.
- Logpoint breakpoints now support complex expressions and statements. Errors thrown will be printed, rather than silently eaten.
- You can now specify partial versions in the Node.js `runtimeVersion`. Previously you needed to specify the full version, such as `12.3.4`. Now, you can specify `12` and we'll use the most recent `12.*` installed on the system.
- Sourcemaps are now supported when attaching via the `Attach to Node.js Process` command.
- Several improvements have been made for faster performance and better out-of-the-box behavior in monorepos and multi-part applications.
- The `console.group()` set of APIs are now supported.
- You can pass `stable`, `canary`, or `dev` as `runtimeExecutable`s when launching browsers. We'll do our best to discover and use the specified version on your machine.
- You can now set the Node.js `program` to files with other or no extensions without workarounds.
- Restart frame requests are now supported.
- Command line APIs like `inpect()` and `copy()` are now available.
