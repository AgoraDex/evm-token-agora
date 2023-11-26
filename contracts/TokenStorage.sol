// SPDX-License-Identifier: Business Source License 1.1
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract TokenStorage is Initializable {
    /**
     * @dev Contract wasn't properly initialized.
     * @param version required storage version.
     */
    error NotInitialized(uint8 version);

    mapping(address => uint256) internal _balances;

    mapping(address => mapping(address => uint256)) internal _allowances;

    uint256 internal _totalSupply;

    string internal _name;
    string internal _symbol;

    // Ownable.sol
    address internal _owner;

    // AgoraToken.sol
    mapping (address => bool) internal _whitelist;

    // ERC20Capped
    uint256 internal _cap;

    // @dev update this constant each time when you are added storage variables
    uint8 public constant STORAGE_VERSION = 1;

    modifier onlyInitialized() {
        if (_getInitializedVersion() != STORAGE_VERSION) {
            revert NotInitialized(STORAGE_VERSION);
        }
        _;
    }

    constructor() {
        _disableInitializers();
    }
}