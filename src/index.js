(function () {
    function Square(props) {
        return React.createElement('button', {'class': 'square', onClick: props.onClick},
            props.value !== null ? props.value : '');
    }

    class Board extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                values: this.generatePuzzle(3),
                size: 3
            };
        }

        generateRandomPuzzle(size) {
            const puzzle = Array(size * size).fill(null);
            const choices = [];
            for (let i = 0; i < puzzle.length - 1; i++) {
                let next = Math.floor(Math.random() * (puzzle.length - 1) + 1);
                while (puzzle.indexOf(next) !== -1) {
                    next = Math.floor(Math.random() * (puzzle.length - 1) + 1);
                }
                puzzle[i] = next;
            }
            return puzzle;
        }

        generatePuzzle(size) {
            let puzzle = this.generateRandomPuzzle(size);
            while (!this.isSolvable(puzzle)) {
                puzzle = this.generateRandomPuzzle(size);
            }
            return puzzle;
        }

        isSolvable(puzzle) {
            let iterations = 0;
            puzzle.forEach(function (value, index) {
                if (value !== null) {
                    for (let i = index + 1; i < puzzle.length; i++) {
                        if ((puzzle[i] !== null) && (puzzle[i] < value)) {
                            iterations += 1;
                        }
                    }
                }
            });
            return iterations % 2 === 0;
        }

        renderSquare(i) {
            return React.createElement(Square, {
                value: this.state.values[i],
                onClick: () => this.handleClick(i)
            });
        }

        handleClick(pos) {
            const current = this.state.values.slice();
            const candidates = [];
            const q = Math.floor(pos / this.state.size);
            const r = pos % this.state.size;
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
