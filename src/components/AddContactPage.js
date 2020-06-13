import React from 'react';
import { connect } from 'react-redux';
import ContactForm from './ContactForm';
import ContactListItem from './ContactListItem';
import { fetchAddContact } from '../actions/contacts';


export class AddContactPage extends React.Component {
    onSubmit = (contact) => {
        this.props.fetchAddContact(contact);
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="contact-edit">
                <ContactListItem contact={{}} className="user-profile"/>
                <div className="contact-edit__form-wrapper">
                    <ContactForm
                        contact={this.props.contact}
                        onSubmit={this.onSubmit}
                    />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchAddContact: (contact) => dispatch(fetchAddContact(contact))
});

export default connect(undefined, mapDispatchToProps)(AddContactPage);
