import React, { useState } from "react";
import { Button, TextField, useStyles, Theme } from "bold-ui";
import Prime from "../api/prime";
import HistorySidebar from "../components/HistorySidebar";

function PrimeCounter() {
  const { classes } = useStyles(createStyles);
  const [inputNumber, setInputNumber] = useState("");
  const [primeHistory, setPrimeHistory] = useState<any[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
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
      <div className={classes.box}>
        <h1 className={classes.title}>Prime Number Calculator</h1>
        <p className={classes.description}>
          Enter a number to calculate the number of prime numbers less than the
          input.
        </p>
        <div className={classes.input}>
          <TextField
            name="numberInput"
            type="number"
            value={inputNumber}
            onChange={handleInputChange}
            placeholder="Enter a number"
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
      <HistorySidebar history={primeHistory} isOpen={true} />
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "1rem",
    height: "3rem",
    margin: 0,
  } as React.CSSProperties,
  button: {
    marginTop: "1rem",
  },
});

export default PrimeCounter;
