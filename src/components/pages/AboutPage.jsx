import React from 'react';

import BoardView from 'components/views/BoardView';
import CardView from 'components/views/CardView';

export default class AboutPage extends React.Component {
    render() {
        return (
            <div className="AboutPage">
                <BoardView />
            </div>
        );
    }
}
