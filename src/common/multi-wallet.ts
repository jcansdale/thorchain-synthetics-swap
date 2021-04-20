import {ThorchainClient} from "@xchainjs/xchain-thorchain";
import {ClientUrl, ExplorerUrl, Client as THORClient} from "@xchainjs/xchain-thorchain";

// @ts-ignore
import {BitcoinClient, Client as BTCClient} from "@xchainjs/xchain-bitcoin";
// @ts-ignore
import {EthereumClient, Client as ETHClient} from "@xchainjs/xchain-ethereum";
// @ts-ignore
import {BinanceClient, Client as BNBClient} from "@xchainjs/xchain-binance"

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

        this.setThorchainAddress()
    }

    async setThorchainAddress() {
        if(this.walletType === WalletType.Addon) {
            window.keplr!.getKey("chaosnet").then(value => {
                this.thorchainAddress = value.bech32Address
            })
        } else {
            this.thorchainAddress = this.thorchain!.getAddress()
        }
    }
}
