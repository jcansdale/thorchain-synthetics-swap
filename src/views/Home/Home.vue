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
      <h1 id="text-title">
        Swap your Synths
      </h1>
      <div class="buttons-mode">
        <button v-on:click="showMint" v-bind:class="{activeButton: mintView}" >Mint</button>
        <button v-on:click="showSwap" :class="{activeButton: swapView}" >Swap</button>
        <button v-on:click="showBurn" :class="{activeButton: burnView}" >Burn</button>
      </div>

      <!-- Wait until assets are loaded-->
      <b-container id="swap-window" v-if="initialized">
        <b-row>
          <b-col>
            <Mint v-if="mintView" />
            <Swap v-if="swapView" />
            <Burn v-if="burnView" />
          </b-col>
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
