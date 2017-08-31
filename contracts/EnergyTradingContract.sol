pragma solidity ^0.4.8;

//EnergyTradingContract
// @authors:
// Jorge <alvaradojl@live.com>
// usage:
// accepts bids from the Grid operator
/** @title Energy Trading Contract */

contract EnergyTradingContract {

  event HasBeenPayed(uint timestamp, address from, uint amount); //event raised contract received money.
  event HasBeenDisabled(uint timestamp); //event raised when contract has been disabled
  event HasBeenClosed(uint timestamp); //event raised when contract has been closed
  event BidAccepted(address trader, uint capacity, uint pricePerKwh); //event raised when the trade has completed

  //modifier for: account restriction
  modifier onlyBy(address _account){
    if (msg.sender != _account) {
        revert();
    }
    _;
  }

  //modifier for: owner restriction
  modifier onlyOwner {
      if (!isOwner(msg.sender)) {
        revert();
    }
      _;
  }

  //modifier for: execute only if the contract has been closed
  modifier onlyWhenClosed(){
    if (!isClosed) {
        revert();
    }
    _;
  }

  //modifier for execution only if the contract is active
  modifier onlyWhenEnabled(){
    if (isDisabled) {
        revert();
    }
    _;
  }

  //deposits (ETH) this contract has received
  mapping(address => uint) deposits;

  //PRIVATE VARIABLES
  address private owner; //address of the owner of the contract
  address private oracle; //address of the oracle of this contract
  bool private isDisabled =true; //determines if the contract has been disabled
  bool private hasBeenInitialized = false;
  bool private isClosed; //determines if the owner has closed/stopped/writtenOff the contract.
  uint private createdDate; //date when contract was created

  uint private capacity; //latest capacity measure available to trade
  uint private lastTradeDate; //date when the latest trade happened
  address private lastTrader; //address of the latest trader
  uint private lastTradeCapacity; //capacity value of the latest trade
  uint private nextTradeDate; //date when the contract is allowed to trade again

  //CONSTRUCTOR
  /**@dev Constructor
  */
  function EnergyTradingContract() {
    owner = msg.sender;
    createdDate = now;
    isDisabled = true;
  }

  //FALLBACK FUNCTION
  function() payable {
    if (isDisabled) {
        revert();
    }
    HasBeenPayed(now, msg.sender, msg.value); //notify to everyone interested
  }


  /**@dev returns the date when the contract was created*/
  function getCreationDate() constant public returns (uint) {
    return createdDate;
  }
  
  /**@dev Disables a Contract, Allowing code to run. Use in emergency.
  */
  function disable() onlyOwner  public {
    isDisabled = true;
  }

  /**@dev Closes a Contract. Disabling all code.
  */
  function close() onlyOwner public {
    selfdestruct(owner);
  }

  /**@dev Determines if the account is an owner
  */
  function isOwner(address _account) private returns (bool) {
    return (owner == _account);
  }

  /**@dev initialize
  *@param _oracle address of the entity that updates the capacity
  */
  function initialize(address _oracle) onlyOwner {
    
    if (hasBeenInitialized) {
        revert(); 
    }
      
    oracle = _oracle;
    isDisabled = false;
    hasBeenInitialized = true;
  }

  /**@dev Triggers for an action in the marketplace
  *@param _pricePerKwh determines the price of the Kwh for the specific trade slot
  */
  function trade(uint _pricePerKwh) onlyWhenEnabled returns(bool) {
      if (now > nextTradeDate) { //only accept a trade when the "promise to return" window has completed
          lastTrader = msg.sender;  
          lastTradeDate = now;
          lastTradeCapacity = capacity;
          nextTradeDate = lastTradeDate + 15 minutes;

          BidAccepted(lastTrader, lastTradeCapacity, _pricePerKwh);
          return true;
      }
      
      return false;
  }

  /**@dev Allows the trader to query to current capacity before an actual trade.
  */
  function getCapacityAvailability() returns(uint) {
      return capacity;
  }

  /**@dev updateCapacity
  *@param _lastMeasure number (in KW) to allow on next trade
  */
  function updateCapacity(uint _lastMeasure) onlyBy(oracle) onlyWhenEnabled {
  capacity = _lastMeasure;
  }


}