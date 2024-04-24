import { useStyles, Theme } from "bold-ui";
import React from "react";

function HistorySidebar(props: { history: any[]; isOpen: boolean }) {
  const { classes } = useStyles(createStyles);

  return (
    <div
      className={`${classes.container} ${
        props.isOpen ? classes.containerOpen : ""
      }`}
    >
      <h2 className={classes.title}>Historic</h2>
      <ul className={classes.historicList}>
        {props.history.map((item) => (
          <li className={classes.historicValue}>
            {item.number}: {item.primeCount}
          </li>
        ))}
      </ul>
    </div>
  );
}

const createStyles = (theme: Theme) => ({
  container: {
    position: "fixed",
    top: 0,
    right: 0, // Change left to right
    bottom: 0,
    width: "100%", // Sidebar takes full width on small screens
    [theme.breakpoints.up("sm")]: {
      // When the screen is 'sm' or larger...
      width: "15%", // Sidebar takes 25% of the width
    },
    height: "100vh",
    zIndex: 1,
    borderColor: theme.pallete.divider,
    backgroundColor: theme.pallete.surface.background,
    color: theme.pallete.text.main,
  } as React.CSSProperties,
  containerOpen: {
    transform: "translateX(0)",
  } as React.CSSProperties,
  historicList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  } as React.CSSProperties,
  historicValue: {
    padding: "10px",
    borderBottom: "1px solid",
    borderColor: theme.pallete.divider,
  } as React.CSSProperties,
  title: {
    padding: "10px",
    borderBottom: "1px solid",
    borderColor: theme.pallete.divider,
    fontSize: "1.5rem",
    margin: 0,
  } as React.CSSProperties,
});

export default HistorySidebar;
