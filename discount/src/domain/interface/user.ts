import { Document } from 'mongoose';
import { read } from 'fs';

export interface User extends Document {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly dateOfBirth: Date;
}

