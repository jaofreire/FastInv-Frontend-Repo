import { AxiosResponse } from "axios";
import api from "./api"
import { InventoryTabelSummaryType } from "@/types/api-response-types/inventory-table-summary-type";

export const fetchInventoryTablesByCompanyId = async (companyId : string) =>{
    var data = await api.get('/InventoryTable/company/' + companyId)
    .then((response) => {
        const inventoryTables = response.data.responseList.map((item: any) => new InventoryTabelSummaryType(item.id, item.companyId, item.name, item.registersCount));
        return inventoryTables;
    })
    .catch((error) => console.log(error));

    return data;
}

export const fetchInventoryTableById = async () =>{
    
}