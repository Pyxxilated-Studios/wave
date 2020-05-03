// Generates a random monster type based on player level and a random chance
const generateMonsterType = (playerLevel: number): string => {
  // generate a number between 1 - 100
  const chance = Math.floor(Math.random() * 100) + 1;
  // if player is level 1 - 2
  if (playerLevel <= 2) {
    if (chance <= 10) {
      // 10% chance to spawn a goblin
      return "goblin";
    } // 90% chance to spawn a rat
    else {
      return "rat";
    }
  } else if (playerLevel <= 6 && playerLevel >= 3) {
    if (chance <= 10) {
      // 10% chance to spawn stone golem
      return "stone-golem";
    } // 40% chance to spawn goblin
    else if (chance <= 50 && chance > 10) {
      return "goblin";
    } // 50% chance to spawn a rat
    else {
      return "rat";
    }
  } else if (playerLevel <= 9 && playerLevel >= 7) {
    if (chance <= 10) {
      // 10% chance to spawn imp
      return "imp";
    } // 40% chance to spawn stone golem
    else if (chance <= 50 && chance > 10) {
      return "stone-golem";
    } // 50% chance to spawn a goblin
    else {
      return "goblin";
    }
  } else if (playerLevel <= 12 && playerLevel >= 10) {
    if (chance <= 30) {
      // 30% chance to spawn imp
      return "imp";
    } // 40% chance to spawn stone golem
    else if (chance <= 70 && chance > 30) {
      return "stone-golem";
    } // 30% chance to spawn goblin
    else {
      return "goblin";
    }
  } else if (playerLevel <= 15 && playerLevel >= 13) {
    if (chance <= 10) {
      // 10% chance to spawn dragon
      return "dragon";
    } // 40% chance to spawn imp
    else if (chance <= 50 && chance > 10) {
      return "imp";
    } // 50% chance to spawn a stone-golem
    else {
      return "stone-golem";
    }
  } else if (playerLevel <= 18 && playerLevel >= 16) {
    if (chance <= 30) {
      // 30% chance to spawn dragon
      return "dragon";
    } // 40% chance to spawn imp
    else if (chance <= 70 && chance > 30) {
      return "imp";
    } // 30% chance to spawn a stone-golem
    else {
      return "stone-golem";
    }
  } else if (playerLevel <= 21 && playerLevel >= 19) {
    if (chance <= 10) {
      // 10% chance to spawn lich
      return "lich";
    } // 40% chance to spawn dragon
    else if (chance <= 50 && chance > 10) {
      return "dragon";
    } // 50% chance to spawn a imp
    else {
      return "imp";
    }
  } else if (playerLevel <= 24 && playerLevel >= 22) {
    if (chance <= 30) {
      // 30% chance to spawn lich
      return "lich";
    } // 40% chance to spawn dragon
    else if (chance <= 70 && chance > 30) {
      return "dragon";
    } // 30% chance to spawn a imp
    else {
      return "imp";
    }
  } else if (playerLevel <= 27 && playerLevel >= 25) {
    if (chance <= 60) {
      // 60% chance to spawn lich
      return "lich";
    } // 40% chance to spawn dragon
    else {
      return "dragon";
    }
  } else if (playerLevel >= 28) {
    return "lich";
  } else {
    return "rat";
  }
};

export default generateMonsterType;
