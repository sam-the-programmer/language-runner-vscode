const vscode = require('vscode');

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
		vscode.workspace.saveAll(false)

		if (file_name.slice(file_name.length - 3, file_name.length) == '.vb') { // VB.NET
			RunnerTerminal.sendText('vbc "' + vscode.window.activeTextEditor.document.fileName + '" /out:"CompiledVB.exe"');
			RunnerTerminal.sendText('CompiledVB.exe')

		} else if (file_name.slice(file_name.length - 2, file_name.length) == '.c') { // C
			RunnerTerminal.sendText('gcc "' + vscode.window.activeTextEditor.document.fileName + '" -o "CompiledC.exe"');
			RunnerTerminal.sendText('CompiledC.exe')
		} else if (file_name.slice(file_name.length - 4, file_name.length) == '.cpp') {  // C++
			RunnerTerminal.sendText('g++ "' + vscode.window.activeTextEditor.document.fileName + '" -o "CompiledCPP.exe"');
			RunnerTerminal.sendText('CompiledCPP.exe')
		} else if (file_name.slice(file_name.length - 3, file_name.length) == '.cs') { // C#
			RunnerTerminal.sendText('csc /t:exe /outCompiledCS.exe "' + vscode.window.activeTextEditor.document.fileName + '"');
			RunnerTerminal.sendText('CompiledCS.exe')

		} else if (file_name.slice(file_name.length - 4, file_name.length) == '.bat') { // Batch
			RunnerTerminal.sendText('"' + vscode.window.activeTextEditor.document.fileName + '"');
		} else if (file_name.slice(file_name.length - 3, file_name.length) == '.sh') { // ShellScript
			RunnerTerminal.sendText('"' + vscode.window.activeTextEditor.document.fileName + '"');
		} else if (file_name.slice(file_name.length - 5, file_name.length) == '.bash') { // Bash
			RunnerTerminal.sendText('"' + vscode.window.activeTextEditor.document.fileName + '"');

		} else if (file_name.slice(file_name.length - 3, file_name.length) == '.go') { // Go
			RunnerTerminal.sendText('go run "' + vscode.window.activeTextEditor.document.fileName + '"');

		} else if (file_name.slice(file_name.length - 3, file_name.length) == '.py') { // Python
			RunnerTerminal.sendText('py "' + vscode.window.activeTextEditor.document.fileName + '"');

		} else if (file_name.slice(file_name.length - 3, file_name.length) == '.js') { // Node JS
			RunnerTerminal.sendText('node "' + vscode.window.activeTextEditor.document.fileName + '"');


		} else if (file_name.slice(file_name.length - 2, file_name.length) == '.rs') { // Rust
			RunnerTerminal.sendText('rustc  -o "CompiledRust.exe" "' + vscode.window.activeTextEditor.document.fileName + '"');
			RunnerTerminal.sendText('CompiledRust.exe')

		} else if (file_name.slice(file_name.length - 2, file_name.length) == '.exe') { // Machine Code
			RunnerTerminal.sendText('"' + vscode.window.activeTextEditor.document.fileName + '"');

		} else if (file_name.slice(file_name.length - 3, file_name.length) == '.hs') { // Haskell
			RunnerTerminal.sendText('ghc "' + vscode.window.activeTextEditor.document.fileName + '" -o "CompiledHS.exe"');
			RunnerTerminal.sendText('CompiledHS.exe')

		} else if (file_name.slice(file_name.length - 2, file_name.length) == '.r') { // R
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