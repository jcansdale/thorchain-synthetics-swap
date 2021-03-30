<template>
  <div id="mint-container">
    <div>
      <b-row>
        <Asset v-bind:assets="synthAssetOptions" v-bind:is-origin-asset="true"/>
        <Asset v-bind:assets="[{text: 'THOR.RUNE', value: 'THOR.RUNE'}]" v-bind:is-origin-asset="false"/>
      </b-row>
      <b-row>
        <button class="button-execution" v-on:click="burn" :disabled="!isWalletConnected">BURN IT</button>
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
  computed: mapGetters({
    synthAssetOptions : 'getSynthAssetOptions',
    l1AssetOptions : 'getL1AssetOptions',
  }),
  components: {
    Asset
  }
})
export default class Burn extends Mixins(Wallet, Synthetics) {
  beforeMount(){
    document.addEventListener(EVENT_RECALCULATE, this.calculateRedeem)
  }

  beforeDestroy(){
    document.removeEventListener(EVENT_RECALCULATE, this.calculateRedeem)
  }
}
</script>

<style scoped>


</style>
