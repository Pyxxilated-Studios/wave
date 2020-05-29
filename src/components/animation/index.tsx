import React, { FunctionComponent } from "react";
import styled, { keyframes, Keyframes } from "styled-components";
import { Projectile, Point, Direction } from "../../types";
import { SPRITE_SIZE, SPRITE_PIXELS } from "../../constants";

interface DivProps {
    startPosition: Point;
    projectile: Projectile;
    animation: Keyframes;
}

const Div = styled.div<DivProps>`
    position: absolute;
    top: ${(props: DivProps): number => props.startPosition.y * SPRITE_SIZE}px;
    left: ${(props: DivProps): number => props.startPosition.x * SPRITE_SIZE}px;
    width: ${SPRITE_PIXELS};
    height: ${SPRITE_PIXELS};
    z-index: 1000;

    animation: ${(props: DivProps): Keyframes => props.animation} .5s steps(${(props: DivProps): number =>
    props.projectile.animationFrames});

    background-image: url('${(props: DivProps): string => props.projectile.sprite}');
    background-position-x: 0px;
`;

interface OwnProps {
    projectile: Projectile;
    startPosition: Point;
    endPosition: Point;
    direction: Direction;
}

type AnimationProps = OwnProps;

export const Animation: FunctionComponent<AnimationProps> = (props: AnimationProps) => {
    const { projectile, startPosition, endPosition, direction } = props;

    let rotation = "0";

    let start = startPosition;

    if (projectile.target === "self") {
        start = endPosition;
    } else {
        switch (direction) {
            case Direction.North:
                rotation = "270";
                break;

            case Direction.South:
                rotation = "90";
                break;

            case Direction.West:
                rotation = "180";
                break;

            default:
                break;
        }
    }

    const animation = keyframes`
        0% {
            transform: rotate(${rotation}deg);
        }

        100% {
            transform: translate(${(endPosition.x - start.x) * SPRITE_SIZE}px, ${
        (endPosition.y - start.y) * SPRITE_SIZE
    }px) rotate(${rotation}deg);
            background-position-x: ${projectile.animationFrames * SPRITE_SIZE};
        }
    `;

    return <Div projectile={projectile} startPosition={start} animation={animation} />;
};
