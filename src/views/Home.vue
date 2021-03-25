<template>
  <div class="home">
    <b-container class="bv-example-row">
      <b-row>
        <b-col />
        <b-col>
          <b-button v-on:click="showMint" v-bind:variant="mintVariant" >Mint</b-button>
          <b-button v-on:click="showSwap" v-bind:variant="swapVariant" >Swap</b-button>
          <b-button v-on:click="showBurn" v-bind:variant="burnVariant" >Burn</b-button>
        </b-col>
        <b-col />
      </b-row>
      <b-row>
        <b-col />
        <b-col>
          <Mint v-if="mintView" />
          <Swap v-if="swapView" />
          <Burn v-if="burnView" />
        </b-col>
        <b-col />
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Mint from "@/components/Mint.vue"
import Burn from "@/components/Burn.vue"
import Swap from "@/components/Swap.vue"
import {Component} from "vue-property-decorator";
import Vue from 'vue'
import {mapGetters} from "vuex";




@Component({
  components: {
    Mint,
    Burn,
    Swap
  },
  computed: mapGetters({
    userwallet : 'getUserwallet',
  })
})

export default class Home extends Vue {

  mintView: boolean = false;
  swapView: boolean = true;
  burnView: boolean = false;
  mintVariant: string = "outline-secondary"
  swapVariant: string = ""
  burnVariant: string = "outline-secondary"

  reset(){
    this.mintView = false;
    this.swapView = false;
    this.burnView = false;
    this.mintVariant = "outline-secondary"
    this.swapVariant = "outline-secondary"
    this.burnVariant = "outline-secondary"
  }

  beforeMount(){
    const apiUrl = 'https://testnet.midgard.thorchain.info/v2/pools';
    this.$http.get(apiUrl)
        .then((value: any) => {
          this.$store.commit("setAssetOptions", value.data.map((asset: any) => {
            return { "asset": asset.asset }
          }));
        });
  }

  showMint(){
    this.reset()
    this.mintView = true;
    this.mintVariant = ""
  }

  showSwap(){
    this.reset()
    this.swapView = true;
    this.swapVariant = ""
  }

  showBurn(){
    this.reset()
    this.burnView = true;
    this.burnVariant = ""
  }

}

</script>
