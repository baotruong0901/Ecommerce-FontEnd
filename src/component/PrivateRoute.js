import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom";
const PrivateRoute = (props) => {

    const isLogin = useSelector(state => state.user.isLogin)
    const navigate = useNavigate()
    useEffect(() => {
        if (!isLogin) {
            // Lưu trữ đường dẫn hiện tại trong returnUrl
            const returnUrl = window.location.pathname + window.location.search;
            console.log(returnUrl);
            navigate('/login', { state: { returnUrl } })
        }
    }, [isLogin, navigate])

    return (
        <>
            {props.children}
        </>
    )
}
export default PrivateRoute