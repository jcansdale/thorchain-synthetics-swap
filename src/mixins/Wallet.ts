import Component from "vue-class-component";
import Vue from "vue";
import {mapGetters} from "vuex";
import {decryptFromKeystore, encryptToKeyStore, generatePhrase, Keystore} from "@xchainjs/xchain-crypto/lib"
import {MultiWallet, WalletType} from "@/common/multi-wallet";


@Component({
    components: {
    },
    computed: mapGetters({
        userwallet : 'getUserwallet',
        isWalletConnected : 'isWalletConnected'
    })
})
export default class Wallet extends Vue {
    private userwallet!: any;

    async connect(file: File, password: string){
        console.log(file)
        console.log(URL.createObjectURL(file))
        const read: FileReader = new FileReader();
        read.readAsBinaryString(file);
        read.onload = async (e: Event) => {
            if(typeof read.result === "string"){
                let keystore: Keystore = JSON.parse(read.result)
                let phrase = await decryptFromKeystore(keystore, password)
                this.$store.commit('setUserwallet', new MultiWallet(WalletType.Keystore, phrase));
            }
        }
        read.onerror = (e) => {
            console.log(e)
        }
    }

    disconnect() {
        this.$store.commit('setUserwallet', null);
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


    buf2hex(buffer: Uint8Array) { // buffer is an ArrayBuffer
        return '0x' + Array.prototype.map.call(new Uint8Array(buffer),
            x => ('00' + x.toString(16)).slice(-2)).join('');
    }
}
