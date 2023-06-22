// To do: Make this work

(function (Scratch) {
  'use strict';

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  class textDropdown {
    getInfo() {
      return {
        id: 'lmsDropdown',
        color1: '#565656',
        name: 'Text Dropdown',
        blocks: [
          {
            opcode: 'dropdown',
            blockType: Scratch.BlockType.COMMAND,
            text: 'dropdown [DROPDOWN]',
            arguments: {
              DROPDOWN: {
                type: "dropdownArg"
              }
            }
          }
        ],
        customFieldTypes: {
          dropdownArg: {
            color1: '#FFFFFF',
            output: 'String',
            outputShape: 2,
            implementation: {
              fromJson: () => new FieldDropdown()
            }
          }
        }
      }
    }

    checkbox() {
    }
  }

  class FieldDropdown extends ScratchBlocks.FieldTextDropdown {
    constructor(text, menuGenerator, opt_validator, opt_restrictor) {
      ScratchBlocks.FieldTextDropdown.prototype.getOptions = ScratchBlocks.FieldDropdown.prototype.getOptions;
      text = 'goobert';
      menuGenerator = [["goobert", "goobert"], ["frick", "frick"]];
      super(text, menuGenerator, opt_validator, opt_restrictor);
      this.addArgType('dropdownArg');
    }
  }

  Scratch.vm.addListener('EXTENSION_FIELD_ADDED', fieldInfo => {
    ScratchBlocks.Field.register(fieldInfo.name, fieldInfo.implementation);
  });

  // from: https://github.com/Xeltalliv/extensions/blob/examples/examples/custom-field-types.js
  // Scratch doesn't automatically set input colors
  const bcfi = runtime._buildCustomFieldInfo.bind(runtime);
  const bcftfsb = runtime._buildCustomFieldTypeForScratchBlocks.bind(runtime);
  let fi = null;
  runtime._buildCustomFieldInfo = function(fieldName, fieldInfo, extensionId, categoryInfo) {
    fi = fieldInfo;
    return bcfi(fieldName, fieldInfo, extensionId, categoryInfo);
  }
  runtime._buildCustomFieldTypeForScratchBlocks = function(fieldName, output, outputShape, categoryInfo) {
    let res = bcftfsb(fieldName, output, outputShape, categoryInfo);
    if (fi) {
      if (fi.color1) res.json.colour = fi.color1;
      if (fi.color2) res.json.colourSecondary = fi.color2;
      if (fi.color3) res.json.colourTertiary = fi.color3;
      fi = null;
    }
    return res;
  }

  Scratch.extensions.register(new textDropdown());
})(Scratch);
