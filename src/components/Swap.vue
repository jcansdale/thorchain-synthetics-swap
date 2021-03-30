<template>
  <div id="swap-container">
    <div>
      <b-row>
          <Asset v-bind:assets="synthAssetOptions" v-bind:is-origin-asset="true"/>
          <Asset v-bind:assets="synthAssetOptions" v-bind:is-origin-asset="false"/>
      </b-row>
      <b-row>
        <button class="button-execution" v-on:click="swap"  :disabled="!isWalletConnected">SWAP IT</button>
      </b-row>
    </div>
  </div>
</template>

<script lang="ts">
import Synthetics from "@/mixins/Synthetics";
import Wallet from "@/mixins/Wallet"
import {Component , Mixins} from 'vue-property-decorator'
import {mapGetters} from "vuex";

import Asset from "@/components/Asset.vue";
import {EVENT_RECALCULATE} from "@/common/consts";

@Component({
  components: {
    Asset,
  },
  computed: mapGetters({
    synthAssetOptions : 'getSynthAssetOptions',
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
