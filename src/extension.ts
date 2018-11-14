"use strict";
import * as vscode from "vscode";

// get date of today
export function activate(context: vscode.ExtensionContext) {
  console.log("yaml_sign is now active");

  let disposable = vscode.commands.registerCommand("yaml_sign.sign", () => {
      let editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No text file is activated");
        return;
      }
      
      // initial content of the journal
      const config = vscode.workspace.getConfiguration("yaml_sign");
      const author = config.get("author",null);
      var date = new Date().toISOString();
      if (!author){
        vscode.window.showErrorMessage("Please config `yaml_sign.author`");
        return;
      }
      let body=`---
author: ${author}
date: ${date}
---
`;
      editor.edit(edit => {
        edit.insert(new vscode.Position(0, 0), body);
      });
}
  );}

export function deactivate() {
}
