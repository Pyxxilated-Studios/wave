import { Armour, Weapon, ConsumableItem, MiscellaneousItem } from "../../types";

import BackpackUpgrade from "./miscellaneous/other/backpack-upgrade";
import LeatherArmour from "./clothes/armour/leather-armour";
import LeatherBoots from "./clothes/armour/leather-boots";
import LeatherCap from "./clothes/armour/leather-cap";
import LeatherGloves from "./clothes/armour/leather-gloves";
import LeatherPants from "./clothes/armour/leather-pants";
import IronArmour from "./clothes/armour/iron-armour";
import IronBoots from "./clothes/armour/iron-boots";
import IronHelm from "./clothes/armour/iron-helm";
import IronGloves from "./clothes/armour/iron-gloves";
import IronPants from "./clothes/armour/iron-pants";
import SteelArmour from "./clothes/armour/steel-armour";
import SteelBoots from "./clothes/armour/steel-boots";
import SteelHelm from "./clothes/armour/steel-helm";
import SteelGloves from "./clothes/armour/steel-gloves";
import SteelPants from "./clothes/armour/steel-pants";
import MithrilArmour from "./clothes/armour/mithril-armour";
import MithrilBoots from "./clothes/armour/mithril-boots";
import MithrilHelm from "./clothes/armour/mithril-helm";
import MithrilGloves from "./clothes/armour/mithril-gloves";
import MithrilPants from "./clothes/armour/mithril-pants";
import BlackRobes from "./clothes/robes/black-robes";
import BrownRobes from "./clothes/robes/brown-robes";
import RedRobes from "./clothes/robes/red-robes";
import TealRobes from "./clothes/robes/teal-robes";
import SkullRobes from "./clothes/robes/skull-robes";
import OldRing from "./jewellery/rings/old-ring";
import DiamondRing from "./jewellery/rings/diamond-ring";
import AmethystRing from "./jewellery/rings/amethyst-ring";
import SapphireRing from "./jewellery/rings/sapphire-ring";
import BroadSword from "./weapons/swords/broad-sword";
import RustySword from "./weapons/swords/rusty-sword";
import SteelSword from "./weapons/swords/steel-sword";
import DragonsBane from "./weapons/swords/dragons-bane";
import LichBane from "./weapons/swords/lich-bane";
import BlackStaff from "./weapons/staffs/black-staff";
import BrownStaff from "./weapons/staffs/brown-staff";
import RedStaff from "./weapons/staffs/red-staff";
import TealStaff from "./weapons/staffs/teal-staff";
import SkullStaff from "./weapons/staffs/skull-staff";
import Boomerang from "./weapons/ranged/boomerang";
import Slingshot from "./weapons/ranged/slingshot";
import HellsPhoenix from "./weapons/ranged/hells-phoenix";
import PhantasmCrossbow from "./weapons/ranged/phantasm";
import MidnightsFury from "./weapons/ranged/midnights-fury";
import HealthPotion from "./miscellaneous/potions/health-potion";
import GreatHealthPotion from "./miscellaneous/potions/great-health-potion";
import MightyHealthPotion from "./miscellaneous/potions/mighty-health-potion";
import DivineHealthPotion from "./miscellaneous/potions/divine-health-potion";
import ManaPotion from "./miscellaneous/potions/mana-potion";
import GreatManaPotion from "./miscellaneous/potions/great-mana-potion";
import MightyManaPotion from "./miscellaneous/potions/mighty-mana-potion";
import DivineManaPotion from "./miscellaneous/potions/divine-mana-potion";

const items: {
    weapons: {
        swords: { [key: string]: Weapon };
        ranged: { [key: string]: Weapon };
        staffs: { [key: string]: Weapon };
    };
    clothes: { armour: { [key: string]: Armour }; robes: { [key: string]: Armour } };
    jewellery: { rings: { [key: string]: Armour } };
    miscellaneous: { potions: { [key: string]: ConsumableItem }; other: { [key: string]: MiscellaneousItem } };
} = {
    weapons: {
        swords: {
            BroadSword,
            RustySword,
            SteelSword,
            DragonsBane,
            LichBane,
        },
        ranged: {
            Boomerang,
            Slingshot,
            HellsPhoenix,
            PhantasmCrossbow,
            MidnightsFury,
        },
        staffs: {
            BlackStaff,
            BrownStaff,
            RedStaff,
            TealStaff,
            SkullStaff,
        },
    },
    clothes: {
        armour: {
            LeatherArmour,
            LeatherBoots,
            LeatherCap,
            LeatherGloves,
            LeatherPants,
            IronArmour,
            IronBoots,
            IronHelm,
            IronGloves,
            IronPants,
            SteelArmour,
            SteelBoots,
            SteelHelm,
            SteelGloves,
            SteelPants,
            MithrilArmour,
            MithrilBoots,
            MithrilHelm,
            MithrilGloves,
            MithrilPants,
        },
        robes: {
            BlackRobes,
            BrownRobes,
            RedRobes,
            TealRobes,
            SkullRobes,
        },
    },
    jewellery: {
        rings: {
            AmethystRing,
            DiamondRing,
            OldRing,
            SapphireRing,
        },
    },
    miscellaneous: {
        potions: {
            HealthPotion,
            GreatHealthPotion,
            ManaPotion,
            GreatManaPotion,
            MightyHealthPotion,
            DivineHealthPotion,
            MightyManaPotion,
            DivineManaPotion,
        },
        other: {
            BackpackUpgrade,
        },
    },
};

export const leatherEquipment = [LeatherCap, LeatherArmour, LeatherGloves, LeatherPants, LeatherBoots];

export const ironEquipment = [IronHelm, IronArmour, IronGloves, IronPants, IronBoots];

export const steelEquipment = [SteelHelm, SteelArmour, SteelGloves, SteelPants, SteelBoots];

export const mithrilEquipment = [MithrilHelm, MithrilArmour, MithrilGloves, MithrilPants, MithrilBoots];

export const randomItemsT1 = [...leatherEquipment, BlackRobes, BrownRobes, SteelSword, Slingshot, BrownStaff, OldRing];

export const randomItemsT2 = [...ironEquipment, RedRobes, BroadSword, HellsPhoenix, RedStaff, AmethystRing];

export const randomItemsT3 = [
    ...steelEquipment,
    RedRobes,
    TealRobes,
    BroadSword,
    DragonsBane,
    HellsPhoenix,
    PhantasmCrossbow,
    RedStaff,
    TealStaff,
    SapphireRing,
];

export const randomItemsT4 = [...mithrilEquipment, SkullRobes, LichBane, MidnightsFury, SkullStaff, DiamondRing];

export default items;
