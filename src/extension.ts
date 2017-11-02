"use strict";
import * as vscode from "vscode";
var jimp = require("jimp");


export function activate(context: vscode.ExtensionContext) {


  var disposable = vscode.commands.registerCommand(
    "extension.resizeImage",
    function (filePath: vscode.Uri) {

      let userInput = vscode.window.showInputBox();
      userInput.then(widthXheight => {
        let resizeDimensions = widthXheight.split("x");

        if (resizeDimensions[0] == null || resizeDimensions[1] == null) {
          vscode.window.showInformationMessage(
            "Input not of format: width[x]height"
          );
        } else {
          let resizedImageLocationParts = filePath.fsPath.split(".");
          jimp
            .read(filePath.fsPath)
            .then(function (image) {
              image
                .resize(
                Number.parseInt(resizeDimensions[0]),
                Number.parseInt(resizeDimensions[1])
                )
                .write(resizedImageLocationParts[0] + "-" + widthXheight + "." + resizedImageLocationParts[1], (error, image) => {
                  if (error === null) {
                    vscode.window.showInformationMessage("Image resized");
                  } else {
                    vscode.window.showInformationMessage("Error resizing");
                  }

                })

            })
            .catch(function (err) {
              vscode.window.showInformationMessage(err);
            });

        }
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() { }
