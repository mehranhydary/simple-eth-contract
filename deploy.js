const HDWalletProvider = require("@truffle/hdwallet-provider")
const Web3 = require('web3')
const dotenv = require('dotenv')
const { abi, evm } = require('./compile')

dotenv.config()

const provider = new HDWalletProvider(
    process.env.MNEMONIC, 
    `https://rinkeby.infura.io/v3/${process.env.INFURA}`
)

const web3 = new Web3(provider)
const deploy = async() => {
    const accounts = await web3.eth.getAccounts()
    console.log('Attempting to deploy from', accounts[0])
    const result = await new web3.eth.Contract(abi)
        .deploy({data: '0x' + evm.bytecode.object, arguments:['Hello world']})
        .send({from: accounts[0]})
    console.log('Contract deployed to:', result.options.address)
}

deploy()