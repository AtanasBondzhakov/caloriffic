import { useEffect, useRef } from "react";

export const usePreviousValue = (value) => {
    const ref = useRef(null);

    useEffect(() => {
        if (value !== null && value !== undefined) {
            ref.current = value;
        }
    }, [value]);

    return ref.current;
}