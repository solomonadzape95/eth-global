// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title IdentityRegistry
 * @dev Enhanced registry supporting multiple verification types per user with consent mechanism.
 * Users can control which verifications they share with third-party applications.
 */
contract IdentityRegistry {
    address public owner;

    // Core data: user => verificationType => CID
    mapping(address => mapping(string => string)) public userAttestations;
    
    // Track all verification types for a user
    mapping(address => string[]) public userVerificationTypes;
    
    // Consent mechanism: user => verificationType => hasConsented
    mapping(address => mapping(string => bool)) public userConsent;
    mapping(address => mapping(string => uint256)) public consentTimestamp;
    
    // Revocation list for CIDs
    mapping(string => bool) public isRevoked;

    // Events
    event AttestationMinted(address indexed user, string indexed verificationType, string cid);
    event AttestationRevoked(string indexed cid);
    event ConsentGiven(address indexed user, string indexed verificationType, uint256 timestamp);
    event ConsentRevoked(address indexed user, string indexed verificationType, uint256 timestamp);

    constructor() {
        // The wallet that deploys this contract is the "owner".
        // This will be your backend wallet.
        owner = msg.sender;
    }

    /**
     * @dev Restricts a function to be called only by the contract owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    /**
     * @dev Called by the backend to create or update a user's verification for a specific type.
     * Only the owner (our backend) can do this, preventing users from
     * creating fake attestations for themselves.
     * @param user The wallet address of the user being verified.
     * @param verificationType The type of verification (e.g., "student", "identity-verification").
     * @param cid The Lighthouse CID (the proof) to link to them.
     */
    function mintAttestation(address user, string memory verificationType, string memory cid) public onlyOwner {
        // If the user already has an old CID for this verification type, revoke it
        string memory oldCid = userAttestations[user][verificationType];
        if (bytes(oldCid).length > 0) {
            isRevoked[oldCid] = true;
            emit AttestationRevoked(oldCid);
        }

        // Link the user to their new CID for this verification type
        userAttestations[user][verificationType] = cid;
        
        // Add verification type to user's list if not already present
        string[] storage userTypes = userVerificationTypes[user];
        bool typeExists = false;
        for (uint i = 0; i < userTypes.length; i++) {
            if (keccak256(bytes(userTypes[i])) == keccak256(bytes(verificationType))) {
                typeExists = true;
                break;
            }
        }
        if (!typeExists) {
            userVerificationTypes[user].push(verificationType);
        }

        // Make sure the new CID is not marked as revoked
        isRevoked[cid] = false;
        
        emit AttestationMinted(user, verificationType, cid);
    }

    /**
     * @dev Called by the backend to manually revoke a specific proof.
     * This is a kill-switch in case a user's proof is stolen.
     * @param cid The Lighthouse CID to revoke.
     */
    function revokeAttestation(string memory cid) public onlyOwner {
        isRevoked[cid] = true;
        emit AttestationRevoked(cid);
    }

    /**
     * @dev User gives consent to share a specific verification type with third parties.
     * @param verificationType The type of verification to consent to sharing.
     */
    function giveConsent(string memory verificationType) public {
        userConsent[msg.sender][verificationType] = true;
        consentTimestamp[msg.sender][verificationType] = block.timestamp;
        emit ConsentGiven(msg.sender, verificationType, block.timestamp);
    }

    /**
     * @dev User revokes consent to share a specific verification type.
     * @param verificationType The type of verification to revoke consent for.
     */
    function revokeConsent(string memory verificationType) public {
        userConsent[msg.sender][verificationType] = false;
        emit ConsentRevoked(msg.sender, verificationType, block.timestamp);
    }

    /**
     * @dev Check if user has consented to share a specific verification type.
     * @param user The user's address.
     * @param verificationType The verification type to check.
     * @return True if user has consented to share this verification type.
     */
    function hasConsented(address user, string memory verificationType) public view returns (bool) {
        return userConsent[user][verificationType];
    }

    /**
     * @dev Get all verification types for a user.
     * @param user The user's address.
     * @return Array of verification types the user has.
     */
    function getUserVerificationTypes(address user) public view returns (string[] memory) {
        return userVerificationTypes[user];
    }

    /**
     * @dev Get user's attestation for a specific verification type.
     * @param user The user's address.
     * @param verificationType The verification type.
     * @return The CID for this verification type.
     */
    function getUserAttestation(address user, string memory verificationType) public view returns (string memory) {
        return userAttestations[user][verificationType];
    }

    /**
     * @dev Check if user has any valid verification (for simple status check).
     * @param user The user's address.
     * @return True if user has at least one valid verification.
     */
    function hasAnyVerification(address user) public view returns (bool) {
        string[] memory types = userVerificationTypes[user];
        for (uint i = 0; i < types.length; i++) {
            string memory cid = userAttestations[user][types[i]];
            if (bytes(cid).length > 0 && !isRevoked[cid]) {
                return true;
            }
        }
        return false;
    }

    /**
     * @dev Get the latest attestation CID for a user (for simple status check).
     * @param user The user's address.
     * @return The CID of the most recent valid verification.
     */
    function getLatestAttestation(address user) public view returns (string memory) {
        string[] memory types = userVerificationTypes[user];
        for (uint i = types.length; i > 0; i--) {
            string memory cid = userAttestations[user][types[i-1]];
            if (bytes(cid).length > 0 && !isRevoked[cid]) {
                return cid;
            }
        }
        return "";
    }
}
