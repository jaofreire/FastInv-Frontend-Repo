import { AxiosResponse } from "axios";
import api from "./api"
import { InventoryTabelSummaryType } from "@/types/api-response-types/inventory-table/inventory-table-summary-type";
import { InventoryTableType } from "@/types/api-response-types/inventory-table/inventory-table-type";
import { ApiResponse } from "@/types/api-response-types/api-response";


export const postNewInventoryTable = async (companyId: string, name: string) => {
    await api.post<ApiResponse<InventoryTableType>>('/InventoryTable', {
        companyId: companyId,
        name: name
    })
        .then((response) => {
            const responseData = response.data;
            if (responseData.isSuccess) {
                return;
            }
        });

    return;
}

export const fetchInventoryTablesByCompanyId = async (companyId: string): Promise<InventoryTabelSummaryType[]> => {
    var data = await api.get<ApiResponse<InventoryTabelSummaryType>>('/InventoryTable/company/' + companyId)
        .then((response) => {
            const responseData = response.data

            if (responseData.isSuccess) {
                const inventoryTableSummaries = response.data.responseList.map((value: any) => new InventoryTabelSummaryType(value.id, value.companyId, value.name, value.registersCount));
                return inventoryTableSummaries;
            }
            console.log('Error na requisição: fetchInventoryTablesByCompanyId');
            return [];
        });

    return data;
}


export const fetchInventoryTableById = async (id: string): Promise<InventoryTableType> => {
    var data = await api.get<ApiResponse<InventoryTableType>>('/InventoryTable/' + id)
        .then((response) => {
            console.log('Reposta de InventoryTableById', response.data.response);

            if (response.data.isSuccess) {
                return response.data.response;
            }
            console.log('Error na requisição: fetchInventoryTableById');
            return new InventoryTableType('', '', '', '');
        });

    return data;
}