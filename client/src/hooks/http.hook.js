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
                //console.log(data.errors);

                const errors = {};
                data.errors.forEach(error => {
                    errors[error.param] = error.msg;
                })
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

    const clearError = () => setError(null);

    return {loading, error, request, clearError};
}