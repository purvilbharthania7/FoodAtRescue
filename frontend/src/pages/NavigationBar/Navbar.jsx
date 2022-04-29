import React, { useContext } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from "@mui/material";
import { AppContext } from "../../context/userContext";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import { ROUTES } from "../../common/constants";
import Settings from "./components/Settings";

const Navbar = () => {
  const {
    state: { authenticated, currentUser, role },
  } = useContext(AppContext);
  let navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  return (
    <AppBar position="static" style={{ background: "#ffffff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box noWrap sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
            <img
              onClick={(event) => navigate(ROUTES.HOMEPAGE)}
              height={44}
              width={104}
              src={Logo}
              alt="logo"
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="default"
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
                display: { xs: "block", md: "none", color: "black" },
              }}
            >
              {role == "food_owner" ? (
                <>
                  {/* my posting */}
                  <MenuItem onClick={() => navigate(ROUTES.VIEW_MY_POSTING)}>
                    <Typography textAlign="center">View My Posting</Typography>
                  </MenuItem>
                  {/* my resrvation */}
                  <MenuItem onClick={() => navigate(ROUTES.VIEW_RESERVATION)}>
                    <Typography textAlign="center">View Reservation</Typography>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => navigate(ROUTES.FOOD_LISTING)}>
                    <Typography textAlign="center">
                      View Availabe Food
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={() => navigate(ROUTES.RESERVED_FOOD)}>
                    <Typography textAlign="center">
                      Your Reserved Food
                    </Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
          <Box noWrap sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <img height={40} width={80} src={Logo} alt="logo" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {role == "food_owner" ? (
              <>
                {/* my posting */}
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  //onClick={handleClick}
                  onClick={() => navigate(ROUTES.VIEW_MY_POSTING)}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  View My Posting
                </Button>
                {/* my resrvation */}
                <Button
                  onClick={() => navigate(ROUTES.VIEW_RESERVATION)}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  View Reservation
                </Button>
              </>
            ) : (
              <>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  //onClick={handleClick}
                  onClick={() => navigate(ROUTES.FOOD_LISTING)}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  View Availabe Food
                </Button>
                <Button
                  onClick={() => navigate(ROUTES.RESERVED_FOOD)}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  Your Reserved Food
                </Button>
              </>
            )}
          </Box>
          <Box
            display="flex"
            justifyContent="space-evenly"
            alignItems="right"
            // width={225}
            sx={{ flexGrow: 0 }}
          >
            {role == "food_owner" ? (
              /* post ad */
              <Button
                variant="contained"
                sx={{
                  marginRight: 2,
                  backgroundColor: "primary.main",
                  alignItems: "right",
                  display: { xs: "none", md: "flex" },
                }}
                onClick={() => navigate(ROUTES.POST_FOOD)}
              >
                Post Food
              </Button>
            ) : (
              <></>
            )}
            {authenticated ? (
              <Settings />
            ) : (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "primary.main",
                  display: { md: "flex" },
                }}
                onClick={() => navigate(ROUTES.LOGIN)}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
