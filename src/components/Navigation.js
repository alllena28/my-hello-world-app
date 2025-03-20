import React from 'react';

const Navigation = () => {
    return (
        <nav>
            <ul style={{ display: 'flex', listStyleType: 'none' }}>
                <li style={{ margin: '0 10px' }}>Home</li>
                <li style={{ margin: '0 10px' }}>About</li>
                <li style={{ margin: '0 10px' }}>Contact</li>
            </ul>
        </nav>
    );
};

export default Navigation;
