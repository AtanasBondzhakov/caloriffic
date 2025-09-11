import { useEffect, useState } from "react";

export const useDelayedSpinner = (loading, delay) => {
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        let timeout;

        if (loading) {
            timeout = setTimeout(() => {
                setShowSpinner(true)
            }, delay)

        } else {
            setShowSpinner(false);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [loading, showSpinner, delay]);

    return showSpinner;
};