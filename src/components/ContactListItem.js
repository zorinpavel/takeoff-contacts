import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';


const ContactListItem = contact => (
    <figure className="list-item user-card">
        <figcaption>
            <Link to={`/edit/${contact._id}`} className="edit-card">
                <FontAwesomeIcon icon={faPen} />
            </Link>
            <img src={contact.photo} alt={contact.name} className="profile" />
            <h5>{contact.name}</h5>
            <h6 class="position">{contact.position}</h6>
            <ul className="list-group">
                <li className="list-group-item">{contact.email}</li>
                {contact.phone && <li className="list-group-item">{contact.phone}</li>}
            </ul>
        </figcaption>
    </figure>
);

export default ContactListItem;
