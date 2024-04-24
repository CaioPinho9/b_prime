import { useStyles, Theme, DataTable } from "bold-ui";
import React from "react";
import PrimeHistory from "../types/PrimeHistory";

function HistorySidebar(props: { history: PrimeHistory[]; isOpen: boolean }) {
  const { classes } = useStyles(createStyles);

  return (
    <div
      className={`${classes.container} ${
        props.isOpen ? classes.containerOpen : ""
      }`}
    >
      <h2 className={classes.title}>Historic</h2>
      <DataTable<PrimeHistory>
        rows={props.history}
        loading={false}
        columns={[
          {
            name: "number",
            header: "Number",
            render: (item) => item.number,
          },
          {
            name: "primeCount",
            header: "Count",
            render: (item) => item.primeCount,
          },
        ]}
      />
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
    border: "1px solid",
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
