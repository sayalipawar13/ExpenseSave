import React,{useContext, useState} from "react";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ViewListIcon from "@material-ui/icons/ViewList";
import LightIcon from "@material-ui/icons/Brightness4";
import DarkIcon from "@material-ui/icons/Brightness7";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "../../styles/sidebar.scss";
import Dashboard from "./Dashboard";
import Login from "./Login";
import {GlobalContext} from '../../context/GlobalState';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    // [theme.breakpoints.up("sm")]: {
    //   width: `calc(100% - ${drawerWidth}px)`,
    //   marginLeft: drawerWidth,
    // },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Sidebar(props) {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const {logout}=useContext(GlobalContext);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }
  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };
  props.darkMode(darkMode);

  const drawerListItems = (
    <List>
      <Link to="/">
        <ListItem>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
      <Link to="/viewExpense">
        <ListItem>
          <ListItemIcon>
            <ViewListIcon />
          </ListItemIcon>
          <ListItemText primary="View Expense" />
        </ListItem>
      </Link>
      <ListItem className="buttonS" onClick={handleThemeChange}>
        <ListItemIcon>{darkMode ? <DarkIcon /> : <LightIcon />}</ListItemIcon>
        <ListItemText>{darkMode ? "Light Mode" : "Dark Mode"}</ListItemText>
      </ListItem>
      <Link to="/">
        <ListItem onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Link>
    </List>
  );
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar} color="secondary">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap>
            ExpenseSave
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClick={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawerListItems}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <Toolbar />

            {drawerListItems}
          </Drawer>
        </Hidden>
      </nav>
      {/* <main className={classes.content}>
        <div className={classes.toolbar} />
        <Dashboard />
      </main> */}
    </div>
  );
}

export default Sidebar;
