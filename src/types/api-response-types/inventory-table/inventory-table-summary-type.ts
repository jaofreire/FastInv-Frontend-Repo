export class InventoryTabelSummaryType{
    Id: string;
    CompanyId: string;
    Name: string;
    RegistersCount: number;

    constructor(id: any, companyId: any, name: any, registersCount: any){
        this.Id = id;
        this.CompanyId = companyId;
        this.Name = name;
        this.RegistersCount = registersCount;
    }
}