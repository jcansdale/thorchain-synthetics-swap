<template>
  <b-card
      title="Swap"
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
  >
    <b-card-text>
      <b-card-text>
        <b-input-group size="sm" >
          <b-form-input value="100" @change="calcSwap(selectedX, selectedY)" v-model="synthXAmount" class="text-right"></b-form-input>
          <b-form-select :options="synthAssetOptions" v-model="selectedX" @change="calcSwap(selectedX, selectedY)"/>
        </b-input-group>
        <b-input-group size="sm">
          <b-form-input value="100" @change="calcSwap(selectedX, selectedY)" v-model="synthYAmount" class="text-right"></b-form-input>
          <b-form-select :options="synthAssetOptions" v-model="selectedY" @change="calcSwap(selectedX, selectedY)"/>
        </b-input-group>
      </b-card-text>
      <button v-on:click="mint" v-if="connected">Mint</button>
      <button v-on:click="gotToConnect" v-if="!connected">Connect wallet</button>
    </b-card-text>
  </b-card>
</template>

<script lang="ts">
import Synthetics from "@/mixins/Synthetics";
import Wallet from "@/mixins/Wallet"
import router from "@/router";
import {Component , Mixins} from 'vue-property-decorator'
import {mapGetters} from "vuex";

@Component({
    computed: mapGetters({
      synthAssetOptions : 'getSynthAssetOptions',
    })
})
export default class Swap extends Mixins(Wallet, Synthetics) {
  selectedX: string = ""
  selectedY: string = ""

  gotToConnect(){
    router.push("/connect")
  }

}
</script>

<style scoped>

</style>