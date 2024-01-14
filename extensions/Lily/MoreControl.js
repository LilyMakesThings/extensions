// Name: More Control
// ID: lmsSpAsMoreControl
// Description: More conditional and loop statements.
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>
// By: Ashime <https://scratch.mit.edu/users/0znzw/>
// By: SharkPool <https://scratch.mit.edu/users/DemonX5/>

(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const hasOwn = (prop, object) => Object.hasOwn(object, prop);
  const Cast = Scratch.Cast;
  let Utilities = {
    cloneBlock(id, target) {
      const cloneBlock = Utilities.cloneBlock;
      function isInvalid(data) {
        return data == null || data == undefined;
      }
      let needed = [];
      let block = target.blocks.getBlock(id);
      if (isInvalid(block)) {
        return [];
      }
      Object.values(block.inputs).forEach((key) => {
        if (hasOwn("shadow", key) && key.block === key.shadow) {
          needed = [...needed, ...cloneBlock(key.block, target)];
          return;
        } else {
          if (hasOwn("shadow", key))
            needed = [...needed, ...cloneBlock(key.shadow, target)];
          if (hasOwn("shadow", block))
            needed = [...needed, ...cloneBlock(key.block, target)];
        }
      });
      Object.values(block.fields).forEach((key) => {
        if (hasOwn("id", key))
          needed = [...needed, ...cloneBlock(key.id, target)];
      });
      needed.push(block);
      return needed;
    },
  };

  vm.on("EXTENSION_ADDED", tryUseScratchBlocks);
  vm.on("BLOCKSINFO_UPDATE", tryUseScratchBlocks);
  tryUseScratchBlocks();

  function tryUseScratchBlocks() {
    if (!window.ScratchBlocks) return;
    vm.removeListener("EXTENSION_ADDED", tryUseScratchBlocks);
    vm.removeListener("BLOCKSINFO_UPDATE", tryUseScratchBlocks);

    ScratchBlocks.scratchBlocksUtils.isShadowArgumentReporter = function (
      block
    ) {
      return (
        block.isShadow() &&
        (block.type == "argument_reporter_boolean" ||
          block.type == "argument_reporter_boolean" ||
          block.type == "argument_reporter_string_number" ||
          block.type == "lmsSpAsMoreControl_forArg" ||
          block.type == "lmsSpAsMoreControl_forArg2")
      );
    };
  }

  const getVarObjectFromName = function (name, util, type) {
    const stageTarget = runtime.getTargetForStage();
    const target = util.target;
    let listObject = Object.create(null);

    listObject = stageTarget.lookupVariableByNameAndType(name, type);
    if (listObject) return listObject;
    listObject = target.lookupVariableByNameAndType(name, type);
    if (listObject) return listObject;
  };

  class MoreControl {
    getInfo() {
      return {
        id: "lmsSpAsMoreControl",
        name: "More Control",
        color1: "#FFAB19",
        color2: "#EC9C13",
        color3: "#CF8B17",
        blocks: [
          {
            opcode: "switch",
            text: "switch [SWITCH]",
            blockType: Scratch.BlockType.CONDITIONAL,
            arguments: {
              SWITCH: {
                type: null,
              },
            },
          },
          {
            opcode: "case",
            text: "case [CASE]",
            blockType: Scratch.BlockType.CONDITIONAL,
            arguments: {
              CASE: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "default",
            text: "default",
            blockType: Scratch.BlockType.CONDITIONAL,
            isTerminal: true,
          },
          {
            opcode: "runCase",
            text: "run case [CASE]",
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              CASE: {
                type: Scratch.ArgumentType.STRING,
              },
            },
            isTerminal: true,
          },
          {
            opcode: "switchValue",
            text: "switch value",
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true,
          },
          "---",
          {
            opcode: "elseIf",
            text: ["if [CONDITION1] then", "else if [CONDITION2] then"],
            blockType: Scratch.BlockType.CONDITIONAL,
            branchCount: 2,
            arguments: {
              CONDITION1: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              CONDITION2: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          {
            opcode: "elseIfElse",
            text: ["if [CONDITION1] then", "else if [CONDITION2] then", "else"],
            blockType: Scratch.BlockType.CONDITIONAL,
            branchCount: 3,
            arguments: {
              CONDITION1: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              CONDITION2: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          "---",
          {
            opcode: "waitDuration",
            blockType: Scratch.BlockType.LOOP,
            text: "wait [DURATION] [TYPE]",
            branchCount: -1,
            branchIconURI: null,
            arguments: {
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "frames",
                menu: "types",
              },
            },
          },
          {
            opcode: "waitDurationOrUntil",
            blockType: Scratch.BlockType.LOOP,
            text: "wait [DURATION] [TYPE] or until [CONDITION]",
            branchCount: -1,
            branchIconURI: null,
            arguments: {
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "types",
              },
              CONDITION: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          "---",
          {
            opcode: "repeatDuration",
            blockType: Scratch.BlockType.LOOP,
            text: "repeat for [DURATION] seconds",
            arguments: {
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "repeatDurationOrUntil",
            blockType: Scratch.BlockType.LOOP,
            text: "repeat [DURATION] or until [CONDITION]",
            arguments: {
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "types",
              },
              CONDITION: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          "---",
          {
            blockType: Scratch.BlockType.XML,
            xml: '<block type="lmsSpAsMoreControl_for"><value name="I"><shadow type="lmsSpAsMoreControl_forArg"></shadow></value><value name="A"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block><block type="lmsSpAsMoreControl_forEachItemNum"><value name="I"><shadow type="lmsSpAsMoreControl_forArg"></shadow></value><value name="LIST"><shadow type="lmsSpAsMoreControl_menu_lists"><field name="lists"></field></shadow></value></block><block type="lmsSpAsMoreControl_forEachItem"><value name="I"><shadow type="lmsSpAsMoreControl_forArg"></shadow></value><value name="LIST"><shadow type="lmsSpAsMoreControl_menu_lists"><field name="lists"></field></shadow></value></block>',
          },
          {
            opcode: "for",
            blockType: Scratch.BlockType.LOOP,
            text: "for [I] = [A] to [B]",
            hideFromPalette: true,
            arguments: {
              I: {},
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              B: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10,
              },
            },
          },
          {
            opcode: "forEachItemNum",
            blockType: Scratch.BlockType.LOOP,
            text: "for each item # [I] in [LIST]",
            hideFromPalette: true,
            arguments: {
              I: {},
              LIST: {
                menu: "lists",
              },
            },
          },
          {
            opcode: "forEachItem",
            blockType: Scratch.BlockType.LOOP,
            text: "for each item [I] in [LIST]",
            hideFromPalette: true,
            arguments: {
              I: {},
              LIST: {
                menu: "lists",
              },
            },
          },
          {
            opcode: "forArg",
            blockType: Scratch.BlockType.REPORTER,
            hideFromPalette: true,
            text: "i",
          },
          "---",
          {
            opcode: "spayedCondition",
            blockType: Scratch.BlockType.LOOP,
            text: ["if [CON1] start loop", "repeat until [CON2]" + " "],
            arguments: {
              CON1: { type: Scratch.ArgumentType.BOOLEAN },
              CON2: { type: Scratch.ArgumentType.BOOLEAN },
            },
          },
          "---",
          {
            opcode: "stopTarget",
            blockType: Scratch.BlockType.COMMAND,
            text: "stop [TARGET]",
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "targetsMyself",
              },
            },
          },
          {
            opcode: "stopExceptTarget",
            blockType: Scratch.BlockType.COMMAND,
            text: "stop all except [TARGET]",
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "targetsMyself",
              },
            },
          },
          "---",
          {
            opcode: "runInSprite",
            blockType: Scratch.BlockType.CONDITIONAL,
            text: ["run code as [SPRITE]", "and dont wait [DONT_WAIT]?"],
            arguments: {
              SPRITE: {
                type: Scratch.ArgumentType.STRING,
                menu: "targets",
              },
              DONT_WAIT: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
        ],
        menus: {
          types: {
            acceptReporters: true,
            items: ["frames", "seconds"],
          },
          lists: {
            acceptReporters: true,
            items: "_getLists",
          },
          targets: {
            acceptReporters: true,
            items: this._getTargets("stage"),
          },
          targetsMyself: {
            acceptReporters: true,
            items: this._getTargets("stage", "myself"),
          },
        },
      };
    }

    switch(args, util) {
      if (this.isInPalette(util.thread)) return;
      const switchValue = Cast.toString(args.SWITCH);
      const block = util.thread.peekStack();
      const self = this.getBlockByID(util.target, block);
      self.switchValue = switchValue;
      self.runCase = false;
      self.ifCase = null;
      this.setBlockByID(util.target, block, self);
      return 1;
    }

    case(args, util) {
      if (this.isInPalette(util.thread)) return;
      const caseValue = Cast.toString(args.CASE);
      const outerBlock = this.getOuterCtillOpcode(
        util.target,
        util.thread.peekStack(),
        "lmsSpAsMoreControl_switch"
      );
      if (outerBlock == null) return;
      if (
        outerBlock.switchValue == caseValue ||
        outerBlock.ifCase == caseValue
      ) {
        outerBlock.runCase = true;
        outerBlock.ifCase = null;
        this.setBlockByID(util.target, outerBlock.id, outerBlock);
        return 1;
      }
      return;
    }

    default(args, util) {
      if (this.isInPalette(util.thread)) return;
      let outerBlock = this.getOuterCtillOpcode(
        util.target,
        util.thread.peekStack(),
        "lmsSpAsMoreControl_switch"
      );
      if (outerBlock == null || outerBlock.runCase || outerBlock.next != null)
        return 0;
      return 1;
    }

    runCase(args, util) {
      if (this.isInPalette(util.thread)) return;
      const block = util.thread.peekStack();
      const caseValue = Cast.toString(args.CASE);
      let outerBlock = this.getOuterCtillOpcode(
        util.target,
        block,
        "lmsSpAsMoreControl_switch"
      );
      if (outerBlock == null) return 0;
      outerBlock.ifCase = caseValue;
      this.setBlockByID(util.target, outerBlock.id, outerBlock);
    }

    switchValue(args, util) {
      if (this.isInPalette(util.thread)) return "";
      const outerBlock = this.getOuterCtillOpcode(
        util.target,
        util.thread.peekStack(),
        "lmsSpAsMoreControl_switch"
      );
      if (outerBlock == null) return "";
      return outerBlock.switchValue ?? "";
    }

    elseIf(args, util) {
      const condition1 = Cast.toBoolean(args.CONDITION1);
      const condition2 = Cast.toBoolean(args.CONDITION2);
      if (condition1) {
        return 1;
      } else if (condition2) {
        return 2;
      }
    }

    elseIfElse(args, util) {
      const condition1 = Cast.toBoolean(args.CONDITION1);
      const condition2 = Cast.toBoolean(args.CONDITION2);
      if (condition1) {
        return 1;
      } else if (condition2) {
        return 2;
      } else {
        return 3;
      }
    }

    waitDuration(args, util) {
      const type = Cast.toString(args.TYPE);
      if (type == "frames") {
        const duration = Math.round(Cast.toNumber(args.DURATION));
        if (typeof util.stackFrame.loopCounter === "undefined") {
          util.stackFrame.loopCounter = duration;
        }
        util.stackFrame.loopCounter--;
        if (util.stackFrame.loopCounter >= 0) {
          return true;
        }
      } else if (type == "seconds") {
        if (util.stackTimerNeedsInit()) {
          const duration = Math.max(0, 1000 * Cast.toNumber(args.DURATION));

          util.startStackTimer(duration);
          runtime.requestRedraw();
          return true;
        } else if (!util.stackTimerFinished()) {
          return true;
        }
      }
    }

    waitDurationOrUntil(args, util) {
      const type = Cast.toString(args.TYPE);
      if (type == "frames") {
        const duration = Math.round(Cast.toNumber(args.DURATION));
        if (typeof util.stackFrame.loopCounter === "undefined") {
          util.stackFrame.loopCounter = duration;
        }
        util.stackFrame.loopCounter--;
        if (util.stackFrame.loopCounter >= 0 && !args.CONDITION) {
          return true;
        }
      } else if (type == "seconds") {
        if (util.stackTimerNeedsInit()) {
          const duration = Math.max(0, 1000 * Cast.toNumber(args.DURATION));

          util.startStackTimer(duration);
          runtime.requestRedraw();
          return true;
        } else if (!util.stackTimerFinished() && !args.CONDITION) {
          return true;
        }
      }
    }

    forArg(args, util) {
      const param = "i";
      const stackFrames = util.thread.stackFrames;
      if (typeof stackFrames === "undefined") return 0;

      const params = stackFrames[0].moreControlParams;
      if (typeof params === "undefined") return 0;

      return params[param] ?? 0;
    }

    for(args, util) {
      const param = "i";
      const params = util.thread.moreControlParams;

      const a = Cast.toNumber(args.A);
      const b = Cast.toNumber(args.B);

      if (typeof util.stackFrame.loopCounter === "undefined") {
        util.stackFrame.loopCounter = a;

        if (typeof params === "undefined") {
          util.thread.stackFrames[0].moreControlParams = {};
        }
      }

      util.stackFrame.loopCounter++;

      if (util.stackFrame.loopCounter <= b) {
        util.thread.stackFrames[0].moreControlParams[param] =
          util.stackFrame.loopCounter;
        util.startBranch(1, true);
      }
    }

    forEachItem(args, util) {
      const listName = Cast.toString(args.LIST);
      const list = getVarObjectFromName(listName, util, "list");
      if (!list) return;

      const param = "i";
      const params = util.thread.moreControlParams;

      if (typeof util.stackFrame.loopCounter === "undefined") {
        util.stackFrame.loopCounter = 0;

        if (typeof params === "undefined") {
          util.thread.stackFrames[0].moreControlParams = {};
        }
      }

      util.stackFrame.loopCounter++;

      if (util.stackFrame.loopCounter <= list.value.length) {
        const loopCounter = util.stackFrame.loopCounter;
        util.thread.stackFrames[0].moreControlParams[param] =
          list.value[loopCounter - 1];
        return true;
      }
    }

    forEachItemNum(args, util) {
      const listName = Cast.toString(args.LIST);
      const list = getVarObjectFromName(listName, util, "list");
      if (!list) return;

      const param = "i";
      const params = util.thread.moreControlParams;

      if (typeof util.stackFrame.loopCounter === "undefined") {
        util.stackFrame.loopCounter = 0;

        if (typeof params === "undefined") {
          util.thread.stackFrames[0].moreControlParams = {};
        }
      }

      util.stackFrame.loopCounter++;

      if (util.stackFrame.loopCounter <= list.value.length) {
        const loopCounter = util.stackFrame.loopCounter;
        util.thread.stackFrames[0].moreControlParams[param] = loopCounter;
        return true;
      }
    }

    repeatDuration(args, util) {
      if (util.stackTimerNeedsInit()) {
        const duration = Math.max(0, 1000 * Cast.toNumber(args.DURATION));

        util.startStackTimer(duration);
        runtime.requestRedraw();
        return true;
      } else if (!util.stackTimerFinished()) {
        return true;
      }
    }

    repeatDurationOrUntil(args, util) {
      const duration = Math.round(Cast.toNumber(args.DURATION));
      if (typeof util.stackFrame.loopCounter === "undefined") {
        util.stackFrame.loopCounter = duration;
      }
      util.stackFrame.loopCounter--;
      if (util.stackFrame.loopCounter >= 0) {
        return true;
      }
    }

    spayedCondition(args, util) {
      if (typeof util.stackFrame.index === "undefined")
        util.stackFrame.index = 0;
      if (!Cast.toBoolean(args.CON1) && util.stackFrame.index === 0) {
        return false;
      } else {
        if (!Cast.toBoolean(args.CON2)) {
          util.stackFrame.index = 1;
          return true;
        } else {
          util.stackFrame.index = 0;
          return false;
        }
      }
    }

    stopTarget(args, util) {
      const targetName = Cast.toString(args.TARGET);
      runtime.stopForTarget(this._getTargetFromMenu(targetName, util));
    }

    stopExceptTarget(args, util) {
      const targets = runtime.targets;
      const targetName = Cast.toString(args.TARGET);
      const exception = this._getTargetFromMenu(targetName, util);

      for (const target of targets) {
        if (target !== exception) runtime.stopForTarget(target);
      }
    }

    async runInSprite(args, util) {
      const cloneBlock = Utilities.cloneBlock;
      let SPRITE = Cast.toString(args.SPRITE);
      const DONT_WAIT = Cast.toBoolean(args.DONT_WAIT);
      let endTarget = undefined;
      if (SPRITE.toLowerCase() === "_stage_") endTarget = runtime._stageTarget;
      //if (SPRITE.toLowerCase() === '_myself_') endTarget = util.target;
      if (!endTarget) endTarget = runtime.getSpriteTargetByName(SPRITE);
      if (!endTarget) return 0;
      const thread = util.thread;
      const target = util.target;
      const blocks = target.blocks;
      const startBlock = blocks.getBranch(thread.peekStack(), 1);
      let cloneOver = [];
      let block = blocks.getBlock(startBlock);
      cloneOver.push(cloneBlock(block.id, target));
      while (block.next) {
        if (block.next) block = blocks.getBlock(block.next);
        cloneOver.push(cloneBlock(block.id, target));
      }
      cloneOver[0].parent = null;
      for (let i = 0; i < cloneOver.length; i++) {
        const blocks2 = cloneOver[i];
        for (let j = 0; j < blocks2.length; j++) {
          block = blocks2[j];
          endTarget.blocks._blocks[block.id] = block;
        }
      }
      endTarget.blocks._addScript(startBlock);
      runtime.requestBlocksUpdate();
      vm.refreshWorkspace();
      var newThread = runtime._pushThread(startBlock, endTarget, {
          stackClick: true,
        }),
        threadDied = false;
      setTimeout(async () => {
        await this.until((_) => !runtime.isActiveThread(newThread) == true);
        threadDied = true;
        endTarget.blocks._deleteScript(newThread.topBlock);
      }, 0);
      if (DONT_WAIT) return 0;
      await this.until((_) => threadDied);
      return 0;
    }

    /* Utility Functions */
    _getTargets(stage, myself) {
      const spriteNames = [];
      if (stage) spriteNames.push({ text: "Stage", value: "_stage_" });
      if (myself) spriteNames.push({ text: "myself", value: "_myself_" });

      const targets = runtime.targets;
      for (let index = 1; index < targets.length; index++) {
        const targetName = targets[index].getName();
        spriteNames.push({
          text: targetName,
          value: targetName,
        });
      }
      if (spriteNames.length > 0) {
        return spriteNames;
      } else {
        return [{ text: "", value: 0 }]; //this should never happen but it's a failsafe
      }
    }

    until(conditionFunction) {
      const poll = (resolve) => {
        if (conditionFunction()) resolve();
        else runtime.once("AFTER_EXECUTE", (_) => poll(resolve));
      };
      return new Promise(poll);
    }

    getBlockByID(target, id) {
      return target.blocks._blocks[id];
    }

    getOuterBlockID(target, startBlockID) {
      let block = this.getBlockByID(target, startBlockID);

      while (
        block.parent != null &&
        this.getBlockByID(target, block.parent).next
      ) {
        block = this.getBlockByID(target, block.parent);
      }

      if (block.parent) block = this.getBlockByID(target, block.parent);
      return block;
    }

    getOuterCblock(target, startId) {
      let block = this.getBlockByID(target, startId);
      if (!block || typeof block !== "object") return null;
      let isC = false;
      while (!isC && hasOwn("parent", block) && block.parent !== null) {
        block = this.getBlockByID(target, block.parent);
        isC = hasOwn("inputs", block) && hasOwn("SUBSTACK", block.inputs);
      }
      return isC ? block : null;
    }

    setBlockByID(target, id, JSON) {
      target.blocks._blocks[id] = JSON;
    }

    getOuterCtillOpcode(target, startId, opcode) {
      let currentC = this.getOuterCblock(target, startId);
      while (currentC != null && currentC.opcode !== opcode) {
        currentC = this.getOuterCblock(target, currentC.id);
      }
      return currentC;
    }

    isInPalette(thread) {
      return !Object.keys(thread.target.blocks._blocks).includes(
        thread.peekStack()
      );
    }

    _getTargetFromMenu(targetName, util) {
      let target = runtime.getSpriteTargetByName(targetName);
      if (targetName === "_myself_") target = util.target;
      if (targetName === "_stage_") target = runtime.getTargetForStage();
      return target;
    }

    _getLists() {
      // @ts-expect-error - ScratchBlocks not typed yet
      // eslint-disable-next-line no-undef
      const lists =
        typeof ScratchBlocks === "undefined"
          ? []
          : ScratchBlocks.getMainWorkspace()
              .getVariableMap()
              .getVariablesOfType("list")
              .map((model) => model.name);
      if (lists.length > 0) {
        return lists;
      } else {
        return [""];
      }
    }
  }

  Scratch.extensions.register(new MoreControl());
})(Scratch);
