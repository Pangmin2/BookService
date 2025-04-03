import { Navigate, useLocation } from 'react-router-dom';
import useUserStore from '../../../store/useUserStore';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const isLogined = useUserStore((state) => state.isLogined);
    const role = useUserStore((state) => state.role);
    const location = useLocation();

    if (!isLogined) {
        // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 특정 역할에 대한 접근 제어
    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        // 권한이 없는 경우 메인 페이지로 리다이렉트
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute; 