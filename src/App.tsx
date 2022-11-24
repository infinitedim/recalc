import { useReducer, Dispatch } from "react";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";

interface Actions {
  ADD_DIGIT: string;
  CHOOSE_OPERATION: string;
  CLEAR: string;
  DELETE_DIGIT: string;
  EVALUATE: string;
}

export const ACTIONS: Actions = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function evaluate({ previousOperand, currentOperand, operation }: any): string {
  const prev: number = parseFloat(previousOperand as string);
  const current: number = parseFloat(currentOperand as string);
  let computation: number | null = null;

  if (isNaN(prev) || isNaN(current)) {
    return "";
  }

  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
    case "-":
      computation = prev - current;
      break;
  }
  return computation?.toString() as string;
}

function reducer(state: any, { type, payload }: any): any {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }

      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }

      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        operation: payload.operation,
        perviousOperand: evaluate(state),
        currentOperand: null,
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.EVALUATE:
      if (
        state.currentOperand == null ||
        state.previousOperand == null ||
        state.operation == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        operation: null,
        previsouOperand: null,
        currentOperand: evaluate(state),
      };

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }

      if (state.currentOperand == null) return state;

      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
  }
}

const INTEGER_FORMATTER: Intl.NumberFormat = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function formatOperand(operand: any): any | undefined {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
}

export default function App(): JSX.Element {
  const [{ currentOperand, previousOperand, operation }, dispatch]: [
    any,
    Dispatch<any>,
  ] = useReducer(reducer, {});

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button
        className="large-btn"
        type="button"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
      >
        DEL
      </button>
      <OperationButton
        operation="+"
        dispatch={dispatch}
      />
      <DigitButton
        digit="1"
        dispatch={dispatch}
      />
      <DigitButton
        digit="2"
        dispatch={dispatch}
      />
      <DigitButton
        digit="3"
        dispatch={dispatch}
      />
      <OperationButton
        operation="*"
        dispatch={dispatch}
      />
      <DigitButton
        digit="4"
        dispatch={dispatch}
      />
      <DigitButton
        digit="5"
        dispatch={dispatch}
      />
      <DigitButton
        digit="6"
        dispatch={dispatch}
      />
      <OperationButton
        operation="/"
        dispatch={dispatch}
      />
      <DigitButton
        digit="7"
        dispatch={dispatch}
      />
      <DigitButton
        digit="8"
        dispatch={dispatch}
      />
      <DigitButton
        digit="9"
        dispatch={dispatch}
      />
      <OperationButton
        operation="-"
        dispatch={dispatch}
      />
      <DigitButton
        digit="."
        dispatch={dispatch}
      />
      <DigitButton
        digit="0"
        dispatch={dispatch}
      />
      <button
        className="large-btn"
        type="button"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}
