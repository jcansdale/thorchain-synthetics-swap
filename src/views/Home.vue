<template>
  <div class="home">
    <h1>Synth Swap</h1>
    <b-container class="bv-example-row">
      <b-row>
        <b-col />
        <b-col>
          <b-card
              title="Swap"
              tag="article"
              style="max-width: 20rem;"
              class="mb-2"
          >
            <b-card-text>
              <b-input-group size="sm" >
                <b-form-input value="100" @change="calc" v-model="runeAmount" class="text-right"></b-form-input>
                <template #append>
                  <b-input-group-text >THOR.RUNE</b-input-group-text>
                </template>
              </b-input-group>
              <b-input-group size="sm">
                <b-form-input value="100" v-model="synthAmount" class="text-right"></b-form-input>
                <b-form-select :options="options" v-model="selected" @change="calc"/>
              </b-input-group>
            </b-card-text>
            <button v-on:click="mint">Mint</button>
          </b-card>
        </b-col>
        <b-col />
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  Secp256k1HdWallet,
  SigningCosmosClient,
  coins,
} from "@cosmjs/launchpad";


@Component({
  components: {
  }
})

export default class Home extends Vue {
  assetDepth: number = 0;
  runeDepth: number = 0;
  synthAmount: number = 0;
  runeAmount: number = 0;
  options: any;
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

  mounted(){
    const apiUrl = 'https://testnet.midgard.thorchain.info/v2/pools';

    this.$http.get(apiUrl)
        .then((result: any) => {
          result.data.forEach((value: any) => {
            this.options.push({"value" : value.asset, "text": value.asset})
          });
        });
  }

  calc(){
    const apiUrl = 'https://testnet.midgard.thorchain.info/v2/pool/';

    this.$http.get(apiUrl + this.selected)
        .then((result: any) => {
          this.assetDepth = result.data.assetDepth
          this.runeDepth = result.data.runeDepth
          this.synthAmount = (Number(this.runeAmount) * Number(this.runeDepth) * Number(this.assetDepth))/
              Math.pow((Number(this.runeAmount) + Number(this.runeDepth)), 2)
        })
  }

  async mint(){
    const wallet = await Secp256k1HdWallet.generate();
    const [{ address }] = await wallet.getAccounts();
    console.log("Address:", address);

    const lcdApi = "https://testnet.midgard.thorchain.info/";
    const client = new SigningCosmosClient(lcdApi, address, wallet);
    

    /*
    P = poolUnits (https://testnet.midgard.thorchain.info/v2/pool/ETH.ETH)
    A = assetDepth, R = runeDepth, r = runeAmount
    pool.runeDepth += r
    synthUnits += (P r)/(2 (r + R))
    synthAmount = (r * R * A)/(r + R)^2
    synthSupply += synthAmount
    transfer(recipient, synth, synthAmount)
     */
    console.log("mint")
  }

}



</script>
