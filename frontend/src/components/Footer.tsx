import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Theme, useStyles } from "bold-ui";

function Footer() {
  const { classes } = useStyles(createStyles);

  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.links}>
          <a href="https://github.com/CaioPinho9">GitHub</a>
          <a href="mailto:caiopinho9@gmail.com">Email</a>
          <a href="https://www.linkedin.com/in/caio-b-pinho/">LinkedIn</a>
        </div>
        <div className={classes.logo}>
          <img src={require("../images/bridge_logo.png")} alt="Bridge Logo" />
          <p>WebDev Challenge</p>
        </div>
      </div>
    </footer>
  );
}

const createStyles = (theme: Theme) => ({
  footer: {
    backgroundColor: theme.pallete.surface.background,
    color: theme.pallete.text.main,
    textAlign: "center",
    padding: "5px",
    position: "absolute",
    bottom: "0",
    width: "100%",
    zIndex: 999,
  } as React.CSSProperties,
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0 auto",
  } as React.CSSProperties,
  links: {
    a: {
      color: theme.pallete.text.main,
      padding: "0 10px",
    },
  } as React.CSSProperties,
  logo: {
    display: "flex",
    alignItems: "center",
    p: {
      margin: "0 10px",
    },
    img: {
      width: "25px",
      height: "25px",
    },
  } as React.CSSProperties,
});

export default Footer;