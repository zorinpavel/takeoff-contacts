import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ContactListItem from './ContactListItem';
import selectContacts from '../selectors/contacts';
import { fetchContacts } from '../actions/contacts';


export const ContactList = (props) => {
    useEffect(() => {
        props.fetchContacts()
            .then(contacts => {
                console.log('contacts', contacts);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className="list-body">
            {
                props.contacts.length === 0 ? (
                    <div className="list-item list-item--message">
                        <span>No contacts</span>
                    </div>
                ) : (
                    props.contacts.map(contact => {
                        return <ContactListItem key={contact.id} { ...contact } />;
                    })
                )
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        contacts: selectContacts(state.contacts, state.filters)
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchContacts: (params) => dispatch(fetchContacts(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
