import React, { useState, useEffect } from "react";
import { Button, TextField, useStyles, Theme, Link, Icon } from "bold-ui";
import SessionStore from "../store/session/SessionStore";
import PrimeCounterApi from "../api/PrimeCounterApi";
import HistorySidebar from "../components/HistorySidebar";
import PrimeHistory from "../types/PrimeHistory";
import { PrimeDTO } from "../types/PrimeDTO";
import { isNumber } from "../validation/check/IsNumber";
import { isString } from "../validation/check/IsString";
import ThemeButton from "../components/ThemeButton";

function PrimeCounter() {
  const session = new SessionStore();
  const primeCounter = new PrimeCounterApi();
  const { classes } = useStyles(createStyles);
  const [inputNumber, setInputNumber] = useState("");
  const [primeHistory, setPrimeHistory] = useState<PrimeHistory[]>([]);
  const [primeResult, setPrimeResult] = useState<PrimeDTO | null>(null);
  const MAX_INPUT_NUMBER = 2_000_000_000;
  const MAX_HISTORY_LENGTH = 1000;

  useEffect(() => {
    session.createSession();
    const fetchData = async () => {
      const history = await primeCounter.getHistory();
      if (isString(history)) {
        setPrimeHistory([]);
      } else {
        setPrimeHistory(history);
      }
    };
    fetchData();
  }, []);

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
      const result = await primeCounter.countPrimesLessThenNumber(inputNumber);
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
          <div className={classes.resultContainer}>
            <p className={classes.result}>{primeResult.primeCount}</p>
            <p className={classes.result}>{primeResult.executionTime + "ms"}</p>
          </div>
        )}
        {isString(primeResult) && (
          <p className={classes.result + " " + classes.error}>
            {"Erro ao contar números primos."}
          </p>
        )}
      </div>
      <div className={classes.corner}>
        <ThemeButton />
        <HistorySidebar history={primeHistory} />
      </div>
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
  resultContainer: {
    display: "flex",
    width: "80%",
  } as React.CSSProperties,
  result: {
    margin: "1rem",
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
  } as React.CSSProperties,
  corner: {
    position: "fixed",
    top: 0,
    right: 0,
    zIndex: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,
});

export default PrimeCounter;
