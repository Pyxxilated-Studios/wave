import { ReactNode, FunctionComponent } from "react";

import "./styles.scss";

interface OwnProps {
    children: ReactNode;
}

type ViewportProps = OwnProps;

const Viewport: FunctionComponent<ViewportProps> = (props: ViewportProps) => {
    return <div className="viewport-container white-border">{props.children}</div>;
};

export default Viewport;
