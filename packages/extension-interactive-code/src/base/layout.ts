import { commands } from 'vscode';

export function initializeLayout() {
  // Step 1. Move the panel to the right
  commands.executeCommand('workbench.action.positionPanelRight');
  // Step 2. Focus the panel
  commands.executeCommand('interactive-code-chat.focus');
}
