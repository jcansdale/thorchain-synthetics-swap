<template>
  <div class="asset-container"
       :class="{originAsset: isOriginAsset}">
    <div class="input-section">

      <div class="dropdown"
           :tabindex="0"
           @blur="open = ongoingSearch">
        <div class="selected" :class="{open: open}" @click="open = !open">
          <BIconChevronUp v-if="open" class="symbol-dropdown"/>
          <BIconChevronDown v-if="!open" class="symbol-dropdown"/>
          {{selectedAsset.text}}
        </div>

        <div class="dropdown-window"
             :class="{hideDropDown: !open}">
          <div class="items-search-box">
            <input
                v-model="assetFilter"
                class="input-search"
                @mousedown="ongoingSearch = true"
                @blur="ongoingSearch = false; open=false; assetFilter=''">
            <BIconSearch class="symbol-search"/>
          </div>

          <hr>

          <div class="items-wrapper">
            <div v-for="asset in assets.filter(asset => asset.text.toUpperCase().includes(assetFilter.toUpperCase()))"
                 :value="asset.value"
                 v-bind:key="asset.value"
                 @mousedown="selectedAsset = asset; open=false; updateAsset()"
                 class="items">
              <hr>
              <b-img :src="getImageURL(asset.text)" class="image-currency"/>
              {{asset.text}}
            </div>
          </div>

        </div>
      </div>

      <input class="asset-amount" v-model="amount"/>
    </div>
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
import {BIconArrowRight, BIconChevronDown, BIconChevronUp, BIconSearch, BIconXCircle} from "bootstrap-vue";

@Component({
  props: ["assets", "isOriginAsset"],
  computed: mapGetters({
    estimatedOriginValue: "getEstimatedOriginValue",
    estimatedTargetValue: "getEstimatedTargetValue",
  }),
  components: {
    BIconArrowRight,
    BIconChevronUp,
    BIconChevronDown,
    BIconXCircle,
    BIconSearch
  }
})
export default class Asset extends Vue {
  private assets!:any
  private selectedAsset: any
  private amount: number = 0
  private isOriginAsset!: boolean

  private open: boolean = false
  private assetFilter: string = ""
  private ongoingSearch: boolean = false

  beforeMount(){
    this.selectedAsset = this.assets[0]
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

  getImageURL(asset:string) {
    let images = require.context("../assets/images/icons/", false, /\.png$/)
    let image
    try {
      image = images('./' + asset + '.png')
      return image
    }
    catch(e) {
      return null
    }
  }
}
</script>

<style scoped lang="scss">

.asset-container{
  background-color: $asset-target-color;
  width: 50%;
  padding: 10px 40px;
  border-top-right-radius: $main-window-border-radius;

  hr {
    width: 90%;
    background-color: rgba(#919191, 0.2);
    height: 1px;
    margin: -2px auto 0;
  }

  .input-section{
    display: flex;
    width: 90%;
    margin: 0 auto;
    padding-top: 15px;

    .dropdown{
      position: relative;
      margin-top: 0.25em;

      width: 40%;
      line-height: 2em;
      font-size: 1em;

      background-color: transparent;
      color: white;
      outline: none;

      hr {
        width: 100%;
      }

      .selected {
        cursor: pointer;
        text-align: left;

        .symbol-dropdown {
          color: $secondary-color;
          margin-right: 1rem;
        }
      }

      .dropdown-window {
        position: absolute;
        width: 250%;

        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;

        z-index: 1;
        cursor: pointer;
        backdrop-filter: blur(30px);
        background-color: $dropdown-menu-color-transparent;
        overflow: hidden;

        .items-search-box {
          position: relative;
          justify-content: space-around;
          padding: 10px 5px 10px;

          .input-search {
            width: 90%;
            background-color: rgba(#e3e3e3, 0.3);
            color: white;
            border: white solid 1px;
            padding: 0 20px;
            border-radius: 3px;
            outline: none;
          }

          .symbol-search {
            position: absolute;
            top: 1em;
            right: 3em;
            font-size: 1em;
          }
        }

        .items-wrapper {
          max-height: 15em;
          overflow-y: auto;
          scrollbar-width: none;

          .items{
            text-align: left;
            .image-currency {
              width: 20px;
              height: auto;
              margin: 0 20px 0;
            }
          }

          .items:hover {
            background-color: $dropdown-menu-color-transparent-highlight;
          }
        }

        .items-wrapper::-webkit-scrollbar {
          display: none;
        }
      }

      .hideDropDown {
        display: none;
      }
    }

    .asset-amount {
      width: 60%;
      background-color: transparent;
      border: none;
      font-size: 1.5em;
      text-align: center;
      color: white;
      outline: none;
    }
  }

  .overview {
    height: 8em;
    padding-top: 2.5em;

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
  border-top-left-radius: $main-window-border-radius;
  border-top-right-radius: 0;
}

@supports (-moz-appearance:none) {
  .asset-container .input-section .dropdown .dropdown-window  {
    background-color: $dropdown-menu-color-opaque;

    .items-wrapper .items:hover {
      background-color: $dropdown-menu-color-opaque-highlight;
    }
  }
}


</style>
