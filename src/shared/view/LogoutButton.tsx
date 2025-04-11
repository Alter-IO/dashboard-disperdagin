import { useNavigate } from "react-router";
import { useRemoveData } from "../usecases/useAuth";
import { Button } from "@/components/ui/button";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        useRemoveData();
        navigate("/login");
    };

    return (
        <Button onClick={handleLogout}>
            Keluar
        </Button>
    );
};

export default LogoutButton;
