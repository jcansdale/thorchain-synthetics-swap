<template>
  <div id="swap-container">
    <div class="assets-container">
      <b-row>
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

<script lang="ts">
import Synthetics from "@/mixins/Synthetics";
import Wallet from "@/mixins/Wallet"
import {Component , Mixins} from 'vue-property-decorator'
import {mapGetters} from "vuex";

import Asset from "@/components/Asset/Asset.vue";
import {EVENT_RECALCULATE} from "@/common/consts";

@Component({
  components: {
    Asset,
  },
  computed: mapGetters({
    synthAssetOptions : 'getAssetOptions',
  })
})
export default class Swap extends Mixins(Wallet, Synthetics) {
  beforeMount(){
    document.addEventListener(EVENT_RECALCULATE, this.calculateSwap)
  }

  beforeDestroy(){
    document.removeEventListener(EVENT_RECALCULATE, this.calculateSwap)
  }
}
</script>

<style scoped>

</style>
