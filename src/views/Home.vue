<template>
  <div class="home">
    <div id="label-address" v-if="isWalletConnected">
      <p>{{userwallet.address}}</p>
    </div>

    <div v-if="!isWalletConnected"  class="login-button">
      <button @click="openModal()">Connect</button>
    </div>
    <div v-if="isWalletConnected" class="login-button">
      <button @click="alert('to be implemented')">Log out</button>
    </div>

    <ConnectModal id="connectWalletModal"></ConnectModal>

    <div id="main-content">
      <h1 id="text-title">
        Swap your Synths
      </h1>
      <div class="buttons-mode">
        <button v-on:click="showMint" v-bind:class="{activeButton: mintView}" >Mint</button>
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

      <div id="label-fee">
        <p>FEE Rune Network Fee</p>
      </div>
    </div>

    <div id="social-container">
      <BIconGithub/>
      <BIconTwitter/>
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
import {BIconGithub, BIconTwitter} from "bootstrap-vue";

@Component({
  components: {
    Mint,
    Burn,
    Swap,
    ConnectModal,
    BIconGithub,
    BIconTwitter
  },
  computed: mapGetters({
    userwallet : 'getUserwallet',
    initialized: 'getApplicationInitializationState',
    isWalletConnected: 'isWalletConnected'
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

#label-address {
  position: absolute;
  top: 2vh;
  right: 17vw;
  width: 8vw;

  p {
    overflow: hidden;
    color: $secondary-color;
    line-height: 1.7em;
    text-decoration: underline;
  }
}

.login-button {
  position: absolute;
  top: 2vh;
  right: 8vw;

  button {

    height: 40px;
    width: 140px;

    color: white;
    background-color: rgba(0,0,0,0);
    border: $secondary-color 2px solid;
    border-radius: 10px;

    line-height: 1.7em;

  }

}

#main-content {
  margin: 18vh auto 0;

  #text-title {
    font-size: 4em;
    font-weight: 900;
    color: white;
    margin-bottom: 60px;
  }

  .buttons-mode {
    width: 30vw;
    margin: 0 auto 30px;

    display: flex;
    justify-content: space-around;

    button {
      height: 80px;
      width: 80px;
      border-radius: 40px;

      border: $secondary-color-light 2px solid;
      background-color: transparent;
      color: white;
    }

    button:hover {
      background-color: #0a0c13;
      color: $secondary-color-light;
    }

    button:active {
      background-color: white;
      color: #0a0c13;
    }

    activeButton {
      background-color: $secondary-color;
      color: #0a0c13;
    }
  }

  #swap-window {
    background-color: #010a13;
    border-radius: 50px;
    border: $secondary-color-light 1.5px solid;
    box-shadow: 0 7px 30px 5px $secondary-color-glow;

    overflow: hidden;

    .button-execution {
      margin: 2em auto 2em;
      height: 3em;
      width: 10em;

      background-color: $secondary-color;
      padding-top: 0.5em;
      color: black;

      border-radius: 10px;
      border: 0;
    }

    .assets-container {
      position: relative;
      .symbol-arrow {
        position: absolute;
        top: 6.4em;
        left: calc(50% - 1.75em);

        width: 3.5em;
        height: 3.5em;

        border-radius: 20px;
        background-color: $asset-origin-color;

        .arrow-container {
          width: 2.5em;
          height: 2.5em;
          margin: 0.5em;

          line-height: 2.75em;

          background-color: $secondary-color;
          border-radius: 10px;
        }
      }
    }
  }

  #label-fee {
    margin-top: 3em;
    color: $secondary-color-light;
  }
}

#social-container {
  display: flex;
  justify-content: space-around;

  position: absolute;
  bottom: 8vh;
  right: 8vw;

  width: 5vw;
  font-size: 1.5em;
  color: $secondary-color;
}


</style>
