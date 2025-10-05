// LogoutButton.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { logoutUser } from "../../redux/feature/auth/loginSlice";
import type { AppDispatch } from "../../redux/app/store";
import { useNavigate } from "react-router-dom";
const LogoutButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <Button
      variant="ghost"
      className="w-full justify-start gap-3 h-12 text-destructive hover:text-destructive hover:bg-gradient-to-r hover:from-destructive/10 hover:to-destructive/5 dark:hover:bg-[#2a1a1a] transition-all duration-200"
      onClick={handleLogout}
    >
      <LogOut className="h-5 w-5" />
      Sign Out
    </Button>
  );
};

export default LogoutButton;
