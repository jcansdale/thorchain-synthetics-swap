<template>
  <b-card
      title="Swap"
      tag="article"
  >
    <b-card-text>
        <b-container class="inner-container" fluid="lg">
          <b-row>
            <b-col>
              <b-input-group size="lg" >
                <b-form-select :options="synthAssetOptions" v-model="selectedX" @change="calcSwap(selectedX, selectedY)"/>
                <b-form-input value="100" @change="calcSwap(selectedX, selectedY)" v-model="redeem_synthAmount" class="text-right"></b-form-input>
              </b-input-group>
            </b-col>
            <b-col sm="1" ></b-col>
            <b-col>
              <b-input-group size="lg">
                <b-form-select :options="synthAssetOptions" v-model="selectedY" @change="calcSwap(selectedX, selectedY)"/>
                <b-form-input value="100" @change="calcSwap(selectedX, selectedY)" v-model="mint_synthAmount" class="text-right"></b-form-input>
              </b-input-group>
            </b-col>
          </b-row>
          <b-row>
            <button v-on:click="mint"  v-if="isWalletConnected">Swap</button>
            <button v-on:click="gotToConnect"  v-if="!isWalletConnected">Connect wallet</button>
          </b-row>
        </b-container>
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