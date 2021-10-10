import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';

class StockInfo extends Component {

    render(){



        return(
            <Table borderless responsive striped>

                <thead className="stockInfoHeaders">
                    <tr>
                        <td>Ticker</td>
                        <td>Last Close Price</td>
                        <td>Weight of {this.props.fund}</td>
                        <td>Shares Held in {this.props.fund}</td>
                        <td>Value Held in {this.props.fund}</td>
                        <td>Market Cap of {this.props.ticker}</td>
                        <td>(Value Held in {this.props.fund}) / (Market Cap of {this.props.ticker})</td>
                        <td>52 Week Low</td>
                        <td>52 Week High</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{this.props.ticker}</td>
                        <td>${this.props.price}</td>
                        <td>{this.props.weight}%</td>
                        <td>{this.props.shares}</td>
                        <td>{this.props.value}</td>
                        <td>{this.props.marketCap}</td>
                        <td>{Math.round( (parseInt(this.props.value, 10) / (parseInt(this.props.marketCap, 10) *1000000)) * 100 * 100) / 100}%</td>
                        <td>${this.props.fiftyTwoWeekLow}</td>
                        <td>${this.props.fiftyTwoWeekHigh}</td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}


export default StockInfo;