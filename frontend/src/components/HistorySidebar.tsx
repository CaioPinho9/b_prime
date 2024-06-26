import { useStyles, Theme, DataTable, Button, Icon, Paginator } from "bold-ui";
import React, { useEffect, useState } from "react";
import PrimeHistory from "../types/PrimeHistory";

function HistorySidebar(props: { history: PrimeHistory[] }) {
  const { classes } = useStyles(createStyles);

  const pageSize = 10;
  const totalPage = Math.ceil(props.history.length / pageSize);
  const [page, setPage] = useState(0);

  const [history, setHistory] = useState<PrimeHistory[]>([]);
  const [isOpen, setHistorySidebarIsOpen] = useState(false);

  function handleHistoryClick() {
    setHistorySidebarIsOpen(!isOpen);
  }

  function getHistory() {
    const start = page * pageSize;
    const end = start + pageSize;
    setHistory(props.history.slice(start, end));
  }

  useEffect(() => {
    getHistory();
  }, [page, props.history]);

  function hanglePageChange(page: number): void {
    setPage(page);
  }

  return (
    <div>
      <Button style={classes.button} skin="ghost" onClick={handleHistoryClick}>
        <Icon icon="clockArrowOutline" />
      </Button>
      <div
        className={`${
          isOpen ? classes.containerOpen : classes.containerClosed
        }`}
      >
        <h2 className={classes.title}>Histórico</h2>

        <DataTable<PrimeHistory>
          rows={history}
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
            {
              name: "executionTime",
              header: "Tempo(ms)",
              render: (item) => item.executionTime,
            },
          ]}
        />
        {props.history.length > pageSize && (
          <div className={classes.paginator}>
            <Paginator
              page={page}
              total={totalPage}
              onChange={hanglePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const createStyles = (theme: Theme) => ({
  button: {
    margin: "2px",
    zIndex: 3,
  } as React.CSSProperties,
  containerOpen: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    height: "100vh",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "19rem",
      overflowX: "hidden",
    },
    zIndex: 1,
    border: "1px solid",
    borderColor: theme.pallete.divider,
    backgroundColor: theme.pallete.surface.background,
    color: theme.pallete.text.main,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "th, td": {
      textAlign: "center",
      width: "33%",
    },
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
    fontSize: "1.5rem", 
    padding: "10px",
  } as React.CSSProperties,
  paginator: {
    position: "fixed",
    bottom: 40,
    padding: "10px",
  } as React.CSSProperties,
});

export default HistorySidebar;
