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
                type: Scratch.ArgumentType.STRING
              }
            },
            isTerminal: true
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
      util.startBranch(1, false);
      return 'test output';
    }

    return(args, util) {
    }
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
