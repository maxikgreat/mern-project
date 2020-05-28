import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (
        url, 
        method = 'GET',
        body = null, 
        headers = {}
    ) => {
        setLoading(true);
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(url, {
                method, body, headers
            });
            const data = await response.json();

            if (!response.ok) {
                const errors = {};
                if (data.errors) {
                    data.errors.forEach(error => {
                        errors[error.param] = error.msg;
                    })
                }
                errors.message = data.message;
                throw errors || 'Something went wrong'; // error thrown in catch
            }
            setLoading(false);

            return data;

        } catch (e) {
            setLoading(false);
            setError(e);
            throw e;
        }
    }, []);

    const clearError = () => setTimeout(() => setError(null), 3000);

    return {loading, error, request, clearError};
}