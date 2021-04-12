import Synthetics from "@/mixins/Synthetics";
import Wallet from "@/mixins/Wallet"
import {Component , Mixins} from 'vue-property-decorator'
import {mapGetters} from "vuex";

import Asset from "@/components/Asset/Asset.vue";
import {EVENT_RECALCULATE} from "@/common/consts";

@Component({
    components: {
        Asset,
    },
    computed: mapGetters({
        synthAssetOptions : 'getAssetOptions',
    })
})
export default class Swap extends Mixins(Wallet, Synthetics) {

    synthAssetOptions : object[] | undefined

    private readonly runeAsset = [{text: 'RUNE', value: 'THOR.RUNE'}]

    toggle(action: string){
        this.$store.commit("setAction", action)
    }

    synthAssets(originAsset: boolean){
        if(this.activeAction === "mint" && originAsset) return this.runeAsset;
        if(this.activeAction === "burn" && !originAsset) return this.runeAsset;
        return this.synthAssetOptions;
    }

    beforeMount(){
        document.addEventListener(EVENT_RECALCULATE, this.calculate)
    }

    beforeDestroy(){
        document.removeEventListener(EVENT_RECALCULATE, this.calculate)
    }
}