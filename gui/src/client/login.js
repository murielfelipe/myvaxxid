import React from 'react';
import { Button, Form, Modal, Container, Navbar, Nav } from 'react-bootstrap';
import './css/base.css';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueuser: "client1",
            valuepassword: "client1",
            showAlertLogin: false,
        }
        this.validateUser = this.validateUser.bind(this);
        this.handleCloseLoginAlert = this.handleCloseLoginAlert.bind(this);
    }

    validateUser(event) {
        event.preventDefault();
        if (this.state.valueuser !== '') {
            var url = 'https://'+window.location.host.split(':')[0]+':9000/login';
            var data = {
                username: this.state.valueuser,
                password: this.state.valuepassword
            };

            fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => {
                    console.log("OOPS", err);
                    if (err.status === 401) {
                        console.log("nailed it");
                    }
                })
                .then(res => {
                    if (res.status === 401) { // Unauthorized
                        this.setState({ showAlertLogin: true });
                        return;
                    }
                    return res.json();
                })
                .then(response => {

                    if (response.error !== 'Invalid user') {
                        if (response.loggedinuser === this.state.valueuser) {
                            console.log(`User '${response.loggedinuser}' logged in`);
                        }
                        if (this.props.onlogin) {
                            localStorage.userValue = this.state.valueuser;
                            localStorage.token = response.token;

                            this.props.onlogin();
                        }
                    } else {
                        this.setState({ showAlertLogin: true });
                    }
                })
                .catch(error => console.error('Error:', error))
            ;
        }
    }

    handleCloseLoginAlert(evet) {
        this.setState({
            showAlertLogin: false,
        });
    }

    render() {
        return (
            <Container>

                <div className="container-logo" >

                    <img className="logo-login" src="logo.png" alt="Logo"/>

                    <Form className="marginTop15">
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter user" value="client1"
                                onChange={(ev) =>
                                    this.setState({ valueuser: ev.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" autoComplete="ignore" value="client1"
                                onChange={(ev) =>
                                    this.setState({ valuepassword: ev.target.value })
                                }
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.validateUser} block>
                            Sign In
                        </Button>
                    </Form>

                </div>

                <div className="login-footer">
                
                </div>



                <Modal show={this.state.showAlertLogin} onHide={this.handleCloseLoginAlert}>
                    <Modal.Header closeButton>
                        <Modal.Title>Transaction rejected</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Invalid user and/or password</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseLoginAlert} >
                            Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }
}

export default Login;