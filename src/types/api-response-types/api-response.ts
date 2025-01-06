export interface ApiResponse<T>{
    isSuccess: boolean;
    message: string;
    response: T;
    responseList?: T[];
}