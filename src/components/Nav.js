import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const drawerWidth = 180;
const styles = () => ({
  root: {
    // display: "flex"
  },
  appBar: {},
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",

    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: "3%",

    marginLeft: -drawerWidth
  },
  contentShift: {
    marginLeft: 0
  }
});

class Nav extends Component {
  state = {
    open: false
  };
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  renderList = () => {
    return ["Home", "Category", "Vegetables"].map((text, index) => {
      let newText = text.toLowerCase();

      return (
        <Link key={text} to={newText === "home" ? "/" : `/${newText}`}>
          <ListItem button key={text}>
            <Avatar>
              {text === "Home" && <Icon> home </Icon>}
              {text === "Vegetables" && <Icon>list</Icon>}
              {text === "Category" && <Icon> category </Icon>}
            </Avatar>
            <ListItemText primary={text} />
          </ListItem>
        </Link>
      );
    });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="static"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" />
          </Toolbar>
          {/* <SubNav /> */}
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>{this.renderList()}</List>
          <Divider />

          {/* {Setting and About Icon} */}

          <ListItem button>
            <Avatar>
              <Icon>device_unknown</Icon>
            </Avatar>
            <ListItemText primary="About" />
          </ListItem>
        </Drawer>
      </div>
    );
  }
}
Nav.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Nav);
