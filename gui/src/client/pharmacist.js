import React from 'react';
import { Button, Form, Modal, Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import './css/base.css';
import Camera from './camera';
import QRCode from "react-qr-code";
import QrReader from 'react-qr-reader'


class Pharmacist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueuser: "",
            valuepassword: "",
            showAlertLogin: false,
            result: 'No result',
        }
        this.handleCamera = this.handleCamera.bind(this);
        this.validateUser = this.validateUser.bind(this);
        this.handleCloseLoginAlert = this.handleCloseLoginAlert.bind(this);
        this.handleScan = this.handleScan.bind(this);
        this.handleError = this.handleError.bind(this);
        this.onChangePhoto = this.onChangePhoto.bind(this);
        this.onClickExplore = this.onClickExplore.bind(this);



        this.refCamera = React.createRef();
        this.refInputFile = React.createRef();
        this.refImage = React.createRef();

    }

    onClickExplore(){
       this.refInputFile.current.click() 
    }

    onChangePhoto(event){

            let file = event.target.files[0]
            var reader = new FileReader();
            
            reader.onload = (e)=> {
          
                var imageData =  e.target.result;

                // let img = $('<img/>')
                // this.imageContainer.html(img)
                // this.inputIcon.val('')

                window.ImageProcesor.base64( imageData, 600).then((data)=>{
                    // img.attr('src', data);

                    this.refImage.current.src = data;

                })
            }

            reader.readAsDataURL(file); 


    }

    handleScan(data){
        if (data) {
          this.setState({
            result: data
          })
        }
    }

    handleError(err){
        console.error(err)
    }


    validateUser(event) {
        event.preventDefault();
        
    }

    handleCloseLoginAlert(evet) {
        this.setState({
            showAlertLogin: false,
        });
    }
    
    handleCamera(evet) {
       this.refCamera.current.startCamera()
    }


    render() {
        return (
            <Container>
                
              <Row>

                <Col md="5">

                    <div className="pharmacist-form" >


                        <Form className="form-patient">
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter user"
                                    onChange={(ev) =>
                                        this.setState({ valueuser: ev.target.value })
                                    }
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter user"
                                    onChange={(ev) =>
                                        this.setState({ valueuser: ev.target.value })
                                    }
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter user"
                                    onChange={(ev) =>
                                        this.setState({ valueuser: ev.target.value })
                                    }
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter user"
                                    onChange={(ev) =>
                                        this.setState({ valueuser: ev.target.value })
                                    }
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter user"
                                    onChange={(ev) =>
                                        this.setState({ valueuser: ev.target.value })
                                    }
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter user"
                                    onChange={(ev) =>
                                        this.setState({ valueuser: ev.target.value })
                                    }
                                />
                            </Form.Group>
                            
                            <Button variant="primary" type="submit" onClick={this.validateUser} block>
                                Sign In
                            </Button>
                        </Form>


                    </div>

                </Col>

                <Col md="6" className="pharmacist-photo">

                    <img ref={this.refImage} src="img/photo.jpg" className="pharmacist-img" /> 

                    <div className="pharmacist-buttons">
                        <Button variant="primary" type="submit" onClick={this.onClickExplore} title="Explore photo" >
                            <span className="material-icons">folder_open</span>
                        </Button>
                        <Button variant="primary" type="submit" onClick={this.validateUser}  title="Take a picture">
                            <span className="material-icons">photo_camera</span>
                        </Button>
                        <Button variant="primary" type="submit" onClick={this.validateUser}  title="Take a picture phone">
                            <span className="material-icons">qr_code_2</span>
                        </Button>
                    </div>

                    <input className="pharmacist-photo-hidden" type="file" ref={this.refInputFile} onChange={this.onChangePhoto} />

                </Col>


                </Row>

                <div className="login-footer">

                </div>



                <Modal show={this.state.showAlertLogin} onHide={this.handleCloseLoginAlert}>
                    <Modal.Header closeButton>
                        <Modal.Title>Take Picture</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <QRCode value="dkjsfajsdfjasjdfjaklsdfklj" />
                        <Camera ref={this.refCamera} />

                        <br/>
                        <br/>
                        <QrReader
                          delay={300}
                          onError={this.handleError}
                          onScan={this.handleScan}
                          style={{ width: '100%' }}
                        />
                        <p>{this.state.result}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseLoginAlert} >Close</Button>
                        <Button variant="primary" onClick={this.handleCamera} >Take Picture</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }
}

export default Pharmacist;