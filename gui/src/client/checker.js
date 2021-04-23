import React from 'react';
import { Button, Form, Modal, Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import './css/base.css';
import Camera from './camera';
import QRCode from "react-qr-code";
import QrReader from 'react-qr-reader'
import moment from 'moment'

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
            imagebg: "normal",
            status: "",
            patient: null,
            vaccinationDate: "",
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
        this.refImageBack = React.createRef();

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

                    if (response.patient && response.photo) {
                        this.refImage.current.src = response.photo
                    } else {
                        this.refImage.current.src = 'img/photo.jpg'
                    }

                    if (response.patient && response.isValid) {



                        this.setState({ 
                            patient: response.patient,
                            name: response.patient.name,
                            imagebg: 'approved',
                            status: 'Approved',
                            vaccinationDate: moment(response.patient.vaccinationDate, 'YYYY-MM-DD').format('LL')
                        })
                    } else if(response.patient && !response.isValid){
                        this.setState({ 
                            patient: response.patient,
                            name: response.patient.name,
                            name: response.patient.name,
                            imagebg: 'waiting',
                            status: 'Waiting',
                        })


                    } else {
                        this.setState({ 
                            patient: null,
                            name: 'Error: Passport not found. If you believe you got this message in error please contact 1-800-555-5555', 
                            errorClass: 'error-patient',
                            imagebg: 'rejected',
                            status: 'Rejected',

                        })
                    }

                })

            })
        }
    }


    render() {
        return (
            <div>
                


                <div className="checker-photo">

                    <img ref={this.refImageBack} src={`img/${this.state.imagebg}.png`} className="checker-img-back" /> 


                    <div className={"checker-form " + this.state.status} >
                        <p><b>Patient: </b>{this.state.name} </p>
                        <p><b>Status: </b><span className="checker-status">{this.state.status}</span> </p>
                        {this.state.patient && this.state.status != 'Waiting'?<p><b>Vaccination date: </b>{this.state.vaccinationDate} </p>: null}
                        {this.state.patient && this.state.status == 'Waiting'? <p>Date of immunity not arrived. Please inform the user to come back at <b>({moment(this.state.patient.inmunityDate, 'YYYY-MM-DD').format('LL')})</b></p> : null}
                    </div>


                    <img ref={this.refImage} src="img/photo.jpg" className="checker-img" /> 

                    {this.state.patient? <QRCode className="checker-qr" size={60} value={this.state.patient.nonceNumber} />: null}

                </div>

                  <div className="checker-buttons">
                        <Button variant="primary" type="submit" onClick={this.onClickReader} title="Reader Qr" block>
                            <span className="material-icons">qr_code_scanner</span> Scan QR Now
                        </Button>
                    </div>


            <br/>
            <br/>
            <br/>

                <Modal show={this.state.showCamera} onHide={this.handleCloseCamera}>
                    <Modal.Header closeButton>
                        <Modal.Title>Take Picture</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="checker-dialog">

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
            </div>
        );
    }
}

export default Checker;