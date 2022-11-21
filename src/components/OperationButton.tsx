import { ACTIONS } from "../App";

export default function DigitButton({ dispatch, operation }: any): JSX.Element {
  return (
    <button
      type="button"
      onClick={() =>
        dispatch({
          type: ACTIONS.CHOOSE_OPERATION,
          payload: { operation },
        })
      }
    >
      {operation}
    </button>
  );
}
