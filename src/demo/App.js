/* eslint no-magic-numbers: 0 */
import React, {Component} from 'react';

import { MoonThreejs } from '../lib';

class App extends Component {

    constructor() {
        super();
        this.state = {
            id: "test",
            radius: 500,
            ntrees: 2000,
            nforests: 4,
            height: 8
        };
        this.setProps = this.setProps.bind(this);
    }

    setProps(newProps) {
        this.setState(newProps);
    }

    render() {
        return (
            <div>
                <MoonThreejs
                    setProps={this.setProps}
                    {...this.state}
                />
            </div>
        )
    }
}

export default App;
