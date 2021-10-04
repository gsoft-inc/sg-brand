import { isFunction } from "./assertions";
import { useEffect, useState } from "react";

// Copied from https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/utils/src/useMediaQuery.ts
export function useMediaQuery(query: string) {
    const supportsMatchMedia = isFunction(window?.matchMedia);

    const [matches, setMatches] = useState(() => supportsMatchMedia
        ? window.matchMedia(query).matches
        : false
    );

    useEffect(() => {
        if (!supportsMatchMedia) {
            return;
        }

        const mediaQueryList = window.matchMedia(query);

        const onChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        mediaQueryList.addListener(onChange);

        return () => {
            mediaQueryList.removeListener(onChange);
        };
    }, [supportsMatchMedia, query]);

    return matches;
}
