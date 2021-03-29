<template>
  <div class="home">
    <div id="login-button">
      <a @click="openModal()">
        <div>Connect Wallet</div>
      </a>
    </div>

    <ConnectModal id="connectWalletModal"></ConnectModal>

    <b-container class="bv-example-row" id="swap-window">
      <b-row>
        <b-col>
          <b-button v-on:click="showMint" v-bind:variant="mintVariant" >Mint</b-button>
          <b-button v-on:click="showSwap" v-bind:variant="swapVariant" >Swap</b-button>
          <b-button v-on:click="showBurn" v-bind:variant="burnVariant" >Burn</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <Mint v-if="mintView" />
          <Swap v-if="swapView" />
          <Burn v-if="burnView" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style lang="scss">

  .swap-container {
    top: calc(50% - 200px);
    height: 400px;
    position: relative;

    .left {
      background-color: #e91e63;
    }
    .right {
        background-color: #212529;
    }
    article{
      background-color: #212529;
      border-color: #989898ee;
      border-radius: 30px;
      box-shadow: 0 0 10px #23dcc8;
    }
  }

</style>

<script lang="ts">
import Mint from "@/components/Mint.vue"
import Burn from "@/components/Burn.vue"
import Swap from "@/components/Swap.vue"
import {Component} from "vue-property-decorator";
import Vue from 'vue'
import {mapGetters} from "vuex";
import ConnectModal from "@/components/ConnectModal.vue";



@Component({
  components: {
    Mint,
    Burn,
    Swap,
    ConnectModal
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

  openModal(){
    this.$bvModal.show("modalConnect");
  }

}

</script>

<style lang="scss">
#swap-window {
  margin: 25vh auto 0;
}

#login-button {
  position: absolute;
  top: 2vh;
  right: 2vw;
}
</style>
