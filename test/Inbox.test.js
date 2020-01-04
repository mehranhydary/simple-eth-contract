const assert = require('assert')
const ganache  = require('ganache-cli')
const Web3 = require('web3')

const web3 = new Web3(ganache.provider())
const { abi, evm } = require('../compile')

// Variables that are to be used in the tests:
let accounts
let inbox
// Before tests are run, need the following to run: 
beforeEach(async() => {
    accounts = await web3.eth.getAccounts()
    inbox = await new web3.eth.Contract(abi)
        .deploy({data: evm.bytecode.object, arguments: ['Hello world']})
        .send({from: accounts[0], gas: '1000000'})
})
// Here are the tests that we need to check for:
describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address)
    })

    it('stores initial message properly', async () => {
        const message = await inbox.methods.message().call()
        assert.equal('Hello world', message)
    })

    it('updates the message properly', async() => {
        await inbox.methods.setMessage('Hello mehran').send({from: accounts[0]})
        const newMessage = await inbox.methods.message().call()
        assert.equal('Hello mehran', newMessage)
    })
})