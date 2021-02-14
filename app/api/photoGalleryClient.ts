import { MutableRefObject, useRef } from "react";
import { IImage } from "../models/Image";
import { IPhotoGallery } from "../models/PhotoGallery";
import { } from "../models/User";
import { apiRoutes } from "./channels";
import useHttpClient from "./httpClient";

interface ReturnValue {
    addImage: (galleryId: string, image: IImage) => Promise<void>;
    getUsersGallery: () => Promise<IPhotoGallery>;
    createPhotoGallery: (gallery: IPhotoGallery) => Promise<IPhotoGallery>;
}

export function usePhotoGalleryClient(token: MutableRefObject<string>, onExpiredToken: () => Promise<void>) : ReturnValue {
    
    const httpClient = useHttpClient<IPhotoGallery>({
        config: {baseURL: apiRoutes.photoGalleries()}, 
        token,
        onExpiredToken
    });

    const getUsersGallery = (): Promise<IPhotoGallery> => httpClient.get<IPhotoGallery>();

    const addImage = (galleryId: string, image: IImage): Promise<void> => (
        httpClient.post<void, IImage>(
            apiRoutes.photoGalleries("addImage/") + galleryId, 
            image,
        )
    );

    const createPhotoGallery = (gallery: IPhotoGallery): Promise<IPhotoGallery> => (
        httpClient.create<IPhotoGallery>(gallery)
    );

    return ({
        addImage,
        getUsersGallery,
        createPhotoGallery,
    })
}
