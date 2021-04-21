import {Component, Mixins} from "vue-property-decorator";
import {mapGetters} from "vuex";
import Wallet from "@/mixins/Wallet";
import {Window as KeplrWindow} from "@keplr-wallet/types/build/window";
import {MultiWallet, WalletType} from "@/common/multi-wallet";
import {CHAIN_ID_THORCHAIN_CHAOSNET, NODE_URL_TESTNET} from "@/common/consts";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Window extends KeplrWindow {}
}

@Component({
    components: {
    },
    computed: mapGetters({
        userwallet : 'getUserwallet',
    })
})

export default class Home extends Mixins(Wallet) {
    // Refactor
    password: string = "";
    newPassword: string = "";
    localStoragePassword: string = "";

    file: File| null = null;

    mounted() {
        this.localStorageKeystore = localStorage.getItem("brokkrWallet")
    }

    async connectKeplr() {
        const currencyRune = {
            coinDenom: "RUNE",
            coinMinimalDenom: "THOR",
            coinDecimals: 8,
        }
        await window.keplr?.experimentalSuggestChain({
            chainId: CHAIN_ID_THORCHAIN_CHAOSNET,
            chainName: "Thorchain",
            rpc: NODE_URL_TESTNET,
            rest: "http://157.245.24.22:1317",
            stakeCurrency: currencyRune,
            bip44: {
                coinType: 118
        },
            bech32Config: {
                bech32PrefixAccAddr: "thor",
                bech32PrefixAccPub: "thorpub",
                bech32PrefixValAddr: "thorsvaloper",
                bech32PrefixValPub: "thorvaloperpub",
                bech32PrefixConsAddr: "thorvalcons",
                bech32PrefixConsPub: "thorvalconspub"
            },
            currencies: [currencyRune],
            feeCurrencies: [currencyRune],
            coinType: 118,
            gasPriceStep: {
                low: 0.01,
                average: 0.025,
                high: 0.04
            }
        })

        window.keplr?.enable(CHAIN_ID_THORCHAIN_CHAOSNET)
        this.$store.commit('setUserwallet',  new MultiWallet(WalletType.Addon, "testnet", undefined));
    }

}
