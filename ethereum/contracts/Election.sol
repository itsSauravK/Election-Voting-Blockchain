// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

/**
 * @title Owner
 * @dev Set & change owner
 */
contract ElectionFactory {
    address public deployedElection;
    string public deployedElectionName;
    address[] public elections;
    string[] public names;
    uint256 public count = 0; //keeping track and making sure there is only one deployed election

    function createElection(string memory name) public {
        require(count < 1); //checking if there are more than 1 deployed election
        deployedElection = address(new Election(name, msg.sender));
        deployedElectionName = name;
        count++;
    }

    function getAllResults() public view returns (address[] memory) {
        return elections;
    }

    function getAllName() public view returns (string[] memory) {
        return names;
    }

    function clearFactory() public {
        //removing current deployed election
        require(deployedElection != 0x0000000000000000000000000000000000000000);
        count = 0;
        elections.push(deployedElection);
        names.push(deployedElectionName);
        deployedElection = 0x0000000000000000000000000000000000000000;
    }
}

contract Election {
    struct Candidate {
        string name;
        string description;
        string url;
        uint256 votes;
    }

    //Candidate[] public candidates;
    mapping(uint256 => Candidate) public candidates;
    uint256 public candidateCount;
    address public admin;
    mapping(address => bool) public voters;
    string public electionName;
    bool public started; //true when election starts
    //this variable is only used to make sure candidates cant be after starting and after ending election
    bool public ended; //ended indicates time to add candidate has ended

    //modifier to check election has started
    modifier electionStarted() {
        require(started);
        _;
    }
    //modifer to check manager
    modifier restricted() {
        require(msg.sender == admin);
        _;
    }

    //constructor
    constructor(string memory name, address creator) {
        admin = creator;
        electionName = name;
    }

    //start election
    function startElection() public restricted {
        require(!started);
        started = true;
        ended = true;
    }

    //add candidate
    function addCandidate(
        string memory name,
        string memory description,
        string memory url
    ) public restricted {
        require(!ended); //checking if time to add candidates has ended
        require(!started);

        Candidate storage c = candidates[candidateCount++];
        c.name = name;
        c.description = description;
        c.url = url;
        c.votes = 0;
    }

    //vote candidate
    function voteCandidate(uint256 id) public electionStarted {
        Candidate storage currentCandidate = candidates[id];
        //checking if user has already voted
        require(!voters[msg.sender]);
        //voting candidate
        currentCandidate.votes++;
        //adding user to mapping
        voters[msg.sender] = true;
    }

    //end election
    function endElection() public restricted electionStarted {
        //A finished election will always have started = false, ended = true
        started = false;
        ended = true;
    }
}
