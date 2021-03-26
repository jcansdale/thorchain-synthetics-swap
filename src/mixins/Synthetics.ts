import Component from "vue-class-component";
import Vue from "vue";
import {Secp256k1HdWallet, SigningCosmosClient} from "@cosmjs/launchpad";
import {POOL_URL} from "@/common/consts";

@Component
export default class Synthetics extends Vue{
    mint_assetDepth: number = 0;
    mint_runeDepth: number = 0;
    mint_synthAmount: number = 0;
    mint_runeAmount: number = 0;

    redeem_assetDepth: number = 0;
    redeem_runeDepth: number = 0;
    redeem_synthAmount: number = 0;
    redeem_runeAmount: number = 0;


    async calcSwap(assetIn: string, assetOut: string){
        await this.calcRedeem(assetIn)
        this.mint_runeAmount = this.redeem_runeAmount
        await this.calcMint(assetOut)
    }

    async calcMint(asset: string){
        let result = await this.$http.get(POOL_URL + asset)

        this.mint_assetDepth = result.data.assetDepth
        this.mint_runeDepth = result.data.runeDepth
        this.mint_synthAmount = (Number(this.mint_runeAmount) * Number(this.mint_runeDepth) * Number(this.mint_assetDepth))/
            Math.pow((Number(this.mint_runeAmount) + Number(this.mint_runeDepth)), 2)

    }

    async calcRedeem(asset: string){
        let result = await this.$http.get(POOL_URL + asset)

        this.redeem_assetDepth = result.data.assetDepth
        this.redeem_runeDepth = result.data.runeDepth
        this.redeem_runeAmount = (Number(this.redeem_synthAmount) * Number(this.redeem_assetDepth) * Number(this.redeem_runeDepth))/
            Math.pow((Number(this.redeem_synthAmount) + Number(this.redeem_assetDepth)), 2)
    }

    async mint(){
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
}