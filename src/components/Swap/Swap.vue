<template>
  <div id="swap">
    <b-button-group class="tabs">
      <b-button class="tab" @click="toggle('mint')" :class="{active: activeAction === 'mint'}"
                v-b-tooltip="{title: 'Mint new synthethics for Rune'}" >Mint</b-button>
      <b-button class="tab" @click="toggle('swap')" :class="{active: activeAction === 'swap'}"
                v-b-tooltip="{title: 'Swap from and to synthethics'}" >Swap</b-button>
      <b-button class="tab" @click="toggle('burn')" :class="{active: activeAction === 'burn'}"
                v-b-tooltip="{title: 'Redeem synthethics for Rune'}" >Burn</b-button>
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
      <button v-if="!isWalletConnected" class="button-execution" @click="$bvModal.show('modalWallet')"
              v-b-tooltip="{title: 'You need to connect to a wallet to continue'}">Connect Wallet</button>
    </b-row>
  </div>
</template>

<script lang="ts" src="./swap.ts"></script>
<style lang="scss" src="./swap.scss"></style>
