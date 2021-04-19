// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract myvaxxID is ERC721{
    address public manager;
    uint256 private _tokenIndexCursor;

    struct passportPatient {
        uint id;
        bytes16 hashPassport;
        string image;
    }

    mapping(bytes16 => passportPatient) public tokens;

    constructor() ERC721("myvaxxID", "VAXXID"){
        manager = msg.sender;
    }
    
    //0x74657374000000000000000000000000
    function createTokenPassport(bytes16 _hashPassport, string memory _image)
        public payable
        onlyManager
        returns (uint256)
    {
        // Checks:
        require (keccak256(abi.encodePacked(tokens[_hashPassport].image)) != keccak256(abi.encodePacked(_image)) ,
            "myvaxxID: The patient already has a passport");
        
        //Create token loan
        passportPatient memory newpassportPatient =
            passportPatient({
                id: _tokenIndexCursor,
                hashPassport: _hashPassport,
                image: _image
            });
        tokens[_hashPassport] = newpassportPatient;
        _safeMint(msg.sender, _tokenIndexCursor);
        assert(tokens[_hashPassport].hashPassport == _hashPassport);
        _tokenIndexCursor++;
        return _tokenIndexCursor - 1;
    }
    
    function validatePassport(bytes16 _hashPassport, string memory _image) public view onlyManager returns(bool){
        //returns (bool){
        require (keccak256(abi.encodePacked(tokens[_hashPassport].image)) == keccak256(abi.encodePacked(_image)),
            "myvaxxID: The patient does not have a passport");
        return true;
    }

    modifier onlyManager() {
        require(msg.sender == manager, "GBC DeFi: You are not the manager");
        _;
    }
}