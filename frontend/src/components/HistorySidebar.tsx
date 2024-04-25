import { useStyles, Theme, DataTable, Button, Icon } from "bold-ui";
import React from "react";
import PrimeHistory from "../types/PrimeHistory";

function HistorySidebar(props: {
  history: PrimeHistory[];
  isOpen: boolean;
  setHistorySidebarIsOpen: any;
}) {
  const { classes } = useStyles(createStyles);

  function handleHistoryClick() {
    props.setHistorySidebarIsOpen(!props.isOpen);
  }

  return (
    <div>
      <Button
        style={classes.historyButton}
        skin="ghost"
        onClick={handleHistoryClick}
      >
        <Icon icon="clockArrowOutline" />
      </Button>
      <div
        className={`${
          props.isOpen ? classes.containerOpen : classes.containerClosed
        }`}
      >
        <h2 className={classes.title}>Histórico</h2>

        <DataTable<PrimeHistory>
          rows={props.history}
          loading={false}
          columns={[
            {
              name: "number",
              header: "Número",
              render: (item) => item.number,
            },
            {
              name: "primeCount",
              header: "Contagem",
              render: (item) => item.primeCount,
            },
          ]}
        />
      </div>
    </div>
  );
}

const createStyles = (theme: Theme) => ({
  historyButton: {
    position: "fixed",
    top: 0,
    right: 0,
    zIndex: 2,
    marginTop: "2px",
  } as React.CSSProperties,
  containerOpen: {
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
  containerClosed: {
    display: "none",
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
