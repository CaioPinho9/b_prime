import React, { useState } from "react";
import { Button, TextField, useStyles, Theme, Link, Icon } from "bold-ui";
import Prime from "../api/prime";
import HistorySidebar from "../components/HistorySidebar";
import PrimeHistory from "../types/PrimeHistory";
import { isNumber } from "../validation/check/isnumber";
import { PrimeDTO } from "../types/PrimeDTO";
import { isString } from "../validation/check/isstring";

function PrimeCounter() {
  const { classes } = useStyles(createStyles);
  const [inputNumber, setInputNumber] = useState("");
  const [historySidebarIsOpen, setHistorySidebarIsOpen] = useState(false);
  const [primeHistory, setPrimeHistory] = useState<PrimeHistory[]>([]);
  const [primeResult, setPrimeResult] = useState<PrimeDTO | null>(null);

  const MAX_INPUT_NUMBER = 2_000_000_000;
  const MAX_HISTORY_LENGTH = 1000;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "" || !isNumber(e.target.value)) {
      setInputNumber("");
      setPrimeResult(null);
    } else if (parseInt(e.target.value) > MAX_INPUT_NUMBER) {
      setInputNumber(MAX_INPUT_NUMBER.toString());
    } else {
      setInputNumber(e.target.value);
    }
  };

  const handleCountPrimes = async () => {
    if (inputNumber) {
      const result = await Prime.countPrimesLessThenNumber(inputNumber);
      setPrimeResult(result);
      if (!isString(result)) {
        setPrimeHistory([
          {
            number: inputNumber,
            primeCount: result.primeCount,
            executionTime: result.executionTime,
          },
          ...primeHistory.slice(0, MAX_HISTORY_LENGTH),
        ]);
      }
    }
  };

  return (
    <div className={classes.container}>
      <Link href={"/"} style={classes.leftArrow}>
        <Icon icon="arrowLeft" />
      </Link>
      <div className={classes.box}>
        <h1 className={classes.title}>Contador de Números Primos</h1>
        <p className={classes.description}>
          Digite um número para contar a quantidade de números primos menores
          que o input.
        </p>
        <div className={classes.input}>
          <TextField
            name="numberInput"
            value={inputNumber}
            onChange={handleInputChange}
            placeholder="Digite um número"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleCountPrimes();
              }
            }}
            style={classes.input}
          />
        </div>
        <Button
          onClick={handleCountPrimes}
          kind="primary"
          style={classes.button}
          block
        >
          Calcular
        </Button>
        {primeResult !== null && !isString(primeResult) && (
          <p className={classes.result}>
            {primeResult.primeCount + " " + primeResult.executionTime + "ms"}
          </p>
        )}
        {isString(primeResult) && (
          <p className={classes.result + " " + classes.error}>
            {"Erro ao contar números primos."}
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  } as React.CSSProperties,
  leftArrow: {
    position: "fixed",
    top: "1rem",
    left: "1rem",
    zIndex: 2,
    color: theme.pallete.text.main,
  } as React.CSSProperties,
  box: {
    padding: "3rem",
    border: "1px solid",
    borderColor: theme.pallete.divider,
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
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
    padding: "0.5rem",
    width: "50%",
    fontSize: theme.typography.sizes.html,
    color: theme.pallete.status.success.main,
    backgroundColor: theme.pallete.status.success.background,
    border: "1px solid",
    borderRadius: theme.radius.button,
    borderColor: theme.pallete.status.success.main,
  } as React.CSSProperties,
  error: {
    color: theme.pallete.status.danger.main,
    borderColor: theme.pallete.status.danger.main,
    backgroundColor: theme.pallete.status.danger.background,
  } as React.CSSProperties,
  input: {
    display: "inline",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    height: "3rem",
    width: "100%",
    margin: 0,
    padding: 0,
    input: {
      padding: "0 !important",
    },
  } as React.CSSProperties,
  button: {
    marginTop: "1rem",
  },
});

export default PrimeCounter;
