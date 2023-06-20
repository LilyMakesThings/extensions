/**
 * These blocks are non-functional
 * This is just a proof of concept
 */

(function (Scratch) {
  'use strict';

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  class inline {
    getInfo() {
      return {
        id: 'lmsInline',
        color1: '#565656',
        name: 'Inline Test',
        blocks: [
          {
            opcode: 'inlineTest',
            blockType: Scratch.BlockType.OUTPUT,
            text: ['inline block'],
            output: 'String',
            outputShape: 3,
            branchCount: 1
          },
          {
            opcode: 'return',
            blockType: Scratch.BlockType.COMMAND,
            text: 'return [VALUE]',
            arguments: {
              VALUE: {
                type: "stringSquare"
              }
            },
            isTerminal: true
          },
          '---',
          {
            opcode: 'execute',
            blockType: Scratch.BlockType.COMMAND,
            text: 'execute [VALUE]',
            arguments: {
              VALUE: {
                type: "nullSquare"
              }
            }
          }
        ],
        customFieldTypes: {
          stringSquare: {
            output: 'String',
            outputShape: 3,
            color1: '#FFFFFF',
            color2: '#FFFFFF',
            color3: '#FFFFFF',
            implementation: {
              fromJson: () => new FieldStringBool()
            }
          },
          nullSquare: {
            output: 'String',
            outputShape: 3,
            implementation: {
              fromJson: () => new FieldNullSquare()
            }
          }
        }
      }
    }

    inlineTest(args, util) {
      return util.startBranch(1, false);
    }

    return(args, util) {
    }

    execute(args, util) {
    }
  }

  class FieldStringBool extends ScratchBlocks.FieldTextInput {
    constructor(opt_value, opt_validator) {
      opt_value = (opt_value && !isNaN(opt_value)) ? String(opt_value) : 'hello';
      super(opt_value, opt_validator);
      this.addArgType('stringSquare');
    }
  }

  class FieldNullSquare extends ScratchBlocks.Field {
    constructor(opt_value, opt_validator) {
      opt_value = '';
      super(opt_value);
      this.addArgType('nullSquare');
    }
    
    showEditor_() {
      return;
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

  // Reimplementing the "output" and "outputShape" block parameters
  const cbfsb = runtime._convertBlockForScratchBlocks.bind(runtime);
  runtime._convertBlockForScratchBlocks = function(blockInfo, categoryInfo) {
    const res = cbfsb(blockInfo, categoryInfo);
    if (blockInfo.outputShape) {
      if (!res.json.outputShape) res.json.outputShape = blockInfo.outputShape;
    }
    if (blockInfo.output) {
      if (!res.json.output) res.json.output = blockInfo.output;
    }
    return res;
  }

  Scratch.extensions.register(new inline());
})(Scratch);
