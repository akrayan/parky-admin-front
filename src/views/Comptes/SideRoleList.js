import React, { Component } from 'react';
import './Comptes.css'
import { observer } from 'mobx-react'
import { ListGroup, ListGroupItem, } from 'reactstrap';
import { roleStore, updateSelection } from "../../stores/RoleStore"

const SideRoleList = observer(class SideRoleList extends Component {


    render() {
        return (
            <ListGroup flush>
                {
                    roleStore.listRole.map((item, id) =>
                        <ListGroupItem key={id.toString()} style={{fontWeight: 'bold'}} active={item.id === roleStore.selectedRole.id} tag="button" action onClick={
                            () => {
                                updateSelection(item);
                            }}>
                            {item.name}
                         </ListGroupItem>)
                }
            </ListGroup>
        );
    }
});

export default SideRoleList;