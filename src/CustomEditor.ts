import * as vscode from 'vscode';

export class CustomEditor implements vscode.CustomTextEditorProvider {
    public static register(context: vscode.ExtensionContext): vscode.Disposable {
        const provider = new CustomEditor(context);
        console.log('register');
        const providerRegistration = vscode.window.registerCustomEditorProvider(CustomEditor.viewType, provider);
        return providerRegistration;
    }

    private static readonly viewType = 'henon-edit.editor';

    constructor(
        private readonly context: vscode.ExtensionContext
    ) { }

    public async resolveCustomTextEditor(
        document: vscode.TextDocument,
        webviewPanel: vscode.WebviewPanel,
        _token: vscode.CancellationToken
    ): Promise<void> {
        webviewPanel.webview.options = { enableCommandUris: true};
        webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);
        console.log('resolveCustomTextEditor', document.getText());
    }

    private getHtmlForWebview(webview: vscode.Webview): string {
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
}