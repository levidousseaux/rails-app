import {APP_ROUTER} from "@/router";

function getHeaders(): HeadersInit {
    return {
        Authorization: "Bearer " + localStorage.getItem("access-token"),
        "Content-Type": "application/json",
    };
}

async function post<T>(url: string, body: any): Promise<T | null> {
    const response = await fetch(url, {
        headers: getHeaders(),
        method: "POST",
        body: JSON.stringify(body),
    });

    return readResponse(response);
}

async function put<T>(url: string, body: any): Promise<T | null> {
    const response = await fetch(url, {
        headers: getHeaders(),
        method: "PUT",
        body: JSON.stringify(body),
    });

    return readResponse(response);
}

async function get<T>(url: string): Promise<T | null> {
    const response = await fetch(url, {
        headers: getHeaders(),
        method: "GET",
    });

    return readResponse(response);
}

async function deleteHttp<T>(url: string): Promise<T | null> {
    const response = await fetch(url, {
        headers: getHeaders(),
        method: "DELETE",
    });

    return readResponse(response);
}

async function readResponse<T>(response: Response) {
    if (response.ok) {
        const responseText = await response.text();

        if (!responseText) return null;

        return JSON.parse(responseText) as T;
    }

    if (response.status === 401) {
        await APP_ROUTER.navigate("/sign-in");
    }

    throw new Error("Unhandled exception");
}

export const http = {
    post,
    put,
    get,
    delete: deleteHttp,
};
