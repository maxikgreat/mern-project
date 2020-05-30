import React, {useState, useEffect, useContext} from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export const Auth = () => {
    const auth = useContext(AuthContext);
    const {loading, error, request, clearError} = useHttp();
    const message = useMessage();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        message(error?.message);
        clearError();
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
        } catch (e) {}
    };

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Short your link</h1>
                <div className="card">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input 
                                    placeholder="Enter email..." 
                                    id="email" 
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                                {
                                    error?.email
                                    ? <span className="helper-text red-text text-lighten-1">{error.email}</span>
                                    : null
                                }
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Enter password..." 
                                    id="password" 
                                    type="password" 
                                    name="password"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                                {
                                    error?.password
                                    ? <span className="helper-text red-text text-lighten-1">{error.password}</span>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn yellow darken-4" 
                            style={{marginRight: '10px'}}
                            disabled={loading}
                            onClick={loginHandler}
                        >Log in</button>
                        <button 
                            className="btn grey lighten-1 black-text"
                            disabled={loading}
                            onClick={registerHandler}
                        >Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};