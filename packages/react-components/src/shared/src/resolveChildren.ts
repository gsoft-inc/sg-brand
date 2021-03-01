import { Fragment, ReactElement, ReactNode } from "react";
import { isFunction, isNil } from "lodash";

// Support first level fragment: https://github.com/facebook/react/issues/11859.
export function resolveFragment(children: ReactNode): ReactNode {
    if (!isNil(children) && (children as ReactElement).type === Fragment) {
        return (children as ReactElement).props.children;
    }

    return children;
}

export function resolveChildren(children: ReactNode, ...renderProps: any[]): ReactNode {
    if (isFunction(children)) {
        return resolveFragment(children(renderProps));
    }

    return resolveFragment(children);
}
