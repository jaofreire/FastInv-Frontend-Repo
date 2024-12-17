import { fetchInventoryTablesByCompanyId } from "@/api/api-inventory-table"
import { InventoryTabelSummaryType } from "@/types/api-response-types/inventory-table-summary-type"

export const getInventoryTablesByCompanyId = async(companyId: string) : Promise<InventoryTabelSummaryType[]> =>{
    const responses = await fetchInventoryTablesByCompanyId(companyId);
    return responses;
}