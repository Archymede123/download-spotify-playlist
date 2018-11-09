import React, { Component } from 'react';
import '../../css/Utilities.css';

class Button extends Component {
    render() {
        return (
            <div className="button-container">
                <button
                    className={"button button-" + this.props.className}
                    onClick={this.props.onClick}
                >
                    {this.props.content}
                </button>
            </div>

        );
    }
}

export default Button;