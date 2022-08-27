/* eslint-disable react/self-closing-comp */
export default function App() {
    return (
        <div className="calculator-grid">
            <div className="output">
                <div className="previous-operand">231231</div>
                <div className="current-operand">12334</div>
            </div>
            <button className="large-btn" type="button">
                AC
            </button>
            <button type="button" className="del-btn">
                DEL
            </button>
            <button type="button">+</button>
            <button type="button">1</button>
            <button type="button">2</button>
            <button type="button">3</button>
            <button type="button">*</button>
            <button type="button">4</button>
            <button type="button">5</button>
            <button type="button">6</button>
            <button type="button">/</button>
            <button type="button">7</button>
            <button type="button">8</button>
            <button type="button">9</button>
            <button type="button">-</button>
            <button type="button">.</button>
            <button type="button">0</button>
            <button className="large-btn" type="button">
                =
            </button>
        </div>
    );
}
