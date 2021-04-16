import React from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import Login from "./client/login"
import Services from "./client/services"
import "./client/css/base.css";

class App  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      panel: <Login onlogin={this.services.bind(this)}/>
    }

    window.logout = this.logout.bind(this)
}
  services(){
    this.setState({panel: <Services />})
  }

  logout(){
    delete localStorage.token
    this.setState({panel: <Login onlogin={this.services.bind(this)}/>})
  }

  render() { 
  return (
    <Container fluid="md" style={{marginTop: "25px"}}>
      <Row style={{background: "#"}} >
          <Col style={{display: "inline-flex"}}>
          </Col><Col style={{
                      display: "contents",
                  }}>
             
          </Col>
      </Row>
      <div>
          {this.state.panel}
      </div>
    </Container>
    );
  }
}

export default App;
