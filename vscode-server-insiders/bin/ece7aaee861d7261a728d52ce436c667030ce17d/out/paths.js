/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";const pkg=require("../package.json"),path=require("path"),os=require("os");function getAppDataPath(t){switch(t){case"win32":return process.env.VSCODE_APPDATA||process.env.APPDATA||path.join(process.env.USERPROFILE,"AppData","Roaming");case"darwin":return process.env.VSCODE_APPDATA||path.join(os.homedir(),"Library","Application Support");case"linux":return process.env.VSCODE_APPDATA||process.env.XDG_CONFIG_HOME||path.join(os.homedir(),".config");default:throw new Error("Platform not supported")}}function getDefaultUserDataPath(t){return path.join(getAppDataPath(t),pkg.name)}exports.getAppDataPath=getAppDataPath,exports.getDefaultUserDataPath=getDefaultUserDataPath;
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/ece7aaee861d7261a728d52ce436c667030ce17d/core/paths.js.map
