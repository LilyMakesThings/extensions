(function (Scratch) {
  'use strict';

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  class MrBeast {
    getInfo() {
      return {
        id: 'lmsMrBeast',
        color1: '#565656',
        name: 'MrBeast',
        blocks: [
          {
            opcode: 'mrBeast',
            blockType: Scratch.BlockType.COMMAND,
            text: 'mr beast jumpscare: [UHOH]',
            arguments: {
              UHOH: {
                type: "beast"
              }
            }
          }
        ],
        customFieldTypes: {
          beast: {
            output: 'String',
            color1: '#FFFFFF',
            color2: '#FFFFFF',
            color3: '#FFFFFF',
            outputShape: 2,
            implementation: {
              fromJson: () => new BeastInput()
            }
          }
        }
      }
    }

    mrBeast(args) {
      return args.UHOH + '\n\n ...WAIT WHY DOES THIS RETURN';
    }
  }

  class BeastInput extends ScratchBlocks.FieldNumber {
    constructor(opt_value) {
      opt_value = 0;
      super(opt_value);
      this.addArgType('slider');
    }

    showEditor_() {
      this.__proto__.__proto__.showEditor_.call(this, this.useTouchInteraction_);
      ScratchBlocks.DropDownDiv.hideWithoutAnimation();
      ScratchBlocks.DropDownDiv.clearContent();
      var div = ScratchBlocks.DropDownDiv.getContentDiv();
      var mrBeast = document.createElement('video');
      const initialValue = ScratchBlocks.FieldTextInput.htmlInput_.value;
      // reference: https://github.com/google/blockly-samples/tree/master/plugins/field-slider
      mrBeast.src = 'https://penguinmod.site/mrbeast.mp4';
      mrBeast.style.width = '320px';
      mrBeast.style.height = '180px';
      mrBeast.play();
      div.append(mrBeast);
      ScratchBlocks.DropDownDiv.setColour(this.sourceBlock_.parentBlock_.getColour(), this.sourceBlock_.getColourTertiary());
      ScratchBlocks.DropDownDiv.setCategory(this.sourceBlock_.parentBlock_.getCategory());
      ScratchBlocks.DropDownDiv.showPositionedByBlock(this, this.sourceBlock_);
    };
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

  Scratch.extensions.register(new MrBeast());
})(Scratch);
