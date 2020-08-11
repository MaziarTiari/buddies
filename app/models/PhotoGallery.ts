import { IImage } from './Image'

export interface IPhotoGallery {
    id: string;
    userId: string;
    images: Array<IProfileImage>
}

interface IProfileImage extends IImage {
    asProfile: boolean;
    userId: string;
    uploadedDate: number;
    location?: string;
    date?: number;
    description?: string;
}