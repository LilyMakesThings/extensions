// Fixed version of the Blockly checkbox field

(function (Scratch) {
  'use strict';

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  class checkboxTest {
    getInfo() {
      return {
        id: 'lmsButton',
        color1: '#565656',
        name: 'Checkbox Test',
        blocks: [
          {
            opcode: 'checkbox',
            blockType: Scratch.BlockType.COMMAND,
            text: 'checkbox [CHECKBOX]',
            arguments: {
              CHECKBOX: {
                type: "checkboxArg"
              }
            }
          }
        ],
        customFieldTypes: {
          checkboxArg: {
            color1: '#FFFFFF',
            output: 'String',
            outputShape: 3,
            implementation: {
              fromJson: () => new FieldCheckbox()
            }
          }
        }
      }
    }

    checkbox() {
    }
  }

  class FieldCheckbox extends ScratchBlocks.FieldCheckbox {
    constructor(opt_value) {
      opt_value = true;
      super(opt_value);
      this.addArgType('checkbox');
      ScratchBlocks.FieldCheckbox.CHECK_CHAR = '✓';
      
      // Fixing the position of the check icon for Scratch 3
      ScratchBlocks.FieldCheckbox.prototype.init = function() {
        if (this.fieldGroup_) {
          return;
        }
        ScratchBlocks.FieldCheckbox.superClass_.init.call(this);
        this.checkElement_ = ScratchBlocks.utils.createSvgElement('text',
            {'class': 'blocklyText blocklyCheckbox', 'x': 6, 'y': 22},
            this.fieldGroup_);
        var textNode = document.createTextNode(ScratchBlocks.FieldCheckbox.CHECK_CHAR);
        this.checkElement_.appendChild(textNode);
        this.checkElement_.style.display = this.state_ ? 'block' : 'none';
      };
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

  Scratch.extensions.register(new checkboxTest());
})(Scratch);
