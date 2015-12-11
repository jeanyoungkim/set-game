import React from 'react';
import 'styles/layouts/DefaultLayout.scss';
import DefaultHeader from 'components/views/DefaultHeader';
import DefaultFooter from 'components/views/DefaultFooter';

export default class DefaultLayout extends React.Component {
    static propTypes = {
        children: React.PropTypes.node
    };

    render() {
        return (
            <div className="DefaultLayout">
                <DefaultHeader />

                <main>
                    {this.props.children}
                </main>

                <DefaultFooter />
            </div>
        );
    }
}
