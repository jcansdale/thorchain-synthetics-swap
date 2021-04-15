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
          <b-img :src="getImageURL(selectedAsset.text)" class="image-currency"/>
          <p>{{selectedAsset.text}}</p>
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

      <input type="number" v-if="isOriginAsset" class="asset-amount" v-model.number="amount" :onchange="updateAsset()" placeholder="Enter amount"/>
      <input v-if="!isOriginAsset" class="asset-amount" v-model="targetAssetAmount" disabled/>

    </div>
    <hr>

    <div class="overview">
      <div class="text-fiat-value" v-if="isOriginAsset">
        <p>{{estimatedOriginValue}} $</p>
      </div>
      <div class="text-fiat-value" v-if="!isOriginAsset">
        <p>{{estimatedTargetValue}} $</p>
      </div>

      <div class="text-equivalence">approx. equivalent</div>
    </div>

  </div>
</template>

<script lang="ts" src="./asset.ts"></script>

<style scoped lang="scss" src="./assets.scss"></style>
