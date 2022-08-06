
import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
  } from "@material-ui/core";
  import React from "react";
  import { Link as RouterLink } from "react-router-dom";
           
  const headersData = [
    {
      label: "My Properties",
      href: "/myProperties",
    },{
      label: "Log In Buyer",
      href: "/login/buyer",
    },
    {
      label: "Log In Seller",
      href: "/login/seller",
    },
    {
      label: "Log In GovtOfficer",
      href: "/login/govtOfficer",
    }
  ];

  const useStyles = makeStyles(() => ({
    header: {
        backgroundColor: "#400CCC",
        paddingRight: "79px",
        paddingLeft: "118px",
      },
      logo: {
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
        color: "#FFFEFE",
        textAlign: "left",
      },
      menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
     },
     toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
  }));
                       
  export default function Header() {
    const { header, logo, menuButton, toolbar } = useStyles();

    const displayDesktop = () => {
      return (
        <Toolbar className={toolbar}>
          {naalabaaLogo}
          <div>
            {getMenuButtons()}
          </div>
        </Toolbar>
      );
    };
                       
    const naalabaaLogo = (
      <a href="/" style={{ textDecorationLine: 'none' }}>
        <Typography variant="h6" component="h1" className={logo}>
          Naalabaa
        </Typography>
      </a>
    );
                       
    const getMenuButtons = () => {
      return headersData.map(({ label, href }) => {
        return (
          <Button
            {...{
              key: label,
              color: "inherit",
              to: href,
              component: RouterLink,
              className: menuButton,
            }}
          >
            {label}
          </Button>
        );
      });
    };
                       
    return (
      <header>
        <AppBar className={header}>{displayDesktop()}</AppBar>
      </header>
    );
  }
  