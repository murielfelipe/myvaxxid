import React from 'react';
import { Container,Navbar, Nav,Button} from 'react-bootstrap';
import './css/base.css';
import Pharmacist from "./pharmacist"
import Checker from "./checker"
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

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


    componentDidMount(){
       
       if (this.props.gui == 'patient') {
          this.setState({panel: <Pharmacist/>})
       }

        if (this.props.gui == 'check') {
          this.setState({panel: <Checker/>})
       }
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

                    <label></label>
                    <Button className="btn-logout" variant="primary" onClick={this.logout} >
                        <ExitToAppOutlinedIcon>Sign out</ExitToAppOutlinedIcon>
					</Button>
                </div>

                {/*<Nav className="services-navigation">
                    <a className="navLink" href='#' onClick={this.clickmenu.bind(this, "pharmacist")}>Pharmacist</a>
                    <a className="navLink" href='#' onClick={this.clickmenu.bind(this, "otro")}>Otro</a>
                </Nav>*/}
                <div>
                    {this.state.panel}
                </div>
          </Container>
        );
    }    
}
export default Services;