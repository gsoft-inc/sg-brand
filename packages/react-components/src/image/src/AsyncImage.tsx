import { AbstractImageProps, Image as OrbitImage } from "./Image";
import { ComponentProps, ReactElement, ReactNode, forwardRef, useCallback, useEffect, useState } from "react";
import { HtmlElements } from "../../html";
import { OmitInternalProps, isNil, mergeProps, slot, useRefState } from "../../shared";

const DefaultElement = "img";

export interface InnerAsyncImageProps extends AbstractImageProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * The number of milliseconds to delay the rendering of the fallback.
     */
    delay?: number;
    /**
     * The allowed number of retry to load the async image.
     */
    retryCount?: number;
}

function InnerAsyncImage({
    as = HtmlElements[DefaultElement],
    children,
    delay = 250,
    forwardedRef,
    retryCount = 5,
    src,
    ...rest
}: InnerAsyncImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [failureCount, setFailureCount] = useState(0);

    const [imageRef, setImage] = useRefState<HTMLImageElement>();

    const [canRender, setCanRender] = useState(false);
    const [canRenderTimeoutIdRef, setCanRenderTimeoutId] = useRefState<ReturnType<typeof setTimeout>>();

    if (retryCount < 1) {
        throw new Error("An async image retry count must be equal or greater to 1.");
    }

    const disposeImage = useCallback(() => {
        const image = imageRef.current;

        if (!isNil(image)) {
            image.onload = null;
            image.onerror = null;

            setImage(null);
        }
    }, [imageRef, setImage]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCanRender(true);
        }, delay);

        setCanRenderTimeoutId(timeoutId);
    }, [delay, setCanRenderTimeoutId]);

    // Reset when the image "src" change.
    useEffect(() => {
        setIsLoaded(false);
        setFailureCount(0);
    }, [src]);

    useEffect(() => {
        if (!isLoaded && failureCount < retryCount) {
            const image = new Image();
            image.src = src;

            image.onload = () => {
                disposeImage();
                setIsLoaded(true);

                if (!isNil(canRenderTimeoutIdRef.current)) {
                    clearTimeout(canRenderTimeoutIdRef.current);
                }
            };

            image.onerror = () => {
                disposeImage();
                setFailureCount(failureCount + 1);
            };

            setImage(image);

            return () => {
                disposeImage();
            };
        }
    }, [src, retryCount, isLoaded, failureCount, setImage, disposeImage, canRenderTimeoutIdRef]);

    if (!canRender && !isLoaded) {
        return null;
    }

    if (isLoaded) {
        return (
            <OrbitImage
                {...mergeProps(
                    rest,
                    {
                        as,
                        ref: forwardedRef,
                        src
                    }
                )}
            />
        );
    }

    return children as ReactElement;
}

export const AsyncImage = slot("image", forwardRef<any, OmitInternalProps<InnerAsyncImageProps>>((props, ref) => (
    <InnerAsyncImage {...props} forwardedRef={ref} />
)));

export type AsyncImageProps = ComponentProps<typeof AsyncImage>;
