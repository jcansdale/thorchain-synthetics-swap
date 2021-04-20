<template>
  <div class="home">
    <div id="label-address" v-if="isWalletConnected">
      <p>{{userwallet.thorchainAddress}}</p>
    </div>

    <div class="login-button">
      <button @click="$bvModal.show('modalWallet')">Wallet</button>
    </div>


    <ConnectModal id="connectWalletModal"></ConnectModal>

    <div id="main-content">
      <!-- Wait until assets are loaded-->
      <h1 id="text-title">Swap your Synths</h1>
      <b-container id="swap-window" v-if="initialized">
        <b-row>
          <Swap/>
        </b-row>
      </b-container>

      <div id="label-fee">
        <p>FEE Rune Network Fee</p>
      </div>
    </div>

    <div id="social-container">
      <a href="https://github.com/block42-blockchain-company/thorchain-synthetics-swap"><BIconGithub/></a>
      <a href="https://twitter.com/Brokkrfinance"><BIconTwitter/></a>
    </div>
  </div>
</template>

<script lang="ts" src="./synths.ts"></script>

<style lang="scss" src="./synths.scss"></style>
