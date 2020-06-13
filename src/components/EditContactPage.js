import React from 'react';
import { connect } from 'react-redux';
import ContactForm from './ContactForm';
import ContactListItem from './ContactListItem';
import { fetchRemoveContact, fetchEditContact } from '../actions/contacts';


export class EditContactPage extends React.Component {
    onSubmit = (contact) => {
        this.props.fetchEditContact(this.props.contact._id, contact);
        this.props.history.push('/');
    }

    onRemove = () => {
        this.props.fetchRemoveContact(this.props.contact._id);
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="contact-edit">
                <ContactListItem contact={this.props.contact} className="user-profile"/>
                <div className="contact-edit__form-wrapper">
                    <ContactForm
                        contact={this.props.contact}
                        onSubmit={this.onSubmit}
                        onRemove={this.onRemove}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    contact: state.contacts.find(contact => contact._id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
    fetchEditContact: (id, contact) => dispatch(fetchEditContact(id, contact)),
    fetchRemoveContact: (id) => dispatch(fetchRemoveContact(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContactPage);
