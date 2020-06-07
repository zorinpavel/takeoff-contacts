import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';


export const Header = ({ user, startLogout }) => {
    return (
        <header className="header">
            <div className="content-container">
                <div className="header__content">
                    <Link className="header__title" to="/dashboard">
                        <h1>Contacts app</h1>
                    </Link>
                    <div className="header-menu">
                        <Link to="/help">Help page</Link>
                        <a href="#!" className="header-menu__login">
                            <span className="login__name">{user.name}</span>
                            <img className="login__avatar" src={'https://ui-avatars.com/api/?name=' +
                                user.name + '&color=000000&background=FFFFFF&uppercase=false'} />
                        </a>
                        <button className="button-blue" onClick={startLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </header>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
