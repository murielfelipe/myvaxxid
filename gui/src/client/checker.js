import React from 'react';
import { Button, Form, Modal, Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import './css/base.css';
import Camera from './camera';
import QRCode from "react-qr-code";
import QrReader from 'react-qr-reader'

import Ws from './../webservice';


class Checker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // form
            name: null,
            valuecardid: "",
            valueemail: "",
            valuephone: "",
            valuebirth: "",
            valuevaccine: "",
            valueuser: "",
            valuelotnumber: "",
            errorClass: "",

            // end form
            showCamera: false,
            result: 'No result',
            typePhoto: null,

        }

        this.handleCloseCamera = this.handleCloseCamera.bind(this);
        this.handleScan = this.handleScan.bind(this);
        this.handleError = this.handleError.bind(this);
        this.onClickReader = this.onClickReader.bind(this);

        this.refImage = React.createRef();

    }


    componentDidMount(){
    }

    componentWillUnmount(){

    }

    handleCloseCamera(evet) {
        this.setState({
            showCamera: false,
        });
    }

    handleError(err){
        console.log(err)
    }



    onClickReader(){
        this.setState({ showCamera: true, typePhoto: 'qrReader' })
       
    }

   
    handleScan(data){
        if (data) {
            
            console.log(data)

            this.setState({
                result: data,
                showCamera: false,
            },()=>{
                Ws('checker/vaccine', {token: data}).then(response => {

                    if (response.photo) {
                        this.refImage.current.src = response.photo
                    } else {
                        this.refImage.current.src = 'img/photo.jpg'
                    }

                    if (response.patient) {
                        this.setState({ name: response.patient.name })
                    } else {
                        this.setState({ name: 'Error: Passport not found. If you believe you got this message in error please contact 1-800-555-5555', errorClass: 'error-patient' })
                    }

                })

            })

        }
    }


    render() {
        return (
            <Container>
                
              <Row>

                <Col md="5">

                    <div className="pharmacist-form" >


                        <Form className="form-patient">
                            <p className="subtitle">Patient</p>
                            <p><b>Patient: </b>{this.state.name} </p>
                            <br/>
                            <br/>
                            
                        </Form>


                    </div>

                </Col>

                <Col md="6" className="pharmacist-photo">

                    {this.state.name? 
                    <div className={ 'pharmacist-check ' + this.state.errorClass} >
                    </div>:null}


                    <img ref={this.refImage} src="img/photo.jpg" className="pharmacist-img" /> 

                    <div className="pharmacist-buttons">
                        <Button variant="primary" type="submit" onClick={this.onClickReader} title="Reader Qr" >
                            <span className="material-icons">qr_code_scanner</span>
                        </Button>
                    </div>

                </Col>

            </Row>

            <br/>
            <br/>
            <br/>

                <Modal show={this.state.showCamera} onHide={this.handleCloseCamera}>
                    <Modal.Header closeButton>
                        <Modal.Title>Take Picture</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="pharmacist-dialog">

                        <QrReader
                          delay={300}
                          onError={this.handleError}
                          onScan={this.handleScan}
                          style={{ width: '100%' }}
                        />
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseCamera} >Close</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }
}

export default Checker;