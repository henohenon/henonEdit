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
var vscode2 = __toESM(require("vscode"));
var path = __toESM(require("path"));
var fs = __toESM(require("fs"));

// src/CustomEditor.ts
var vscode = __toESM(require("vscode"));
var CustomEditor = class _CustomEditor {
  constructor(context) {
    this.context = context;
  }
  static register(context) {
    const provider = new _CustomEditor(context);
    console.log("register");
    const providerRegistration = vscode.window.registerCustomEditorProvider(_CustomEditor.viewType, provider);
    return providerRegistration;
  }
  static viewType = "henon-edit.editor";
  async resolveCustomTextEditor(document, webviewPanel, _token) {
    webviewPanel.webview.options = { enableCommandUris: true };
    webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);
    console.log("resolveCustomTextEditor", document.getText());
  }
  getHtmlForWebview(webview) {
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Custom Editor</title>
      </head>
      <body>
        <h1>Hello from Custom Editor</h1>
      </body>
      </html>`;
  }
};

// src/extension.ts
function activate(context) {
  console.log('Congratulations, your extension "henon-edit" is now active!');
  const disposableHello = vscode2.commands.registerCommand("henon-edit.helloWorld", () => {
    vscode2.window.showInformationMessage("Hennyo World from henon-edit!");
    vscode2.window.showInformationMessage("Hemyo World from henon-edit!");
  });
  const disposableWindow = vscode2.commands.registerCommand("henon-edit.showWindow", () => {
    const panel = vscode2.window.createWebviewPanel(
      "webview",
      "Sample Webview",
      vscode2.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [vscode2.Uri.file(path.join(context.extensionPath, "solid", "src"))]
      }
    );
    const htmlPath = path.join(context.extensionPath, "solid", "index.html");
    const htmlContent = fs.readFileSync(htmlPath, "utf8");
    const assetsPath = vscode2.Uri.file(path.join(context.extensionPath, "solid", "src"));
    const srcUri = panel.webview.asWebviewUri(assetsPath);
    const convertHtmlContent = htmlContent.replace(/\.\/src\//g, `${srcUri.toString()}/`);
    panel.webview.html = convertHtmlContent;
  });
  context.subscriptions.push(disposableHello);
  context.subscriptions.push(disposableWindow);
  context.subscriptions.push(CustomEditor.register(context));
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
