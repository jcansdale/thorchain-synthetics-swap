export class AssetUpdate {
    public asset: string
    public assetAmount: number
    public isOriginAsset: boolean
    public manualUpdate : boolean

    constructor(asset: string, assetAmount: number, isOriginAsset: boolean, manualUpdate: boolean) {
        this.asset = asset
        this.assetAmount = assetAmount
        this.isOriginAsset = isOriginAsset
        this.manualUpdate = manualUpdate
    }
}
