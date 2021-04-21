import Component from "vue-class-component";
import {POOL_URL} from "@/common/consts";
import {mapGetters} from "vuex";
import {AssetUpdate} from "@/common/assetUpdate";
import Wallet from "@/mixins/Wallet";
import {Asset, baseAmount, BaseAmount, Denomination} from "@xchainjs/xchain-util";
import {getSwapMemo} from "@/common/utils";
import {TxHash} from "@xchainjs/xchain-client";
import {msgNativeTxFromJson} from "@xchainjs/xchain-thorchain";
import {getThorchainInboundAddresses} from "@/common/thorchain-service";

@Component({
    computed: mapGetters ({
        originAsset: "getOriginAssetValue",
        originAssetAmount: "getOriginAssetAmount",
        targetAsset: "getTargetAssetValue",
    })

})
export default class Natives extends Wallet {
    private originAsset!:any
    private originAssetAmount!: number
    private targetAsset!:any

    assetAmount: number = 0;
    runeAmount: number = 0;

    async calculate(){
        if(this.originAsset.value === this.targetAsset.value) {
            await this.$store.dispatch("updateAssetInput", new AssetUpdate(
                this.targetAsset,
                this.originAssetAmount,
                false,
                false
            ))
            return
        }

        if(this.originAsset.text !== "RUNE") {

            let response = await this.$http.get(POOL_URL + this.originAsset.value)

            this.runeAmount = (Number(this.originAssetAmount) * Number(response.data.runeDepth) * Number(response.data.assetDepth)) /
                Math.pow((Number(this.originAssetAmount) + Number(response.data.assetDepth)), 2)

            // Swap L1 into Rune otherwise double swap
            if(this.targetAsset.text === "RUNE") {

                await this.$store.dispatch("updateAssetInput", new AssetUpdate(
                    this.targetAsset,
                    Math.round(this.runeAmount * 10000) / 10000,
                    false,
                    false
                ))
                return
            }
        } else {
            // Swap Rune into L1
            this.runeAmount = this.originAssetAmount
        }

        let response = await this.$http.get(POOL_URL + this.targetAsset.value)

        this.assetAmount = (Number(this.runeAmount) * Number(response.data.runeDepth) * Number(response.data.assetDepth)) /
            Math.pow((Number(this.runeAmount) + Number(response.data.runeDepth)), 2)

        await this.$store.dispatch("updateAssetInput", new AssetUpdate(
            this.targetAsset,
            Math.round(this.assetAmount * 10000) / 10000,
            false,
            false
        ))
    }

    async swap() {
        if (!((this.originAsset.text === "RUNE" && this.targetAsset.text === "BNB") ||
             (this.originAsset.text === "BNB" && this.targetAsset.text === "RUNE"))) {
            alert("Swapping this pair is not supported yet!")
            return
        }

        let originAsset: Asset = {
            chain: this.originAsset.value.split("\.")[0],
            symbol: this.originAsset.value.split("\.")[1],
            ticker: this.originAsset.text
        }

        let targetAsset: Asset = {
            chain: this.targetAsset.value.split("\.")[0],
            symbol: this.targetAsset.value.split("\.")[1],
            ticker: this.targetAsset.text
        }

        const explorerURL = await this.userwallet?.deposit(originAsset, targetAsset, this.originAssetAmount)
        this.$bvToast.toast(`Find the result of the ${originAsset.ticker} -> ${targetAsset.ticker} Tx here: ${explorerURL}`)
        console.log(explorerURL)
    }


}
