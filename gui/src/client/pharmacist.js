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
            showCamera: false,
            result: 'No result',
            token: 'UywQlzLGGC1SWtwqZfvt71YCJIhOApZXVVscWWoRMMrFYRDCpoD6QzQWJWqpUUefReHcB3Cw3ZWGDykS1oiU6nZWs6FBazRHEDYQsf9GwTWYLYh20ZWsCna4KJNhK8cT',
            typePhoto: null,
        }

        this.handleCamera = this.handleCamera.bind(this);
        this.validateUser = this.validateUser.bind(this);
        this.handleCloseCamera = this.handleCloseCamera.bind(this);
        this.handleScan = this.handleScan.bind(this);
        this.handleError = this.handleError.bind(this);
        this.onChangePhoto = this.onChangePhoto.bind(this);
        this.onClickExplore = this.onClickExplore.bind(this);
        this.handlePhoto = this.handlePhoto.bind(this);
        this.onClickCamera = this.onClickCamera.bind(this);
        this.onClickQr = this.onClickQr.bind(this);
        this.onClickQrReader = this.onClickQrReader.bind(this);
        this.onSavePhoto = this.onSavePhoto.bind(this);


        this.refCamera = React.createRef();
        this.refInputFile = React.createRef();
        this.refImage = React.createRef();

    }

    onSavePhoto(){
        var url = 'https://'+window.location.host.split(':')[0]+':9000/savePhoto';
        var data = {
            token: this.state.result,
            photo: this.refImage.current.src,
        };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {

            
        }).catch(error => console.error('Error:', error))
    }

    onGetPhoto(){
        var url = 'https://'+window.location.host.split(':')[0]+':9000/getPhoto';
        var data = {
            token: this.state.token,
        };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(response => {

            if (response.result=='ok') {
                this.refImage.current.src = response.photo
                this.setState({ showCamera: false })

            } else {
                setTimeout(()=> {

                    this.onGetPhoto()
                }, 2000);
            }
        }).catch(error => console.error('Error:', error))
    }


    onClickCamera() {
        this.setState({ showCamera: true, typePhoto: 'camera' })
    }

    onClickQr() {

        this.onGetPhoto()
        this.setState({ showCamera: true, typePhoto: 'qrcode' })
    }

    onClickQrReader() {
        this.setState({ showCamera: true, typePhoto: 'qrReader' })
    }

    handlePhoto(photo){

        window.ImageProcesor.base64( photo, 600).then((data)=>{
            this.refImage.current.src = data;
        })


    }

    onClickExplore(){
       this.refInputFile.current.click() 
    }

    onChangePhoto(event){

        let file = event.target.files[0]
            if (file) {

            var reader = new FileReader();
            
            reader.onload = (e)=> {
                var imageData =  e.target.result;

                window.ImageProcesor.base64( imageData, 600).then((data)=>{
                    this.refImage.current.src = data;
                })
            }

            reader.readAsDataURL(file); 
        }

    }

    handleScan(data){
        if (data) {
            
            console.log(data)

            this.setState({
                result: data,
                showCamera: false,
            },()=>{
                setTimeout(()=> {
                    this.onClickCamera()
                    console.log("open camera")
                }, 1000);

            })

        }
    }

    handleError(err){
        console.log(err)
    }


    validateUser(event) {
        event.preventDefault();
        
    }

    handleCloseCamera(evet) {
        this.setState({
            showCamera: false,
        });
    }
    
    handleCamera(evet) {
        this.refCamera.current.takeSnapshot()
        this.setState({
            showCamera: false,
        });
    }


    render() {
        return (
            <Container>
                
              <Row>

                {!window.isMobile ?<Col md="5">

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

                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Example select</Form.Label>
                                <Form.Control as="select">
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                </Form.Control>
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

                </Col>:null}

                {!window.isMobile ?<Col md="6" className="pharmacist-photo">

                    <img ref={this.refImage} src="img/photo.jpg" className="pharmacist-img" /> 

                    <div className="pharmacist-buttons">
                        <Button variant="primary" type="submit" onClick={this.onClickExplore} title="Explore photo" >
                            <span className="material-icons">folder_open</span>
                        </Button>
                        <Button variant="primary" type="submit" onClick={this.onClickCamera}  title="Take a picture">
                            <span className="material-icons">photo_camera</span>
                        </Button>
                        <Button variant="primary" type="submit" onClick={this.onClickQr}  title="Take a picture phone">
                            <span className="material-icons">qr_code_2</span>
                        </Button>
                    </div>

                    <input className="pharmacist-photo-hidden" type="file" ref={this.refInputFile} onChange={this.onChangePhoto} />

                </Col>:null}


                 {window.isMobile ?<Col md="6" className="pharmacist-photo">

                    <img ref={this.refImage} src="img/photo.jpg" className="pharmacist-img" /> 

                    <div className="pharmacist-buttons">

                        <Button variant="primary" type="submit" onClick={this.onClickCamera}  title="Take a picture">
                            <span className="material-icons">photo_camera</span>
                        </Button>
                     
                        <Button variant="primary" type="submit" onClick={this.onClickQrReader}  title="Take a picture phone">
                            <span className="material-icons">qr_code_2</span>
                        </Button>

                         <Button variant="success" type="submit" onClick={this.onSavePhoto}  title="Take a picture phone">
                            <span className="material-icons">check</span>
                        </Button>
                    </div>

                    <input className="pharmacist-photo-hidden" type="file" ref={this.refInputFile} onChange={this.onChangePhoto} />

                </Col>:null}




                </Row>

                <div className="login-footer">

                </div>



                <Modal show={this.state.showCamera} onHide={this.handleCloseCamera}>
                    <Modal.Header closeButton>
                        <Modal.Title>Take Picture</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="pharmacist-dialog">

                        {this.state.typePhoto == 'qrcode'? <QRCode value={this.state.token} />: null}
                        {this.state.typePhoto == 'camera'? <Camera ref={this.refCamera} onPhoto={this.handlePhoto} />: null}
                        {this.state.typePhoto == 'qrReader'? <QrReader
                          delay={300}
                          onError={this.handleError}
                          onScan={this.handleScan}
                          style={{ width: '100%' }}
                        />: null}
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseCamera} >Close</Button>
                        {this.state.typePhoto == 'camera'?<Button variant="primary" onClick={this.handleCamera} >Take Picture</Button>: null}
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }
}

export default Pharmacist;