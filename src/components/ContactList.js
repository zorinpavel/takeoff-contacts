import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ContactListItem from './ContactListItem';
import selectContacts from '../selectors/contacts';
import { fetchContacts } from '../actions/contacts';


export const ContactList = (props) => {
    // useEffect(() => {
    //     props.fetchContacts()
    //         .then(contacts => {
    //             // console.log('contacts', contacts);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }, []);

    return (
        <div className="list-body">
            {
                props.contacts.length === 0 ? (
                    <div className="list-item__message">
                        <span>No contacts</span>
                    </div>
                ) : (
                    props.contacts.map(contact => {
                        return <ContactListItem
                            key={contact._id}
                            contact={contact}
                            className={'list-item'}
                        />;
                    })
                )
            }
        </div>
    );
};

const mapStateToProps = (state) => ({
    contacts: selectContacts(state.contacts, state.filters)
});

const mapDispatchToProps = (dispatch) => ({
    fetchContacts: (params) => dispatch(fetchContacts(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
