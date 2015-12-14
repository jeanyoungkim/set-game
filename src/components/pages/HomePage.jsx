import React from 'react';

import BoardView from 'components/views/BoardView';
import CardView from 'components/views/CardView';

export default class HomePage extends React.Component {
    render() {
        return (
            <div className="HomePage">
                <BoardView />
            </div>
        );
    }
}

export default HomePage;
