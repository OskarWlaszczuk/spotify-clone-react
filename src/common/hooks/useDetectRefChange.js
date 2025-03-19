import { useEffect, useRef } from "react";

export const useDetectRefChange = (value) => {
    const previousRef = useRef(value);

    useEffect(() => {
        if (previousRef.current !== value) {
            console.log("seee");
        }
        previousRef.current = value;
    }, [value]);
};