import React from 'react';
import { Link } from 'react-router-dom';

const HelpPage = () => (
    <div>
        <div className="summary">
            <div className="content-container">
                <h1 className="summary__title">Help Page</h1>
            </div>
        </div>
        <div className="content-container">
            <p>This is a boilerplate frame for a React app.</p>
            <p>Help component content.</p>
            <Link className="button" to="/">Back to Dashboard</Link>
        </div>
    </div>
);

export default HelpPage;