"use strict";
import * as vscode from "vscode";

// get date of today
export function activate(context: vscode.ExtensionContext) {
  console.log("yaml_fm is now active");

  let disposable = vscode.commands.registerCommand("yaml_fm.insert", () => {
      let editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No text file is activated");
        return;
      }
      
      // initial content of the journal
      const config = vscode.workspace.getConfiguration("yaml_fm");
      const author = config.get("author",null);
      var date = new Date().toISOString();
      if (!author){
        vscode.window.showErrorMessage("Please config `yaml_fm.author`");
        return;
      }

      // body 
      let body=`---
author: ${author}
date: ${date}
---
`;
      editor.edit(edit => {
        edit.insert(new vscode.Position(0, 0), body);
      });
}
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {
}
