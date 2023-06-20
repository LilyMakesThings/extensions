(function (Scratch) {
  'use strict';

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
            text: ['inline'],
            output: 'String',
            outputShape: 3,
            branchCount: 1,
            isTerminal: true
          },
          {
            opcode: 'return',
            blockType: Scratch.BlockType.COMMAND,
            text: 'return [VALUE]',
            arguments: {
              VALUE: {
                type: "stringBool"
              }
            },
            isTerminal: true
          },
          {
            opcode: 'execute',
            blockType: Scratch.BlockType.COMMAND,
            text: 'execute [VALUE]',
            arguments: {
              VALUE: {
                type: "squareInput",
                defaultValue: 'foo'
              }
            }
          }
        ],
        customFieldTypes: {
          stringBool: {
            output: 'String',
            outputShape: 3,
            color1: '#FFFFFF',
            color2: '#FFFFFF',
            color3: '#FFFFFF',
            implementation: {
              fromJson: () => new FieldStringBool()
            }
          },
          squareInput: {
            output: 'String',
            outputShape: 3
          }
        }
      }
    }

    inlineTest(args, util) {
      return args.INPUT;
    }

    execute(args, util) {
    }
  }

  class FieldStringBool extends ScratchBlocks.FieldTextInput {
    constructor(opt_value, opt_validator) {
      opt_value = (opt_value && !isNaN(opt_value)) ? String(opt_value) : '0';
      super(opt_value, opt_validator);
      this.addArgType('stringBool');
    }
  }

  Scratch.vm.addListener('EXTENSION_FIELD_ADDED', fieldInfo => {
    ScratchBlocks.Field.register(fieldInfo.name, fieldInfo.implementation);
  });

  const vm = Scratch.vm;
  const runtime = vm.runtime;
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