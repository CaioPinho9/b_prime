import React from "react";
import { Link, Theme, useStyles } from "bold-ui";
import ThemeButton from "../components/ThemeButton";

function Home() {
  const { classes } = useStyles(createStyles);

  return (
    <div className={classes.container}>
      <div className={classes.corner}>
        <ThemeButton />
      </div>
      <div className={classes.welcomeBox}>
        <h1 className={classes.title}>Bem vindo ao</h1>
        <div className={classes.titleContainer}>
          <h1 className={classes.title}>B</h1>
          <h1 className={classes.underline}>_</h1>
          <h1 className={classes.title}>primo</h1>
        </div>
        <p className={classes.description}>
          Este site utiliza o algoritmo Crivo de Eratóstenes para calcular o
          número de números primos que existem entre 0 e um determinado input.
        </p>

        <Link href="/prime" className={classes.button}>
          Comece a calcular
        </Link>
      </div>
    </div>
  );
}

const createStyles = (theme: Theme) => ({
  container: {
    backgroundColor: theme.pallete.surface.main,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: "100vh",
  } as React.CSSProperties,
  welcomeBox: {
    padding: "5rem",
    margin: "3rem",
    border: "1px solid",
    borderColor: theme.pallete.divider,
    textAlign: "center",
    borderRadius: theme.radius.modal,
  } as React.CSSProperties,
  titleContainer: {
    display: "flex",
    justifyContent: "center",
  } as React.CSSProperties,
  title: {
    fontSize: "2rem",
  } as React.CSSProperties,
  underline: {
    fontSize: "2rem",
    color: theme.pallete.primary.main,
  } as React.CSSProperties,
  description: {
    padding: "1rem",
  } as React.CSSProperties,
  button: {
    display: "inline-block",
    fontSize: theme.typography.sizes.button,
    backgroundColor: theme.pallete.primary.main,
    color: theme.pallete.surface.main,
    borderColor: theme.pallete.primary.main,
    borderRadius: theme.radius.button,
    padding: "1rem",
    textDecoration: "none",
    fontWeight: "bold",
  } as React.CSSProperties,
  corner: {
    position: "fixed",
    top: 0,
    right: 0,
  } as React.CSSProperties,
});

export default Home;
