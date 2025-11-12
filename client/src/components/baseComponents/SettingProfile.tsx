import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/app/store";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import React, { useEffect } from "react";
import { loadUserFromToken } from "../../redux/feature/auth/loginSlice";

const ProfileCard = React.memo(function ProfileCardComponent() {
  const { user } = useSelector((state: RootState) => state.loginAuth);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loadUserFromToken());
    }
  }, [dispatch]);
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-sidebar-accent/30 via-sidebar-accent/20 to-sidebar-accent/30 dark:bg-[#1a1a1a] hover:from-sidebar-accent/40 hover:to-sidebar-accent/40 dark:hover:bg-[#2a2a2a] transition-all duration-300">
      <Avatar className="h-12 w-12 ring-2 ring-primary/20">
        {user?.image ? (
          <AvatarImage
            src={`${import.meta.env.VITE_IMAGE_URL}/${user.image}`}
            alt={user.name}
          />
        ) : (
          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 dark:bg-[#1a1a1a] text-foreground dark:text-white font-semibold">
            {user?.name
              ?.split(" ")
              .map((n) => n[0])
              .join("") || "YU"}
          </AvatarFallback>
        )}
      </Avatar>
      <div>
        <h3 className="font-medium text-foreground dark:text-white">
          {user?.name || "Your Name"}
        </h3>
        <p className="text-sm text-muted-foreground dark:text-gray-300 flex items-center gap-1">
          <span className="w-2 h-2 bg-online-indicator rounded-full animate-pulse" />
          {user?.onlineStatus === "online" ? "Active now" : "Offline"}
        </p>
      </div>
    </div>
  );
});

export default ProfileCard;
