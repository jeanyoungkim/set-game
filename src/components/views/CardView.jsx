import React, {PropTypes} from 'react';
import 'styles/views/CardView.scss';

import {connect} from 'react-redux';
import {default as api} from 'api/ForgotPasswordApi';

export default class CardView extends React.Component {

    clickHandler = (event) => {
        console.log(this.props.data);
    }

    render() {
        var data = this.props.data;

        var cardContent = [];

        for(var i=0; i < data.number; i++) {
            cardContent.push('<div class="' 
                + data.shape 
                + ' '
                + data.color
                + ' '
                + data.pattern
                + '"></div>');
        }

        var cardContentString = cardContent.join('');

        return (
            <div className="card" onClick={this.clickHandler} dangerouslySetInnerHTML={{__html: cardContentString}}>
                
            </div>
        );
    }
}
