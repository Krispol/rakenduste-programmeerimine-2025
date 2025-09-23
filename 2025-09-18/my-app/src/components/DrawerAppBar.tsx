import * as React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, Outlet } from "react-router-dom";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;

// Use paths that match your router
const navItems = [
  { label: "Home", to: "/" },
  { label: "Contact", to: "/contact" },
  { label: "About", to: "/about" },
  { label: "MUI Button", to: "/hellobtn" },
];

// Top bar nav button that highlights when active
function NavTopButton({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {({ isActive }) => (
        <Button
          sx={{
            color: "#fff",
            fontWeight: isActive ? 700 : 400,
            textTransform: "none",
          }}
        >
          {label}
        </Button>
      )}
    </NavLink>
  );
}

// Drawer list item that highlights when active
function NavDrawerItem({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      style={{ textDecoration: "none", color: "inherit", width: "100%" }}
      onClick={onClick}
    >
      {({ isActive }) => (
        <ListItem disablePadding>
          <ListItemButton
            selected={isActive}
            sx={isActive ? { bgcolor: "action.selected" } : undefined}
          >
            <ListItemText primary={label} />
          </ListItemButton>
        </ListItem>
      )}
    </NavLink>
  );
}

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const drawer = (
    <Box
      sx={{
        textAlign: "center",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ mx: "auto" }}>
          My App
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <NavDrawerItem
            key={item.to}
            to={item.to}
            label={item.label}
            onClick={() => setMobileOpen(false)} // close temporary drawer on select
          />
        ))}
      </List>
      <Divider />
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top App Bar */}
      <AppBar
        component="nav"
        position="fixed"
        sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {/* Hamburger on mobile */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            My App
          </Typography>

          {/* Top links on ≥ sm */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <NavTopButton key={item.to} to={item.to} label={item.label} />
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Left navigation (temporary on mobile, permanent hidden here for simplicity) */}
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      {/* Main content area */}
      <Box component="main" sx={{ p: 3, width: "100%" }}>
        {/* Offset for the fixed AppBar */}
        <Toolbar />
        {/* Render routed pages here */}
        <Container maxWidth="md">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
