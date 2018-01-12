import React, { createClass } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Home from 'app/components/Home';

const App = createClass({
    displayName: 'App',

    render() {
        const Component = typeof window === 'undefined' ? 'div' : BrowserRouter;

        return (
            <Component>
                <Route exact path="/" component={Home}/>
            </Component>
        );
    }
});

export default App;
