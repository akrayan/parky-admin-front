import React, { Component } from 'react';
import {
    Button,
    Spinner,
    ModalBody, Modal, ModalHeader,
} from 'reactstrap';
import { observable,  } from 'mobx'
import { observer, } from 'mobx-react'

const RequestButton = observer(class RequestButton extends Component {

    modal = observable({val : 0});


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errorMsg !== null && this.modal.val !== 2) {
            this.modal.val = 1;
        }
    }

    render() {
        /*return (
            <div>
                <Modal isOpen={this.modal.val && this.props.errorMsg != null} toggle={() => {this.modal.val = !this.modal.val; this.props.errorMsg = null}} >
                    <ModalHeader className="bg-danger" toggle={() => {this.modal.val = !this.modal.val; this.props.errorMsg = null}}>Erreur</ModalHeader>
                    <ModalBody>
                        {this.props.errorMsg}
                    </ModalBody>
                </Modal>
                {
                    this.props.status === "Loading" ?
                    <Spinner color="primary" />
                    : this.props.status === "Success" ?
                    <Button color="success" className="px-4" disabled>Succès</Button>
                    : <Button onClick={this.props.action} color="primary" className="px-4">{this.props.text}</Button>
                }
            </div>
        )*/

        if (this.props.status === "Loading")
            return (<Spinner  color={this.props.color} />);
        else if (this.props.status === "Success")
            return (<Button style={this.props.style} onClick={this.props.action} color="success" className="px-4" disabled>Succès</Button>);
        else if (this.props.status === "Echec" && this.props.btnId === this.props.id)
            return (
                <div>
                    <Modal isOpen={this.modal.val === 1} toggle={() => this.modal.val = 2} >
                        <ModalHeader className="bg-danger" toggle={() => this.modal.val = 2}>Erreur</ModalHeader>
                        <ModalBody>
                            {this.props.errorMsg != null ? this.props.errorMsg : ""}
                        </ModalBody>
                    </Modal>
                    <Button block={this.props.block} disabled={this.props.disabled} style={this.props.style} onClick={() => {this.props.action(); this.modal.val = 0}} color={this.props.color} className={"px-4 " + this.props.className}>{this.props.text}{this.props.children}</Button>
                </div>
            );
        else
            return (<Button block={this.props.block} disabled={this.props.disabled} style={this.props.style} onClick={this.props.action} color={this.props.color} className={"px-4 " + this.props.className}>{this.props.text}{this.props.children}</Button>);
    }
})

export default RequestButton;