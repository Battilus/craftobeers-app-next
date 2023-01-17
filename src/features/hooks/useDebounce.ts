import {useCallback, useRef} from "react";

export const useDebounce = (callback: (...args: any) => void, delay: number) => {
    const timer = useRef<NodeJS.Timeout | null>(null);

    return {
        bounce: useCallback((...args: any) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => {
                callback(...args);
            }, delay);
        }, [callback, delay]),
        cancel: () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        },
    };
};