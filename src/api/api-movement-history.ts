import { ApiResponse } from "@/types/api-response-types/api-response"
import api from "./api"
import { MovementHistoryType } from "@/types/api-response-types/movement-history/movement-history-type"

export const fetchMovementsHistoryByCompanyId = async (companyId: string): Promise<MovementHistoryType[]> => {
    const data = await api.get<ApiResponse<MovementHistoryType>>('/MovementHistoryEvent/company/' + companyId)
        .then((response) => {
            const responseData = response.data;
            return responseData.responseList;
        });

    return data;
}

export const fetchLatestTenMovementsHistoryByCompanyId = async(companyId: string) : Promise<MovementHistoryType[]> => {
    const data = await api.get<ApiResponse<MovementHistoryType>>('/MovementHistoryEvent/latest-ten/company/' + companyId)
        .then((response) => {
            const responseData = response.data;
            return responseData.responseList;
        });

    return data;
}