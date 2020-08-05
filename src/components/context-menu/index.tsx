import React, { ReactNode, FunctionComponent } from "react";

import "./styles.scss";

interface OwnProps {
    context: ReactNode;
    children: ReactNode;
}

type ContextMenuProps = OwnProps;

const ContextMenu: FunctionComponent<ContextMenuProps> = (props: ContextMenuProps) => (
    <div className="context-menu">
        <div className="context white-border">{props.context}</div>
        <div className="context-for">{props.children}</div>
    </div>
);

export default ContextMenu;
