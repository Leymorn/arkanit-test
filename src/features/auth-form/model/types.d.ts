import type { ClientChanel } from "@/shared/client-chanels";

export interface CreatePhoneResponseSuccess {
    success: true;
    data: CreatePhoneResponseData;
    error?: never; 
}

export interface CreatePhoneResponseFailure {
    success: false;
    data?: never;    
    error: string;
}

export interface CreatePhoneResponseData {
    session_id: string,
    sent_to: string,
    client_channels: [ClientChanel] | []
}

export type CreatePhoneResponse = CreatePhoneResponseSuccess | CreatePhoneResponseFailure;

export interface CheckCodeResponseSussess {
    data: CheckCodeResponseData
    error?: never
    success: true
}

export interface CheckCodeResponseFailure {
    data?: never
    error: string
    success: false
}

export interface CheckCodeResponseData {
    verify_token: string
    is_test: boolean
}

export type CheckCodeResponse = CheckCodeResponseFailure | CheckCodeResponseSussess

export interface NewCodeResponseSuccess {
    success: true;
    data: ClientChanel;
    error?: never; 
}

export interface NewCodeResponseFailure {
    success: false;
    data?: never;
    error: string; 
}

export type NewCodeResponse = NewCodeResponseSuccess | NewCodeResponseFailure