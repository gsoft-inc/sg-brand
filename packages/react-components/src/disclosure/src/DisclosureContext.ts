import { createContext, useContext } from "react";

export const DisclosureContext = createContext({});

export function useDisclosureContext() {
    return useContext(DisclosureContext);
}
