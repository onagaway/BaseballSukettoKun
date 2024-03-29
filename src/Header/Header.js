import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { withRouter } from "react-router-dom";

import styles from "./styles";
import LoginDialog from "../LoginDialog/LoginDialog";

import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import HomeIcon from "@material-ui/icons/Home";
import ForumIcon from "@material-ui/icons/Forum";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import SportsHandballIcon from "@material-ui/icons/SportsHandball";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      setOpen: false,
      setLoginOpen: false,
      error: "",
      user: { userId: "", nickname: "" }
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };
  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleClickLogionOpen = () => {
    this.setState({ setLoginOpen: true });
  };
  handleClickLoginClose = () => {
    this.setState({ setLoginOpen: false });
  };

  handleDobleFunc = () => {
    this.props.handleChangeLogin();
    this.handleDrawerClose();
  };

  // 本当はログイン情報をpostで送り、返り値でログインを判断する
  handlePostLogin = () => {
    axios
      .get("https://jsondata.okiba.me/v1/json/HAgiv190921195253")
      .then(res => {
        if (res.data.userId !== null) {
          this.props.handleChangeLogin();
          this.setState({
            setLoginOpen: false,
            user: { userId: res.data.userId, nickname: res.data.nickname }
          });
        }
      })
      .catch(err => {
        console.log("error");
      });
  };

  hundleToHome = () => {
    this.props.history.push("/");
    this.setState({ open: false });
  };

  // 新規ユーザー登録を押下した際の処理
  hundleJumpToRegistryUser = () => {
    this.props.history.push("/regist");
    this.setState({ open: false });
  };

  // ユーザー情報登録用、実際はログイン時のuser_idをpropsで渡す
  hundleJumpToRegistryUserInfo = () => {
    this.props.history.push("/registInfo");
    this.setState({ open: false });
  };

  hundleJumpToSkillRegist = () => {
    this.props.history.push("/skillRegist");
    this.setState({ open: false });
  };

  // サイドバーのログインpop
  hundleLoginSidebar = () => {
    this.setState({ open: false });
    this.setState({ setLoginOpen: true });
  };

  render() {
    const { classes, theme } = this.props;
    const loginPop = (
      <>
        <LoginDialog
          open={this.state.setLoginOpen}
          close={this.handleClickLoginClose}
          handlePostLogin={this.handlePostLogin}
        />
      </>
    );
    const loginButtons = (
      <>
        <Button
          variant="outlined"
          color="inherit"
          className={classes.button}
          onClick={() => this.handleClickLogionOpen()}
        >
          ログイン
        </Button>
        {loginPop}
      </>
    );
    const welcomeUser = (
      <>
        <span className={classes.welcomeName}>
          ようこそ {this.state.user.nickname} さん
        </span>
      </>
    );
    const logout = (
      <>
        <List>
          <ListItem button onClick={() => this.handleDobleFunc()}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="ログアウト" className="logout" />
          </ListItem>
        </List>
      </>
    );
    const signin = (
      <>
        <List>
          <ListItem button onClick={() => this.hundleJumpToRegistryUser()}>
            <ListItemIcon>
              <FiberNewIcon />
            </ListItemIcon>
            <ListItemText primary="新規登録" className="logout" />
          </ListItem>
          <ListItem button onClick={() => this.hundleLoginSidebar()}>
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText primary="ログイン" className="logout" />
          </ListItem>
        </List>
      </>
    );
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(
                classes.menuButton,
                this.state.open && classes.hide
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              ベースボール助っ人くん
            </Typography>
            {!this.props.isLogin ? loginButtons : welcomeUser}
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="temporary"
          anchor="left"
          open={this.state.open}
          onClose={this.handleDrawerClose}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <span className={classes.NotificationTxt}>
              {" "}
              通知が何件あります{" "}
            </span>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button onClick={() => this.hundleToHome()}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="ホーム" />
            </ListItem>
            <ListItem button onClick={() => console.log("chat")}>
              <ListItemIcon>
                <ForumIcon />
              </ListItemIcon>
              <ListItemText primary="チャット" />
            </ListItem>
            <ListItem
              button
              onClick={() => this.hundleJumpToRegistryUserInfo()}
            >
              <ListItemIcon>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="情報登録" />
            </ListItem>
            <ListItem button onClick={() => this.hundleJumpToSkillRegist()}>
              <ListItemIcon>
                <SportsHandballIcon />
              </ListItemIcon>
              <ListItemText primary="スキル情報登録" />
            </ListItem>
          </List>
          <Divider />
          {this.props.isLogin ? logout : signin}
        </Drawer>
        <main />
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Header));
