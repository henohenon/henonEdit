"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode = __toESM(require("vscode"));
var path = __toESM(require("path"));
var fs = __toESM(require("fs"));
function activate(context) {
  console.log('Congratulations, your extension "henon-edit" is now active!');
  const disposableHello = vscode.commands.registerCommand("henon-edit.helloWorld", () => {
    vscode.window.showInformationMessage("Hennyo World from henon-edit!");
    vscode.window.showInformationMessage("Hemyo World from henon-edit!");
  });
  const disposableWindow = vscode.commands.registerCommand("henon-edit.showWindow", () => {
    const panel = vscode.window.createWebviewPanel(
      "webview",
      "Sample Webview",
      vscode.ViewColumn.One,
      {
        enableScripts: true
      }
    );
    const htmlPath = path.join(context.extensionPath, "solid", "dist", "index.html");
    const htmlContent = fs.readFileSync(htmlPath, "utf8");
    const assetsPath = vscode.Uri.file(path.join(context.extensionPath, "solid", "dist", "assets"));
    const assetsUri = panel.webview.asWebviewUri(assetsPath);
    const convertHtmlContent = htmlContent.replace(/\.\/assets\//g, `${assetsUri}/`);
    panel.webview.html = convertHtmlContent;
  });
  context.subscriptions.push(disposableHello);
  context.subscriptions.push(disposableWindow);
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
