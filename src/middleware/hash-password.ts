import bcrypt from "bcrypt";

export async function HashPassword(password: string) {
    return await bcrypt.hash(password, 8);
}

export async function VerifyPassword(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword)
}