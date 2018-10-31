import React, { Component } from 'react';
import '../../css/Utilities.css';

class Button extends Component {
    render() {
        return (
            <div className="buttons">
                <button className="cta" onClick={this.props.onClick}>{this.props.content}</button>
            </div>
        );
    }
}

export default Button;