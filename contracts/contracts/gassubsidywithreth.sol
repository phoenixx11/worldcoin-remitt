// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract GasSubsidy is Ownable, ReentrancyGuard {
    mapping(address => bool) public verifiedUsers;

    event GasSubsidyApplied(address indexed user, uint256 gasAmount);

    constructor() {}

    function applyGasSubsidy(address user, uint256 gasAmount) external onlyOwner {
        require(verifiedUsers[user], "User not verified");

        (bool success, ) = user.call{value: gasAmount}("");
        require(success, "Gas subsidy transfer failed");

        emit GasSubsidyApplied(user, gasAmount);
    }

    function verifyUser(address user) external onlyOwner {
        verifiedUsers[user] = true;
    }

    function depositFunds() public payable onlyOwner {}

    function withdrawFunds(uint256 amount) public onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance");
        payable(owner()).transfer(amount);
    }

    receive() external payable {}
}
