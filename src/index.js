(function () {
    function Square(props) {
        return React.createElement('button', {'class': 'square', onClick: props.onClick},
            props.value !== null ? props.value : '');
    }

    class Board extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                values: [1, 2, 3, 4, 5, 6, 7, 8, null],
                size: 3
            };
        }

        renderSquare(i) {
            return React.createElement(Square, {
                value: this.state.values[i],
                onClick: () => this.handleClick(i)
            });
        }

        handleClick(pos) {
            const current = this.state.values.slice();
            let candidates = [];
            let q = Math.floor(pos / this.state.size);
            let r = pos % this.state.size;
            if (q < 2) {
                candidates.push(pos + this.state.size);
            }
            if (q > 0) {
                candidates.push(pos - this.state.size);
            }
            if (r < 2) {
                candidates.push(pos + 1);
            }
            if (r > 0) {
                candidates.push(pos - 1);
            }
            candidates.forEach(function (i) {
                if ((i >= 0) && (i < current.length) && (current[i] === null)) {
                    current[i] = current[pos];
                    current[pos] = null;
                }
            });
            this.setState({values: current});
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

    ReactDOM.render(React.createElement(Board), document.getElementById('root'));
})();
