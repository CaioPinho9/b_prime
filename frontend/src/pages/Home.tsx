import React from "react";
import { Link, Theme, useStyles } from "bold-ui";

function Home() {
  const { classes } = useStyles(createStyles);

  return (
    <div className={classes.container}>
      <div className={classes.welcomeBox}>
        <h1 className={classes.title}>Welcome to</h1>
        <div className={classes.titleContainer}>
          <h1 className={classes.title}>B</h1>
          <h1 className={classes.underline}>_</h1>
          <h1 className={classes.title}>prime</h1>
        </div>
        <p className={classes.description}>
          This site utilizes the Sieve of Eratosthenes algorithm to calculate
          the number of prime numbers that exists between 0 and a given input.
        </p>

        <Link href="/prime" target="_blank" className={classes.button}>
          Get Started
        </Link>
      </div>
    </div>
  );
}

const createStyles = (theme: Theme) => ({
  container: {
    backgroundColor: theme.pallete.surface.main,
    color: theme.pallete.text.main,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    fontSize: theme.typography.sizes.text,
    height: "100vh",
  } as React.CSSProperties,
  welcomeBox: {
    backgroundColor: theme.pallete.surface.background,
    padding: "5rem",
    margin: "3rem",
    borderBlock: "1px solid",
    borderColor: theme.pallete.divider,
    textAlign: "center",
    height: "20rem",
    borderRadius: theme.radius.modal,
  } as React.CSSProperties,
  titleContainer: {
    display: "flex",
    flexWrap: "nowrap",
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
});

export default Home;
