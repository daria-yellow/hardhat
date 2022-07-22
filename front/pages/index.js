import React, { Component } from 'react'
import { ethers } from 'ethers'

import { ConnectWallet } from '../components/ConnectWallet'
import { OwhBalanceOf } from '../components/Balance';

import tokenAddress from '../contracts/MyToken-contract-address.json'
import tokenArtifact from '../contracts/MyToken.json'

export default class extends Component {
  constructor(props) {
    super(props)

    this.initialState = {
      selectedAccount: null,
      balance: null,
      tokenPrice: null,
      tokenBalance: null,
      txBeingSent: null,
      addressBalance: null
    }

    this.state = this.initialState;
  }

  _connectWallet = async () => {
    const [selectedAddress] = await window.ethereum.request({
      method: 'eth_requestAccounts'
    })

    this._initialize(selectedAddress);

    window.ethereum.on('accountsChanged', ([newAddress]) => {
      if(newAddress === undefined) {
        return this._resetState()
      }

      this._initialize(newAddress)
    })

    window.ethereum.on('chainChanged', ([networkId]) => {
      this._resetState()
    })
  }

  async _initialize(selectedAddress) {
    this._provider = new ethers.providers.Web3Provider(window.ethereum)

    this._token = new ethers.Contract(
      tokenAddress.MyToken,
      tokenArtifact.abi,
      this._provider.getSigner(0)
    )

    this.setState({
      selectedAccount: selectedAddress,
    }, async () => {
      await this.updateBalance()
    })

    const price = await this._token.tokenPrice();
    const balance = await this._token.owhBalanceOf(this.state.selectedAccount);
    this.setState({ tokenPrice: ethers.utils.formatEther(price._hex),
      tokenBalance: parseInt(balance._hex, 16)});
  }

  async updateBalance() {
    const newBalance = (await this._provider.getBalance(
      this.state.selectedAccount
    )).toString()

    this.setState({
      balance: newBalance
    })
  }

  _resetState() {
    this.setState(this.initialState)
  }

  buy = async() => {
    const tx = await this._token.buyToken({
      value: ethers.utils.parseEther(this.state.tokenPrice)
    })
    this.setState({
      txBeingSent: tx.hash
    })
    await tx.wait();
    await this.updateBalance();
  }

  
  async _owhBalanceOf(address) { 
      const tx = await this._token.owhBalanceOf(address);
      this.setState({ txBeingSent: tx.hash });

      this.setState({ owhBalance: { address, balance: tx.toNumber() } });
  }

  render() {
    if(!this.state.selectedAccount) {
      return <ConnectWallet
        connectWallet={this._connectWallet}
      />
    }

    return(
      <>
        {this.state.balance &&
          <p>Your balance: {ethers.utils.formatEther(this.state.balance)} ETH</p>}
          <p>Your address: {this.state.selectedAccount}</p>
          <p>Token price: {this.state.tokenPrice}</p>
          <button onClick={this.buy}>Buy token</button>
          <p>Your token balance: {this.state.tokenBalance}</p>
          <OwhBalanceOf owhBalanceOf={(address) => this._owhBalanceOf(address)} />
          {this.state.owhBalance &&
            <p>{this.state.owhBalance.address} has {this.state.owhBalance.balance.toString()} tokens</p>}
      </>
    )
  }
}