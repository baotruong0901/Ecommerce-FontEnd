import React, { useState, useEffect } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Input from '../component/Input';
import * as yup from 'yup'
import { useFormik } from 'formik'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import '../scss/resetPassword.scss'
import { useDispatch } from 'react-redux';
import { resetPasswordStart } from '../store/actions/userActions';



const forgotPassword = yup.object({
    password: yup.string().required("Password is required")
})
const ResetPassword = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const token = location.pathname.split("/")[2]
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'E-commerce | mua hàng online'; // Thay đổi title của trang web
    }, []);

    const formik = useFormik({
        initialValues: {
            password: ""
        },
        validationSchema: forgotPassword,
        onSubmit: (values) => {
            dispatch(resetPasswordStart(values, token))
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
                navigate('/login')
            }, 2000)
        }
    })
    return (
        <div className='reset-password'>
            <div className='header'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-12'>
                            <Breadcrumb className='container new-header d-flex justify-content-center mt-2 mb-3'>
                                <NavLink to="/" className="breadcrumb-item">Home</NavLink>
                                <NavLink to="/forgot-password" className="breadcrumb-item">Forgot Password</NavLink>
                                <Breadcrumb.Item active>Reset Password</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </div>
            </div>
            <div className='main py-5'>
                <div className='container-xxl'>
                    <form onSubmit={formik.handleSubmit} className='col-3'>
                        <h4 className='mb-1'>Confirm New Password</h4>
                        <Input
                            placeholder="New Password"
                            name="password"
                            type="password"
                            // label="Email"
                            value={formik.values.password}
                            onChange={formik.handleChange("password")}
                            errorMessage={formik.errors.password}
                        />
                        <button type="submit" disabled={isLoading} className='btn btn-submit'>
                            {isLoading === true && <AiOutlineLoading3Quarters className='loading-icon' />}
                            Submit
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default ResetPassword;