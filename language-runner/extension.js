// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let runMyCode = vscode.commands.registerCommand('language-runner.run', function () {
		let terminal_length = vscode.window.terminals.length;
		let is_r_term = false;
		let RunnerTerminal = vscode.window.activeTerminal;

		for (let i = 0; i < terminal_length; i++) {
			if (vscode.window.terminals[i].name == 'Language Runner') {
				is_r_term = true;
			}
		}


		if (is_r_term == false) {
			RunnerTerminal = vscode.window.createTerminal('Language Runner');
		};
		let file_name = vscode.window.activeTextEditor.document.fileName;

		if (file_name.slice(file_name.length - 3, file_name.length) == '.vb') {
			RunnerTerminal.sendText('vbc "' + vscode.window.activeTextEditor.document.fileName + '" /out:"CompiledVB.exe"');
			RunnerTerminal.sendText('CompiledVB.exe')
		} else if (file_name.slice(file_name.length - 2, file_name.length) == '.c') {
			RunnerTerminal.sendText('gcc "' + vscode.window.activeTextEditor.document.fileName + '" -o "CompiledC.exe"');
			RunnerTerminal.sendText('CompiledC.exe')
		} else if (file_name.slice(file_name.length - 4, file_name.length) == '.cpp') {
			RunnerTerminal.sendText('g++ "' + vscode.window.activeTextEditor.document.fileName + '" -o "CompiledCPP.exe"');
			RunnerTerminal.sendText('CompiledCPP.exe')
		} else if (file_name.slice(file_name.length - 2, file_name.length) == '.r') {
			// if (String(vscode.workspace.fs.readFile(vscode.Uri(vscode.window.document.activeTextEditor.fileName))).includes("plot")) {
			// 	vscode.window.showInformationMessage("Plots may have been created. Find them on Rplots.pdf.");
			// }
			RunnerTerminal.sendText('rscript "' + vscode.window.activeTextEditor.document.fileName + '"');
		} else {
			vscode.window.showErrorMessage('Language Runner cannot run a ' + String(file_name.slice(file_name.length - 2, file_name.length)) + ' file.');
		};
		RunnerTerminal.show(false);
	});

	context.subscriptions.push(runMyCode);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}