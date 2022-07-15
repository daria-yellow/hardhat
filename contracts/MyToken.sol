// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract MyToken is ERC20Upgradeable {

    event BuyToken(address indexed sender, uint256 tokenAmount, uint256 price);

    uint _tokenPrice = 0.000007 ether;
    address _address = 0xA4465b289842FB8FA856b28236825220202FDe68;

    function initialize() initializer public {
        __ERC20_init("My", "MY");
        _mint(msg.sender, 15);
    }

    function tokenPrice() public view returns (uint) {
        return _tokenPrice;
    }

    function owhBalanceOf(address _who) public view returns (uint){
        return balanceOf(_who);
    }

    function buyToken() external payable {
        require(msg.value >= _tokenPrice);
        uint _num = msg.value / _tokenPrice;
        _mint(msg.sender, _num);
        emit BuyToken(msg.sender, _num, _tokenPrice );
    }

}
