
import Mint from "@/components/Mint/Mint.vue"
import Burn from "@/components/Burn/Burn.vue"
import Swap from "@/components/Swap/Swap.vue"
import {Component} from "vue-property-decorator";
import Vue from 'vue'
import {mapGetters} from "vuex";
import ConnectModal from "@/components/ConnectModal/ConnectModal.vue";
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
    mintView: boolean = true;
    swapView: boolean = false;
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
}
