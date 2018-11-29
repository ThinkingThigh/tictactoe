import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//现在格子组件 Square 不再拥有自身的状态数据了。它从棋盘父组件 Board 接受数据，并且当自己被点击时通知触发父组件改变状态数据，我们称这类的组件为 受控组件。
// class Square extends React.Component {
//     render() {
//         return (
//             <button className="square" onClick={() => this.props.onClick()}>
//                 {
//                     this.props.value
//                 }
//             </button>
//         );
//     }
// }

//React 专门为像 Square 组件这种只有 render 方法的组件提供了一种更简便的定义组件的方法： 函数定义组件 。只需要简单写一个以 props 为参数的 function 返回 JSX 元素就搞定了。
//事件处理函数的写法，这里我们把 onClick={() => props.onClick()} 直接修改为 onClick={props.onClick} , 注意不能写成 onClick={props.onClick()} 否则 props.onClick 方法会在 Square 组件渲染时被直接触发而不是等到 Board 组件渲染完成时通过点击触发，又因为此时 Board 组件正在渲染中（即 Board 组件的 render() 方法正在调用），又触发 handleClick(i) 方法调用 setState() 会再次调用 render() 方法导致死循环。
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor() {
        //在使用 JavaScript classes 时，你必须调用 super(); 方法才能在继承父类的子类中正确获取到类型的 this 。
        super();
        //状态提升：当你遇到需要同时获取多个子组件数据，或者两个组件之间需要相互通讯的情况时，把子组件的 state 数据提升至其共同的父组件当中保存。之后父组件可以通过 props 将状态数据传递到子组件当中。这样应用当中的状态数据就能够更方便地交流共享了。
        this.state = {
            squares: Array(9).fill(null),
            //记录轮流落子状态
            xIsNext: true,
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

    handleClick(i) {
        //我们使用了 .slice() 方法来将之前的数组数据浅拷贝到了一个新的数组中，而不是修改已有的数组。
        const squares = this.state.squares.slice();
        //轮流执子
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const status = 'Next player: '+ (this.state.xIsNext ? 'X' : 'O');

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
