import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Jumbotron, Button} from 'react-bootstrap';
import IntroInfo from './IntroInfo.js';

class Intro extends Component {

    

    render(){

        const jumbotronStyle = {
            background: 'white',
            opacity: '.8'
          };


        return(
            <Jumbotron style={jumbotronStyle} className="Jumbotron">
                <h1>Innovation Investors Only! <span role="img">&#128581;</span> </h1>
                <p>
                    For the fans and followers of <a href="https://ark-invest.com/" rel="noopener noreferrer" target="_blank">Ark Invest</a> <span role="img">&#x1f680;</span>
                </p>
                <p>
                    {!this.props.displayIntro && <Button onClick={this.props.toggle} variant="primary">Learn more</Button>}
                    {this.props.displayIntro && <IntroInfo toggle={this.props.toggle}/>}
                </p>

            </Jumbotron>
        )
    }
}


export default Intro;
