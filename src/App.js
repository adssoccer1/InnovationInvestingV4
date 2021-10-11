import React, {Component} from 'react';
import './App.css';
import Fund from './components/Fund.js';
import FundHeader from './components/FundHeader.js';
import Intro from './components/Intro.js';
import MainNavBar from './components/MainNavBar.js';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Modal, Button} from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props); 

    this.state = {
      isLoggedIn : false,
      logginPopUp : false,
      date : "",
      displayFund : "ARKK",
      sortBy: "Largest Position by Weight", 
      fundHoldings: { "All":{"sortBy" : "Largest Position by Weight", "holdings" : []},
       "ARKK" : {"sortBy" : "Largest Position by Weight", "holdings" : []}, 
       "ARKG": {"sortBy" : "Largest Position by Weight", "holdings" : []},
        "ARKF":{"sortBy" : "Largest Position by Weight", "holdings" : []}, 
        "ARKW":{"sortBy" : "Largest Position by Weight", "holdings" : []},
         "ARKQ":{"sortBy" : "Largest Position by Weight", "holdings" : []},
          "PRINT":{"sortBy" : "Largest Position by Weight", "holdings" : []},
           'IZRL':{"sortBy" : "Largest Position by Weight", "holdings" : []}},
      holdings : [],
      displayIntro : false
    }
    this.onSignIn = this.onSignIn.bind(this);
    this.toggleDisplayIntro = this.toggleDisplayIntro.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.changeSortBy = this.changeSortBy.bind(this);
    this.changeFund = this.changeFund.bind(this);


  }




  
  componentDidMount() {
    this.getData(() => {

    }); 
  }

  getData() {

    const fund = this.state.displayFund;
    if (this.state.fundHoldings[fund]["holdings"].length > 0) {
      console.log("data already here, no need to fetch"); 
      return;
    } 
    fetch("https://arkapiv4.herokuapp.com/" + fund + "/4710cdb7-b205-4802-957a-7c311eac5327")
    .then(
      response=> response.json())
    .then(
      data => {
        console.log("data has been fetched")
        this.setState(prevState => {
          let fundHoldings = Object.assign({}, prevState.fundHoldings)
          let date = data.timestamp;
          if(fund === "All"){
            data.holdings = data.holdings.sort((a, b) => (a.weight < b.weight) ? 1 : -1)
          }
          fundHoldings[fund]["holdings"] = data.holdings;
          return {fundHoldings, date};
        })
      })
    .catch((error) => console.log(error + " Can’t access response. Blocked by browser?"))
  }

  onSignIn(googleUser) {
    console.log("onsignin clicked!")
    var profile = googleUser.getBasicProfile();
    //console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    //console.log('Name: ' + profile.getName());
    //console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present. 
    const data = {
      email: profile.getEmail()
    }
    axios.post('https://arkapiv4.herokuapp.com/signUpReact', data)
    .then(function(response){
          //console.log(response); 
    })
    .then(() => {
      this.setState( () => {
        const isLoggedIn = true;
        const logginPopUp = false;
        return{isLoggedIn, logginPopUp};
      });
    })
    .then(() => {
      this.getData();
      console.log("State is now", this.state.isLoggedIn)
    });
  }

  changeFund = (e) => {
    console.log("Changing to", e.target.innerText)
    const newState =  e.target.innerText;
    if(!this.state.isLoggedIn){
      this.setState({logginPopUp : true}, () => {
          this.setState({displayFund : newState});
        });
      return;
    }
    this.setState({displayFund : newState}, () => {
         this.getData();
    });
  }
 
  changeSortBy = (e) => {
    console.log("changed sort by function touched: ", e.target.innerText)
    const newSortBy = e.target.innerText; 
    //if(this.state.sortBy === newSortBy){
    //  console.log("already sorted this way");
    //  return; 
    // }

    this.setState(
      {sortBy : newSortBy}, 
      () => {
        console.log("here2", newSortBy)
        if(newSortBy === "Increasing Market Cap"){
          console.log("now sorting for: ", newSortBy)
          this.sortByIncreasingMarketCap();
        }else if(newSortBy === "Largest Position by Weight"){
          console.log("now sorting for: ", newSortBy)
          this.sortByLargestWeight();
        }else if(newSortBy === "1 Year Performance"){
          console.log("now sorting for: ", newSortBy)
          this.sortBy1YearPerformance(); 
        }else if(newSortBy === "6 Month Performance"){
          console.log("now sorting for: ", newSortBy)
          this.sortBy6MonthPerformance();
        }else if(newSortBy ==="3 Month Performance"){
          console.log("now sorting by 3 Month Performance")
          this.sortBy3MonthPerformance();
        }else if(newSortBy === "% of Company Owned in " +this.state.displayFund){
          console.log("now sorting for: ", newSortBy)
          this.percentCompanyOwned(); 
        }
    });
  }

  percentCompanyOwned(){
    console.log("sorting by percent of company owned by ark");
    const fund = this.state.displayFund; 
    const listOfHoldings = [...this.state.fundHoldings[fund]["holdings"]];
    listOfHoldings.sort((a, b) => (( a.value) / (a.marketCap *1000000)  < ( b.value) / (b.marketCap *1000000))  ? 1 : -1)
    this.setState(prevState => {
      let fundHoldings = Object.assign({}, prevState.fundHoldings)
      console.log(prevState.fundHoldings[fund]["holdings"])
      console.log("-------------------------")
      console.log(fundHoldings[fund]["holdings"])
      fundHoldings[fund]["holdings"] = listOfHoldings;
      fundHoldings[fund]["sortBy"] = "% of Company Owned by " +fund;
      return{fundHoldings}; 
    })

  }

  sortBy1YearPerformance(){
    console.log("sorting 1 year performance" );
    const fund = this.state.displayFund; 
    const listOfHoldings = [...this.state.fundHoldings[fund]["holdings"]];
    listOfHoldings.sort((a, b) => (a.year1ChangePercent < b.year1ChangePercent ? 1 : -1))
    this.setState(prevState => {
      let fundHoldings = Object.assign({}, prevState.fundHoldings)
      fundHoldings[fund]["holdings"] = listOfHoldings;
      fundHoldings[fund]["sortBy"] = "1 Year Performance";
      return{fundHoldings}; 
    })
  }

  sortBy6MonthPerformance(){
    console.log("sorting by 6 month performance");
    const fund = this.state.displayFund; 
    const listOfHoldings = [...this.state.fundHoldings[fund]["holdings"]];
    listOfHoldings.sort((a, b) => (a.month6ChangePercent < b.month6ChangePercent) ? 1 : -1)
    this.setState(prevState => {
      let fundHoldings = Object.assign({}, prevState.fundHoldings)
      fundHoldings[fund]["holdings"] = listOfHoldings;
      fundHoldings[fund]["sortBy"] = "6 Month Performance";
      return{fundHoldings}; 
    })
  }
  sortBy3MonthPerformance(){
    console.log("sorting by 3 month performance");
    const fund = this.state.displayFund; 
    const listOfHoldings = [...this.state.fundHoldings[fund]["holdings"]];
    listOfHoldings.sort((a, b) => (a.month3ChangePercent < b.month3ChangePercent) ? 1 : -1)
    this.setState(prevState => {
      let fundHoldings = Object.assign({}, prevState.fundHoldings)
      fundHoldings[fund]["holdings"] = listOfHoldings;
      fundHoldings[fund]["sortBy"] = "now sorting by 3 Month Performance";
      return{fundHoldings}; 
    })
  }

  sortByIncreasingMarketCap(){
    console.log("sorting by marketCap function touched and now sorting")
    const fund = this.state.displayFund; 
    const listOfHoldings = [...this.state.fundHoldings[fund]["holdings"]];
    listOfHoldings.sort((a, b) => (a.marketCap <= 0 || a.marketCap < b.marketCap) ? 1 : -1)
    this.setState(prevState => {
        let fundHoldings = Object.assign({}, prevState.fundHoldings)
        fundHoldings[fund]["holdings"] = listOfHoldings;
        fundHoldings[fund]["sortBy"] = "Increasing Market Cap";
        return{fundHoldings}; 
    })
  }

  sortByLargestWeight(){
    console.log("sorting by Weight function touched and now sorting")
    const fund = this.state.displayFund; 
    const listOfHoldings = [...this.state.fundHoldings[fund]["holdings"]];
    listOfHoldings.sort((a, b) => (a.weight < b.weight) ? 1 : -1)
    this.setState(prevState => {
      let fundHoldings = Object.assign({}, prevState.fundHoldings)
      fundHoldings[fund]["holdings"] = listOfHoldings;
      fundHoldings[fund]["sortBy"] = "Largest Position by Weight";
      return{fundHoldings}; 
    })
  }

  toggleDisplayIntro(){
    this.setState({
      displayIntro : !this.state.displayIntro
    })
  }
  
  handleClose(){
    this.setState({logginPopUp : false});
  }

  responseGoogle = (response) => {
    console.log("sign in failed")
    console.log(response);
  }



  render() {

    const colStyle = {
      background: 'rgba(255,255,255,0.7)', /* newer browsers */
      margin: '10px', 

    }; 

    return (
    <div className="entireApp">
      <Container fluid>
        
        <Modal show={this.state.logginPopUp} onHide={this.handleClose}>
            
            <Modal.Body className="modalBody">
                <p>Sorry :/</p>
                <p><strong>Please sign in!</strong> We just want a way to count legitmate users. We dont look at any of your google information beyond your email address!</p>
                <GoogleLogin
                clientId="463667560110-boucjgilrecmsqhn3ogiga1riiljqae4.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.onSignIn}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
                />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                No Thanks
              </Button>
            </Modal.Footer>
          </Modal>


        <Intro toggle={this.toggleDisplayIntro} displayIntro={this.state.displayIntro}></Intro>

        <MainNavBar handler={this.changeFund}></MainNavBar>

        <Row>
          <Col className="col"></Col>
          <Col   md="auto" className="col" id="mainCol" style={colStyle}>
              <div id="FundHeader">
                The table below contains all the holdings of <strong>{this.state.displayFund}</strong> from Ark Invest as of <span id="dateLastUpdates">as of {this.state.date}</span>
                <FundHeader handler={this.changeSortBy} sortBy={this.state.fundHoldings[this.state.displayFund]["sortBy"]} displayFund={this.state.displayFund} ></FundHeader>
              </div>
              <div className="fundBody">
              <Fund holdings={this.state.fundHoldings} displayFund={this.state.displayFund} sortBy={this.state.fundHoldings[this.state.displayFund]["sortBy"]}/>
              </div>
          </Col>
          <Col className="col"></Col>
        </Row>

      </Container>
    </div>    
    )
  }
}

export default App;
