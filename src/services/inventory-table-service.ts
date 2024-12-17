import { fetchInventoryTableById, fetchInventoryTablesByCompanyId, postNewInventoryTable } from "@/api/api-inventory-table"
import { InventoryTabelSummaryType } from "@/types/api-response-types/inventory-table/inventory-table-summary-type"
import { InventoryTableType } from "@/types/api-response-types/inventory-table/inventory-table-type";

export const registerNewInventoryTable = async (companyId: string, name: string) => {
    await postNewInventoryTable(companyId, name);
}

export const getInventoryTablesByCompanyId = async (companyId: string): Promise<InventoryTabelSummaryType[]> => {
    const inventoryTableSummaries = await fetchInventoryTablesByCompanyId(companyId);
    return inventoryTableSummaries
}

export const getInventoryTableById = async (id: string): Promise<InventoryTableType> => {
    const response = await fetchInventoryTableById(id);

    const itemsMap = new Map<string, string[]>(Object.entries(response.items));
    console.log(itemsMap);

    response.items = itemsMap;

    return response;
}