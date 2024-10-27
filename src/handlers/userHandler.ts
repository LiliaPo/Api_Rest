import { saveUser } from "../model/userModel";

export async function saveUserHandler (data:any) :Promise<string>{
    const result = await saveUser(data);
    return result;
};