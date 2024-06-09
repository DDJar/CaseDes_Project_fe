import { useState , useEffect} from "react";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import { alpha } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import { account } from "../../../_mock/account";
import { logout } from "../../../service/loginService";
import Cookies from "js-cookie";
import { getUserById } from "../../../service/UserService";
import { NavLink } from "react-router-dom";
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Home",
    urlTo:"/",
    icon: "eva:home-fill",
  },
  {
    label: "Profile",
    urlTo:"/user",
    icon: "eva:person-fill",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const [userInfor, setuserInfor] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const userIdCookie = Cookies.get("userId");
    if (userIdCookie) {
      const userId = JSON.parse(userIdCookie);
      const userData = await getUserById(userId);
      setuserInfor(userData);
    }
  };
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={`https://case-shop-be.onrender.com/imageUpload/${userInfor.imgAvt}`}
          alt="User Avatar"
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {account.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {userInfor.firstName + " " + userInfor.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {userInfor.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            <NavLink to={option.urlTo}>
            {option.label}
            </NavLink>
         
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: "dashed", m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleClose}
          sx={{ typography: "body2", color: "error.main", py: 1.5 }}
        >
          <button onClick={handleLogout}>Logout</button>
        </MenuItem>
      </Popover>
    </>
  );
}
