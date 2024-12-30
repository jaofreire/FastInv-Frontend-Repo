export class MainInfoType{
    inventoryTableCount: number;
    emplooyersCount: number;
    lastInventoryTableUpdated: string;

    constructor(inventoryTableCount: number, emplooyersCount: number, lastInventoryTableUpdated: string){
        this.inventoryTableCount = inventoryTableCount;
        this.emplooyersCount = emplooyersCount;
        this.lastInventoryTableUpdated = lastInventoryTableUpdated;
    }
}