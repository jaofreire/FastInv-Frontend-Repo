export class InventoryTableType{
    id: string;
    companyId: string;
    name: string;
    items: any;

    constructor(id: any, companyId: any, name: any, itens: any){
        this.id = id;
        this.companyId = companyId;
        this.name = name;
        this.items = itens;
    }

}
