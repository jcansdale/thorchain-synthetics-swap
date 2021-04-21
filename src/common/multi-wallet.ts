import {ThorchainClient} from "@xchainjs/xchain-thorchain";
import {ClientUrl, ExplorerUrl, Client as THORClient} from "@xchainjs/xchain-thorchain";

// @ts-ignore
import {BitcoinClient, Client as BTCClient} from "@xchainjs/xchain-bitcoin";
// @ts-ignore
import {EthereumClient, Client as ETHClient} from "@xchainjs/xchain-ethereum";
// @ts-ignore
import {BinanceClient, Client as BNBClient} from "@xchainjs/xchain-binance"
import {Asset, baseAmount, BaseAmount} from "@xchainjs/xchain-util";
import Base = Mocha.reporters.Base;
import {getSwapMemo} from "@/common/utils";
import {getThorchainInboundAddressByChain, getThorchainInboundAddresses} from "@/common/thorchain-service";
import {CHAIN_ID_THORCHAIN_CHAOSNET} from "@/common/consts";
import {StdTx} from "cosmos-client/x/auth";
import {Tx} from "cosmos-client";


// https://github.com/xchainjs/xchainjs-lib/blob/master/packages/xchain-client/README.md

export enum WalletType {
    Keystore= "KEYSTORE",
    Addon = "ADDON"
}

export class MultiWallet {
    public walletType: WalletType
    public networkType: "mainnet" | "testnet" | undefined

    private phrase: string | null = null
    public thorchainAddress: string  = ""
    public binanceAddress: string  = ""


    public thorchain: THORClient | null = null
    public bitcoin: BTCClient | null = null
    public etherum: ETHClient | null = null
    public binance: BNBClient | null = null

    constructor(walletType: WalletType, networkType: "mainnet" | "testnet", phrase: string | undefined) {
        this.walletType = walletType
        this.networkType = networkType

        if(this.walletType === WalletType.Keystore) {
            this.phrase = phrase!

            let clientURL: ClientUrl = {
                mainnet: {node: "http://157.245.24.22:1317", rpc: ""},
                testnet: {node: "https://testnet.thornode.thorchain.info", rpc: ""}
            }
            let explorerURL: ExplorerUrl = {
                mainnet: "https://viewblock.io/thorchain",
                testnet: "https://viewblock.io/thorchain",
            }
            this.thorchain = new THORClient({
                network: this.networkType,
                clientUrl: clientURL,
                explorerUrl: explorerURL,
                phrase
            })

            this.bitcoin = new BTCClient({
                network: this.networkType,
                sochainUrl: "https://sochain.com/api/v2/",
                blockstreamUrl: "https://blockstream.info/",
                phrase
            })

            this.etherum = new ETHClient({
                network: this.networkType,
                ethplorerUrl: "https://ethplorer.io/",
                explorerUrl: {mainnet: "https://etherscan.io/", testnet: "https://etherscan.io/"},
                phrase
            })

            this.binance = new BNBClient({
                network: this.networkType,
                phrase
            })
        }

        this.setAddresses()
    }

    setAddresses() {
        this.setThorchainAddress()
        this.setBinanceAddress()
    }

    setThorchainAddress() {
        if(this.walletType === WalletType.Addon) {
            window.keplr!.getKey("chaosnet").then(value => {
                this.thorchainAddress = value.bech32Address
            })
        } else {
            this.thorchainAddress = this.thorchain!.getAddress()
        }
    }

    setBinanceAddress() {
        if(this.walletType === WalletType.Addon) {
            console.log("KEPLR BNB not supported yet")
        } else {
            this.binanceAddress = this.binance!.getAddress()
        }
    }

    getAddressByChain(chain: string) {
        switch (chain) {
            case "THOR":
                return this.thorchainAddress
            case "BNB":
                return this.binanceAddress
            default:
                throw new Error("Can not get address for non-supported chain: " + chain)
        }
    }

    async deposit(originAsset: Asset, targetAsset: Asset, amount: number) {
        const targetAddress = this.getAddressByChain(targetAsset.chain)
        const memo = getSwapMemo(targetAsset, targetAddress!)

        let txExplorerURL = ""
        switch(originAsset.chain) {
            case "THOR":
                txExplorerURL = await this.depositThorchain(originAsset, amount, memo)
                break
            case "BNB":
                txExplorerURL = await this.depositBinancechain(originAsset, amount, memo)
                break
            case "ETH":
                break
        }

        return txExplorerURL
    }

    async depositThorchain(asset: Asset, amount: number, memo: string) {
        console.info(`Deposit ${amount} ${asset.symbol} via Thorchain. Memo:\n${memo}`)

        if(this.walletType === WalletType.Addon) {


        }

        let assetAmount: BaseAmount = baseAmount(Math.pow(10,8) * amount, 8)

        let depositTxHash = await this.thorchain!.deposit({
            asset,
            amount: assetAmount,
            memo,
        })

        return this.thorchain!.getExplorerTxUrl(depositTxHash)
    }

    async depositBinancechain(asset: Asset, amount: number, memo: string) {
        console.info(`Deposit ${amount} ${asset.symbol} via Binance Smart Chain. Memo:\n${memo}`)
        let assetAmount: BaseAmount = baseAmount(Math.pow(10,8) * amount, 8)
        let recipient = await getThorchainInboundAddressByChain(asset.chain)
        console.log(recipient)

        let depositTxHash = await this.binance!.transfer({
            asset: asset,
            amount: assetAmount,
            memo,
            recipient: recipient
        })

        return this.binance!.getExplorerTxUrl(depositTxHash)
    }
}
