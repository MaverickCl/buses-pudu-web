import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Container from "@mui/material/Container";

import { Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const pages = [
  { title: "Gestiona tus pasajes", link: "/gestion-tickets" },
  // { title: "Encuéntranos", link: "" },
  { title: "Pudú Points", link: "/pudu-points" },
];
const settings = [
  { title: "Perfil", link: "/perfil" },
  // { title: "Cuenta", link: "" },
  // { title: "Dashboard", link: "" },
  { title: "Salir", link: "" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [authMenuAnchorEl, setAuthMenuAnchorEl] = React.useState(null);
  const [isAuthMenuOpen, setIsAuthMenuOpen] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    // add login handler
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // add logout handler
    setIsLoggedIn(false);
    handleCloseUserMenu(); // close user menu after logout
  };

  const handleOpenAuthMenu = (event) => {
    setAuthMenuAnchorEl(event.currentTarget);
    setIsAuthMenuOpen(true);
  };

  const handleCloseAuthMenu = () => {
    setAuthMenuAnchorEl(null);
    setIsAuthMenuOpen(false);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <img src="logoBlack.png" style={{ width: "3rem" }} />
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.link} onClick={handleCloseNavMenu}>
                  <Link to={page.link}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link to={page.link}>
                <Button
                  key={page.link}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn ? (
              <Tooltip title="Cuenta">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Profile Picture"
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <IconButton onClick={handleOpenAuthMenu} sx={{ p: 0 }}>
                <AccountCircleIcon />
              </IconButton>
            )}
            <Menu
              id="auth-menu"
              anchorEl={authMenuAnchorEl}
              open={isAuthMenuOpen}
              onClose={handleCloseAuthMenu}
            >
              <MenuItem
                onClick={handleCloseAuthMenu}
                component={Link}
                to="/auth/login"
              >
                Ingresar
              </MenuItem>
              <MenuItem
                onClick={handleCloseAuthMenu}
                component={Link}
                to="/registro"
              >
                Registrarse
              </MenuItem>
            </Menu>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.link} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
