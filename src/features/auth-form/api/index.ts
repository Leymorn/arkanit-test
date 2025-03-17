import { CreatePhoneResponse } from "../model/types";

export async function createPhoneAsync(phone: string): Promise<CreatePhoneResponse> {
    const response = await fetch(
        `/api/v1/message/create?phone=${phone}`
    );
    return await response.json() ?? '';
}

export async function sendCodeAsync(session_id: string, type: string): Promise<any> {
    const response = await fetch(
        `/api/v1/message/send?session_id=${session_id}&type=${type}`
    );
    return await response.json() ?? '';
}

export async function checkCodeAsync(session_id: string, code: string): Promise<any> {
    const response = await fetch(
        `/api/v1/message/check?session_id=${session_id}&code=${code}`
    );
    return await response.json() ?? '';
}

