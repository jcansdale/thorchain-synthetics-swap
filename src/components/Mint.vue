<template>
  <b-card
      title="Mint"
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
  >
    <b-card-text>
      <b-input-group size="sm" >
        <b-form-input value="100" @change="calcMint(selected)" v-model="mint_runeAmount" class="text-right"></b-form-input>
        <template #append>
          <b-input-group-text >THOR.RUNE</b-input-group-text>
        </template>
      </b-input-group>
      <b-input-group size="sm">
        <b-form-input value="100" v-model="mint_synthAmount" class="text-right"></b-form-input>
        <b-form-select :options="synthAssetOptions" v-model="selected" @change="calcMint(selected)"/>
      </b-input-group>
    </b-card-text>
    <button v-on:click="mint"  v-if="isWalletConnected">Mint</button>
    <button v-on:click="gotToConnect"  v-if="!isWalletConnected">Connect wallet</button>
    {{assetDepth}}
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
    synthAssetOptions: "getSynthAssetOptions",
    l1AssetOptions: "getL1AssetOptions"
  })
})
export default class Mint extends Mixins(Wallet, Synthetics) {
  selected: any;

  gotToConnect(){
    router.push("/connect")
  }

}
</script>

<style scoped>

</style>