import { fetchLatestTenMovementsHistoryByCompanyId, fetchMovementsHistoryByCompanyId } from "@/api/api-movement-history";
import { ApiResponse } from "@/types/api-response-types/api-response";
import { MovementHistoryType } from "@/types/api-response-types/movement-history/movement-history-type";

export const getMovementsHistoryByCompanyId = async (companyId: string): Promise<ApiResponse<MovementHistoryType>> => {
    const apiResponse = await fetchMovementsHistoryByCompanyId(companyId);
    return apiResponse;
}

export const getLatestTenMovementsHistoryByCompanyId = async (companyId: string): Promise<ApiResponse<MovementHistoryType>> => {
    const apiResponse = await fetchLatestTenMovementsHistoryByCompanyId(companyId);
    return apiResponse;
}