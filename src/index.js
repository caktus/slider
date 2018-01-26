(function () {

    function Square(props) {
        return React.createElement('button', {'class': 'square', onClick: props.onClick},
            props.value !== null ? props.value : '');
    }

    class Board extends React.Component {

        renderSquare(i) {
            return React.createElement(Square, {
                value: this.props.puzzle[i],
                onClick: () => this.props.handleClick(i)
            });
        }

        render() {
            const rows = [];
            for (let i = 0; i < this.props.size; i++) {
                let row = [];
                for (let j = 0; j < this.props.size; j++) {
                    row.push(this.renderSquare(i * this.props.size + j));
                }
                rows.push(
                    React.createElement('div', {'class': 'board-row'}, row)
                );
            }
            return React.createElement('div', {'class': 'board'}, rows);
        }
    }

    class Game extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                size: 4,
                puzzle: this.generatePuzzle(4)
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

        handleClick(pos) {
            const current = this.state.puzzle.slice();
            const candidates = [];
            const q = Math.floor(pos / this.state.size);
            const r = pos % this.state.size;
            if (q < this.state.size - 1) {
                candidates.push(pos + this.state.size);
            }
            if (q > 0) {
                candidates.push(pos - this.state.size);
            }
            if (r < this.state.size - 1) {
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
            this.setState({puzzle: current});
        }

        onChange(value) {
            const puzzle = this.generatePuzzle(value)
            this.setState({size: value, puzzle: puzzle});
        }

        render() {
            return React.createElement('div', {'class': 'game'},
                React.createElement('div', {'class': 'controls'},
                    React.createElement('label', {'for': 'boardsize'}, 'Puzzle Size'),
                    React.createElement('input', {
                        id: 'boardsize',
                        name: 'boardsize',
                        type: 'number',
                        min: 2,
                        max: 10,
                        step: 1,
                        value: this.state.size,
                        onChange: (event) => this.onChange(parseInt(event.target.value, 10))
                    })
                ),
                React.createElement(Board, {
                    size: this.state.size,
                    puzzle: this.state.puzzle,
                    handleClick: (pos) => this.handleClick(pos)
                })
            );
        }

    }

    ReactDOM.render(React.createElement(Game), document.getElementById('root'));
})();
