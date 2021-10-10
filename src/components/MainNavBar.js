import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Button} from 'react-bootstrap';

class MainNavBar extends Component {

    render(){


        const navStyle = {
            textalign : 'center',
          
          };

        const buttonStyle = {
            background: 'white',
            opacity: '.8', 
            color: 'black'
      
          }

        return(
          <div style={navStyle}>
            <Nav fill  defaultActiveKey="/home">
              <Nav.Item>
                <p className="navbardesc">All Stocks</p>
                <Nav.Link><Button onClick={this.props.handler} style={buttonStyle}>All</Button></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <p className="navbardesc">Disruptive Innovation</p>
                <Nav.Link><Button onClick={this.props.handler} style={buttonStyle}>ARKK</Button></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <p className="navbardesc">Genomic Revolution</p>
                <Nav.Link onClick={this.props.handler}><Button style={buttonStyle}>ARKG</Button></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <p className="navbardesc">Fintech Innovation</p>
                <Nav.Link onClick={this.props.handler}><Button style={buttonStyle}>ARKF</Button></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <p className="navbardesc">Next Generation Internet</p>
                <Nav.Link onClick={this.props.handler} ><Button style={buttonStyle}>ARKW</Button></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <p className="navbardesc">Autonomous Tech and Robots</p>
                <Nav.Link onClick={this.props.handler} ><Button style={buttonStyle}>ARKQ</Button></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <p className="navbardesc">3D Printing</p>
                <Nav.Link onClick={this.props.handler} ><Button style={buttonStyle}>PRINT</Button></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <p className="navbardesc">Israel Innovation</p>
                <Nav.Link onClick={this.props.handler}><Button style={buttonStyle}>IZRL</Button></Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        )
    }
}


export default MainNavBar;
