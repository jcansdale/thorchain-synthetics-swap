<template>
  <div class="asset-container" :class="{originAsset: isOriginAsset}">
    <b-row class="dropdown">
      <b-form-select class="selected-asset" :options="assets" v-model="selectedAsset" @change="updateAsset"/>
      <b-form-input class="asset-amount" v-model="amount"></b-form-input>
    </b-row>
    <div class="overview">
      <span v-if="isOriginAsset">
        {{estimatedOriginValue}} $
      </span>
      <span v-if="!isOriginAsset">
        {{estimatedTargetValue}} $
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator'
import Vue from 'vue'

import {mapGetters} from "vuex";
import {EVENT_RECALCULATE} from "@/common/consts";
import {AssetUpdate} from "@/common/assetUpdate";

@Component({
  props: ["assets", "isOriginAsset"],
  computed: mapGetters({
    estimatedOriginValue: "getEstimatedOriginValue",
    estimatedTargetValue: "getEstimatedTargetValue",
  })
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
  background-color: #14252d;
  width: 50%;
  padding: 40px;
  .dropdown{
    .selected-asset{
      width: 30%;
    }
    .asset-amount {
      width: 70%;
    }
  }
}

.originAsset {
  background-color: #06141c;
}

</style>
