<template>
  <div id="swap">
    <div class="tabs">
    </div>

    <div class="assets-container">
      <b-row class="m-0">
        <Asset :assets="nativeAssets()" v-bind:is-origin-asset="true"/>
        <Asset :assets="nativeAssets()" v-bind:is-origin-asset="false"/>
      </b-row>

      <div class="symbol-arrow">
        <div class="arrow-container">
          <BIconArrowRight/>
        </div>
      </div>
    </div>

    <b-row>
      <button v-if="isWalletConnected" class="button-execution" v-on:click="swap" >SWAP IT</button>
      <button v-if="!isWalletConnected" class="button-execution" @click="$bvModal.show('modalWallet')"
              v-b-tooltip="{title: 'You need to connect to a wallet to continue'}">Connect Wallet</button>
    </b-row>
  </div>
</template>

<script lang="ts" src="./nativeSwap.ts"></script>
<style lang="scss" src="./nativeSwap.scss"></style>
