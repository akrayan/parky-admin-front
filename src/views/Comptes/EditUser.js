import React, { Component } from 'react';
import {
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Input,
    Label,
    Row,
    Col
} from 'reactstrap';
import { observer } from 'mobx-react'

import { store, checkIsEmpty } from '../../stores/AccountStore'
import { roleStore } from '../../stores/RoleStore'
import request from '../../apiRequest/UsersRequest'
import userStore from '../../stores/UserStore'
import RequestButton from "../../components/RequestButton"


const EditUser = observer(class EditUser extends Component {


    editUser = () => {
        store.user.birthdate = this.formatDate(Date.now());
        if (!checkIsEmpty()) {
            store.modal = !store.modal;
            request.post();
        }
    }

    render() {
        return (
            <Modal isOpen={store.editModal}>
                <ModalHeader >{store.user.username}</ModalHeader>
                <ModalBody>
                    <Col>
                        <Row style={{ justifyContent: "space-between", margin: 20 }}>Nom d'utilisateur: <strong>{store.user.username}</strong></Row>
                        <Row style={{ justifyContent: "space-between", margin: 20 }}>E-mail: <strong>{store.user.email}</strong></Row>
                        <Row style={{ justifyContent: "space-between", margin: 20 }}>Date d'inscription: <strong>{new Date(store.user.birthdate).toLocaleDateString('fr-FR')}</strong></Row>
                        <Row style={{ justifyContent: "space-between", margin: 20 }}>
                            <Label >Role:</Label>
                            <Input disabled={!userStore.state.permission.editUser} type="select" style={{ maxWidth: 150 }} value={store.roleId + " : " + store.role} onChange={(e) => {
                                console.log(e.target.value)
                                let d = e.target.value.split(" : ");
                                console.log(d)
                                store.roleId = parseInt(d[0]);
                                store.role = d[1];
                            }}>
                                {
                                    roleStore.listRole.map((item, id) => <option key={id.toString()}>{item.id + " : " + item.name}</option>)
                                }
                            </Input>
                            <RequestButton disabled={!userStore.state.permission.editUser} errorMsg={store.errMsg} status={store.status} btnId={store.btnId} id={1} color="primary" action={() => request.put()}>Valider Role</RequestButton>
                        </Row>
                    </Col>
                </ModalBody>
                <ModalFooter>
                    <RequestButton disabled={!userStore.state.permission.deleteUser} errorMsg={store.errMsg} status={store.status} btnId={store.btnId} id={2} color="danger" action={() => { if (window.confirm("Etes-vous sûr de vouloir supprimer cet utilisateur ?")) request.delet() }}>Supprimer</RequestButton>{' '}
                    <RequestButton errorMsg={store.errMsg} status={store.status} btnId={store.btnId} color="secondary" action={() => { store.editModal = false }}>Retour</RequestButton>
                </ModalFooter>
            </Modal>
        )
    }
})

export default EditUser;