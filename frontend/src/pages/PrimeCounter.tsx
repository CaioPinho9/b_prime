import React, { useState } from "react";
import { Button, TextField, useStyles, Theme, Link, Icon } from "bold-ui";
import Prime from "../api/prime";
import HistorySidebar from "../components/HistorySidebar";
import PrimeHistory from "../types/PrimeHistory";

function PrimeCounter() {
  const { classes } = useStyles(createStyles);
  const [inputNumber, setInputNumber] = useState("");
  const [historySidebarIsOpen, setHistorySidebarIsOpen] = useState(false);
  const [primeHistory, setPrimeHistory] = useState<PrimeHistory[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "" || isNaN(Number(e.target.value))) {
      setInputNumber("");
      return;
    }
    if (parseInt(e.target.value) < 0) {
      setInputNumber("0");
    } else if (parseInt(e.target.value) > 2_000_000_000) {
      setInputNumber("2000000000");
    } else {
      setInputNumber(e.target.value);
    }
  };

  const handleCountPrimes = async () => {
    if (inputNumber) {
      const result = await Prime.countPrimesLessThenNumber(inputNumber);
      setPrimeHistory([
        ...primeHistory,
        { number: inputNumber, primeCount: result },
      ]);
    }
  };

  return (
    <div className={classes.container}>
      <Link href={"/"} target="_blank" style={classes.leftArrow}>
        <Icon icon="arrowLeft" />
      </Link>
      <div className={classes.box}>
        <h1 className={classes.title}>Prime Number Calculator</h1>
        <p className={classes.description}>
          Enter a number to calculate the number of prime numbers less than the
          input.
        </p>
        <div className={classes.input}>
          <TextField
            name="numberInput"
            value={inputNumber}
            onChange={handleInputChange}
            placeholder="Enter a number"
            style={classes.input}
          />
        </div>
        <Button
          onClick={handleCountPrimes}
          kind="primary"
          block
          style={classes.button}
        >
          Calculate
        </Button>
        {primeHistory.length !== 0 && (
          <p className={classes.result}>
            {primeHistory[primeHistory.length - 1].primeCount}
          </p>
        )}
      </div>
      <HistorySidebar
        history={primeHistory}
        isOpen={historySidebarIsOpen}
        setHistorySidebarIsOpen={setHistorySidebarIsOpen}
      />
    </div>
  );
}

const createStyles = (theme: Theme) => ({
  container: {
    backgroundColor: theme.pallete.surface.main,
    color: theme.pallete.text.main,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontSize: theme.typography.sizes.text,
  } as React.CSSProperties,
  leftArrow: {
    position: "fixed",
    top: "1rem",
    left: "1rem",
    zIndex: 2,
    color: theme.pallete.text.main,
  } as React.CSSProperties,
  box: {
    backgroundColor: theme.pallete.surface.background,
    padding: "3rem",
    border: "1px solid",
    borderColor: theme.pallete.divider,
    flexDirection: "column",
    display: "flex",
    alignItems: "space-between",
    textAlign: "center",
    borderRadius: theme.radius.modal,
  } as React.CSSProperties,
  title: {
    fontSize: "2rem",
    color: theme.pallete.primary.main,
  } as React.CSSProperties,
  description: {
    padding: "1rem",
    margin: 0,
  } as React.CSSProperties,
  result: {
    marginTop: "1rem",
    marginBottom: "0",
    padding: "0",
    fontSize: theme.typography.sizes.html,
    color: theme.pallete.status.success.main,
  } as React.CSSProperties,
  input: {
    display: "inline",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    height: "3rem",
    width: "100%",
    margin: 0,
    input: {
      padding: 0,
    },
  } as React.CSSProperties,
  button: {
    marginTop: "1rem",
  },
});

export default PrimeCounter;
