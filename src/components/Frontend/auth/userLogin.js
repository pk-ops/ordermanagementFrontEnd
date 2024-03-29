import userEvent from '@testing-library/user-event';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommonContext from '../../../context/commonContext';
import { API } from '../../../global';


const Login = () => {

    let navigate = useNavigate();

    const {isLoggedIn, SetIsLoggedIn } = useContext(CommonContext);

    const [Input, setInput] = useState({
        email: '',
        password: '',


    });

    const handleInput = (e) => {

        setInput({ ...Input, [e.target.name]: e.target.value })
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: Input.email,
            password: Input.password,
        }
        // console.log(data.email, data.password)
        // const {fname,email,password}=data;
        // console.log(data)
        fetch(`${API}/users/login`, {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(data),
        }).then((res) => res.json())
            .then((data) => {
           
            console.log(data.role)
            if(data.role=='User')
                   {
                    alert("Login successful");
                    localStorage.setItem("x-auth-token",data.token)
                    localStorage.setItem("id", data.id);
                    localStorage.setItem("username", data.name);
                    SetIsLoggedIn(true)
                    navigate('/')
            }  else{
                alert(data.message);
            }
               
            })
    }


    return (
        <div>
           
            <div className='container py-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header row'>
                                <div className='col'>
                                    <h4 className='text-center'>User Login</h4>
                                </div>

                            </div>
                            <div className="card-body">
                                <form onSubmit={registerSubmit}>
                                    <div className='form-group mb-3'>
                                        <label>Email Id</label>
                                        <input
                                            type="text"
                                            name="email"
                                            onChange={handleInput}
                                            value={Input.email}
                                            className='form-control' />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Password</label>
                                        <input
                                            type=""
                                            name="password"
                                            onChange={handleInput}
                                            value={Input.password}
                                            className='form-control'
                                        />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <button type='submit' className='btn btn-primary'>Login</button>

                                    </div>

                                    <div className='card-footer row'>
                                        <div className='col'>
                                            <p className='signUp text-first'>
                                                <Link to="/Adminnn" className='text-decoration-none'>Admin Login</Link>
                                            </p>
                                        </div>
                                        <div className='col'>
                                            <p className='signUp text-end'>
                                                <Link to="/register"> Sign Up</Link>
                                            </p>
                                        </div>
                                    </div>

                                </form>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;