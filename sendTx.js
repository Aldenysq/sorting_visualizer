async function make_transaction() {

    const array_size = document.getElementById('arraySize').value;
    const minimum_value = document.getElementById('minimum').value;
    const maximum_value = document.getElementById('maximum').value;
    console.log(array_size);
    return;


    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);

    const myAddress = '0x87eb14E744d173aC92d0d7D109374D1FC7808038'
    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0

    const transaction = {
     'to': '0x87eb14E744d173aC92d0d7D109374D1FC7808038',
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000, 
     'nonce': nonce,
     'data': web3.utils.toHex('wooohoo'),
    };
   
    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);
    
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
   });
}

module.exports = {make_transaction};