
import Swap from "@/components/Swap/Swap.vue"
import {Component} from "vue-property-decorator";
import Vue from 'vue'
import {mapGetters} from "vuex";
import ConnectModal from "@/components/ConnectModal/ConnectModal.vue";
import {BIconGithub, BIconTwitter} from "bootstrap-vue";

@Component({
    components: {
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

    beforeMount(){
        const apiUrl = 'https://testnet.midgard.thorchain.info/v2/pools';
        this.$http.get(apiUrl)
            .then((value: any) => {
                this.$store.commit("setAssetOptions", value.data.map((asset: any) => {
                    return { "asset": asset.asset }
                }));
            })
    }
}
