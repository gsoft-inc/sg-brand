export interface CancellablePromise<T> {
    promise: Promise<T>;
    cancel(): void;
}

export interface CancellablePromiseError {
    isCancelled: boolean;
}

export function cancellablePromise<T>(promise: Promise<T>): CancellablePromise<T> {
    let isCancelled = false;

    const wrappedPromise = new Promise<T>((resolve, reject) => {
        promise.then(
            value => isCancelled ? reject(<CancellablePromiseError>{ isCancelled: true }) : resolve(value),
            error => isCancelled ? reject(<CancellablePromiseError>{ isCancelled: true }) : reject(error)
        );
    });

    return {
        promise: wrappedPromise,
        cancel() {
            isCancelled = true;
        }
    };
}

export function isCancellablePromiseError(error: unknown): error is CancellablePromiseError {
    return (error as CancellablePromiseError)?.isCancelled !== undefined;
}
