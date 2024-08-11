// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface RealTimeGasPriceContract {
    function getGasPrice() external view returns (uint256);
}

contract GasSubsidyContract {
    uint256 public constant SUBSIDY_PERCENTAGE = 10; // 10% subsidy
    RealtimeGasPriceContract public realTimeGasPriceContract;

    constructor(address _realTimeGasPriceContract) {
        realTimeGasPriceContract = RealtimeGasPriceContract(_realTimeGasPriceContract);
    }

    function calculateGasSubsidy() public view returns (uint256) {
        uint256 baseGasPrice = realTimeGasPriceContract.getGasPrice();
        uint256 subsidyFactor = 100 - SUBSIDY_PERCENTAGE;
        uint256 subsidizedGasPrice = (baseGasPrice * subsidyFactor) / 100;
        return subsidizedGasPrice;
    }
}


