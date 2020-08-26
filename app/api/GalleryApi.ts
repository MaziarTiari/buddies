import { getServiceUrl } from './channels';
import { AxiosRequestConfig, AxiosError } from 'axios';
import { ApiClient } from './ApiClient';
import { IPhotoGallery, IProfileImage } from '../models/PhotoGallery';

class GalleryApi extends ApiClient<IPhotoGallery>  {

    constructor(config: AxiosRequestConfig) {
        super(config);
        this.VerifyUser = this.UploadImage.bind(this);
    }

    public UploadImage(image: IProfileImage, galleryId: string) {
        return this.post<any, IProfileImage>("addImage/" + galleryId, image)
            .then(this.success)
            .catch((error: AxiosError) => { throw error });
    }

}

export const galleryApi = new GalleryApi({ baseURL: getServiceUrl("PhotoGalleries") });
