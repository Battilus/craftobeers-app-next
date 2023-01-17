import {useEffect, useState} from "react";
import {useDebounce} from "@/features/hooks/useDebounce";

export function useDebouncedInput<T> (initialValue: T): [value: T, setValue: (val: T) => void, debouncedValue: T] {
    const [value, setValue] = useState<T>(initialValue);
    const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

    const updateValue = useDebounce((val: T) => setDebouncedValue(val), 300);

    useEffect(() => {
        if (value !== debouncedValue) updateValue.bounce(value);
    }, [value]);

    return [value, setValue, debouncedValue];
}