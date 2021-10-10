import React, {Component} from 'react';
import {Image} from 'react-bootstrap';



class Stock extends Component {



    getSortBy(){
        console.log("touched sort by")
        if(this.props.sortBy === "Largest Position by Weight"){
            return this.props.weight;
        }
        return -1;
    }

    render() {


        const imageStyle = {
            width: '30%',
            height: 'auto',
            'marginRight': '20px'
        }; 
      
        const link = "https://www.google.com/search?ei=KZEwX7DMLdSGytMP2aaHmAs&q="+ this.props.ticker + "+stock&oq=tsla+stock&gs_lcp=CgZwc3ktYWIQAzIFCAAQsQMyBAgAEEMyBAgAEEMyBwgAELEDEEMyAggAMgcIABCxAxBDMgQIABBDMgcIABCxAxBDMgQIABBDMgcIABCxAxAKOgQIABBHUJicCFiYnAhg9Z4IaABwAXgAgAFXiAFXkgEBMZgBAKABAaoBB2d3cy13aXrAAQE&sclient=psy-ab&ved=0ahUKEwjwhI2YrY_rAhVUg3IEHVnTAbMQ4dUDCAw&uact=5";

        if(this.props.marketCap === -1 || this.props.PERatio === -1){
            return(

                    <tr className="Stock">
                        <td></td>
                        <td>{this.props.company}</td>
                        <td><a href={link}  rel="noopener noreferrer" target="_blank">{this.props.ticker}</a></td>
                        <td>{Math.round(this.props.value / 1000000)} Million</td>
                        <td>{this.props.shares}</td>
                        <td>{this.props.weight}%</td>
                        <td>Na</td>
                        <td>Na</td>
                        <td>Na</td>
                        <td>Na</td>
                        <td>Na</td>
                        <td>Na</td>
    
                        
                        <td>Na</td>
                        <td>Na</td>
                        <td>Na</td>
                        <td>Na</td>
                        <td>Na</td>
                        <td>Na</td>
                        <td>Na</td>
                        <td>Na</td>
                    </tr>
            )
        }
        
        else{

            const greenStyle = {
                color:'green'
            }

            const redStyle = {
                color:'red'
            }

            return(
                

                <tr className="Stock">
                    <td><Image  style={imageStyle} src={this.props.logo} fluid roundedCircle /></td>
                    <td>{this.props.company}</td>
                    <td><a href={link}  rel="noopener noreferrer" target="_blank">{this.props.ticker}</a></td>
                    <td>{Math.round(this.props.value / 1000000)} Million</td>
                    <td>{this.props.shares}</td>
                    <td>{(this.props.weight).toFixed(4)}%</td>
                    <td>{(this.props.marketCap / 10000).toFixed(2)} Billion</td>
                    <td>{Math.round( (parseInt(this.props.value, 10) / (parseInt(this.props.marketCap, 10) *100000)) * 100 * 100) / 100}%</td>
                    <td>{this.props.PERatio}</td>
                    <td>${(this.props.EPS|| 0).toFixed(3)}</td>


                    <td>{this.props.price}</td>
                    <td>{this.props.fiftyTwoWeekLow}</td>
                    <td>{this.props.fiftyTwoWeekHigh}</td>
                    <td>{this.props.fiftyDayMovingAverage}</td>

                    <td>{this.props.twohundredDayMovingAverage}</td>
                    <td style={this.props.day5ChangePercent > 0 ? greenStyle : redStyle}>{(this.props.day5ChangePercent * 100).toFixed(1)}%</td>
                    <td style={this.props.month1ChangePercent > 0 ? greenStyle : redStyle}>{(this.props.month1ChangePercent * 100).toFixed(1)}%</td>
                    <td style={this.props.month3ChangePercent > 0 ? greenStyle : redStyle}>{(this.props.month3ChangePercent * 100).toFixed(1)}%</td>
                    <td style={this.props.month6ChangePercent > 0 ? greenStyle : redStyle}>{(this.props.month6ChangePercent * 100).toFixed(1)}%</td>
                    <td style={this.props.year1ChangePercent > 0 ? greenStyle : redStyle}>{(this.props.year1ChangePercent * 100).toFixed(1)}%</td>
                </tr>

                
                    
                
            )
        } 
    }
}

/*<Card style={cardStyle}>
                    <Accordion.Toggle as={Card.Header} eventKey={this.props.index + 1}>

                        <div className="accordianToggle">
                            <div className="accordianToggleLeft">
                                <Image style={imageStyle} src={this.props.logo} fluid roundedCircle />
                                {this.props.company} <span className="accordianTickerHeader">({this.props.ticker})</span>
                            </div>
                            <div className="accordianToggleRight"></div>

                            <table className="accordianToggleCenter">
                                <tbody className="accordianStockInfo">
                                    <tr>
                                        <td className="accordianColTitle">Previous Close</td>
                                        <td className="accordianColInfo">${this.props.price}</td>
                                        <td className="accordianColTitle">Market Cap</td>
                                        <td className="accordianColInfo">${this.props.marketCap} Million</td>
                                        <td className="accordianColTitle">% Weight of {this.props.fund}</td>  
                                        <td className="accordianColInfo">{this.props.weight}%</td>                                   
                                    </tr>
                                    <tr>
                                        <td className="accordianColTitle">52 Wk Low</td>
                                        <td className="accordianColInfo">${this.props.fiftyTwoWeekLow}</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>

                                        <td className="accordianColTitle">Value in {this.props.fund}</td>
                                        <td className="accordianColInfo">${Math.round(this.props.value / 1000000)} Million</td>
                                    </tr>
                                    <tr>
                                        <td className="accordianColTitle">52 Wk High</td>
                                        <td className="accordianColInfo">${this.props.fiftyTwoWeekHigh}</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td className="accordianColTitle">% of Company Owned</td>
                                        <td className="accordianColInfo">{Math.round( (parseInt(this.props.value, 10) / (parseInt(this.props.marketCap, 10) *1000000)) * 100 * 100) / 100}%</td>
                                    </tr>
                                    <tr>
                                    </tr>
                                    
                                </tbody>
                            </table>

                            <div id="clickForMoreInfo" >Click for more info!</div>

                        </div>


                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={this.props.index + 1}>
                        <Card.Body>
                        
                            <StockInfo {...this.props}></StockInfo>
                            <div className="stockInfoFooter">
                                <p>
                                    <span>{this.props.ticker} Website: <a rel="noopener noreferrer" target="_blank" href={this.props.weburl}>here</a></span> &nbsp;
                                    &nbsp;
                                    &nbsp;

                                    <span>Graph: <a rel="noopener noreferrer" target="_blank" href={link}>here</a></span>
                                </p>
                            </div>


                         </Card.Body>
                    </Accordion.Collapse>
                </Card>*/
export default Stock