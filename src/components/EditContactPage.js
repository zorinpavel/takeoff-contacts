import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import ContactForm from './ContactForm';
import ContactListItem from './ContactListItem';
// import { startRemoveExpense, startEditExpense } from '../actions/expenses';


export class EditContactPage extends React.Component {
    onSubmit = (contact) => {
        // this.props.startEditExpense(this.props.expense.id, contact);
        this.props.history.push('/');
    }

    onRemove = () => {
        // this.props.startRemoveExpense(this.props.expense.id);
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
    startEditExpense: (id, contact) => dispatch(startEditExpense(id, contact)),
    startRemoveExpense: (id) => dispatch(startRemoveExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContactPage);
