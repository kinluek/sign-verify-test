//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title ERC721 NFT contract with URI extension
 */

contract NFT is ERC721 {
    using Counters for Counters.Counter;
    // default tokenid = 1
    Counters.Counter private _tokenIds;

    string public baseURI;
    uint256 public collectionSize;

    constructor(string memory _baseURI, uint256 _collectionSize)
        ERC721("Group16", "GR16")
    {
        baseURI = _baseURI;
        collectionSize = _collectionSize;
    }

    function tokenURI(uint256 id) public view override returns (string memory) {
        string memory _baseURI = baseURI;
        return
            string(
                abi.encodePacked(_baseURI, "/", Strings.toString(id), ".json")
            );
    }

    /**
     * @dev tokenURI is declared in ERC721 contract, and will be initialized by _tokenURI
     */
    function mint() public returns (uint256) {
        require(
            _tokenIds.current() <= collectionSize,
            "collection size too large, cant mint more tokens"
        );
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        // mint takes 2 argument - recipient and tokenId
        _mint(msg.sender, newItemId);

        // mint the token and set it for sale- return the id to do so
        return newItemId;
    }
}
