import React from 'react';
import { Container,Navbar, Nav,Button} from 'react-bootstrap';
import './css/base.css';
import Pharmacist from "./pharmacist"


class Services  extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            profile: "",
            panel: <Pharmacist />
        }
        this.clickmenu = this.clickmenu.bind(this);
        this.logout = this.logout.bind(this);
    }

    clickmenu(key){
        if(key === 'pharmacist' ){
          this.setState({panel: <Pharmacist/>})
        }
       
    }

    logout() {
        window.logout()
    }

    render() { 
        return ( 
            <Container>

              <div className="pharmacist-header" >
                    <img className="logo-login" src="logo.png" alt="Logo"/>

                    <label>Myvaxxid</label>

                    <Button className="btn-logout" variant="primary"  onClick={this.logout} >
                            Sign out
                    </Button>
                </div>

                <Nav className="services-navigation">
                    <a className="navLink" href='#' onClick={this.clickmenu.bind(this, "pharmacist")}>Pharmacist</a>
                    <a className="navLink" href='#' onClick={this.clickmenu.bind(this, "otro")}>Otro</a>
                </Nav>
                <div>
                    {this.state.panel}
                </div>
          </Container>
        );
    }    
}
export default Services;