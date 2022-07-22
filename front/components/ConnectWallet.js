export function ConnectWallet({ connectWallet }) {
  return (
    <>
      <p>Please connect your account...</p>
      <button type="button" onClick={connectWallet}>
        Connect Wallet
      </button>
    </>
  )
}