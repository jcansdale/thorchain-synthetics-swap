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
        targetAsset: "getTargetAssetValue",
        targetAssetAmount: "getTargetAssetAmount"
    })

})
export default class Synthetics extends Vue{
    private originAsset!:any
    private originAssetAmount!: number


    private targetAsset!:any
    private targetAssetAmount!: number

    mint_synthAmount: number = 0;

    redeem_assetDepth: number = 0;
    redeem_runeDepth: number = 0;
    redeem_synthAmount: number = 0;

    redeem_runeAmount: number = 0;

    async calculateMint() {
        console.log("Calculating Mint")
        await this.calculateMintWithRune(this.originAssetAmount)
    }

    async calculateSwap(){
        console.log("Calculating Swap")
        await this.calculateRedeem()
        await this.calculateMintWithRune(this.redeem_runeAmount)
    }

    async calculateMintWithRune(runeAmount: number){
        console.log("Calling URL: " + POOL_URL + this.targetAsset)
        let result = await this.$http.get(POOL_URL + this.targetAsset)

        this.mint_synthAmount = (runeAmount * Number(result.data.runeDepth) * Number(result.data.assetDepth))/
            Math.pow((runeAmount + Number(result.data.runeDepth)), 2)

        this.$store.commit("updateAssetInput", new AssetUpdate(
            this.targetAsset,
            this.mint_synthAmount,
            false,
            false
        ))
    }

    async calculateRedeem(){
        console.log("Calculating Redeem")

        let result = await this.$http.get(POOL_URL + this.originAsset)

        this.redeem_assetDepth = result.data.assetDepth
        this.redeem_runeDepth = result.data.runeDepth
        this.redeem_runeAmount = (Number(this.redeem_synthAmount) * Number(this.redeem_assetDepth) * Number(this.redeem_runeDepth))/
            Math.pow((Number(this.redeem_synthAmount) + Number(this.redeem_assetDepth)), 2)
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
        console.log("mint")
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
