import Component from "vue-class-component";
import Vue from "vue";
import {Secp256k1HdWallet} from "@cosmjs/launchpad";
import {mapGetters} from "vuex";

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
                let userwallet = await Secp256k1HdWallet.deserialize(read.result, password);
                this.$store.commit('setUserwallet', userwallet);
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
        const wallet = await Secp256k1HdWallet.generate(18)
        const serialized = await wallet.serialize(password)
        let link = document.createElement('a')
        link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(serialized)
        link.download = "keystore.txt"
        link.click()
    }


    buf2hex(buffer: Uint8Array) { // buffer is an ArrayBuffer
        return '0x' + Array.prototype.map.call(new Uint8Array(buffer),
            x => ('00' + x.toString(16)).slice(-2)).join('');
    }
}
