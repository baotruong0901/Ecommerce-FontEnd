import React, { useEffect } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { NavLink } from 'react-router-dom';
import Input from '../component/Input';
import * as yup from 'yup'
import { useFormik } from 'formik'
import '../scss/forgotPassword.scss'
import { useDispatch } from 'react-redux';
import { forgotPasswordStart } from '../store/actions/userActions';


const forgotPassword = yup.object({
    email: yup.string().email("Email should be valid").required("Email address is required")
})
const ForgotPassword = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        document.title = 'E-commerce | mua hàng online'; // Thay đổi title của trang web
    }, []);
    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: forgotPassword,
        onSubmit: (values) => {
            dispatch(forgotPasswordStart(values))
        }
    })
    return (
        <div className='forgot-password'>
            <div className='header'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-12'>
                            <Breadcrumb className='container new-header d-flex justify-content-center mt-2 mb-3'>
                                <NavLink to="/" className="breadcrumb-item">Home</NavLink>
                                <Breadcrumb.Item active>Forgot Password</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </div>
            </div>
            <div className='main py-5'>
                <div className='container-xxl'>
                    <form onSubmit={formik.handleSubmit} className='col-3'>
                        <h4 className='mb-1'>Reset Your Password</h4>
                        <p>We will send you an email to reset your password</p>
                        <Input
                            placeholder="Enter Email"
                            name="email"
                            type="email"
                            // label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange("email")}
                            errorMessage={formik.errors.email}
                        />
                        <button type="submit" className='btn btn-submit'>Submit</button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default ForgotPassword;