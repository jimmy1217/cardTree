import React, { Component } from 'react';
import CardTree from './components/CardTree/';

class Root extends Component {
    render() {
        return (
            <div className="container-fluid">
                <CardTree />
            </div>
        );
    }
}

export default Root;