import { Document } from 'mongoose';

export interface URLStore extends Document {
    originalURL: string;
    shortenURL: string;
    shortenCode: string;
    createdAt: string;
    revokedAt: string;
}
