import { RefObject, useCallback, useMemo } from "react";
import { useRefState } from "./useRefState";
import { walkFocusableElements } from "./focusableTreeWalker";

export type ScopeChangeEventHandler = (elements: HTMLElement[], scope: HTMLElement[]) => void;

export class DomScope {
    private scopeRef: RefObject<HTMLElement[]>;
    private handlersRef: RefObject<ScopeChangeEventHandler[]>;

    constructor(scopeRef: RefObject<HTMLElement[]>, handlersRef: RefObject<ScopeChangeEventHandler[]>) {
        this.scopeRef = scopeRef;
        this.handlersRef = handlersRef;
    }

    get elements() {
        return this.scopeRef.current;
    }

    getScopeRoot() {
        if (!this.elements || this.elements.length === 0) { return null; }

        return this.elements[0].parentElement;
    }

    registerChangeHandler(handler: ScopeChangeEventHandler) {
        this.handlersRef.current.push(handler);
    }

    removeChangeHandler(handler: ScopeChangeEventHandler) {
        const handlers = this.handlersRef.current;

        handlers.splice(handlers.indexOf(handler), 1);
    }

    isInScope(element: HTMLElement) {
        return this.elements.some(x => x.contains(element));
    }
}

export function useFocusScope(): [DomScope, (rootElement: HTMLElement) => void] {
    const [scopeRef, setScope] = useRefState<HTMLElement[]>([]);
    const [handlersRef] = useRefState<ScopeChangeEventHandler[]>([]);

    const setRef = useCallback((rootElement: HTMLElement) => {
        const setElements = (elements: HTMLElement[]) => {
            handlersRef.current.forEach(x => {
                x(elements, scopeRef.current);
            });

            setScope(elements);
        };

        const parseElements = () => {
            const scope: HTMLElement[] = [];

            walkFocusableElements(rootElement, (x: HTMLElement) => {
                scope.push(x);
            });

            setElements(scope);
        };

        // Watch for dynamic elements.
        const mutationObserver = new MutationObserver(() => {
            parseElements();
        });

        if (rootElement) {
            // Parse initial elements.
            parseElements();

            mutationObserver.observe(rootElement, {
                childList: true,
                subtree: true
            });
        } else {
            mutationObserver.disconnect();
            // HACK: It's probably not a good idea to comment this cleanup code but it's currently the only way
            // for restore focus to work.
            // setElements([]);
        }
    }, [scopeRef, setScope, handlersRef]);

    const scope = useMemo(() => new DomScope(scopeRef, handlersRef), [scopeRef, handlersRef]);

    return [scope, setRef];
}
