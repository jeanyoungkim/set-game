import React, {PropTypes} from 'react';
import 'styles/views/BoardView.scss';

import {connect} from 'react-redux';

import {default as api} from 'api/ForgotPasswordApi';
import CardView from 'components/views/CardView';

export default class BoardView extends React.Component {

    static defaultProps = api.getSetData();

    // getGameData = () => {
    //     var data = api.getSetData();
    //     return data;
    // }

    render() {
        var data = api.getSetData();
        var cardData = this.props.puzzle_data;

        var cards = cardData.map(function(p) {
            return <CardView data={p} />
        });

        return (
            <div className="board">
            {cards}
            </div>
        );
    }
}
