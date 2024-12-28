export class MainInfoType{
    inventoryTableCount: number;
    emplooyersCont: number;
    lastInventoryTableUpdated: string;

    constructor(inventoryTableCount: number, emplooyersCont: number, lastInventoryTableUpdated: string){
        this.inventoryTableCount = inventoryTableCount;
        this.emplooyersCont = emplooyersCont;
        this.lastInventoryTableUpdated = lastInventoryTableUpdated;
    }
}