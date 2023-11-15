import { Role } from "../enum/Role.enum";

export class Customer {

    constructor (
                public id: number,
                public firstName: string,
                public lastName: string,
                public email: string,
                public phoneNumber: string,
                public role: Role
                ) { }
    // id?: number;
    // firstName?: string;
    // lastName?: string;
    // email?: string;
    // phoneNumber?: string;
    // role?: Role;

}
