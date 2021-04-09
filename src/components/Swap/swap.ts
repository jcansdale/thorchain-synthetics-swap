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
    activeTab: string = 'mint'

    toggle(action: string){
        this.activeTab = action
    }

    beforeMount(){
        document.addEventListener(EVENT_RECALCULATE, this.calculate)
    }

    beforeDestroy(){
        document.removeEventListener(EVENT_RECALCULATE, this.calculate)
    }
}