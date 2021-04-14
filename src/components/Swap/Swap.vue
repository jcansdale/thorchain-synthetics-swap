<template>
  <div id="swap">
    <b-button-group class="tabs">
      <b-button class="tab" @click="toggle('mint')">Mint</b-button>
      <b-button class="tab" @click="toggle('swap')">Swap</b-button>
      <b-button class="tab" @click="toggle('burn')">Burn</b-button>
    </b-button-group>

    <div class="assets-container">
      <b-row class="m-0">
        <Asset :assets="synthAssets(true)" v-bind:is-origin-asset="true"/>
        <Asset :assets="synthAssets(false)" v-bind:is-origin-asset="false"/>
      </b-row>

      <div class="symbol-arrow">
        <div class="arrow-container">
          <BIconArrowRight/>
        </div>
      </div>
    </div>

    <b-row>
      <button v-if="isWalletConnected" class="button-execution" v-on:click="swap" >SWAP IT</button>
      <button v-if="!isWalletConnected" class="button-connect" @click="$bvModal.show('modalWallet')">Connect Wallet</button>
    </b-row>
  </div>
</template>

<script lang="ts" src="./swap.ts"></script>
<style lang="scss" src="./swap.scss"></style>
