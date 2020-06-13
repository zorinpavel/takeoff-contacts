import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRandomContact } from '../actions/contacts';


const PageTitle = ({ fetchRandomContact }) => (
    <div className="page-title">
        <h2 className="page-title__title">Page title</h2>
        <div className="page-title__actions">
            <Link to="/create" role="button" className="button-green">Add contact</Link>
            <button role="button" className="button-yellow" onClick={fetchRandomContact}>Add random</button>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    fetchRandomContact: () => dispatch(fetchRandomContact())
});

export default connect(undefined, mapDispatchToProps)(PageTitle);
