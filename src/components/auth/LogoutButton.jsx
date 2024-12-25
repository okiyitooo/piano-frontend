import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../common/Button";

const LogoutButton = () => {
    const {logout} = useAuth();
    const handleLogout = async(e) => {
        e.preventDefault();
        try {
            await logout();
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <Button onClick={handleLogout}>Logout</Button>
    )
}
export default LogoutButton;