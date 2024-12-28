import { AuthContext } from "@/contexts/auth/auth-provider";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({
    children
}: {
    children: JSX.Element
}) {
    const { IsLogged } = useContext(AuthContext);

    if (!IsLogged) {
        return <Navigate to={'/'} />
    }

    return children;
}

export default ProtectedRoute;