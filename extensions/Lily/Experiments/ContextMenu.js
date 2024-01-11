(function (Scratch) {
  'use strict';

  const vm = Scratch.vm;
  var workspace;
  var enabled = false;

  vm.on('EXTENSION_ADDED', tryUseScratchBlocks);
  vm.on('BLOCKSINFO_UPDATE', tryUseScratchBlocks);
  tryUseScratchBlocks();

  function tryUseScratchBlocks() {
    
    if (!ScratchBlocks.Colours.buttonActiveBackground) {
      throw new Error("The VM is outdated!")
    }

    if (!window.ScratchBlocks) return;

    workspace = ScratchBlocks.getMainWorkspace();
    vm.removeListener('EXTENSION_ADDED', tryUseScratchBlocks);
    vm.removeListener('BLOCKSINFO_UPDATE', tryUseScratchBlocks);

    console.log('successfully found scratchblocks');

    ScratchBlocks.Extensions.registerMixin('context_menu', {
      customContextMenu: function(options) {
        options.push({
          text: (enabled) ? 'Disable options' : 'Enable options',
          enabled: true,
          separator: true,
          callback: () => enabled = !enabled
        });
        options.push({
          text: 'Create New Variable',
          enabled: enabled,
          callback: () => ScratchBlocks.Variables.createVariable(workspace, () => {}, '')
        });
        options.push({
          text: 'Create New List',
          enabled: enabled,
          callback: () => ScratchBlocks.Variables.createVariable(workspace, () => {}, 'list')
        });
        options.push({
          text: 'Create New Broadcast',
          enabled: enabled,
          callback: () => ScratchBlocks.Variables.createVariable(workspace, () => {}, 'broadcast_msg')
        });
      }
    })
  }

  class ContextMenu {
    getInfo() {
      return {
        id: "lmsContextMenu",
        name: "Context Menu",
        blocks: [
          {
            opcode: "epicContextMenu",
            blockType: Scratch.BlockType.COMMAND,
            text: "context menu",
            extensions: ['context_menu']
          }
        ]
      }
    }
  }

  Scratch.extensions.register(new ContextMenu());
})(Scratch);
