import api from "./api"
import { InventoryTabelSummaryType } from "@/types/api-response-types/inventory-table/inventory-table-summary-type";
import { InventoryTableType } from "@/types/api-response-types/inventory-table/inventory-table-type";
import { ApiResponse } from "@/types/api-response-types/api-response";
import { UpdateInventoryTableRequestType } from "@/types/api-request-types/inventory-table/update-inventory-table-request-type";

export const postMigrateExcelToInventoryTable = async (companyId: string, file: FormData): Promise<ApiResponse<InventoryTableType>> => {
    const data = await api.post<ApiResponse<InventoryTableType>>('/InventoryTable/migrate-table/' + companyId, file, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
        .then((response) => {
            return response.data;
        })
        .catch((error) => error);

    return data;
}

export const postNewInventoryTable = async (companyId: string, name: string): Promise<ApiResponse<InventoryTableType>> => {
    const data = await api.post<ApiResponse<InventoryTableType>>('/InventoryTable', {
        companyId: companyId,
        name: name
    })
        .then((response) => {
            return response.data;
        })
        .catch((error) => error);

    return data;
}

export const fetchInventoryTablesByCompanyId = async (companyId: string): Promise<ApiResponse<InventoryTabelSummaryType>> => {
    var data = await api.get<ApiResponse<InventoryTabelSummaryType>>('/InventoryTable/company/' + companyId)
        .then((response) => {
            return response.data;
        })
        .catch((error) => error);

    return data;
}

export const fetchInventoryTableById = async (id: string): Promise<ApiResponse<InventoryTableType>> => {
    var data = await api.get<ApiResponse<InventoryTableType>>('/InventoryTable/' + id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => error);

    return data;
}

export const putUpdateInventoryTableItems = async (request: UpdateInventoryTableRequestType): Promise<ApiResponse<InventoryTableType>> => {
    const data = await api.put<ApiResponse<InventoryTableType>>('/InventoryTable/' + request.Id, {
        id: request.Id,
        name: request.Name,
        columnChanged: request.ColumnChanged,
        previousValue: request.PreviousValue,
        currentValue: request.CurrentValue,
        items: request.Items
    })
        .then((response) => {
            return response.data;
        })
        .catch((error) => error);

    return data;
}

export const patchUpdateInventoryTableName = async (id: string, name: string): Promise<ApiResponse<InventoryTableType>> => {
    const data = await api.patch<ApiResponse<InventoryTableType>>('/InventoryTable/' + id, {
        name: name
    })
        .then((response) => {
            return response.data;
        })
        .catch((error) => error);

    return data;
}

export const deleteInventoryTable = async (id: string): Promise<ApiResponse<InventoryTableType>> => {
    const data = await api.delete<ApiResponse<InventoryTableType>>('/InventoryTable/' + id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => error)

    return data;
}