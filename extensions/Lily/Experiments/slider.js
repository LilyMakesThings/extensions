(function (Scratch) {
  'use strict';

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  class slider {
    getInfo() {
      return {
        id: 'lmsSlider',
        color1: '#565656',
        name: 'Slider Test',
        blocks: [
          {
            opcode: 'sliderBlock',
            blockType: Scratch.BlockType.COMMAND,
            text: 'slider input [SLIDER]',
            arguments: {
              SLIDER: {
                type: "slider"
              }
            }
          }
        ],
        customFieldTypes: {
          slider: {
            output: 'String',
            color1: '#FFFFFF',
            color2: '#FFFFFF',
            color3: '#FFFFFF',
            outputShape: 2,
            implementation: {
              fromJson: () => new FieldSlider()
            }
          }
        }
      }
    }

    sliderBlock(args) {
      return args.SLIDER + '\n\n ...WAIT WHY DOES THIS RETURN';
    }
  }

  class FieldSlider extends ScratchBlocks.FieldNumber {
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
      var sliderInput = document.createElement('input');
      const initialValue = ScratchBlocks.FieldTextInput.htmlInput_.value;
      sliderInput.setAttribute('type', 'range');
      sliderInput.setAttribute('min', 0); // minimum output value
      sliderInput.setAttribute('max', 100); // maximum output value
      sliderInput.setAttribute('step', 1); // how many steps when you drag it
      sliderInput.setAttribute('value', initialValue); // initial value
      sliderInput.setAttribute('tabindex', '0');
      sliderInput.className = 'fieldSlider';
      sliderInput.oninput = function() {
        ScratchBlocks.FieldTextInput.htmlInput_.value = this.value;
      };
      div.append(sliderInput);
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

  Scratch.extensions.register(new slider());
})(Scratch);
