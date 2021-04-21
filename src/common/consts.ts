// Rudimentary Config
const CHAOSNET = false

// Thorchain Off-chain
// TESTNET
export const NODE_URL_TESTNET = "https://testnet.midgard.thorchain.info/"
const POOL_URL_TESTNET = `${NODE_URL_TESTNET}v2/pool/`
const INBOUND_ADDRESSES_URL_TESTNET = `${NODE_URL_TESTNET}v2/thorchain/inbound_addresses`


// CHAOSNET
export const NODE_URL_CHAOSNET = "https://midgard.thorchain.info/"
const POOL_URL_CHAOSNET =`${NODE_URL_CHAOSNET}v2/pool/`
const INBOUND_ADDRESSES_URL_CHAOSNET = `${NODE_URL_CHAOSNET}v2/thorchain/inbound_addresses`


// LIVE
export const POOL_URL = CHAOSNET ? POOL_URL_CHAOSNET : POOL_URL_TESTNET
export const INBOUND_ADDRESSES_URL = CHAOSNET ? INBOUND_ADDRESSES_URL_CHAOSNET : INBOUND_ADDRESSES_URL_TESTNET


// Thorchain On-chain
export enum TransactionMemoTypes {
    Add = "+",
    Withdraw = "-",
    Swap = "="
}

// Brokkr
export const EVENT_RECALCULATE = "synth.recalc"

// Keplr
export const CHAIN_ID_THORCHAIN_CHAOSNET = "chaosnet"
