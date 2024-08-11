// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract GasPriceOracle {
    AggregatorV3Interface internal priceFeed;

    constructor(address _priceFeed) {
        priceFeed = AggregatorV3Interface(_priceFeed);
    }

    function getLatestGasPrice() public view returns (int256) {
        (
            , 
            int256 price, 
            , 
            , 
        ) = priceFeed.latestRoundData();
        return price;
    }
}
