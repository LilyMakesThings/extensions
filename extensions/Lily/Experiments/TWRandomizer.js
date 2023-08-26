(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const allBlocks = [
    '<block type="motion_movesteps"> <value name="STEPS"> <shadow type="math_number"> <field name="NUM">10</field> </shadow> </value> </block>',
    '<block type="motion_turnright"> <value name="DEGREES"> <shadow type="math_number"> <field name="NUM">15</field> </shadow> </value> </block>',
    '<block type="motion_turnleft"> <value name="DEGREES"> <shadow type="math_number"> <field name="NUM">15</field> </shadow> </value> </block>',
    '<block type="motion_goto"> <value name="TO"> <shadow type="motion_goto_menu"> </shadow> </value> </block>',
    '<block type="motion_gotoxy"> <value name="X"> <shadow id="movex" type="math_number"> <field name="NUM">0</field> </shadow> </value> <value name="Y"> <shadow id="movey" type="math_number"> <field name="NUM">0</field> </shadow> </value> </block>',
    '<block type="motion_glideto" id="motion_glideto"> <value name="SECS"> <shadow type="math_number"> <field name="NUM">1</field> </shadow> </value> <value name="TO"> <shadow type="motion_glideto_menu"> </shadow> </value> </block>',
    '<block type="motion_glidesecstoxy"> <value name="SECS"> <shadow type="math_number"> <field name="NUM">1</field> </shadow> </value> <value name="X"> <shadow id="glidex" type="math_number"> <field name="NUM">0</field> </shadow> </value> <value name="Y"> <shadow id="glidey" type="math_number"> <field name="NUM">0</field> </shadow> </value> </block>',
    '<block type="motion_pointindirection"> <value name="DIRECTION"> <shadow type="math_angle"> <field name="NUM">90</field> </shadow> </value> </block>',
    '<block type="motion_pointtowards"> <value name="TOWARDS"> <shadow type="motion_pointtowards_menu"> </shadow> </value> </block>',
    '<block type="motion_changexby"> <value name="DX"> <shadow type="math_number"> <field name="NUM">10</field> </shadow> </value> </block>',
    '<block type="motion_setx"> <value name="X"> <shadow id="setx" type="math_number"> <field name="NUM">0</field> </shadow> </value> </block>',
    '<block type="motion_changeyby"> <value name="DY"> <shadow type="math_number"> <field name="NUM">10</field> </shadow> </value> </block>',
    '<block type="motion_ifonedgebounce"/>',
    '<block type="motion_sety"> <value name="Y"> <shadow id="sety" type="math_number"> <field name="NUM">0</field> </shadow> </value> </block>',
    '<block type="motion_setrotationstyle"/>',
    '<block type="looks_sayforsecs"> <value name="MESSAGE"> <shadow type="text"> <field name="TEXT">hello</field> </shadow> </value> <value name="SECS"> <shadow type="math_number"> <field name="NUM">2</field> </shadow> </value> </block>',
    '<block type="looks_say"> <value name="MESSAGE"> <shadow type="text"> <field name="TEXT">you will not use this</field> </shadow> </value> </block>',
    '<block type="looks_thinkforsecs"> <value name="MESSAGE"> <shadow type="text"> <field name="TEXT">\'yes\'</field> </shadow> </value> <value name="SECS"> <shadow type="math_number"> <field name="NUM">2</field> </shadow> </value> </block>',
    '<block type="looks_think"> <value name="MESSAGE"> <shadow type="text"> <field name="TEXT">yes</field> </shadow> </value> </block>',
    '<block type="looks_switchbackdropto"> <value name="BACKDROP"> <shadow type="looks_backdrops"> <field name="BACKDROP">costume1</field> </shadow> </value> </block>',
    '<block type="looks_switchbackdroptoandwait"> <value name="BACKDROP"> <shadow type="looks_backdrops"> <field name="BACKDROP">backdrop1</field> </shadow> </value> </block>',
    '<block type="looks_nextbackdrop"/>',
    '<block id="${targetId}_switchcostumeto" type="looks_switchcostumeto"> <value name="COSTUME"> <shadow type="looks_costume"> <field name="COSTUME">costume1</field> </shadow> </value> </block>',
    '<block type="looks_nextcostume"/>',
    '<block type="looks_switchbackdropto"> <value name="BACKDROP"> <shadow type="looks_backdrops"> <field name="BACKDROP">backdrop1</field> </shadow> </value> </block>',
    '<block type="looks_nextbackdrop"/>',
    '<block type="looks_changesizeby"> <value name="CHANGE"> <shadow type="math_number"> <field name="NUM">10</field> </shadow> </value> </block>',
    '<block type="looks_setsizeto"> <value name="SIZE"> <shadow type="math_number"> <field name="NUM">100</field> </shadow> </value> </block>',
    '<block type="looks_changeeffectby"> <value name="CHANGE"> <shadow type="math_number"> <field name="NUM">25</field> </shadow> </value> </block>',
    '<block type="looks_seteffectto"> <value name="VALUE"> <shadow type="math_number"> <field name="NUM">0</field> </shadow> </value> </block>',
    '<block type="looks_cleargraphiceffects"/>',
    '<block type="looks_show"/>',
    '<block type="looks_hide"/>',
    '<block type="looks_gotofrontback"/>',
    '<block type="looks_goforwardbackwardlayers"> <value name="NUM"> <shadow type="math_integer"> <field name="NUM">1</field> </shadow> </value> </block>',
    '<block id="backdropnumbername" type="looks_backdropnumbername"/>',
    '<block id="${targetId}_costumenumbername" type="looks_costumenumbername"/>',
    '<block id="backdropnumbername" type="looks_backdropnumbername"/>',
    '<block id="${targetId}_size" type="looks_size"/>',
    '<block id="${targetId}_sound_playuntildone" type="sound_playuntildone"> <value name="SOUND_MENU"> <shadow type="sound_sounds_menu"> <field name="SOUND_MENU">${soundName}</field> </shadow> </value> </block>',
    '<block id="${targetId}_sound_play" type="sound_play"> <value name="SOUND_MENU"> <shadow type="sound_sounds_menu"> <field name="SOUND_MENU">${soundName}</field> </shadow> </value> </block>',
    '<block type="sound_stopallsounds"/>',
    '<block type="sound_changeeffectby"> <value name="VALUE"> <shadow type="math_number"> <field name="NUM">10</field> </shadow> </value> </block>',
    '<block type="sound_seteffectto"> <value name="VALUE"> <shadow type="math_number"> <field name="NUM">100</field> </shadow> </value> </block>',
    '<block type="sound_cleareffects"/>',
    '<block type="sound_changevolumeby"> <value name="VOLUME"> <shadow type="math_number"> <field name="NUM">-10</field> </shadow> </value> </block>',
    '<block type="sound_setvolumeto"> <value name="VOLUME"> <shadow type="math_number"> <field name="NUM">100</field> </shadow> </value> </block>',
    '<block id="${targetId}_volume" type="sound_volume"/>',
    '<block type="event_whenflagclicked"/>',
    '<block type="event_whenkeypressed"> </block>',
    '<block type="event_whenstageclicked"/>',
    '<block type="event_whenthisspriteclicked"/>',
    '<block type="event_whenbackdropswitchesto"> </block>',
    '<block type="event_whengreaterthan"> <value name="VALUE"> <shadow type="math_number"> <field name="NUM">10</field> </shadow> </value> </block>',
    '<block type="event_whenbroadcastreceived"> </block>',
    '<block type="event_broadcast"> <value name="BROADCAST_INPUT"> <shadow type="event_broadcast_menu"></shadow> </value> </block>',
    '<block type="event_broadcastandwait"> <value name="BROADCAST_INPUT"> <shadow type="event_broadcast_menu"></shadow> </value> </block>',
    '<block type="control_wait"> <value name="DURATION"> <shadow type="math_positive_number"> <field name="NUM">1</field> </shadow> </value> </block>',
    '<block type="control_repeat"> <value name="TIMES"> <shadow type="math_whole_number"> <field name="NUM">10</field> </shadow> </value> </block>',
    '<block id="forever" type="control_forever"/>',
    '<block type="control_if"/>',
    '<block type="control_if_else"/>',
    '<block id="wait_until" type="control_wait_until"/>',
    '<block id="repeat_until" type="control_repeat_until"/>',
    '<block id="while" type="control_while"/>',
    '<block type="control_stop"/>',
    '<block type="control_create_clone_of"> <value name="CLONE_OPTION"> <shadow type="control_create_clone_of_menu"/> </value> </block>',
    '<block type="control_start_as_clone"/>',
    '<block type="control_delete_this_clone"/>',
    '<block type="sensing_touchingobject"> <value name="TOUCHINGOBJECTMENU"> <shadow type="sensing_touchingobjectmenu"/> </value> </block>',
    '<block type="sensing_touchingcolor"> <value name="COLOR"> <shadow type="colour_picker"/> </value> </block>',
    '<block type="sensing_coloristouchingcolor"> <value name="COLOR"> <shadow type="colour_picker"/> </value> <value name="COLOR2"> <shadow type="colour_picker"/> </value> </block>',
    '<block type="sensing_distanceto"> <value name="DISTANCETOMENU"> <shadow type="sensing_distancetomenu"/> </value> </block>',
    '<block id="askandwait" type="sensing_askandwait"> <value name="QUESTION"> <shadow type="text"> <field name="TEXT">where did you get this extension</field> </shadow> </value> </block>',
    '<block id="answer" type="sensing_answer"/>',
    '<block id="${targetId}_xposition" type="motion_xposition"/>',
    '<block id="${targetId}_yposition" type="motion_yposition"/>',
    '<block id="${targetId}_direction" type="motion_direction"/>',
    '<block type="sensing_keypressed"> <value name="KEY_OPTION"> <shadow type="sensing_keyoptions"/> </value> </block>',
    '<block type="sensing_mousedown"/>',
    '<block type="sensing_mousex"/>',
    '<block type="sensing_mousey"/>',
    '<block type="sensing_setdragmode" id="sensing_setdragmode"></block>',
    '<block id="loudness" type="sensing_loudness"/>',
    '<block id="timer" type="sensing_timer"/>',
    '<block type="sensing_resettimer"/>',
    '<block id="of" type="sensing_of"> <value name="OBJECT"> <shadow id="sensing_of_object_menu" type="sensing_of_object_menu"/> </value> </block>',
    '<block id="current" type="sensing_current"/>',
    '<block type="sensing_dayssince2000"/>',
    '<block type="sensing_username"/>',
    '<block type="operator_add"> <value name="NUM1"> <shadow type="math_number"> <field name="NUM"/> </shadow> </value> <value name="NUM2"> <shadow type="math_number"> <field name="NUM"/> </shadow> </value> </block>',
    '<block type="operator_subtract"> <value name="NUM1"> <shadow type="math_number"> <field name="NUM"/> </shadow> </value> <value name="NUM2"> <shadow type="math_number"> <field name="NUM"/> </shadow> </value> </block>',
    '<block type="operator_multiply"> <value name="NUM1"> <shadow type="math_number"> <field name="NUM"/> </shadow> </value> <value name="NUM2"> <shadow type="math_number"> <field name="NUM"/> </shadow> </value> </block>',
    '<block type="operator_divide"> <value name="NUM1"> <shadow type="math_number"> <field name="NUM"/> </shadow> </value> <value name="NUM2"> <shadow type="math_number"> <field name="NUM"/> </shadow> </value> </block>',
    '<block type="operator_random"> <value name="FROM"> <shadow type="math_number"> <field name="NUM">1</field> </shadow> </value> <value name="TO"> <shadow type="math_number"> <field name="NUM">10</field> </shadow> </value> </block>',
    '<block type="operator_gt"> <value name="OPERAND1"> <shadow type="text"> <field name="TEXT"/> </shadow> </value> <value name="OPERAND2"> <shadow type="text"> <field name="TEXT">50</field> </shadow> </value> </block>',
    '<block type="operator_lt"> <value name="OPERAND1"> <shadow type="text"> <field name="TEXT"/> </shadow> </value> <value name="OPERAND2"> <shadow type="text"> <field name="TEXT">50</field> </shadow> </value> </block>',
    '<block type="operator_equals"> <value name="OPERAND1"> <shadow type="text"> <field name="TEXT"/> </shadow> </value> <value name="OPERAND2"> <shadow type="text"> <field name="TEXT">50</field> </shadow> </value> </block>',
    '<block type="operator_and"/>',
    '<block type="operator_or"/>',
    '<block type="operator_not"/>',
    '<block type="operator_join"> <value name="STRING1"> <shadow type="text"> <field name="TEXT">jack </field> </shadow> </value> <value name="STRING2"> <shadow type="text"> <field name="TEXT">ballz</field> </shadow> </value> </block>',
    '<block type="operator_letter_of"> <value name="LETTER"> <shadow type="math_whole_number"> <field name="NUM">1</field> </shadow> </value> <value name="STRING"> <shadow type="text"> <field name="TEXT">trademark</field> </shadow> </value> </block>',
    '<block type="operator_length"> <value name="STRING"> <shadow type="text"> <field name="TEXT">apple</field> </shadow> </value> </block>',
    '<block type="operator_contains" id="operator_contains"> <value name="STRING1"> <shadow type="text"> <field name="TEXT">apple</field> </shadow> </value> <value name="STRING2"> <shadow type="text"> <field name="TEXT">letter</field> </shadow> </value> </block>',
    '<block type="operator_mod"> <value name="NUM1"> <shadow type="math_number"> <field name="NUM"/> </shadow> </value> <value name="NUM2"> <shadow type="math_number"> <field name="NUM"/> </shadow> </value> </block>',
    '<block type="operator_round"> <value name="NUM"> <shadow type="math_number"> <field name="NUM"/> </shadow> </value> </block>',
    '<block type="operator_mathop"> <value name="NUM"> <shadow type="math_number"> <field name="NUM"/> </shadow> </value> </block>',
  ];
  var targetId = getEditingTarget();

  const names = [
    "Motion",
    "Looks",
    "Sound",
    "Events",
    "Control",
    "Sensing",
    "Operators",
  ];
  var randomNames = shuffle(names);

  const xml = (xml) => ({
    blockType: Scratch.BlockType.XML,
    xml: xml,
  });

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  function randomColor() {
    return "#000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });
  }

  function randomBlock(blockCount) {
    if (!window.ScratchBlocks) return;

    let blocks = [];
    for (let i = 0; i < blockCount; i++) {
      const block = allBlocks[Math.floor(Math.random() * allBlocks.length)];
      blocks.push(block);
    }

    blocks = blocks.join("");

    console.log(blocks);
    return blocks;
  }

  vm.on("BLOCKSINFO_UPDATE", getEditingTarget);
  function getEditingTarget() {
    if (!vm.editingTarget) return;
    vm.removeListener("BLOCKSINFO_UPDATE", getEditingTarget);

    Scratch.vm.runtime.extensionManager.refreshBlocks();
    return vm.editingTarget.id;
  }

  const motionBlocks = [
    xml(randomBlock(3)),
    "---",
    xml(randomBlock(4)),
    "---",
    xml(randomBlock(2)),
    "---",
    xml(randomBlock(4)),
    "---",
    xml(randomBlock(1)),
    "---",
    xml(randomBlock(1)),
    "---",
    xml(randomBlock(3)),
  ];
  const looksBlocks = [
    xml(randomBlock(4)),
    "---",
    xml(randomBlock(4)),
    "---",
    xml(randomBlock(2)),
    "---",
    xml(randomBlock(3)),
    "---",
    xml(randomBlock(2)),
    "---",
    xml(randomBlock(5)),
  ];
  const soundBlocks = [
    xml(randomBlock(3)),
    "---",
    xml(randomBlock(3)),
    "---",
    xml(randomBlock(3)),
  ];
  const eventBlocks = [
    xml(randomBlock(4)),
    "---",
    xml(randomBlock(1)),
    "---",
    xml(randomBlock(3)),
  ];
  const controlBlocks = [
    xml(randomBlock(1)),
    "---",
    xml(randomBlock(2)),
    "---",
    xml(randomBlock(5)),
    "---",
    xml(randomBlock(1)),
    "---",
    xml(randomBlock(3)),
  ];
  const sensingBlocks = [
    xml(randomBlock(4)),
    "---",
    xml(randomBlock(2)),
    "---",
    xml(randomBlock(4)),
    "---",
    xml(randomBlock(1)),
    "---",
    xml(randomBlock(1)),
    "---",
    xml(randomBlock(2)),
    "---",
    xml(randomBlock(1)),
    "---",
    xml(randomBlock(2)),
    "---",
    xml(randomBlock(1)),
  ];
  const operatorBlocks = [
    xml(randomBlock(4)),
    "---",
    xml(randomBlock(1)),
    "---",
    xml(randomBlock(3)),
    "---",
    xml(randomBlock(3)),
    "---",
    xml(randomBlock(4)),
    "---",
    xml(randomBlock(2)),
    "---",
    xml(randomBlock(1)),
  ];

  class Motion {
    getInfo() {
      return {
        id: "motion",
        name: randomNames[0],
        color1: randomColor(),
        blocks: motionBlocks,
      };
    }
  }

  class Looks {
    getInfo() {
      return {
        id: "looks",
        name: randomNames[1],
        color1: randomColor(),
        blocks: looksBlocks,
      };
    }
  }

  class Sound {
    getInfo() {
      return {
        id: "sound",
        name: randomNames[2],
        color1: randomColor(),
        blocks: soundBlocks,
      };
    }
  }

  class Events {
    getInfo() {
      return {
        id: "event",
        name: randomNames[3],
        color1: randomColor(),
        blocks: eventBlocks,
      };
    }
  }

  class Control {
    getInfo() {
      return {
        id: "control",
        name: randomNames[4],
        color1: randomColor(),
        blocks: controlBlocks,
      };
    }
  }

  class Sensing {
    getInfo() {
      return {
        id: "sensing",
        name: randomNames[5],
        color1: randomColor(),
        blocks: sensingBlocks,
      };
    }
  }

  class Operators {
    getInfo() {
      return {
        id: "operators",
        name: randomNames[6],
        color1: randomColor(),
        blocks: operatorBlocks,
      };
    }
  }

  Scratch.extensions.register(new Motion());
  Scratch.extensions.register(new Looks());
  Scratch.extensions.register(new Sound());
  Scratch.extensions.register(new Events());
  Scratch.extensions.register(new Control());
  Scratch.extensions.register(new Sensing());
  Scratch.extensions.register(new Operators());
})(Scratch);
