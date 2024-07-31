import { useState, useEffect } from 'react';

interface InitialHookStatus {
    loading: boolean;
    error: boolean;
}

export const useInitial = (): InitialHookStatus => {
    const [status, setStatus] = useState<InitialHookStatus>({ loading: false, error: false });

    useEffect(() => {
        const initialize = async () => {
            setStatus({ loading: true, error: false });

            try {
                // Simulate async task
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setStatus({ loading: false, error: false });
            } catch (error) {
                setStatus({ loading: false, error: true });
            }
        };

        initialize(); // Call the async function but don't return the promise directly
    }, []);

    return status;
};
