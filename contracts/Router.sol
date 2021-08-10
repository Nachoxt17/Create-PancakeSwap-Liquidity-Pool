//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Router {
  //+-Function to Add Liquidity to the Liquidity Pools of PancakeSwap:_
  /**+-At the Beginning you will have to add Amounts of Tokens proportionally to the Price you want your Token to have.
  +-Example:_ If you want your Token to be launched with a Price = BNB$0.1, you will have to create the Liquidity Pool 
  and to add x10 Times the Amount of your Token per every BNB deposited. BNB x 100 & YourToken x 1.000.*/
  function addLiquidity(
   address tokenA,
   address tokenB,
   uint amountADesired,
   uint amountBDesired,
   uint amountAMin,
   uint amountBMin,
   address to,
   uint deadline
  ) external returns(uint amountA, uint amountB, uint liquidity) {}
}
