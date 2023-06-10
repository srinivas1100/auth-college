import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 8);
}

export async function verifyPassword(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword)
}