import { useState, useEffect } from "react";

const useWindowSize = (): { width: number; height: number } => {
    const [height, setHeight] = useState(window.innerHeight);
    const [width, setWidth] = useState(window.innerWidth);

    const updateWindowDimensions = (): void => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", updateWindowDimensions);
        window.addEventListener("orientationchange", updateWindowDimensions);

        return (): void => {
            window.removeEventListener("resize", updateWindowDimensions);
            window.removeEventListener("orientationchange", updateWindowDimensions);
        };
    }, []);

    return { width, height };
};

export default useWindowSize;
