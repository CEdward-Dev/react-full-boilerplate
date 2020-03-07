'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeciderApp = function (_React$Component) {
    _inherits(DeciderApp, _React$Component);

    function DeciderApp(props) {
        _classCallCheck(this, DeciderApp);

        var _this = _possibleConstructorReturn(this, (DeciderApp.__proto__ || Object.getPrototypeOf(DeciderApp)).call(this, props));

        _this.handlePick = _this.handlePick.bind(_this);
        _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
        _this.handleDeleteSingleOption = _this.handleDeleteSingleOption.bind(_this);
        _this.handleSubmitOption = _this.handleSubmitOption.bind(_this);
        _this.state = {
            subtitle: "If you can't decide, I'll do it for you!",
            options: props.options
        };
        return _this;
    }

    _createClass(DeciderApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            try {
                var json = localStorage.getItem('options');
                var options = JSON.parse(json);

                if (options) {
                    this.setState(function () {
                        return {
                            options: options
                        };
                    });
                }
            } catch (e) {
                // Error
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevState.options.length !== this.state.options.length) {
                var json = JSON.stringify(this.state.options);
                localStorage.setItem('options', json);
            }
        }
    }, {
        key: 'handlePick',
        value: function handlePick() {
            alert(this.state.options[Math.floor(Math.random() * this.state.options.length)]);
        }
    }, {
        key: 'handleDeleteOptions',
        value: function handleDeleteOptions() {
            this.setState(function () {
                return { options: [] };
            });
        }
    }, {
        key: 'handleDeleteSingleOption',
        value: function handleDeleteSingleOption(optionToRemove) {
            this.setState(function (prevState) {
                return {
                    options: prevState.options.filter(function (option) {
                        return optionToRemove !== option;
                    })
                };
            });
        }
    }, {
        key: 'handleSubmitOption',
        value: function handleSubmitOption(option) {
            if (!option) {
                return "Fix your broken shit";
            } else if (this.state.options.indexOf(option) > -1) {
                return "This shit's already an option";
            }

            this.setState(function (prevState) {
                return {
                    options: prevState.options.concat([option])
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(Header, {
                    subtitle: this.state.subtitle
                }),
                React.createElement(Action, {
                    hasOption: this.state.options.length > 0,
                    handlePick: this.handlePick
                }),
                React.createElement(Options, {
                    options: this.state.options,
                    handleDeleteOptions: this.handleDeleteOptions,
                    handleDeleteSingleOption: this.handleDeleteSingleOption
                }),
                React.createElement(AddOptions, {
                    options: this.state.options,
                    handleSubmitOption: this.handleSubmitOption
                })
            );
        }
    }]);

    return DeciderApp;
}(React.Component);

DeciderApp.defaultProps = {
    options: []

    // Class based version of Header (for reference)
    // class Header extends React.Component {
    //     render(){
    //         return (
    //             <div>
    //                 <h1>{this.props.title}</h1>
    //                 <h2>{this.props.subtitle}</h2>
    //             </div>
    //         )
    //     };
    // }

};var Header = function Header(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            props.title
        ),
        props.subtitle && React.createElement(
            'h2',
            null,
            props.subtitle
        )
    );
};

Header.defaultProps = {
    title: "Decider"
};

var Action = function Action(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            {
                disabled: !props.hasOption,
                onClick: props.handlePick },
            'What Should I Do?'
        )
    );
};

var Options = function Options(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { onClick: props.handleDeleteOptions },
            'Remove All'
        ),
        props.options.length === 0 && React.createElement(
            'p',
            null,
            'Please options to choose from.'
        ),
        props.options.map(function (option) {
            return React.createElement(
                Option,
                {
                    key: option,
                    optionText: option,
                    handleDeleteSingleOption: props.handleDeleteSingleOption
                },
                option
            );
        })
    );
};

var Option = function Option(props) {
    return React.createElement(
        'div',
        null,
        'Option: ',
        props.optionText,
        React.createElement(
            'button',
            { onClick: function onClick(e) {
                    props.handleDeleteSingleOption(props.optionText);
                } },
            'Remove'
        )
    );
};

var AddOptions = function (_React$Component2) {
    _inherits(AddOptions, _React$Component2);

    function AddOptions(props) {
        _classCallCheck(this, AddOptions);

        var _this2 = _possibleConstructorReturn(this, (AddOptions.__proto__ || Object.getPrototypeOf(AddOptions)).call(this, props));

        _this2.onSubmitForm = _this2.onSubmitForm.bind(_this2);
        _this2.state = {
            error: undefined
        };
        return _this2;
    }

    _createClass(AddOptions, [{
        key: 'onSubmitForm',
        value: function onSubmitForm(e) {
            e.preventDefault();
            var option = e.target.elements.option.value.trim();
            var error = this.props.handleSubmitOption(option);

            this.setState(function () {
                return { error: error };
            });

            if (!error) {
                e.target.elements.option.value = '';
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.state.error && React.createElement(
                    'p',
                    null,
                    this.state.error
                ),
                React.createElement(
                    'form',
                    { onSubmit: this.onSubmitForm },
                    React.createElement('input', { type: 'text', name: 'option' }),
                    React.createElement(
                        'button',
                        null,
                        'Add Option'
                    )
                )
            );
        }
    }]);

    return AddOptions;
}(React.Component);

ReactDOM.render(React.createElement(DeciderApp, { options: ["what"] }), document.querySelector(".app"));
