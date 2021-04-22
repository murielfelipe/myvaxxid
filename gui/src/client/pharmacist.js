import React from 'react';
import { Button, Form, Modal, Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import './css/base.css';
import Camera from './camera';
import QRCode from "react-qr-code";
import QrReader from 'react-qr-reader'
import SaveAltIcon from '@material-ui/icons/SaveAlt';


import Ws from './../webservice';


class Pharmacist extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // form
            valuename: "",
            valuecardid: "",
            valueemail: "",
            valuephone: "",
            valuebirth: "",
            valuevaccine: "",
            valueuser: "",
            valuelotnumber: "",

            // end form
            showCamera: false,
            result: 'No result',
            token: 'UywQlzLGGC1SWtwqZfvt71YCJIhOApZXVVscWWoRMMrFYRDCpoD6QzQWJWqpUUefReHcB3Cw3ZWGDykS1oiU6nZWs6FBazRHEDYQsf9GwTWYLYh20ZWsCna4KJNhK8cT',
            typePhoto: null,
            vaccines: [],

        }

        this.handleCamera = this.handleCamera.bind(this);
        this.saveVaccineData = this.saveVaccineData.bind(this);
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
        this.cancel = this.cancel.bind(this);

        this.refCamera = React.createRef();
        this.refInputFile = React.createRef();
        this.refImage = React.createRef();

    }


    componentDidMount(){
       this.onGetVaccine()
    }

    componentWillUnmount(){

    }

    onSavePhoto(){

        Ws('pharmacist/savePhoto', {
            token: this.state.result,
            photo: this.refImage.current.src,
        })
    }

    cancel(){

        this.setState({
            valuename: "",
            valuecardid: "",
            valueemail: "",
            valuephone: "",
            valuebirth: "",
            valuevaccine: "",
            valueuser: "",
            valuelotnumber: "",
        })
        this.refImage.current.src = "img/photo.jpg";


    }

    onGetPhoto(){

        Ws('pharmacist/getPhoto', {
            token: this.state.token,
        }).then(response => {

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

    onGetVaccine(){

        Ws('pharmacist/getVaccine', {}).then(response => {

            this.setState({vaccines: response.vaccines})
        })
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


    saveVaccineData(event) {
        event.preventDefault();


        Ws('pharmacist/saveData', {
            valuename: this.state.valuename,
            valuecardid: this.state.valuecardid,
            valueemail: this.state.valueemail,
            valuephone: this.state.valuephone,
            valuebirth: this.state.valuebirth,
            valuevaccine: this.state.valuevaccine,
            valuelotnumber: this.state.valuelotnumber,

            valuephoto: this.refImage.current.src,
            token: this.state.token,
        }).then(response => {

            if (response.result=='ok') {
               
               alert("Success! The patients informed has been submitted to the blockchain")


            }
              
        })





        
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
                            <p className="subtitle">Patient</p>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter user"
                                    value={this.state.valuename}
                                    onChange={(ev) =>
                                        this.setState({ valuename: ev.target.value })
                                    }
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Health card ID</Form.Label>
                                <Form.Control type="number" placeholder="Enter user"
                                    value={this.state.valuecardid}
                                    onChange={(ev) =>
                                        this.setState({ valuecardid: ev.target.value })
                                    }
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter user"
                                    value={this.state.valueemail}
                                    onChange={(ev) =>
                                        this.setState({ valueemail: ev.target.value })
                                    }
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="number" placeholder="Enter user"
                                    value={this.state.valuephone}
                                    onChange={(ev) =>
                                        this.setState({ valuephone: ev.target.value })
                                    }
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Date of bird</Form.Label>
                                <Form.Control type="date" placeholder="Enter user"
                                    value={this.state.valuebirth}
                                    onChange={(ev) =>
                                        this.setState({ valuebirth: ev.target.value })
                                    }
                                />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Product name</Form.Label>
                                <Form.Control as="select"
                                    value={this.state.valuevaccine}
                                    onChange={(ev) =>
                                        this.setState({ valuevaccine: ev.target.value })
                                    }
                                >
                                    <option value={0}></option>

                                    {
                                        this.state.vaccines.map((vaccine)=>{
                                            return <option value={vaccine.id} key={vaccine.id}>{vaccine.productName}</option>
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Lot number</Form.Label>
                                <Form.Control type="text" placeholder="Enter user"
                                    value={this.state.valuelotnumber}
                                    onChange={(ev) =>
                                        this.setState({ valuelotnumber: ev.target.value })
                                    }
                                />
                            </Form.Group>

                            
                            <Button variant="default" className="btn-center"  onClick={this.cancel} >
                                Clear  <span className="material-icons">close</span>
                            </Button>

                              <Button className="btnbackground btn-center" variant="primary"  onClick={this.saveVaccineData} >
                                Save <SaveAltIcon></SaveAltIcon>
                            </Button>
                        </Form>


                    </div>

                </Col>:null}

                {!window.isMobile ?<Col md="6" className="pharmacist-photo">

                    <img ref={this.refImage} src="img/photo.jpg" className="pharmacist-img" /> 

                    <div className="pharmacist-buttons">
                        <Button className="btnbackground" variant="primary" type="submit" onClick={this.onClickExplore} title="Explore photo" >
                            <span className="material-icons">folder_open</span>
                        </Button>
                        <Button className="btnbackground" variant="primary" type="submit" onClick={this.onClickCamera}  title="Take a picture">
                            <span className="material-icons">photo_camera</span>
                        </Button>
                        <Button className="btnbackground" variant="primary" type="submit" onClick={this.onClickQr}  title="Take a picture phone">
                            <span className="material-icons">qr_code_2</span>
                        </Button>
                    </div>

                    <input className="pharmacist-photo-hidden" type="file" ref={this.refInputFile} onChange={this.onChangePhoto} />

                </Col>:null}


                 {window.isMobile ?<Col md="6" className="pharmacist-photo">

                    <img ref={this.refImage} src="img/photo.jpg" className="pharmacist-img" /> 

                    <div className="pharmacist-buttons">

                        <Button className="btnbackground" variant="primary" type="submit" onClick={this.onClickCamera}  title="Take a picture">
                            <span className="material-icons">photo_camera</span>
                        </Button>
                     
                        <Button className="btnbackground" variant="primary" type="submit" onClick={this.onClickQrReader}  title="Take a picture phone">
                            <span className="material-icons">qr_code_2</span>
                        </Button>

                         <Button className="btnbackground" variant="success" type="submit" onClick={this.onSavePhoto}  title="Take a picture phone">
                            <span className="material-icons">check</span>
                        </Button>
                    </div>

                    <input className="pharmacist-photo-hidden" type="file" ref={this.refInputFile} onChange={this.onChangePhoto} />

                </Col>:null}



                </Row>



                <br/>
                <br/>
                <br/>

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