import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';


const ContactListItem = (props) => (
    <figure className={classNames('user-card', props.className)}>
        <figcaption>
            {props.contact._id ?
                <Link to={`/edit/${props.contact._id}`} className="edit-card">
                    <FontAwesomeIcon icon={faPen} />
                </Link> :
                ''}
            <img src={props.contact.photo || '/img/user-default.png'} alt={props.contact.name} className="profile" />
            <h5>{props.contact.name}</h5>
            <h6 className="position">{props.contact.position}</h6>
            <ul className="list-group">
                <li className="list-group-item">{props.contact.email}</li>
                {props.contact.phone && <li className="list-group-item">{props.contact.phone}</li>}
            </ul>
        </figcaption>
    </figure>
);

export default ContactListItem;
