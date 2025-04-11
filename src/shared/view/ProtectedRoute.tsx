import { Navigate } from "react-router";
import { useGetUser } from "../usecases/useAuth";

interface ProtectedRouteProps {
    allowedRoles: string[];
    children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
    const user = useGetUser();

    if (!user) return <Navigate to="/login" />;
    if (!allowedRoles.includes(user.role_id)) return <Navigate to="/unauthorized" />;

    return <>{children}</>;
};

export default ProtectedRoute;
