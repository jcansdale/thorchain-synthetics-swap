<template>
  <div class="asset-container" :class="{originAsset: isOriginAsset}">
    <b-row class="dropdown">
      <b-form-select class="selected-asset" :options="assets" v-model="selectedAsset" @change="updateAsset"/>
      <b-form-input class="asset-amount" v-model="amount"></b-form-input>
    </b-row>
    <hr>
    <div class="overview">
      <span class="text-fiat-value" v-if="isOriginAsset">
        {{estimatedOriginValue}} $
      </span>
      <span class="text-fiat-value" v-if="!isOriginAsset">
        {{estimatedTargetValue}} $
      </span>

      <span class="text-equivalence">approx. equivalent</span>
    </div>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator'
import Vue from 'vue'

import {mapGetters} from "vuex";
import {AssetUpdate} from "@/common/assetUpdate";
import {BIconArrowRight} from "bootstrap-vue";

@Component({
  props: ["assets", "isOriginAsset"],
  computed: mapGetters({
    estimatedOriginValue: "getEstimatedOriginValue",
    estimatedTargetValue: "getEstimatedTargetValue",
  }),
  components: {
    BIconArrowRight
  }
})
export default class Asset extends Vue {
  private assets!:any;
  private selectedAsset: any
  private amount: number = 0;
  private isOriginAsset!: boolean

  beforeMount(){
    this.selectedAsset = this.assets[0].value
    this.updateAsset()
  }

  updateAsset(){
    this.$store.commit("updateAssetInput", new AssetUpdate(
        this.selectedAsset,
        this.amount,
        this.isOriginAsset,
        true
    ))
  }
}
</script>

<style scoped lang="scss">
.asset-container{
  background-color: $asset-target-color;
  width: 50%;
  padding: 10px 40px;

  .dropdown{
    .selected-asset{
      width: 30%;
      line-height: 2em;
      font-size: 1em;
      margin-top: 0.25em;
      background-color: transparent;
      border: none;
      color: white;
    }

    .asset-amount {
      width: 70%;
      background-color: transparent;
      border: none;
      font-size: 1.5em;
      text-align: center;
      color: white;

    }
  }

  .overview {
    height: 6em;
    padding-top: 1em;

    .text-fiat-value {
      display: block;
      color: #919191;
      font-size: 3em;
      line-height: 1em;
      width: 100%;
    }

    .text-equivalence{
      display: block;

      color: rgba($secondary-color, 0.5);
      font-size: 0.7em;
      width: 100%;
    }
  }
}

.originAsset {
  background-color: $asset-origin-color;
}

</style>
