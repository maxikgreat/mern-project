import React, {useState} from 'react';

export const Auth = () => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const changeHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Short link</h1>
                <div className="card">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input 
                                    placeholder="Enter email..." 
                                    id="email" 
                                    type="text"
                                    name="email"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Enter password..." 
                                    id="password" 
                                    type="text" 
                                    name="password"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4" style={{marginRight: '10px'}}>Log in</button>
                        <button className="btn grey lighten-1 black-text">Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};