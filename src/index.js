import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()}>
                {
                    this.props.value
                }
            </button>
        );
    }
}

class Board extends React.Component {
    constructor() {
        //在使用 JavaScript classes 时，你必须调用 super(); 方法才能在继承父类的子类中正确获取到类型的 this 。
        super();
        //状态提升：当你遇到需要同时获取多个子组件数据，或者两个组件之间需要相互通讯的情况时，把子组件的 state 数据提升至其共同的父组件当中保存。之后父组件可以通过 props 将状态数据传递到子组件当中。这样应用当中的状态数据就能够更方便地交流共享了。
        this.state = {
            squares: Array(9).fill(null),
        };
    }
    renderSquare(i) {
        //注意到我们在写代码的时候，在各个属性直接换了行，这样可以改善我们代码的可读性。并且我们在 JSX 元素的最外层套上了一小括号，以防止 JavaScript 代码在解析时自动在换行处添加分号。
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
