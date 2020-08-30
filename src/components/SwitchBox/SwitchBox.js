import React, { Component } from 'react';

import './SwitchBox.css'
import { observer } from 'mobx-react'


const SwitchBox = observer(class SwitchBox extends Component {


    render() {
        return (
            <div >
                <label className="switch" >
                    <input disabled={this.props.disabled} type="checkbox" checked={this.props.checked} onChange={this.props.onChange} />
                    <span className="slider round"></span>
                </label>
            </div>
        );
    }
});

export default SwitchBox;