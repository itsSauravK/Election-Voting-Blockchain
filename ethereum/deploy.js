require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const mnemonicPhrase = process.env.ACCOUNT_MNEMONIC;
const network = process.env.RINKEBY_ENDPOINT;
const compiledFactory = require("../frontend/src/ethereum/build/ElectionFactory.json");

const provider = new HDWalletProvider(
   mnemonicPhrase,
   // remember to change this to your own phrase!
   network
   // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);
const deploy = async () => {
   const accounts = await web3.eth.getAccounts();

   console.log("Attempting to deploy from account", accounts[0]);
   //contract deployment
   const result = await new web3.eth.Contract(compiledFactory.abi)
      .deploy({ data: compiledFactory.evm.bytecode.object })
      .send({ gas: "3000000", from: accounts[0] });

   console.log("Contract deployed to", result.options.address);

   provider.engine.stop();
};
deploy();
