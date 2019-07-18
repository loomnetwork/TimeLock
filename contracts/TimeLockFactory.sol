pragma solidity ^0.4.25;

import "openzeppelin-solidity/contracts/token/ERC20/TokenTimelock.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";

contract TimeLockFactory {

    IERC20 token;
    event TimeLockCreated(address validatorEthAddress, address timelockContractAddress, string validatorName, string validatorPublicKey, uint256 _amount, uint256 _duration, uint256 _releaseTime);

    constructor(IERC20 _token) public { token = _token; }

    function deployTimeLock(address validatorEthAddress, string validatorName, string validatorPublicKey, uint256 amount, uint256 duration) public {
        // Deploy timelock
        TokenTimelock timelock = new TokenTimelock(token, validatorEthAddress, block.timestamp + duration);

        // Ensure it got an address
        require(address(timelock) != address(0x0));

        // Send funds to timelock. -- MUST APPROVE FIRST
        token.transferFrom(msg.sender, address(timelock), amount);

        emit TimeLockCreated(validatorEthAddress, address(timelock), validatorName, validatorPublicKey, amount, duration, block.timestamp + duration);
    }
}
