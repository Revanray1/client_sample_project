import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
                <ul className="menu-list">
                    <li className="menu-item">
                        <NavLink exact to="/" activeClassName="active">Dash Board</NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink to="/User-List" activeClassName="active">User List</NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink to="/view-claim-reconciliation" activeClassName="active">View Claim Reconciliation</NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink to="/claim-detail" activeClassName="active">Details Claim</NavLink>
                    </li>
                    {/* Add more menu items here */}
                </ul>
            </div>
            <div className="menu-toggle" onClick={toggleMenu}>
                {isMenuOpen ? 'Close' : 'Menu'}
            </div>
            <div className={`content ${isMenuOpen ? 'menu-open' : ''}`}>
                {/* Your page content goes here */}
            </div>
        </>
    );
};

export default Menu;
