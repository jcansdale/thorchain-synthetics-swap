import Component from "vue-class-component";
import Vue from "vue";
import {Secp256k1HdWallet, SigningCosmosClient} from "@cosmjs/launchpad";
import {POOL_URL} from "@/common/consts";
import {mapGetters} from "vuex";
import {AssetUpdate} from "@/common/assetUpdate";

@Component({
    computed: mapGetters ({
        originAsset: "getOriginAssetValue",
        originAssetAmount: "getOriginAssetAmount",
        targetAsset: "getTargetAssetValue"
    })

})
export default class Synthetics extends Vue{
    private originAsset!:any
    private originAssetAmount!: number
    private targetAsset!:any

    // Calculation currently only one-sided. No target to orgin supportet yet.
    // private targetAssetAmount!: number

    mint_synthAmount: number = 0;
    redeem_runeAmount: number = 0;

    async calculateMint() {
        console.log("MINT")
        await this.calculateMintWithRune(this.originAssetAmount)
    }

    async calculateSwap(){
        console.log("SWAP")

        await this.calculateRedeem()
        await this.calculateMintWithRune(this.redeem_runeAmount)
    }

    async calculateMintWithRune(runeAmount: number){
        let result = await this.$http.get(POOL_URL + this.targetAsset.value)

        // ( r * R * A)/(r + R)^2
        this.mint_synthAmount = (Number(runeAmount) * Number(result.data.runeDepth) * Number(result.data.assetDepth)) /
            Math.pow((Number(runeAmount) + Number(result.data.runeDepth)), 2)

        this.$store.commit("updateAssetInput", new AssetUpdate(
            this.targetAsset,
            Math.round(this.mint_synthAmount * 10000) / 10000,
            false,
            false
        ))
    }

    async calculateRedeem(){
        console.log("BURN")

        let result = await this.$http.get(POOL_URL + this.originAsset.value)

        // (s * A *  R)/(a + A)^2
        this.redeem_runeAmount = (Number(this.originAssetAmount) * Number(result.data.assetDepth) * Number(result.data.runeDepth))/
            Math.pow((Number(this.originAssetAmount) + Number(result.data.assetDepth)), 2)

        this.$store.commit("updateAssetInput", new AssetUpdate(
            this.targetAsset,
            Math.round(this.redeem_runeAmount * 10000) / 10000,
            false,
            false
        ))
    }

    async mint(){
        console.info("Mint triggered")
        console.error("Not implemented yet")
        const wallet = await Secp256k1HdWallet.generate();
        const [{ address }] = await wallet.getAccounts();

        const lcdApi = "https://testnet.midgard.thorchain.info/";
        const client = new SigningCosmosClient(lcdApi, address, wallet);

        /*
        P = poolUnits (https://testnet.midgard.thorchain.info/v2/pool/ETH.ETH)
        A = assetDepth, R = runeDepth, r = runeAmount
        pool.runeDepth += r
        synthUnits += (P r)/(2 (r + R))
        synthAmount = (r * R * A)/(r + R)^2
        synthSupply += synthAmount
        transfer(recipient, synth, synthAmount)
         */
    }

    async swap(){
        console.info("Swap triggered")
        console.error("Not implemented yet")
    }

    async burn(){
        console.info("Burn triggered")
        console.error("Not implemented yet")
    }
}
