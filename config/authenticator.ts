import basicAuth from "express-basic-auth";
import dotenv from "dotenv";

dotenv.config();

export function authenticator() {
    return basicAuth({
        users: buildAuthorizedUsers(),
        unauthorizedResponse: buildUnauthorizedResponse,
        challenge: true,
    });
}

function buildAuthorizedUsers(): { [x: string]: string } {
    const login = process.env.AUTH_LOGIN!;
    const password = process.env.AUTH_SECRET!;
    return { [login]: password };
}

function buildUnauthorizedResponse(): string {
    return "Error 403: forbidden";
}
