import { Image } from './Image'

export interface PhotoGallery {
    id: string;
    userId: string;
    images: Array<ProfileImage>
}

interface ProfileImage extends Image {
    asProfile: boolean;
    userId: string;
    uploadedDate: number;
    location?: string;
    date?: number;
    description?: string;
}