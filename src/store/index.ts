import Vue from "vue";
import Vuex from "vuex";
import {EVENT_RECALCULATE} from "@/common/consts";
import {AssetUpdate} from "@/common/assetUpdate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    applicationInitialized: false,
    userwallet: null,
    action: "mint",
    assetOptions: [],
    originAsset: "",
    originAssetAmount: 0,
    targetAsset: "",
    targetAssetAmount: 0,
    estimatedOriginValue: 0,
    estimatedTargetValue: 0,
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
      return state.estimatedOriginValue
    },
    getEstimatedTargetValue: state => {
      return state.estimatedTargetValue
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
    resetAssetInput(state) {
      state.originAsset = ""
      state.originAssetAmount = 0
      state.targetAsset = ""
      state.targetAssetAmount = 0
    },
    updateAssetInput(state, update: AssetUpdate) {
      if(update.isOriginAsset) {
        if(update.asset !== state.originAsset) {
          state.originAsset = update.asset
        }
        state.originAssetAmount = update.assetAmount

      } else {
        if(update.asset !== state.targetAsset) {
          state.targetAsset = update.asset
        }
        state.targetAssetAmount = update.assetAmount
      }

      // Trigger first calculation when both assets are decided
      // Don't trigger when update was applied by calculations
      if(update.manualUpdate && state.targetAsset !== "" && state.originAsset !== "") {
        document.dispatchEvent(new Event(EVENT_RECALCULATE))
      }
    },
  },
  actions: {},
  modules: {}
});
