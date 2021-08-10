//+-Script for Creating, Deploying and add the Initial Liquidity to the new Liquidity Pool in PancakeSwap:_
const Factory = artifacts.require('Factory.sol');
const Router = artifacts.require('Router.sol');
const Pair = artifacts.require('Pair.sol');
const Token1 = artifacts.require('Token1.sol');
const Token2 = artifacts.require('Token2.sol');

module.exports = async done => {
  try {
    const [admin, _] = await web3.eth.getAccounts();
    //+-B.S.C. TestNet Address of the PancakeSwap Factory Smart Contract:_
    const factory = await Factory.at('0x6725F303b657a9451d8BA641348b6761A6CC7a17');
    //+-B.S.C. TestNet Address of the PancakeSwap Router Smart Contract:_
    const router = await Router.at('0xD99D1c33F9fC3444f8101754aBC46c52416550D1');
    const token1 = await Token1.new();
    const token2 = await Token2.new();
    const pairAddress = await factory.createPair.call(token1.address, token2.address);
    const createPairTransaction = await factory.createPair(token1.address, token2.address);
    await token1.approve(router.address, 10000);
    await token2.approve(router.address, 10000); 
    await router.addLiquidity(
      token1.address,
      token2.address,
      10000, /**+-amountToken1Desired.*/
      10000, /**+-amountToken2Desired.*/
      10000, /**+-minAmountToken1Accepted.*/
      10000, /**+-minAmountToken2Accepted.*/
      admin,
      /**+-For the DeadLine we use "Date.now()" from Javascript that gives us the current Time in MiliSeconds
       * but Solidity Smart Contracts use Seconds so we divide it by 1.000 and then we add 10 Minutes.*/
      Math.floor(Date.now() / 1000) + 60 * 10
    );
    const pair = await Pair.at(pairAddress);
    const balance = await pair.balanceOf(admin); 
    console.log(`balance LP: ${balance.toString()}`);
    } catch(e) {
      console.log(e);
    }
  done();
};
