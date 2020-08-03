import React, { ReactNode, FunctionComponent } from "react";

import "./styles.scss";

interface OwnProps {
    context: ReactNode;
    children: ReactNode;
}

type ContextMenuProps = OwnProps;

const ContextMenu: FunctionComponent<ContextMenuProps> = (props: ContextMenuProps) => (
    <div className="hoverable">
        <div className="tooltip">{props.context}</div>
        {props.children}
    </div>
);

export default ContextMenu;
