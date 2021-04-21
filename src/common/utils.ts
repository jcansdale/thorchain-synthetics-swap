import {Asset} from "@xchainjs/xchain-util";
import {TransactionMemoTypes} from "@/common/consts";

export function getSwapMemo(asset: Asset, recipient: string) {
    //const limit = priceProtection !== null ? ":" + priceProtection: ""
    return TransactionMemoTypes.Swap.toString() + ":" + asset.chain + "." + asset.symbol + ":" + recipient
}
