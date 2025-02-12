// src/types/types.ts
export interface Customer {
    id: number;
    fullName: string;
    status: 'Approved' | 'Blocked' | 'Rejected';
    email: string;
    dateOfBirth: string;
}