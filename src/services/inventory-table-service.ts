import { deleteInventoryTable, fetchInventoryTableById, fetchInventoryTablesByCompanyId, patchUpdateInventoryTableName, postMigrateExcelToInventoryTable, postNewInventoryTable, putUpdateInventoryTableItems, putUpdateInventoryTableItemsWithoutMovementEvent } from "@/api/api-inventory-table"
import inventoryTableErrorMessages from "@/errors/api-response-error-messages/inventory-table-error-messages";
import { UpdateInventoryTableRequestType } from "@/types/api-request-types/inventory-table/update-inventory-table-request-type";
import { UpdateInventoryTableWithoutMovementEventRequestType } from "@/types/api-request-types/inventory-table/update-inventory-table-without-movement-event-request-type";
import { ApiResponse } from "@/types/api-response-types/api-response";
import { InventoryTabelSummaryType } from "@/types/api-response-types/inventory-table/inventory-table-summary-type"
import { InventoryTableType } from "@/types/api-response-types/inventory-table/inventory-table-type";

export const migrateExcel = async (companyId: string, excelFile: FormData): Promise<ApiResponse<InventoryTableType>> => {
    const apiResponse = await postMigrateExcelToInventoryTable(companyId, excelFile);

    if (apiResponse.isSuccess === false) {
        apiResponse.message = inventoryTableErrorMessages[apiResponse.message] || 'Ocorreu algum erro inesperado, por favor tente novamente'
        return apiResponse;
    }

    return apiResponse;
}

export const registerNewInventoryTable = async (companyId: string, name: string): Promise<ApiResponse<InventoryTableType>> => {
    const apiResponse = await postNewInventoryTable(companyId, name);

    if (apiResponse.isSuccess === false) {
        apiResponse.message = inventoryTableErrorMessages[apiResponse.message] || 'Ocorreu algum erro inesperado, por favor tente novamente'
        return apiResponse;
    }

    return apiResponse;
}

export const getInventoryTablesByCompanyId = async (companyId: string): Promise<ApiResponse<InventoryTabelSummaryType>> => {
    const apiResponse = await fetchInventoryTablesByCompanyId(companyId);

    if (apiResponse.isSuccess === false) {
        apiResponse.message = inventoryTableErrorMessages[apiResponse.message] || 'Ocorreu algum erro inesperado, por favor tente novamente'
        apiResponse.responseList = [];

        return apiResponse;
    }

    const inventoryTableSummaries = apiResponse.responseList!.map((value: any) => new InventoryTabelSummaryType(value.id, value.companyId, value.name, value.registersCount));
    apiResponse.responseList = inventoryTableSummaries;

    return apiResponse;
}

export const getInventoryTableById = async (id: string): Promise<ApiResponse<InventoryTableType>> => {
    const apiResponse = await fetchInventoryTableById(id);

    if (apiResponse.isSuccess === false) {
        apiResponse.message = inventoryTableErrorMessages[apiResponse.message] || 'Ocorreu algum erro inesperado, por favor tente novamente';
        return apiResponse;
    }

    const itemsMap = new Map<string, string[]>(Object.entries(apiResponse.response.items));

    apiResponse.response.items = itemsMap;

    return apiResponse;
}

export const updateInventoryTableItems = async (request: UpdateInventoryTableRequestType): Promise<ApiResponse<InventoryTableType>> => {
    const apiResponse = await putUpdateInventoryTableItems(request);

    if (apiResponse.isSuccess === false) {
        apiResponse.message = inventoryTableErrorMessages[apiResponse.message] || 'Ocorreu algum erro inesperado, por favor tente novamente'
        return apiResponse;
    }

    return apiResponse;
}

export const updateInventoryTableItemsWithoutMovementEvent = async (request: UpdateInventoryTableWithoutMovementEventRequestType): Promise<ApiResponse<InventoryTableType>> => {
    const apiResponse = await putUpdateInventoryTableItemsWithoutMovementEvent(request);

    if (apiResponse.isSuccess === false) {
        apiResponse.message = inventoryTableErrorMessages[apiResponse.message] || 'Ocorreu algum erro inesperado, por favor tente novamente'
        return apiResponse;
    }

    return apiResponse;
}

export const updateInventoryTableName = async (id: string, newName: string): Promise<ApiResponse<InventoryTableType>> => {
    const apiResponse = await patchUpdateInventoryTableName(id, newName);

    if (apiResponse.isSuccess === false) {
        apiResponse.message = inventoryTableErrorMessages[apiResponse.message] || 'Ocorreu algum erro inesperado, por favor tente novamente'
        return apiResponse;
    }

    return apiResponse;
}

export const removeInventoryTable = async (id: string): Promise<ApiResponse<InventoryTableType>> => {
    const apiResponse = await deleteInventoryTable(id);

    if (apiResponse.isSuccess === false) {
        apiResponse.message = inventoryTableErrorMessages[apiResponse.message] || 'Ocorreu algum erro inesperado, por favor tente novamente'
        return apiResponse;
    }

    return apiResponse;
}