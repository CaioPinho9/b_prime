import { useStyles, Theme, DataTable, Button, Icon, Paginator } from "bold-ui";
import React, { useEffect, useState } from "react";
import PrimeHistory from "../types/PrimeHistory";

function HistorySidebar(props: {
  history: PrimeHistory[];
  isOpen: boolean;
  setHistorySidebarIsOpen: any;
}) {
  const { classes } = useStyles(createStyles);
  const pageSize = 15;
  const [page, setPage] = useState(0);
  const totalPage = Math.ceil(props.history.length / pageSize);
  const [history, setHistory] = useState<PrimeHistory[]>([]);

  function handleHistoryClick() {
    props.setHistorySidebarIsOpen(!props.isOpen);
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
    right: 0,
    bottom: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
    height: "100vh",
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
    padding: "10px",
    fontSize: "1.5rem",
  } as React.CSSProperties,
  paginator: {
    position: "fixed",
    bottom: 40,
    padding: "10px",
  } as React.CSSProperties,
});

export default HistorySidebar;
