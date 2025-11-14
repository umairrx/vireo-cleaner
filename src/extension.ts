import * as vscode from "vscode";

interface RegexPattern {
  name: string;
  pattern: string;
  description?: string;
  enabled?: boolean;
}

function getConfig() {
  const config = vscode.workspace.getConfiguration("vireo");
  return {
    supportedFileTypes: config.get<string[]>("supportedFileTypes", [
      "js",
      "jsx",
      "ts",
      "tsx",
      "vue",
      "html",
      "css",
      "scss",
    ]),

    preserveDirectives: config.get<string[]>("preserveDirectives", [
      "es",
      "biome",
      "@ts",
    ]),

    regexPatterns: config.get<RegexPattern[]>("regexPatterns", [
      {
        name: "JSX Comments",
        pattern: "{s*/*s*(?!es|biome|@ts)[sS]*?*/s*}",
        description:
          "Remove // single-line comments except those starting with es, biome, or @ts",
        enabled: true,
      },
      {
        name: "Single-line Comments",
        pattern: "(?<!\\S)\\/\\/(?!\\s*(?:es|biome|@ts)).*",
        description:
          "Remove // single-line comments except those starting with es, biome, or @ts",
        enabled: true,
      },
    ]),
  };
}

export function activate(context: vscode.ExtensionContext) {
  console.log("Vireo Cleaner is now active!");

  let removeCommentsCmd = vscode.commands.registerCommand(
    "vireo.removeComments",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        vscode.window.showErrorMessage("No active editor found!");
        return;
      }

      const document = editor.document;
      const text = document.getText();

      let cleanedText = removeComments(text);

      const fullRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(text.length)
      );

      editor
        .edit((editBuilder) => {
          editBuilder.replace(fullRange, cleanedText);
        })
        .then((success) => {
          if (success) {
            vscode.window.showInformationMessage(
              "Vireo: Comments removed successfully!"
            );
          } else {
            vscode.window.showErrorMessage("Vireo: Failed to remove comments!");
          }
        });
    }
  );

  let removeCommentsAllCmd = vscode.commands.registerCommand(
    "vireo.removeCommentsAll",
    async () => {
      const config = getConfig();
      const extensionsGlob = `**/*.{${config.supportedFileTypes.join(",")}}`;

      const files = await vscode.workspace.findFiles(
        extensionsGlob,
        "**/{node_modules,.next,dist,build,.cache}/**"
      );

      if (files.length === 0) {
        vscode.window.showWarningMessage("No files found to process!");
        return;
      }

      let processedCount = 0;

      for (const file of files) {
        const document = await vscode.workspace.openTextDocument(file);
        const text = document.getText();
        const cleanedText = removeComments(text);

        if (text !== cleanedText) {
          const edit = new vscode.WorkspaceEdit();
          const fullRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(text.length)
          );
          edit.replace(file, fullRange, cleanedText);
          await vscode.workspace.applyEdit(edit);
          processedCount++;
        }
      }

      vscode.window.showInformationMessage(
        `Vireo: Processed ${processedCount} files!`
      );
    }
  );

  context.subscriptions.push(removeCommentsCmd, removeCommentsAllCmd);
}

function removeComments(text: string): string {
  const config = getConfig();
  const directivesPattern = config.preserveDirectives.join("|");

  const enabledPatterns = config.regexPatterns.filter(
    (p) => p.enabled !== false
  );

  for (const patternConfig of enabledPatterns) {
    try {
      let pattern = patternConfig.pattern.replace(
        /DIRECTIVES/g,
        directivesPattern
      );

      if (pattern.startsWith("^")) {
        const lines = text.split(/\r?\n/);
        const regex = new RegExp(pattern);
        const processedLines = lines.map((line) => {
          if (regex.test(line)) return "";
          return line;
        });
        text = processedLines.join("\n");
      } else {
        const flags = pattern.includes("[\\s\\S]") ? "g" : "gm";
        const regex = new RegExp(pattern, flags);
        text = text.replace(regex, "");
      }
    } catch (error) {
      console.error(
        `Vireo: Error applying pattern "${patternConfig.name}":`,
        error
      );
      vscode.window.showErrorMessage(
        `Vireo: Invalid regex pattern "${patternConfig.name}". Please check your settings.`
      );
    }
  }

  text = text.replace(/\n\s*\n\s*\n/g, "\n\n");

  return text;
}

export function deactivate() {
  console.log("Vireo Cleaner is now deactivated!");
}
