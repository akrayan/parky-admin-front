import React, {
    Component
} from 'react';
import './Comptes.css'
import {
    Input,
    CardBody,
    Row,
    Col,
} from "reactstrap";
import { observer } from 'mobx-react'

import SwitchBox from '../../components/SwitchBox'
import { roleStore } from '../../stores/RoleStore';
import userStore from '../../stores/UserStore'

import SideRoleList from './SideRoleList'
import request from '../../apiRequest/RolesRequest';
import RequestButton from '../../components/RequestButton'

var nameRule = {
    User: "Utilisateurs",
    Role: "Roles",
    Bollard: "Quartiers",
    Ticket: "Tickets",
    News: "Actualités",
    Offence: "Infractions",
}

var Rule = observer(class Rule extends Component {

    render() {
        return (
            <Row className="SupRuleRow">
                <Col>
                    <Row ><h5>{nameRule[this.props.content]}</h5></Row>
                    <Row className="RuleRow" >
                        {this.props.r ?

                            <Row className="SubRuleRow">
                                <Col>Voir :</Col>
                                <SwitchBox disabled={!userStore.state.permission.editRole} checked={roleStore.selectedRole.permissions["read" + this.props.content]}
                                    onChange={(e) => roleStore.selectedRole.permissions["read" + this.props.content] = !roleStore.selectedRole.permissions["read" + this.props.content]} />
                            </Row >
                            : <div style={{width: 100, height:10}} className="SubRuleRow"/>}
                        {this.props.a ?

                            <Row className="SubRuleRow" >
                                <Col>Ajouter :</Col>
                                <SwitchBox disabled={!userStore.state.permission.editRole} checked={roleStore.selectedRole.permissions["add" + this.props.content]}
                                    onChange={(e) => roleStore.selectedRole.permissions["add" + this.props.content] = !roleStore.selectedRole.permissions["add" + this.props.content]} />
                            </Row >
                            : <div style={{width: 100, height:10}} className="SubRuleRow"/>}
                        {this.props.e ?
                            <Row className="SubRuleRow" >
                                <Col>Modifier :</Col>
                                <SwitchBox disabled={!userStore.state.permission.editRole} checked={roleStore.selectedRole.permissions["edit" + this.props.content]}
                                    onChange={(e) => roleStore.selectedRole.permissions["edit" + this.props.content] = !roleStore.selectedRole.permissions["edit" + this.props.content]} />
                            </Row >
                            : <div style={{width: 100, height:10}} className="SubRuleRow"/>}
                        {this.props.d ?
                            <Row className="SubRuleRow" >
                                <Col>Supprimer :</Col>
                                <SwitchBox disabled={!userStore.state.permission.editRole} checked={roleStore.selectedRole.permissions["delete" + this.props.content]}
                                    onChange={(e) => roleStore.selectedRole.permissions["delete" + this.props.content] = !roleStore.selectedRole.permissions["delete" + this.props.content]} />
                            </Row >
                            : <div style={{width: 100, height:10}} className="SubRuleRow" ></div>}
                    </Row>
                </Col>
            </Row>
        )
    }
})

const RolePane = observer(class RolePane extends Component {

    render() {
        return (
            <CardBody >
                <Row>
                    <Col className="ListRoleCol">

                        <RequestButton block disabled={!userStore.state.permission.addRole} errorMsg={roleStore.errMsg} status={roleStore.status} btnId={roleStore.btnId} id={0} className="btn-square" color="light" action={() => request.post()}>
                            <Row style={{ justifyContent: "space-between", paddingLeft: 10, paddingRight: 10 }} >
                                <div>Role</div>
                                <i className="icon-plus align-self-center"></i>
                            </Row>
                        </RequestButton>

                        <SideRoleList />
                    </Col>
                    {
                        roleStore.listRole.length === 0 ?
                            <h3>Auncun rôle existant</h3>
                            :
                            <Col className="RoleCol">

                                <Row className="SupRuleRow First">
                                    <Col>
                                        <Row><h5>Nom du Rôle</h5></Row>
                                        <Input disabled={!userStore.state.permission.editRole} type="text" invalid={roleStore.selectedRole.name === ""} value={roleStore.selectedRole.name} onChange={(e) => roleStore.selectedRole.name = e.target.value} />
                                    </Col>
                                </Row>
                                <Rule content="User" r a e d />
                                <Rule content="Role" r a e d />
                                <Rule content="Bollard" r a e d />
                                <Rule content="News" r a e d />
                                <Rule content="Ticket" r a e />
                                <Rule content="Offence" r />
                                <Row style={{ justifyContent: "center", paddingTop: 20 }}>
                                    <RequestButton errorMsg={roleStore.errMsg} status={roleStore.status} disabled={!userStore.state.permission.editRole} btnId={roleStore.btnId} id={1} style={{ margin: 5 }} color="primary" action={() => { request.put() }}>Valider</RequestButton>
                                    <RequestButton errorMsg={roleStore.errMsg} status={roleStore.status} disabled={!userStore.state.permission.deleteRole} btnId={roleStore.btnId} id={2} style={{ margin: 5 }} color="danger" action={() => { if (window.confirm("Etes-vous sûr de vouloir supprimer ce rôle ?"))request.delet() }}>Supprimer</RequestButton>
                                </Row>

                            </Col>
                    }
                </Row>
            </CardBody >
        );
    }
});

export default RolePane;
