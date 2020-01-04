pragma solidity ^0.6.1;

contract Inbox {
    string public message;
    
    constructor(string memory initialMessage) public {
        message = initialMessage;
    }
    
    function setMessage(string memory _newMessage) public {
        message = _newMessage;
    }
}