import { useReducer } from 'react';
import DigitButton from './components/DigitButton';
import OperationButton from './components/OperationButton';

export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate',
};

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.ADD_DIGIT:
            if (payload.digit === '0' && state.currentOperand === '0') {
                return state;
            }
            if (payload.digit === '.' && state.currentOperand.includes('.')) {
                return state;
            }
            return {
                ...state,
                currentOperand: `${state.currentOperand || ''}${payload.digit}`,
            };
        case ACTIONS.CHOOSE_OPERATION:
            if (
                state.currentOperand === null &&
                state.previousOperand === null
            ) {
                return state;
            }
            if (state.previousOperand === null) {
                return {
                    ...state,
                    operation: payload.previousOperand,
                    previousOperand: state.currentOperand,
                    currentOperand: null,
                };
            }
            break;
        case ACTIONS.CLEAR:
            return {};
    }
}

export default function App() {
    const [{ currentOperand, previousOperand, operation }, dispatch] =
        useReducer(reducer, {});
    return (
        <div className="calculator-grid">
            <div className="output">
                <div className="previous-operand">
                    {previousOperand} {operation}
                </div>
                <div className="current-operand">{currentOperand}</div>
            </div>
            <button
                className="large-btn"
                type="button"
                onClick={() => dispatch({ type: ACTIONS.CLEAR })}
            >
                AC
            </button>
            <button type="button">DEL</button>
            <OperationButton operation="+" dispatch={dispatch} />
            <DigitButton digit="1" dispatch={dispatch} />
            <DigitButton digit="2" dispatch={dispatch} />
            <DigitButton digit="3" dispatch={dispatch} />
            <OperationButton operation="*" dispatch={dispatch} />
            <DigitButton digit="4" dispatch={dispatch} />
            <DigitButton digit="5" dispatch={dispatch} />
            <DigitButton digit="6" dispatch={dispatch} />
            <OperationButton operation="/" dispatch={dispatch} />
            <DigitButton digit="7" dispatch={dispatch} />
            <DigitButton digit="8" dispatch={dispatch} />
            <DigitButton digit="9" dispatch={dispatch} />
            <OperationButton operation="-" dispatch={dispatch} />
            <DigitButton digit="." dispatch={dispatch} />
            <DigitButton className="large-btn" digit="0" dispatch={dispatch} />
        </div>
    );
}
