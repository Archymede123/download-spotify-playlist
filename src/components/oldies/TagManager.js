import React, { Component } from 'react';

class TagManager extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tag: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (event) => {
        let tag = event.target.value
        this.setState({ tag })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.addTag(this.props.index, this.state.tag)
        this.setState({ tag: '' })
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit} id="submitForm" className="tag-box">
                <label>
                    <input
                        type="text"
                        value={this.state.tag}
                        name="tagInput"
                        className="tagInput"
                        onChange={this.handleChange} />
                </label>
                <input type="submit" value="submit" className="tagInput" onSubmit={this.handleClearForm} />
            </form>
        );
    }
}

export default TagManager;