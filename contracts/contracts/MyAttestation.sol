// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MyAttestation {
    address public owner;
    
    // Mapping from user address to their attestation CID
    mapping(address => string) public userAttestations;
    
    // Mapping from CID to revocation status
    mapping(string => bool) public isRevoked;
    
    // Events
    event AttestationMinted(address indexed user, string cid);
    event AttestationRevoked(string cid);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    /**
     * @dev Mint an attestation for a user
     * @param user The address of the user
     * @param cid The IPFS CID of the attestation data
     */
    function mintAttestation(address user, string memory cid) external onlyOwner {
        require(bytes(cid).length > 0, "CID cannot be empty");
        require(!isRevoked[cid], "Attestation is revoked");
        
        userAttestations[user] = cid;
        emit AttestationMinted(user, cid);
    }
    
    /**
     * @dev Revoke an attestation by CID
     * @param cid The IPFS CID to revoke
     */
    function revokeAttestation(string memory cid) external onlyOwner {
        require(bytes(cid).length > 0, "CID cannot be empty");
        
        isRevoked[cid] = true;
        emit AttestationRevoked(cid);
    }
    
    /**
     * @dev Check if a user has a valid (non-revoked) attestation
     * @param user The address to check
     * @return hasAttestation True if user has an attestation
     * @return cid The CID of the attestation (empty if none)
     * @return isValid True if attestation exists and is not revoked
     */
    function checkAttestation(address user) external view returns (bool hasAttestation, string memory cid, bool isValid) {
        cid = userAttestations[user];
        hasAttestation = bytes(cid).length > 0;
        isValid = hasAttestation && !isRevoked[cid];
    }
}
