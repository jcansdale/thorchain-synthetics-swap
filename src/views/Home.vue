<template>
  <div class="home">
    <div id="login-button">
      <b-button @click="openModal()">
        Connect Wallet
      </b-button>
    </div>

    <ConnectModal id="connectWalletModal"></ConnectModal>

    <div id="main-content">
      <div class="buttons-mode">
        <button v-on:click="showMint" :class="{activeButton: mintView}" >Mint</button>
        <button v-on:click="showSwap" :class="{activeButton: swapView}" >Swap</button>
        <button v-on:click="showBurn" :class="{activeButton: burnView}" >Burn</button>
      </div>

      <!-- Wait until assets are loaded-->
      <b-container id="swap-window" v-if="initialized">
        <b-row>
          <b-col>
            <Mint v-if="mintView" />
            <Swap v-if="swapView" />
            <Burn v-if="burnView" />
          </b-col>
        </b-row>
      </b-container>
    </div>

  </div>
</template>

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
    initialized: 'getApplicationInitializationState'
  })
})

export default class Home extends Vue {

  mintView: boolean = false;
  swapView: boolean = true;
  burnView: boolean = false;

  reset(){
    this.$store.commit("resetAssetInput")
    this.mintView = false;
    this.swapView = false;
    this.burnView = false;
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
  }

  showSwap(){
    this.reset()
    this.swapView = true;
  }

  showBurn(){
    this.reset()
    this.burnView = true;
  }

  openModal(){
    this.$bvModal.show("modalConnect");
  }

}

</script>

<style lang="scss">
#login-button {
  position: absolute;
  top: 2vh;
  right: 2vw;
}

#main-content {
  margin: 25vh auto 0;

  .buttons-mode {
    width: 30vw;
    margin: 0 auto 3em;

    display: flex;
    justify-content: space-around;
  }

  #swap-window {
    background-color: #010a13;
    border-radius: 50px;
    border: $secondary-color-light 1.5px solid;
    box-shadow: 0 7px 30px 5px $secondary-color-glow;

    overflow: hidden;

    .button-execution {
      margin: 1.5em auto 1.5em;
      height: 3em;
      width: 10em;

      background-color: $secondary-color;
      padding-top: 0.5em;
      color: black;

      border-radius: 10px;
      border: 0;
    }
  }
}

</style>
