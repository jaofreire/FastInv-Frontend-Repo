import { deleteInventoryTable, fetchInventoryTableById, fetchInventoryTablesByCompanyId, patchUpdateInventoryTableName, postMigrateExcelToInventoryTable, postNewInventoryTable, putUpdateInventoryTableItems } from "@/api/api-inventory-table"
import { UpdateInventoryTableRequestType } from "@/types/api-request-types/update-inventory-table-request-type";
import { InventoryTabelSummaryType } from "@/types/api-response-types/inventory-table/inventory-table-summary-type"
import { InventoryTableType } from "@/types/api-response-types/inventory-table/inventory-table-type";

export const migrateExcel = async (companyId: string, excelFile: FormData) => {
    await postMigrateExcelToInventoryTable(companyId, excelFile);
}

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

export const updateInventoryTableItems = async (request: UpdateInventoryTableRequestType) => {
    await putUpdateInventoryTableItems(request);
}

export const updateInventoryTableName = async (id: string, newName: string) => {
    await patchUpdateInventoryTableName(id, newName);
}

export const removeInventoryTable = async (id: string) => {
    await deleteInventoryTable(id);
}