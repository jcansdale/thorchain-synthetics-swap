<template>
  <div id="mint-container">
    <div class="assets-container">
      <b-row>
        <Asset v-bind:assets="[{text: 'THOR.RUNE', value: 'THOR.RUNE'}]" v-bind:is-origin-asset="true"/>
        <Asset v-bind:assets="synthAssetOptions" v-bind:is-origin-asset="false"/>
      </b-row>

      <div class="symbol-arrow">
        <div class="arrow-container">
          <BIconArrowRight/>
        </div>
      </div>
    </div>

    <b-row>
      <button class="button-execution" v-on:click="mint" :disabled="!isWalletConnected">MINT IT</button>
    </b-row>
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
  computed: mapGetters({
    synthAssetOptions: "getSynthAssetOptions",
    l1AssetOptions: "getL1AssetOptions"
  }),
  components: {
    Asset
  }
})
export default class Mint extends Mixins(Wallet, Synthetics) {
  beforeMount(){
    document.addEventListener(EVENT_RECALCULATE, this.calculateMint)
  }

  beforeDestroy(){
    document.removeEventListener(EVENT_RECALCULATE, this.calculateMint)
  }
}
</script>

<style scoped>


</style>
