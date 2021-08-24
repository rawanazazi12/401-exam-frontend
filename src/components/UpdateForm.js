import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export class UpdateForm extends Component {
    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Flower</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form onSubmit={(e)=>this.props.submitUpdateForm(e)}>
                            <Form.Group  className="mb-3" controlId="">
                                <Form.Label >Flower Name</Form.Label>
                                <Form.Control defaultValue={this.props.name} name="name" type="text" placeholder="Enter Flower Name" />                              
                            </Form.Group>
                            <Form.Group  className="mb-3" controlId="">
                                <Form.Label >Flower Url</Form.Label>
                                <Form.Control name="image" defaultValue={this.props.photo} type="url" placeholder="Enter Flower Url" />                              
                            </Form.Group>
                            <Form.Group  className="mb-3" controlId="">
                                <Form.Label >Flower Instructions</Form.Label>
                                <Form.Control name="instructions" defaultValue={this.props.instructions} type="text" placeholder="Enter Flower Instructions" />                              
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default UpdateForm
