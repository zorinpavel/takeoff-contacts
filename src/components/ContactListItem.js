import React from 'react';
import { Link } from 'react-router-dom';

const ContactListItem = contact => (
    <figure className="user-card">
        <figcaption>
            <Link to={`/edit/${contact.id}`} className="edit-card"><i className="icon-mode_edit" /></Link>
            <img src={contact.photo} alt={contact.name} className="profile" />
            <h5>{contact.name}</h5>
            <ul className="list-group">
                <li className="list-group-item">{contact.email}</li>
                <li className="list-group-item">{contact.position}</li>
            </ul>
        </figcaption>
    </figure>
);

export default ContactListItem;
