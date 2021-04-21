import axios from "axios";
import {INBOUND_ADDRESSES_URL} from "@/common/consts";


export async function getThorchainInboundAddresses() {
    return await axios.get(INBOUND_ADDRESSES_URL)
}

export async function getThorchainInboundAddressByChain(chain: string) {
    const inboundAddresses = await getThorchainInboundAddresses()
    return inboundAddresses.data.find((item: any) => item.chain === chain).address
}
