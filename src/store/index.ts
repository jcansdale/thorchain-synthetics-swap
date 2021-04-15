import Vue from "vue";
import Vuex from "vuex";
import {EVENT_RECALCULATE} from "@/common/consts";
import {AssetUpdate} from "@/common/assetUpdate";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    applicationInitialized: false,
    userwallet: null,
    action: "mint",
    assetOptions: [],
    originAsset: "",
    originAssetAmount: 0,
    originAssetPrice: 0,
    targetAsset: "",
    targetAssetAmount: 0,
    targetAssetPrice: 0,
  },
  getters: {
    getApplicationInitializationState: state => {
    return state.applicationInitialized
    },
    getUserwallet: state => {
      return state.userwallet;
    },
    getAction: state => {
      return state.action;
    },
    getAssetOptions: state => {
      return state.assetOptions.map((asset: any) => {
        return {
          text: asset.asset.split("\.")[1].split("-")[0],
          value: asset.asset
        }
      }).sort((a, b) => (a.text > b.text) ? 1 : -1)
    },
    isWalletConnected: state => {
      return state.userwallet !== null
    },
    getEstimatedOriginValue: state => {
      return Math.round(state.originAssetPrice * state.originAssetAmount * 100) / 100
    },
    getEstimatedTargetValue: state => {
      return Math.round(state.targetAssetPrice * state.targetAssetAmount * 100) / 100
    },
    getOriginAssetValue: state => {
      return state.originAsset
    },
    getOriginAssetAmount: state => {
      return state.originAssetAmount
    },
    getTargetAssetValue: state => {
      return state.targetAsset
    },
    getTargetAssetAmount: state => {
      return state.targetAssetAmount
    }
  },
  mutations: {
    setUserwallet(state, userwallet){
      state.userwallet = userwallet;
    },
    setAction(state, action){
      state.action = action;
    },
    setAssetOptions(state, assetOptions){
      state.assetOptions = assetOptions;
      state.applicationInitialized = true
    },
  },
  actions: {
    updateAssetInput({dispatch, state}, update: AssetUpdate) {
      if(update.isOriginAsset) {
        if(update.asset !== state.originAsset) {
          state.originAsset = update.asset
          dispatch("getOriginUSDPrice")
        }
        state.originAssetAmount = update.assetAmount

      } else {
        if(update.asset !== state.targetAsset) {
          state.targetAsset = update.asset
          dispatch("getTargetUSDPrice")
        }
        state.targetAssetAmount = update.assetAmount
      }

      // Trigger first calculation when both assets are decided
      // Don't trigger when update was applied by calculations
      if(update.manualUpdate && state.targetAsset !== "" && state.originAsset !== "") {
        document.dispatchEvent(new Event(EVENT_RECALCULATE))
      }
    },
    getOriginUSDPrice({state, getters}) {
      let originSymbol = getters.getOriginAssetValue.text
      axios.get("https://api.binance.com/api/v3/ticker/price?symbol=" + originSymbol + "USDT").then(result => {
        state.originAssetPrice = result.data.price
          }
      )
    },
    getTargetUSDPrice({state, getters}) {
      let targetSymbol = getters.getTargetAssetValue.text
      axios.get("https://api.binance.com/api/v3/ticker/price?symbol=" + targetSymbol + "USDT").then(result => {
            state.targetAssetPrice = result.data.price
          }
      )
    },

  },
  modules: {}
});
