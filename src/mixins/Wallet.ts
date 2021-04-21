import Component from "vue-class-component";
import Vue from "vue";
import {mapGetters} from "vuex";
import {decryptFromKeystore, encryptToKeyStore, generatePhrase, Keystore} from "@xchainjs/xchain-crypto/lib"
import {MultiWallet, WalletType} from "@/common/multi-wallet";
import {Watch} from "vue-property-decorator";


@Component({
    components: {
    },
    computed: mapGetters({
        userwallet : 'getUserwallet',
        isWalletConnected : 'isWalletConnected'
    })
})
export default class Wallet extends Vue {
    public userwallet!: null | MultiWallet;
    private thorchainBalance: number = 0
    private binanceBalance: number = 0

    public localStorageKeystore: string | null = null

    async connect(file: File, password: string){
        const read: FileReader = new FileReader();
        read.readAsBinaryString(file);
        read.onload = async (e: Event) => {
            if(typeof read.result === "string"){
                let keystore: Keystore = JSON.parse(read.result)
                let phrase = await decryptFromKeystore(keystore, password)
                this.$store.commit('setUserwallet', new MultiWallet(WalletType.Keystore, "testnet", phrase))
                localStorage.setItem("brokkrWallet", JSON.stringify(keystore))
            }
        }
        read.onerror = (e) => {
            console.log(e)
        }
    }

    disconnect() {
        this.$store.commit('setUserwallet', null);
    }

    async connectWithLocalStorageKeystore(password: string) {
        let keystore: Keystore = JSON.parse(this.localStorageKeystore!)
        let phrase = await decryptFromKeystore(keystore, password)
        this.$store.commit('setUserwallet', new MultiWallet(WalletType.Keystore, "testnet", phrase))
    }

    async generateKeystore(password: string) {
        const phrase = generatePhrase()
        alert(phrase)
        const keystore = await encryptToKeyStore(phrase, password)

        let link = document.createElement('a')
        link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(keystore))
        link.download = "keystore.txt"
        link.click()
    }


    // Swap RUNE -> BNB MEMO:    =:BNB.BNB:tbnb1zg83dlw5vt6x8sfj44ev9suscfwl53phdh6ku8:6370183

    @Watch("userwallet")
    getBalances() {
        if(this.userwallet !== null) {
            this.setThorchainBalance()
            this.setBinancechainBalance()
        }
    }

    async setThorchainBalance() {
        if(this.userwallet!.walletType === WalletType.Keystore) {
            this.userwallet!.thorchain!.getBalance().then((response: any) => {
                this.thorchainBalance = response[0].amount.amount() / Math.pow(10, 8)
            })
        } else {
            console.log("KEPLR GET BALANCE NOT IMPLEMENTED")
        }
    }

    async setBinancechainBalance() {
        if(this.userwallet!.walletType === WalletType.Keystore) {
            this.userwallet!.binance!.getBalance().then((response: any) => {
                this.binanceBalance = response[0].amount.amount() / Math.pow(10, 8)
            })
        } else {
            console.log("KEPLR GET BALANCE NOT IMPLEMENTED")
        }
    }
}
