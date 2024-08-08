import React, { useState } from 'react';
import './calculator.css';

const Calculator = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [operator, setOperator] = useState(null);
    const [previousValue, setPreviousValue] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const handleDigit = (digit) => {
        if (waitingForOperand) {
            setDisplayValue(digit);
            setWaitingForOperand(false);
        } else {
            setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
        }
    }

    const handleOperator = (nextOperator) => {
        const inputValue = parseFloat(displayValue);

        if (previousValue === null) {
            setPreviousValue(inputValue);
        } else if (operator) {
            const currentValue = previousValue || 0;
            const newValue = calculate(operator, currentValue, inputValue);
            setPreviousValue(newValue);
            setDisplayValue(String(newValue));
        }

        setWaitingForOperand(true);
        setOperator(nextOperator);
    }

    const calculate = (operator, left, right) => {
        switch (operator) {
            case '+':
                return left + right;
            case '-':
                return left - right;
            case '*':
                return left * right;
            case '/':
                return left / right;
            case '%':
                return left % right;
            default:
                return right;
        }
    }

    const handleClear = () => {
        setDisplayValue('0');
        setOperator(null);
        setPreviousValue(null);
        setWaitingForOperand(false);
    }

    const handleToggleSign = () => {
        setDisplayValue(displayValue.charAt(0) === '-' ? displayValue.substr(1) : '-' + displayValue);
    }

    const handleDecimal = () => {
        if (!displayValue.includes('.')) {
            setDisplayValue(displayValue + '.');
        }
    }

    const handleEqual = () => {
        const inputValue = parseFloat(displayValue);

        if (operator && previousValue != null) {
            const currentValue = previousValue || 0;
            const newValue = calculate(operator, currentValue, inputValue);
            setDisplayValue(String(newValue));
            setPreviousValue(null);
            setOperator(null);
            setWaitingForOperand(false);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Calculator</h1>
            <div className="calculator">
                <input type="text" className="display" value={displayValue} disabled />
                <div className="buttons">
                    <button className="button" onClick={handleClear}>C</button>
                    <button className="button" onClick={handleToggleSign}>+/-</button>
                    <button className="button" onClick={() => handleOperator('%')}>%</button>
                    <button className="button" onClick={() => handleOperator('/')}>/</button>
                    <button className="button" onClick={() => handleDigit('7')}>7</button>
                    <button className="button" onClick={() => handleDigit('8')}>8</button>
                    <button className="button" onClick={() => handleDigit('9')}>9</button>
                    <button className="button" onClick={() => handleOperator('*')}>*</button>
                    <button className="button" onClick={() => handleDigit('4')}>4</button>
                    <button className="button" onClick={() => handleDigit('5')}>5</button>
                    <button className="button" onClick={() => handleDigit('6')}>6</button>
                    <button className="button" onClick={() => handleOperator('-')}>-</button>
                    <button className="button" onClick={() => handleDigit('1')}>1</button>
                    <button className="button" onClick={() => handleDigit('2')}>2</button>
                    <button className="button" onClick={() => handleDigit('3')}>3</button>
                    <button className="button" onClick={() => handleOperator('+')}>+</button>
                    <button className="button" onClick={() => handleDigit('0')}>0</button>
                    <button className="button" onClick={handleDecimal}>.</button>
                    <button className="button equal" onClick={handleEqual}>=</button>
                </div>
            </div>
        </div>
    );
}

export default Calculator;
