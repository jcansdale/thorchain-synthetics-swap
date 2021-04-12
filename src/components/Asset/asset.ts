import {Component, Watch} from 'vue-property-decorator'
import Vue from 'vue'

import {mapGetters} from "vuex";
import {AssetUpdate} from "@/common/assetUpdate";
import {BIconArrowRight, BIconChevronDown, BIconChevronUp, BIconSearch, BIconXCircle} from "bootstrap-vue";

@Component({
    props: ["assets", "isOriginAsset"],
    computed: mapGetters({
        estimatedOriginValue: "getEstimatedOriginValue",
        estimatedTargetValue: "getEstimatedTargetValue",
        targetAssetAmount: "getTargetAssetAmount"
    }),
    components: {
        BIconArrowRight,
        BIconChevronUp,
        BIconChevronDown,
        BIconXCircle,
        BIconSearch
    }
})
export default class Asset extends Vue {
    private assets!:any
    private selectedAsset: any
    private amount: number = 1
    private isOriginAsset!: boolean

    private open: boolean = false
    private assetFilter: string = ""
    private ongoingSearch: boolean = false

    beforeMount(){
        this.selectedAsset = this.assets[0]
        this.updateAsset()
    }

    updateAsset(){
        this.$store.commit("updateAssetInput", new AssetUpdate(
            this.selectedAsset,
            this.amount,
            this.isOriginAsset,
            true
        ))
    }

    getImageURL(asset:string) {
        let images = require.context("../../assets/images/icons/", false, /\.png$/)
        let image
        try {
            image = images('./' + asset + '.png')
            return image
        }
        catch(e) {
            return null
        }
    }

    @Watch("assets")
    onAssetsChange() {
        this.selectedAsset = this.$props.assets[0]
        this.updateAsset()
    }
}
