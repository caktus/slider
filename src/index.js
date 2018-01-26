(function () {
    function Square(props) {
        return React.createElement('button', {'class': 'square'},
            props.value !== null ? props.value : '');
    }

    function Board(props) {
        return React.createElement('div', {},
            React.createElement('div', {'class': 'board-row'},
                React.createElement(Square, {value: 1}),
                React.createElement(Square, {value: 2}),
                React.createElement(Square, {value: 3})
            ),
            React.createElement('div', {'class': 'board-row'},
                React.createElement(Square, {value: 4}),
                React.createElement(Square, {value: 5}),
                React.createElement(Square, {value: 6})
            ),
            React.createElement('div', {'class': 'board-row'},
                React.createElement(Square, {value: 7}),
                React.createElement(Square, {value: 8}),
                React.createElement(Square, {value: null})
            )
        );
    }

    // ========================================
    ReactDOM.render(React.createElement(Board), document.getElementById('root'));
})();
