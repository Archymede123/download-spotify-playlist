import React, { Component } from 'react';
import '../../css/Utilities.css';

class Button extends Component {
    render() {
        return (
            <div className="button-container" style={this.props.width}>
                <button
                    className={"button button-" + this.props.className}
                    onClick={this.props.onClick}
                    style={this.props.style}
                >
                    {this.props.content}
                </button>
            </div>

        );
    }
}

export default Button;