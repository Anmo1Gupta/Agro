import { Segment, Header, Button } from "semantic-ui-react";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import penny from '../static/images/penny.png';
import { getTransactionDetails } from '../scatter/localWallet_helper';
import './OrdersPage.css';
<<<<<<< HEAD
import ReceiptModal from '../components/Receipt_Modal/Receipt_Modal'
=======
import Unsplash, { toJson } from 'unsplash-js';

const KEY = "e7d3d4ff6d6694a54dc10ca8ddb7e32b8033a64b2e8971cbc27ac49ab2395f5e";
>>>>>>> 67b899fa1f56519929d094599f162cea23e5a3fc

class OrderCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cropImage: penny,
        }
        // console.log("Constructor: ", props);
        const cropName = props.transaction.cropName.trim();
        const unsplash = new Unsplash({ 
            accessKey: KEY 
        });
        const query = `${cropName}`;
        unsplash.search.photos(query, 1, 1, { orientation: "landscape" })
        .then(toJson)
        .then(result => {
            if(result.results[0].urls.regular) {
                // cropImage = result.results[0].urls.raw;
                this.setState({ cropImage : result.results[0].urls.regular });
            }
        });
    }

    render() {
        const { account, transaction } = this.props;
        const { transactionID, cropName, productId, farmer, buyer, price, quantity } = transaction;
        const trackerUrl = `${"https://jungle.bloks.io/transaction/"}${transactionID}`;
        // console.log("trans: ", transaction);
        let otherAccount = null, orderCardStyle = null;
        if (account === farmer) {
            otherAccount = `${"Buyer : "}${buyer}`;
            orderCardStyle = {
                background: "#FFF9C4",
            }
        }
        else if (account === buyer) {
            otherAccount = `${"Seller : "}${farmer}`;
            orderCardStyle = {
                background: "#E3F2FD",
            }
        }

        return (
            <div className="orderCard">
                <Segment raised style={orderCardStyle}>
                    <div id="orderCard-container" >
                        <div id="order-details">
                            <h4>Transaction ID : {transactionID}</h4>
                            {/* <Button href={trackerUrl} target="_blank" className="receipt" >See transaction at Bloks.io jungle</Button> */}
                        </div>

                        <div className="orderDate-container">
                            <h4>{otherAccount}</h4>
                            <h4>Crop : <span>{cropName}</span></h4>
                            <h4 id="delivStatus">Transaction Status : <span>Completed</span></h4>
                        </div>

                        <div className="order-img-container">
                            <img src={this.state.cropImage} width="120px" height="120px" />
                            <div id="orderProduct-details" >
                                <h4 id="pprice" >Crop ID : <span>{`${"G36C"}${productId}`}</span></h4>
                                <h4 id="pprice" >Quantity : <span>{quantity} kg</span></h4>
                                <h4 id="pprice" >Price : <span>₹ {price} per Kg</span></h4>
                            </div>
                            {/* <div id="order-seller">
                                <h4></h4>
                            </div> */}
                        </div>
                        <div id="btn-container">
                            {/* <Button href={trackerUrl} target="_blank" >See transaction at Bloks.io jungle</Button> */}
                            <Button><ReceiptModal /></Button>
                        </div>
                    </div>
                </Segment>
            </div>
        );
    }
}

class OrdersPage extends Component {
    constructor(props) {
        super(props);
        var loggedIn = false;
        var currentUser = null;
        if(sessionStorage.getItem("current_user") != null && sessionStorage.getItem("current_user") != "null" && sessionStorage.getItem("current_user") !== undefined) {
            loggedIn = true;
            currentUser = sessionStorage.getItem("current_user");
        }

        this.state = {
            transactionList: [],
            loggedIn,
            currentUser,
        }
        this.getTransactionDetailFunc = this.getTransactionDetailFunc.bind(this);

        this.getTransactionDetailFunc();
    }

    getTransactionDetailFunc() {
        const transactionList = [];
        const { loggedIn, currentUser } = this.state;
        // console.log("loggedIn in Func: ", loggedIn);
        if (loggedIn) {
            // console.log("here gTD");
            getTransactionDetails()
                .then((result) => {
                    const transactions = result.rows;

                    transactions.map((transaction) => {
                        if (transaction.farmer === currentUser || transaction.buyer === currentUser) {
                            transactionList.push(transaction);
                        }

                    });
                    this.setState({ transactionList });
                });
        }
    }

    render() {
        const { loggedIn, currentUser } = this.state;
        const { transactionList } = this.state;
        console.log("translist:", transactionList);
        // console.log("loggedIn", loggedIn);
        let ListView = <p className="else-text">No Orders Placed Yet.</p> ;
        if (transactionList.length) {
            ListView = Object.values(transactionList).map((transaction) => {
                return <OrderCard
                    key={transaction.transactionID}
                    transaction={transaction}
                    account={currentUser}
                />
            });
        }

        return (
            <React.Fragment>
                <div className="order-container">
                    <Header as='h2'>
                        Your Transactions
                    </Header>
                    {
                        loggedIn ? ListView : <p className="else-text">Sorry. Currently you are not logged in.</p>
                    }
                </div>
            </React.Fragment>
        )
    }
}


export default (OrdersPage); 