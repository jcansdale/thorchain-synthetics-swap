import Wallet from "@/mixins/Wallet"
import {Component , Mixins} from 'vue-property-decorator'
import {mapGetters} from "vuex";

import Asset from "@/components/Asset/Asset.vue";
import {EVENT_RECALCULATE} from "@/common/consts";
import Natives from "@/mixins/Natives";

@Component({
    components: {
        Asset,
    },
    computed: mapGetters({
        synthAssetOptions : 'getAssetOptions',
    })
})
export default class NativeSwap extends Mixins(Natives) {

    synthAssetOptions : object[] | undefined

    private readonly runeAsset = {text: 'RUNE', value: 'THOR.RUNE'}

    toggle(action: string){
        this.$store.commit("setAction", action)
    }

    nativeAssets() {
        const nativeAssets: any = [this.runeAsset]
        this.synthAssetOptions?.forEach(asset => {
            nativeAssets.push(asset)
        })
        return nativeAssets
    }

    beforeMount(){
        document.addEventListener(EVENT_RECALCULATE, this.calculate)
    }

    beforeDestroy(){
        document.removeEventListener(EVENT_RECALCULATE, this.calculate)
    }
}
