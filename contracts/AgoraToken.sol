// SPDX-License-Identifier: Business Source License 1.1
pragma solidity ^0.8.0;

import {TokenStorage} from "./TokenStorage.sol";
import {ERC20} from "./ERC20.sol";
import {ERC20Capped} from "./ERC20Capped.sol";
import {Ownable} from "./Ownable.sol";

contract AgoraToken is TokenStorage, ERC20Capped, Ownable {
    function addWhitelist(address account) public onlyOwner {
        _whitelist[account] = true;
    }

    function removeWhitelist(address account) public onlyOwner {
        delete _whitelist[account];
    }

    function mint(address account, uint amount) public onlyOwner onlyInitialized {
        _mint(account, amount);
    }

    function initialize(string memory name_, string memory symbol_, uint256 cap_) public initializer {
        __ERC20_init(name_, symbol_);
        __ERC20Capped_init(cap_);
        __Ownable_init();
    }

    function initializeSignature(string memory name_, string memory symbol_, uint256 cap_) public pure returns (bytes memory) {
        return abi.encodeWithSelector(this.initialize.selector, name_, symbol_, cap_);
    }
}
