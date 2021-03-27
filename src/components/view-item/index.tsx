import { useState, FunctionComponent } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { RootState, RootDispatch } from "../../store";
import { StatsState } from "../../store/stats/types";
import { PlayerState } from "../../store/player/types";
import { equipItem, unequipItem } from "../../store/stats/actions";
import { dropItem, sellItem } from "../../store/inventory/actions";
import { setActiveSpell } from "../../store/player/actions";

import {
    ItemType,
    ConsumableItem,
    Backpack,
    ItemEffect,
    Weapon,
    Spell,
    HealEffect,
    DamageEffect,
    Target,
    SpellEffectType,
    ChangeAIEffect,
} from "../../types";

import Button from "../button";
import ConfirmDialog from "../confirm-dialog";
import EmptySlot from "../empty-slot";
import MicroDialog from "../micro-dialog";
import StatsItem from "./stats-item";

import consumePotion from "../inventory/actions/consume-potion";
import buyItem from "../inventory/actions/buy-item";

import calculateModifier from "../../utils/calculate-modifier";
import calculateWisdomPotionBonus from "../../utils/calculate-wisdom-potion-bonus";
import calculatePrices from "../../utils/calculate-price";

import "./styles.scss";
import { SPRITE_PIXELS } from "../../constants";

interface DispatchProps {
    buyItem: (item: ItemType) => void;
    dropItem: (item: ItemType) => void;
    equipItem: (item: ItemType) => void;
    unequipItem: (item: ItemType) => void;
    sellItem: (item: ItemType) => void;
    consumePotion: (item: ItemType) => void;
    setActiveSpell: (spell?: Spell) => void;
}

interface StateProps {
    stats: StatsState;
    player: PlayerState;
}

interface OwnProps {
    sell?: boolean;
    buy?: boolean;
    open: boolean;
    data?: ItemType | Spell;
    onClose: () => void;
}

type ViewItemProps = DispatchProps & StateProps & OwnProps;

const ViewItem: FunctionComponent<ViewItemProps> = (props: ViewItemProps) => {
    const [confirmPotion, setConfirmPotion] = useState(false);
    const [confirmDrop, setConfirmDrop] = useState(false);
    const [confirmSell, setConfirmSell] = useState(false);
    const [confirmBuy, setConfirmBuy] = useState(false);

    if (!props.open || !props.data) return null;

    const itemStats = [];
    let itemIsEquipped = false;
    const equipped = props.stats.equippedItems;

    // find the type of item
    switch (props.data.type) {
        case "backpack": {
            itemStats.push(
                <StatsItem stats={{ name: "slots", value: (props.data as Backpack).slots }} key={uuidv4()} />,
            );
            break;
        }

        case "potion": {
            const potionRestore = calculateWisdomPotionBonus(
                props.data.consumeEffect.healthRestore ?? props.data.consumeEffect.manaRestore ?? 0,
                calculateModifier(props.stats.abilities.wisdom),
            );

            itemStats.push(
                <StatsItem
                    stats={{ name: props.data.kind, value: potionRestore === Infinity ? "MAX" : potionRestore }}
                    key={uuidv4()}
                />,
            );
            break;
        }

        case "weapon": {
            itemIsEquipped = equipped.weapon?.name === props.data.name;
            itemStats.push(
                <StatsItem stats={{ name: "damage", value: (props.data as Weapon).damage }} key={uuidv4()} />,
            );

            // if there's a bonus
            if (props.data.bonus) {
                const [bonusType, multiplier] = props.data.bonus.split("::");
                const bonusMult = parseFloat(multiplier);
                itemStats.push(
                    <StatsItem
                        stats={{
                            name: `VS. ${bonusType}`,
                            value: `${bonusMult}x`,
                        }}
                        key={uuidv4()}
                    />,
                );
            }
            break;
        }
        case "armour": {
            switch (props.data.kind) {
                case "ring": {
                    itemIsEquipped = equipped.ring?.name === props.data.name;
                    break;
                }

                case "helmet": {
                    itemIsEquipped = equipped.helmet?.name === props.data.name;
                    break;
                }

                case "body": {
                    itemIsEquipped = equipped.body?.name === props.data.name;
                    break;
                }

                case "gloves": {
                    itemIsEquipped = equipped.gloves?.name === props.data.name;
                    break;
                }

                case "boots": {
                    itemIsEquipped = equipped.boots?.name === props.data.name;
                    break;
                }

                case "legs": {
                    itemIsEquipped = equipped.legs?.name === props.data.name;
                    break;
                }
            }
            break;
        }

        case "spell": {
            if (props.data.target === Target.Self) {
                const effect = props.data.effects?.find((effect) => effect.effect === SpellEffectType.Heal);

                if (effect) {
                    const intelligenceModifier = calculateModifier(props.stats.abilities.intelligence);
                    const healAmount = (effect as HealEffect).amount + " + " + Math.max(0, intelligenceModifier);
                    itemStats.push(<StatsItem stats={{ name: "heal", value: healAmount }} key={uuidv4()} />);
                }
            } else {
                const effect = props.data.effects?.find((effect) => effect.effect === SpellEffectType.Damage);

                if (effect) {
                    const damageEffect = effect as DamageEffect;
                    itemStats.push(<StatsItem stats={{ name: "damage", value: damageEffect.dice }} key={uuidv4()} />);
                }
            }

            itemStats.push(<StatsItem stats={{ name: "mana cost", value: props.data.manaCost }} key={uuidv4()} />);

            const effect = props.data.effects?.find((effect) => effect.effect === SpellEffectType.ChangeAI);
            if (effect) {
                const changeEffect = effect as ChangeAIEffect;

                itemStats.push(
                    <StatsItem stats={{ name: "effect", value: changeEffect.description }} key={uuidv4()} />,
                );

                if (changeEffect.chance) {
                    itemStats.push(
                        <StatsItem stats={{ name: "chance", value: changeEffect.chance.description }} key={uuidv4()} />,
                    );
                }

                if (changeEffect.extraEffect?.effect === SpellEffectType.DamageOverTime) {
                    itemStats.push(
                        <StatsItem
                            stats={{
                                name: "DMG over time",
                                value: changeEffect.extraEffect?.dice + " * " + changeEffect.extraEffect?.turns,
                            }}
                            key={uuidv4()}
                        />,
                    );
                }
            }

            itemStats.push(<StatsItem stats={{ name: "description", value: props.data.description }} key={uuidv4()} />);
            break;
        }

        default:
            break;
    }

    if (props.data.type !== "spell" && props.data.effects) {
        // find each effect
        Reflect.ownKeys(props.data.effects).forEach((effect) => {
            if (props.data?.effects) {
                const value = (props.data.effects as ItemEffect)[effect as keyof ItemEffect];
                if (value) {
                    itemStats.push(<StatsItem stats={{ name: effect.toString(), value }} key={uuidv4()} />);
                }
            }
        });
    }

    const { sellPrice, buyPrice } =
        props.data.type !== "spell"
            ? calculatePrices(props.data.price, calculateModifier(props.stats.abilities.charisma))
            : { sellPrice: 0, buyPrice: 0 };

    if (props.data.type !== "spell") {
        itemStats.push(
            <StatsItem
                stats={{
                    name: "price",
                    value: props.buy ? buyPrice : sellPrice,
                }}
                key={uuidv4()}
            />,
        );
    }

    let ViewItemButtons = null;
    let onKeyPress: (() => void) | null = null;

    if (props.buy) {
        onKeyPress = (): void => setConfirmBuy(true);
        ViewItemButtons = <Button onClick={(): void => setConfirmBuy(true)} icon="coins" title={"Buy Item"} />;
    } else if (props.sell) {
        onKeyPress = (): void => setConfirmSell(true);
        ViewItemButtons = <Button onClick={(): void => setConfirmSell(true)} icon="coins" title={"Sell Item"} />;
    } else if (itemIsEquipped) {
        onKeyPress = (): void => {
            if (props.data && props.data.type !== "spell") {
                props.unequipItem(props.data);
            }
            props.onClose();
        };
        ViewItemButtons = (
            <Button
                onClick={(): void => {
                    if (props.data && props.data.type !== "spell") {
                        props.unequipItem(props.data);
                    }
                    props.onClose();
                }}
                icon="archive"
                title="Un-equip"
            />
        );
    } else if (props.data.type === "spell") {
        const unlocked = props.data.unlockLevel <= props.stats.level;
        onKeyPress = (): void => {
            if (props.player.spell && props.player.spell.name === props.data?.name) {
                props.setActiveSpell(undefined);
            } else if (unlocked) {
                props.setActiveSpell(props.data as Spell);
            }
        };
        ViewItemButtons = (
            <>
                {props.player.spell && props.player.spell.name === props.data.name ? (
                    <Button onClick={onKeyPress} title={"Remove Active Spell"} />
                ) : (
                    <Button
                        extraClass={unlocked ? "" : "selected"}
                        onClick={onKeyPress}
                        title={unlocked ? "Set Active Spell" : `Unlocked at level ${props.data.unlockLevel}`}
                    />
                )}
            </>
        );
    } else {
        onKeyPress = (): void => {
            if (props.data?.type === "potion") {
                setConfirmPotion(true);
            } else {
                if (props.data && props.data.type !== "spell") {
                    props.equipItem(props.data);
                }
                props.onClose();
            }
        };

        ViewItemButtons = (
            <>
                <Button onClick={(): void => setConfirmDrop(true)} icon="trash" title={"Drop"} />

                {props.data?.type === "potion" ? (
                    <Button
                        onClick={(): void => setConfirmPotion(true)}
                        icon="medkit"
                        title={props.data.kind === "health" ? "Heal" : "Restore"}
                    />
                ) : (
                    <Button
                        onClick={(): void => {
                            if (props.data && props.data.type !== "spell") {
                                props.equipItem(props.data);
                            }
                            props.onClose();
                        }}
                        icon="hand-paper"
                        title="Equip"
                    />
                )}
            </>
        );
    }

    return (
        <MicroDialog
            onClose={props.onClose}
            onKeyPress={(): void => {
                if (!confirmDrop) {
                    // Removing this check means that if we're on the drop/equip item, then if we selected the
                    // drop option, on the next screen if we hit 'enter', we'll equip the item.
                    onKeyPress && onKeyPress();
                }
            }}
        >
            <div className="view-item-title">
                <EmptySlot className="white-border view-item-image">
                    <div
                        style={{
                            backgroundImage: `url('${props.data.image}')`,
                            width: SPRITE_PIXELS,
                            height: SPRITE_PIXELS,
                        }}
                    />
                </EmptySlot>

                <span className="view-item-text">{props.data.name || "-"}</span>
            </div>

            <div className="flex-column view-item-stats">{itemStats}</div>

            <div className="flex-column view-item-button-container">
                <div className="flex-row view-item-button">{ViewItemButtons}</div>
            </div>

            <ConfirmDialog
                open={confirmDrop}
                text="Are you sure!? This item will be gone forever..."
                cancelText="Keep"
                cancelIcon="archive"
                acceptText="Drop"
                acceptIcon="trash"
                confirm={(): void => {
                    if (props.data && props.data.type !== "spell") {
                        props.dropItem(props.data);
                    }
                    setConfirmDrop(false);
                    props.onClose();
                }}
                acceptKeys
                onClose={(): void => setConfirmDrop(false)}
            />

            <ConfirmDialog
                open={confirmSell}
                text={`Are you sure you want to sell your ${props.data.name} for ${sellPrice} gold ?`}
                cancelText="Cancel"
                cancelIcon="times"
                acceptText="Sell"
                acceptIcon="coins"
                confirm={(): void => {
                    if (props.data && props.data.type !== "spell") {
                        sellItem(props.data);
                    }
                    setConfirmSell(false);
                    props.onClose();
                }}
                acceptKeys
                onClose={(): void => setConfirmSell(false)}
            />

            <ConfirmDialog
                open={confirmBuy}
                text={`Are you sure you want to buy ${props.data.name} for ${buyPrice} gold ?`}
                cancelText="Cancel"
                cancelIcon="times"
                acceptText="Buy"
                acceptIcon="coins"
                confirm={(): void => {
                    if (props.data && props.data.type !== "spell") {
                        buyItem(props.data);
                    }
                    setConfirmBuy(false);
                    props.onClose();
                }}
                acceptKeys
                onClose={(): void => setConfirmBuy(false)}
            />

            <ConfirmDialog
                open={confirmPotion}
                text={`Are you sure you want to use your ${props.data.name}?`}
                cancelText="Cancel"
                cancelIcon="times"
                acceptText={(props.data as ConsumableItem).kind === "health" ? "Heal" : "Restore"}
                acceptIcon="medkit"
                confirm={(): void => {
                    if (props.data && props.data.type !== "spell") {
                        props.consumePotion(props.data);
                    }
                    setConfirmPotion(false);
                    props.onClose();
                }}
                acceptKeys
                onClose={(): void => setConfirmPotion(false)}
            />
        </MicroDialog>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({ stats: state.stats, player: state.player });

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
    buyItem: (item: ItemType): void => dispatch(buyItem(item)),
    consumePotion: (item: ItemType): void => dispatch(consumePotion(item)),
    dropItem: (item: ItemType): void => dispatch(dropItem(item)),
    equipItem: (item: ItemType): void => dispatch(equipItem(item)),
    unequipItem: (item: ItemType): void => dispatch(unequipItem(item)),
    sellItem: (item: ItemType): void => dispatch(sellItem(item)),
    setActiveSpell: (spell?: Spell): void => dispatch(setActiveSpell(spell)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewItem);
