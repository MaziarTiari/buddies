import React, { useState } from 'react';
import Constants from 'expo-constants';
import Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export type ImageSelectMode = 'camera' | 'file';
export type ImagePickedCallback = (
    base64: string,
    width: number,
    height: number
) => void;

function useImagePicker() {
    const [hasPermission, setHasPermission] = useState<boolean>(() => {
        if (Constants.platform?.ios) { // TODO Test for IOS
            Permissions.askAsync(Permissions.CAMERA_ROLL)
                .then((response) => setHasPermission(response.granted))
                .catch(() => setHasPermission(false));
            return false;
        } else {
            return true;
        }
    });

    const pickerOptions: ImagePicker.ImagePickerOptions = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        allowsMultipleSelection: true,
        base64: true,
        quality: 0.1
    };

    function selectImage(mode: ImageSelectMode, callback: ImagePickedCallback) {
        if (!hasPermission) {
            // TODO Test & Translation
            alert(
                'Sorry, you did not give us the permission to access your images!'
            );
            return;
        }
        ((mode: ImageSelectMode) => {
            switch (mode) {
                case 'camera':
                    return ImagePicker.launchCameraAsync(pickerOptions);
                case 'file':
                    return ImagePicker.launchImageLibraryAsync(pickerOptions);
            }
        })(mode)
            .then((pickerResult: ImagePicker.ImagePickerResult) => {
                if (!pickerResult.cancelled) {
                    callback(
                        pickerResult.base64 || '',
                        pickerResult.width,
                        pickerResult.height
                    );
                }
            })
            .catch((error) => console.log(error));
    }

    return {
        selectImage
    };
}

export default useImagePicker;
