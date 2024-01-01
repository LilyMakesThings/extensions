(function (Scratch) {
  'use strict';

  const vm = Scratch.vm;
  var workspace;

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
        options.splice(4, 4, {
          text: 'Create New Variable',
          enabled: true,
          callback: () => ScratchBlocks.Variables.createVariable()
        });
        options.splice(5, 5, {
          text: 'Create New List',
          enabled: true,
          callback: () => ScratchBlocks.Variables.createVariable(workspace, () => {}, 'list')
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
