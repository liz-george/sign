const ethers = require('ethers');
const dotenv = require('dotenv');
dotenv.config();
async function main() {
let privatekey = process.env.PRIVATE_KEY;
let wallet = new ethers.Wallet(privatekey);

// print the wallet address
console.log('Using wallet address ' + wallet.address);

// For creating raw transaction for Ethereum Blockchain
let transaction = {
    to: '0x842ea53498bBC99f6193E5c76aD9a4779259715A',
    value: ethers.utils.parseEther('1'),
    gasLimit: '21000',
    maxPriorityFeePerGas: ethers.utils.parseUnits('5', 'gwei'),
    maxFeePerGas: ethers.utils.parseUnits('20', 'gwei'),
    nonce: 355,
    type: 2,
    chainId: 4
  };

  let rawTransaction = await wallet.signTransaction(transaction).then(ethers.utils.serializeTransaction(transaction));
  
  // print the raw transaction hash
  console.log('Raw txhash string ' + rawTransaction);
}

main()