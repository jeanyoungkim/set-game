import React from 'react';

import TodosView from 'components/views/TodosView';
import AuthView from 'components/views/AuthView';
import NavigationView from 'components/views/NavigationView';


class HomePage extends React.Component {

    render() {
        return (
            <div className="HomePage">
                Home! &nbsp;
                <NavigationView />


                <AuthView/>

                <TodosView />
            </div>
        );
    }
}

export default HomePage;
