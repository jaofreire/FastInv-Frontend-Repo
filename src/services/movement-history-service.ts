import { fetchLatestTenMovementsHistoryByCompanyId, fetchMovementsHistoryByCompanyId } from "@/api/api-movement-history";
import { MovementHistoryType } from "@/types/api-response-types/movement-history/movement-history-type";

export const getMovementsHistoryByCompanyId = async (companyId: string): Promise<MovementHistoryType[]> => {
    const response = await fetchMovementsHistoryByCompanyId(companyId);
    return response;
}

export const getLatestTenMovementsHistoryByCompanyId = async (companyId: string): Promise<MovementHistoryType[]> => {
    const response = await fetchLatestTenMovementsHistoryByCompanyId(companyId);
    return response;
}