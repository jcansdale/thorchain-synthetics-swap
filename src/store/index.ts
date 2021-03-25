import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userwallet: null,
    assetOptions: []
  },
  getters: {
    getUserwallet: state => {
      return state.userwallet;
    },
    getSynthAssetOptions: state => {
      return state.assetOptions.map((asset: any) => {
        return {
          text: "THOR." + asset.asset.split("\.")[1],
          value: "THOR." + asset.asset.split("\.")[1]
        }
      }).sort((a, b) => (a.text > b.text) ? 1 : -1)
    },
    getL1AssetOptions: state => {
      return state.assetOptions;
    }
  },
  mutations: {
    setUserwallet(state, userwallet){
      state.userwallet = userwallet;
    },
    setAssetOptions(state, assetOptions){
      state.assetOptions = assetOptions;
    }
  },
  actions: {},
  modules: {}
});
