<template>
  <b-card
      title="Burn"
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
  >
    <b-card-text>

    </b-card-text>
  </b-card>
</template>

<script lang="ts">
import Synthetics from "@/mixins/Synthetics";
import Wallet from "@/mixins/Wallet"
import router from "@/router";
import {Component , Mixins} from 'vue-property-decorator'

@Component
export default class Burn extends Mixins(Wallet, Synthetics) {
  selected: any;

  data(){
    return {
      assetDepth: 0,
      runeDepth: 0,
      runeAmount: 0,
      synthAmount: 0,
      options:[],
      selected: "BTC.BTC"
    }
  }

}
</script>

<style scoped>

</style>