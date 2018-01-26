(function () {
    function Square(props) {
        return React.createElement('button', {'class': 'square'},
            props.value !== null ? props.value : '');
    }

    class Board extends React.Component {

        constructor(props) {
            super(props);
            this.state = [1, 2, 3, 4, 5, 6, 7, 8, null];
        }

        renderSquare(i) {
            return React.createElement(Square, {value: this.state[i]});
        }

        render () {
            return React.createElement('div', {},
                React.createElement('div', {'class': 'board-row'},
                    this.renderSquare(0),
                    this.renderSquare(1),
                    this.renderSquare(2)
                ),
                React.createElement('div', {'class': 'board-row'},
                    this.renderSquare(3),
                    this.renderSquare(4),
                    this.renderSquare(5)
                ),
                React.createElement('div', {'class': 'board-row'},
                    this.renderSquare(6),
                    this.renderSquare(7),
                    this.renderSquare(8)
                )
            );
        }
    }

    // ========================================
    ReactDOM.render(React.createElement(Board), document.getElementById('root'));
})();
