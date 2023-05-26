import React, { useState } from 'react';
import Input from '../component/Input';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { register } from '../service/homeService';
import "../scss/register.scss"
import { useDispatch } from 'react-redux';
import { login } from '../store/actions/userActions';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { setCart } from '../store/actions/productActions';

const Register = () => {

    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        mobile: "",
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(async () => {
            let res = await register(values)
            if (res && res.success === true) {
                setIsLoading(false)
                setValues({
                    firstname: "",
                    lastname: "",
                    mobile: "",
                    email: "",
                    password: ""
                })
                navigate('/login')
                toast.success(res.msg)
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
        <div className='register pb-5'>
            <div className='container-xxl'>
                <div className='row'>
                    <div className='col-12'>
                        <Breadcrumb className='container new-header d-flex justify-content-center mt-2 mb-3'>
                            <NavLink to="/" className="breadcrumb-item">Home</NavLink>
                            <Breadcrumb.Item active>Register</Breadcrumb.Item>
                        </Breadcrumb>
                        <form className='col-3'>
                            <h4 className='mb-2'>Register</h4>
                            <Input
                                placeholder="Enter FirstName"
                                name="firstname"
                                type="text"
                                label="First Name"
                                value={values.firstname}
                                onChange={onChange}
                                errorMessage="Please enter your first name!"
                            />
                            <Input
                                placeholder="Enter LastName"
                                name="lastname"
                                type="text"
                                label="Last Name"
                                value={values.lastname}
                                onChange={onChange}
                                errorMessage="Please enter your last name!"
                            />

                            <Input
                                placeholder="Enter Mobile"
                                name="mobile"
                                type="text"
                                label="Mobile"
                                value={values.mobile}
                                onChange={onChange}
                                pattern="^[0-9]{10}$"
                                errorMessage="Please enter the correct phone number"
                            />
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
                            <button className='mt-2' disabled={isLoading} onClick={(e) => handleSubmit(e)} type='submit'>
                                {isLoading === true && <AiOutlineLoading3Quarters className='loading-icon' />}
                                Register
                            </button>
                            <div className='bottom'>
                                <span>Do you already have an account?</span>
                                <Link to="/login" >Login?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;