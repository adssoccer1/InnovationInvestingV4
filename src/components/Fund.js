import React, {Component} from 'react';
import Stock from './Stock.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';


class Fund extends Component {

    render(){

        if(this.props.holdings[this.props.displayFund]["holdings"].length === 0){
            return (
                <>
                    <h1>Loading...This can take several minutes. </h1>
                    <p>You must sign in to view this page </p>
                </>
            );

        }else{

            const stockList = this.props.holdings[this.props.displayFund]["holdings"].map((item, index) => {
                return <Stock key={item.cusip} fund={this.props.displayFund} index={index} {...item}/>
            })
            
            return (
    
                    <Table size="sm" hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Company</th>
                                <th>Ticker</th>
                                <th>Value</th>
                                <th>Shares</th>
                                <th>Weight</th>
                                <th>Mrkt Cap</th>
                                <th>% Company Owned</th>
                                <th>PE Ratio</th>
                                <th>EPS</th>
                            
                                <th>Price</th>
                                <th>52 Week Low</th>
                                <th>52 Week High</th>
                                <th>50 Day Mov Avg</th>
                                <th>200 Day Mov Avg</th>
    
                                <th>5 Day Price Change</th>

                                <th>Month Price Change</th>
                                <th>3 Month Price Change</th>

                                <th>6 Month Price Change</th>
                                <th>Year 1 Price Change</th>
                                
                            </tr>

                        </thead>
                        <tbody>
                            {stockList}
                        </tbody>
                    </Table>

            );
        }
    }
  }
  
  export default Fund;
  