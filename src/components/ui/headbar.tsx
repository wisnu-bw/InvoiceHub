"use client";

import { useTheme } from "@/context/ThemeContext";
import {
  Badge,
  IconButton,
  Avatar,
  FormControlLabel,
  Switch,
} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { styled } from "@mui/material/styles";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 50,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(24px)",
      color: "#fff",
      "& .MuiSwitch-thumb:before": {
        content: '"🌙"',
      },
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#a0aec0",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#fff",
    width: 22,
    height: 22,
    "&:before": {
      content: '"☀️"', // Ikon Sun
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#bdbdbd",
  },
}));

export function Headbar() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const notificationsCount = "";
  const messagesCount = "";
  const profileImage = "https://mui.com/static/images/avatar/1.jpg";
  const userName = "John Doe";

  return (
    <div
      className={`w-full h-14 px-6 flex items-center ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } shadow-md`}
    >
      

      <div className="flex items-center space-x-4 ml-auto">
        {/* Toggle Dark Mode dengan Custom Switch */}
        <FormControlLabel
          control={
            <MaterialUISwitch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              inputProps={{ "aria-label": "Dark mode toggle" }}
            />
          }
          label=""
        />

        {/* Notifikasi */}
        <IconButton color="inherit">
          <Badge
            badgeContent={notificationsCount}
            sx={{
              "& .MuiBadge-badge": {
                transform: "scale(0.8)",
                backgroundColor: "#f87171",
                color: "white",
                minWidth: "18px",
                height: "18px",
              },
            }}
          >
            <NotificationsOutlinedIcon fontSize="medium" />
          </Badge>
        </IconButton>

        {/* Pesan */}
        <IconButton color="inherit">
          <Badge
            badgeContent={messagesCount}
            sx={{
              "& .MuiBadge-badge": {
                transform: "scale(0.8)",
                backgroundColor: "#60a5fa",
                color: "white",
                minWidth: "18px",
                height: "18px",
              },
            }}
          >
            <MailOutlineIcon fontSize="medium" />
          </Badge>
        </IconButton>

        {/* Nama & Avatar */}
        <div className="flex items-center space-x-2">
          <div className="flex flex-col">
            <span className="font-medium">{userName}</span>
            <p className="text-sm text-gray-500">Verified Member</p>
          </div>
          <Avatar
            src={profileImage}
            alt="User Profile"
            sx={{ width: 36, height: 36, cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
}
