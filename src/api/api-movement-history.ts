import { ApiResponse } from "@/types/api-response-types/api-response"
import api from "./api"
import { MovementHistoryType } from "@/types/api-response-types/movement-history/movement-history-type"

export const fetchMovementsHistoryByCompanyId = async (companyId: string): Promise<ApiResponse<MovementHistoryType>> => {
    const data = await api.get<ApiResponse<MovementHistoryType>>('/MovementHistoryEvent/company/' + companyId)
        .then((response) => {
            return response.data;
        })
        .catch((error) => error);

    return data;
}

export const fetchLatestTenMovementsHistoryByCompanyId = async (companyId: string): Promise<ApiResponse<MovementHistoryType>> => {
    const data = await api.get<ApiResponse<MovementHistoryType>>('/MovementHistoryEvent/latest-ten/company/' + companyId)
        .then((response) => {
            return response.data;
        })
        .catch((error) => error);

    return data;
}