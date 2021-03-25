import Component from "vue-class-component";
import Vue from "vue";
import {Secp256k1HdWallet, SigningCosmosClient} from "@cosmjs/launchpad";

@Component
export default class Synthetics extends Vue{
    assetDepth: number = 0;
    runeDepth: number = 0;
    synthAmount: number = 0;
    runeAmount: number = 0;
    options: any
    synthXAmount: number = 0;
    synthYAmount: number = 0;

    calcMint(asset: string){
        const apiUrl = 'https://testnet.midgard.thorchain.info/v2/pool/';

        this.$http.get(apiUrl + asset)
            .then((result: any) => {
                this.assetDepth = result.data.assetDepth
                this.runeDepth = result.data.runeDepth
                this.synthAmount = (Number(this.runeAmount) * Number(this.runeDepth) * Number(this.assetDepth))/
                    Math.pow((Number(this.runeAmount) + Number(this.runeDepth)), 2)
            })
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