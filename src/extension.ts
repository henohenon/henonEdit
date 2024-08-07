// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "henon-edit" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposableHello = vscode.commands.registerCommand('henon-edit.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hennyo World from henon-edit!');
		vscode.window.showInformationMessage('Hemyo World from henon-edit!');

	});

	const disposableWindow = vscode.commands.registerCommand('henon-edit.showWindow', () => {
            const panel = vscode.window.createWebviewPanel(
                'webview',
                'Sample Webview',
                vscode.ViewColumn.One,
                {
					enableScripts: true
				}
            );

			const htmlPath = path.join(context.extensionPath, 'solid', 'dist', 'index.html');
			const htmlContent = fs.readFileSync(htmlPath, 'utf8');

			// パスを変換する
			const assetsPath = vscode.Uri.file(path.join(context.extensionPath, 'solid', 'dist', 'assets'));
			const assetsUri = panel.webview.asWebviewUri(assetsPath);

			// HTMLコンテンツ内のパスを変換
			const convertHtmlContent = htmlContent.replace(/\.\/assets\//g, `${assetsUri}/`);

			panel.webview.html = convertHtmlContent;
		});

	context.subscriptions.push(disposableHello);
	context.subscriptions.push(disposableWindow);
}

function getWebviewContent() {
    return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Webview</title>
            </head>
            <body>
                <h1>Hello from Webview</h1>
                <button onClick="sendMessage()">Click me</button>
                <script>
                    const vscode = acquireVsCodeApi();
                    function sendMessage() {
                        vscode.postMessage({
                            command: 'alert',
                            text: 'Button clicked!'
                        });
                    }
                </script>
            </body>
            </html>`;
}


// This method is called when your extension is deactivated
export function deactivate() {}
