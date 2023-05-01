import React, { useState, useEffect } from 'react';
import Input from '../component/Input';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LoginApi, getProductCart } from '../service/homeService';
import "../scss/Login.scss"
import { useDispatch } from 'react-redux';
import { login } from '../store/actions/userActions';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { setCart } from '../store/actions/productActions';

const Login = () => {
    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()
    const navidate = useNavigate()

    const fetchCart = async () => {
        let res = await getProductCart()
        dispatch(setCart(res?.data))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(async () => {
            let res = await LoginApi(values)
            if (res && res.success === true) {
                dispatch(login(res))
                setIsLoading(false)
                fetchCart()
                toast.success(res.msg)
                navidate('/')
            } else {
                toast.error(res.msg)
                setIsLoading(false)
            }
        }, 2000)

    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    return (
        <div className='login pb-5'>
            <div className='container-xxl'>
                <div className='row'>
                    <div className='col-12'>
                        <Breadcrumb className='container new-header d-flex justify-content-center mt-2 mb-3'>
                            <NavLink to="/" className="breadcrumb-item">Home</NavLink>
                            <Breadcrumb.Item active>Login</Breadcrumb.Item>
                        </Breadcrumb>
                        <form className='col-3'>
                            <h4 className='mb-2'>Login</h4>
                            <Input
                                placeholder="Enter Email"
                                name="email"
                                type="email"
                                label="Email"
                                value={values.email}
                                onChange={onChange}
                                errorMessage="It should be a valid email address!"
                            />
                            <Input
                                placeholder="Enter Password"
                                name="password"
                                type="password"
                                label="Password" value={values.password}
                                onChange={onChange}
                                pattern="^[A-Za-z0-9]{6,20}$"
                                errorMessage="Password should be 6-20 characters!"
                            />
                            <Link className='forgot' to="/forgot-password" >Forgot Password?</Link>
                            <button disabled={isLoading} onClick={(e) => handleSubmit(e)} type='submit'>
                                {isLoading === true && <AiOutlineLoading3Quarters className='loading-icon' />}
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;