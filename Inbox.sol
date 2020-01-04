pragma solidity ^0.5.12;

contract Inbox {
    string public message;
    
    constructor(string memory initialMessage) public {
        message = initialMessage;
    }
    
    function setMessage(string memory _newMessage) public {
        message = _newMessage;
    }
    // Implied so we don't need it
    function getMessage() view public returns (string memory) {
        return message;
    }
    
}
