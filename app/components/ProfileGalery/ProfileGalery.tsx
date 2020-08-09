import React, { useContext, useState, useEffect } from "react";
import Container from "../Container/Container";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import ActionButton from "../ActionButton/ActionButton";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Image } from "react-native";

const ProfileGalery = () => {
    const theme = useContext(ThemeContext).theme;
    
    const getPermissionAsync = async () => {
        if (Constants.platform?.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
    };
    
    const [imageUrl, setImage] = useState(() => { 
        getPermissionAsync();
        return "";
    });

    const _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            setImage(result.uri);
          }

          console.log(result);
        } catch (E) {
          console.log(E);
        }
    };

    return (
        <Container type="screen" layout="root">
            <ActionButton text="+" onPress={_pickImage} />
            {imageUrl !== "" && 
                <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />
            }
        </Container>
    );
};

export default ProfileGalery;
