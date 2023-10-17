interface UserData {
    name?: string;
    password?: string;
    email?: string;
}
export declare class UserService {
    private readonly prisma;
    constructor();
    updatePass(id: string, newPassword: string): Promise<any>;
    update(id: string, userData: UserData): Promise<any>;
    delete(): Promise<void>;
    findAll(): Promise<void>;
    findAllByRole(): Promise<void>;
}
export {};
