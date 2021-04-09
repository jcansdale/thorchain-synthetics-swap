<template>
  <div id="swap">
    <b-tabs justified
      active-nav-item-class="active-tab"
    >
      <b-tab title="Mint" :title-link-class="['tab', 'top-left-radius']" @click="toggle('mint')"></b-tab>
      <b-tab title="Swap" :title-link-class="'tab'"  @click="toggle('swap')"></b-tab>
      <b-tab title="Burn" :title-link-class="['tab', 'top-right-radius']"  @click="toggle('burn')"></b-tab>
    </b-tabs>

    <div class="assets-container">
      <b-row class="m-0">
        <Asset v-bind:assets="synthAssetOptions" v-bind:is-origin-asset="true"/>
        <Asset v-bind:assets="synthAssetOptions" v-bind:is-origin-asset="false"/>
      </b-row>

      <div class="symbol-arrow">
        <div class="arrow-container">
          <BIconArrowRight/>
        </div>
      </div>
    </div>

    <b-row>
      <button v-if="isWalletConnected" class="button-execution" v-on:click="swap" >SWAP IT</button>
      <button v-if="!isWalletConnected" class="button-connect" @click="$bvModal.show('modalConnect')">Connect</button>
    </b-row>
  </div>
</template>

<script lang="ts" src="./swap.ts"></script>
<style lang="scss" src="./swap.scss"></style>
