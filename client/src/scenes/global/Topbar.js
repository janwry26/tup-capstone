import { Box, IconButton, useTheme, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const userProfile = {
    username: "john_doe",
    name: "John Doe",
    email: "johndoe@example.com",
    contact: "1234567890",
    role: "User",
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };

  const handleViewProfile = () => {
    setIsProfileDialogOpen(true);
    handleMenuClose();
  };

  const handleCloseProfileDialog = () => {
    setIsProfileDialogOpen(false);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleMenuOpen}>
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>

      {/* PROFILE DIALOG */}
      <Dialog open={isProfileDialogOpen} onClose={handleCloseProfileDialog}>
        <DialogTitle>Profile</DialogTitle>
        <DialogContent>
          <Box>
            <Typography variant="subtitle1">Username:</Typography>
            <TextField
              value={userProfile.username}
              fullWidth
              variant="outlined"
              disabled
            />
          </Box>
          <Box>
            <Typography variant="subtitle1">Name:</Typography>
            <TextField
              value={userProfile.name}
              fullWidth
              variant="outlined"
              disabled
            />
          </Box>
          <Box>
            <Typography variant="subtitle1">Email:</Typography>
            <TextField
              value={userProfile.email}
              fullWidth
              variant="outlined"
              disabled
            />
          </Box>
          <Box>
            <Typography variant="subtitle1">Contact:</Typography>
            <TextField
              value={userProfile.contact}
              fullWidth
              variant="outlined"
              disabled
            />
          </Box>
          <Box>
            <Typography variant="subtitle1">Role:</Typography>
            <TextField
              value={userProfile.role}
              fullWidth
              variant="outlined"
              disabled
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="warning" onClick={handleCloseProfileDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Topbar;
