// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleLoan {
    struct Loan {
        address borrower;
        uint256 amount;
        bool isPaid;
    }

    mapping(uint256 => Loan) public loans;
    uint256 public loanCount;

    event LoanCreated(uint256 loanId, address borrower, uint256 amount);
    event LoanPaid(uint256 loanId);

    function createLoan(uint256 _amount) external {
        loanCount++;
        loans[loanCount] = Loan(msg.sender, _amount, false);
        emit LoanCreated(loanCount, msg.sender, _amount);
    }

    function payLoan(uint256 _loanId) external {
        require(loans[_loanId].borrower == msg.sender, "Not the borrower");
        require(!loans[_loanId].isPaid, "Loan already paid");

        loans[_loanId].isPaid = true;
        emit LoanPaid(_loanId);
    }
}