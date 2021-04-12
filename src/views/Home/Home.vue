<template>
  <div class="home">
    <div id="label-address" v-if="isWalletConnected">
      <p>{{userwallet.address}}</p>
    </div>

    <div v-if="!isWalletConnected"  class="login-button">
      <button @click="$bvModal.show('modalConnect')">Connect</button>
    </div>
    <div v-if="isWalletConnected" class="login-button">
      <button @click="alert('to be implemented')">Log out</button>
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
      <a href="https://twitter.com/block42_company"><BIconTwitter/></a>
    </div>
  </div>
</template>

<script lang="ts" src="./home.ts"></script>

<style lang="scss" src="./home.scss"></style>
