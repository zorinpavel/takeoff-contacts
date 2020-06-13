import React from 'react';


export default class ContactForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.contact ? props.contact.name : '',
            email: props.contact ? props.contact.email : '',
            phone: props.contact ? props.contact.phone : '',
            position: props.contact ? props.contact.position : '',
            error: undefined
        };
    }

    onChange = (e) => {
        const name = e.target.id;
        const value = e.target.value;

        this.setState(() => ({ [`${name}`]: value }));
    }

    onRemove = (e) => {
        e.preventDefault();

        this.props.onRemove();
    }

    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.name || !this.state.email) {
            this.setState(() => ({ error: 'Please provide name and email' }));
        } else {
            this.setState(() => ({ error: undefined }));
            this.props.onSubmit({
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                position: this.state.position,
            });
        }
    }

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <ul role="error"><li>{this.state.error}</li></ul>}
                <div className="text-field c1of2" icon="name">
                    <input type="text"
                        id="name"
                        placeholder="Enter name"
                        value={this.state.name}
                        onChange={this.onChange}
                    />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="text-field c1of2" icon="email">
                    <input type="email"
                        id="email"
                        placeholder="Enter email"
                        value={this.state.email}
                        onChange={this.onChange}
                    />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="text-field c1of2" icon="phone">
                    <input type="phone"
                        id="phone"
                        placeholder="Enter phone"
                        value={this.state.phone}
                        onChange={this.onChange}
                    />
                    <label htmlFor="phone">Phone</label>
                </div>
                <div className="text-field c1of2">
                    <input type="position"
                        id="position"
                        placeholder="Enter position"
                        value={this.state.position}
                        onChange={this.onChange} />
                    <label htmlFor="position">Position</label>
                </div>
                <div className="button-section">
                    <button className="button-green">Save contact</button>
                    {this.props.contact ?
                        <button className="button-delete" onClick={this.onRemove}>Remove</button> :
                        ''}
                </div>
            </form>
        );
    }
}
