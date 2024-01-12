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
            blockType: Scratch.BlockType.BOOLEAN,
            text: ['inline block'],
            outputShape: 3,
            branchCount: 1,
            noConnections: true
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
        ]
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
      res.json.outputShape = blockInfo.outputShape;
    }
    if (blockInfo.output) {
      res.json.output = blockInfo.output;
    }
    if (blockInfo.noConnections) {
      res.json.previousStatement = undefined;
      res.json.nextStatement  = undefined;
    }
    return res;
  }

  Scratch.extensions.register(new inline());
})(Scratch);
