import { toast } from "sonner";
import { useState } from "react";

const useFetch = (cb) => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(false); // Changed from null to false
    const [error, setError] = useState(null);

    const fn = async (...args) => {
        setLoading(true);
        setError(null);

        try {
            console.log("useFetch: Calling server action with args:", args); // DEBUG
            const response = await cb(...args);
            console.log("useFetch: Server response:", response); // DEBUG
            
            setData(response);
            setError(null);
        } catch (error) {
            console.error("useFetch: Error caught:", error); // DEBUG
            setError(error);
            toast.error(error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fn, setData };
};

export default useFetch;