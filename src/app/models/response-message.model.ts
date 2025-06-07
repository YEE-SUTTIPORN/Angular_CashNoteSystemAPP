export interface ResponseMessage {
    success: boolean;
    message: string;
}

export interface ResponseMessageWithData<T> extends ResponseMessage {
    data: T;
}