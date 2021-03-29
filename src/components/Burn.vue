<template>
  <b-card
      title="Burn"
      tag="article"
  >
    <b-card-text>
      <b-card-text>

        <b-input-group size="sm" >
          <b-form-input value="100" @change="calcRedeem(selected)" v-model="redeem_synthAmount" class="text-right"></b-form-input>
          <b-form-select :options="synthAssetOptions" v-model="selected" @change="calcRedeem(selected)"/>
        </b-input-group>
        <b-input-group size="sm">
          <b-form-input value="100" @change="calcRedeem(selected)" v-model="redeem_runeAmount" class="text-right"></b-form-input>
          <template #append>
            <b-input-group-text >THOR.RUNE</b-input-group-text>
          </template>
        </b-input-group>
      </b-card-text>
      <button v-on:click="mint" v-if="isWalletConnected">Mint</button>
      <button v-on:click="gotToConnect" v-if="!isWalletConnected">Connect wallet</button>
    </b-card-text>
  </b-card>
</template>

<script lang="ts">
import Synthetics from "@/mixins/Synthetics";
import Wallet from "@/mixins/Wallet"
import {Component , Mixins} from 'vue-property-decorator'
import {mapGetters} from "vuex";

@Component({
  computed: mapGetters({
    synthAssetOptions : 'getSynthAssetOptions',
    l1AssetOptions : 'getL1AssetOptions',
  })
})
export default class Burn extends Mixins(Wallet, Synthetics) {
  selected: any;

  gotToConnect(){
    this.$router.push("/connect")
  }

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
