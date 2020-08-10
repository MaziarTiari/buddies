import React, { useContext, useState } from "react";
import Container from "../Container/Container";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import ActionButton from "../ActionButton/ActionButton";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import Permissions from "expo-permissions";
import { Image } from "react-native";

const ProfileGalery = () => {

	enum SelectOption { CAMERA, FILE };

	const theme = useContext(ThemeContext).theme;

	const [childrenVisible, setChildrenVisible] = useState<boolean>(false);

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

	const handleAddPressed = (): void => {
		setChildrenVisible(!childrenVisible);
	}

	const handleChildPressed = async (selectOption: SelectOption) => {
		const pickerOptions: ImagePicker.ImagePickerOptions = {
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: false,
			allowsMultipleSelection: true
		}
		try {
			let pickerResult: ImagePicker.ImagePickerResult;
			switch (selectOption) {
				case SelectOption.CAMERA:
					pickerResult = await ImagePicker.launchCameraAsync(pickerOptions);
					break;
				case SelectOption.FILE:
					pickerResult = await ImagePicker.launchImageLibraryAsync(pickerOptions);
					break;
			}
			if (!pickerResult.cancelled) {
				setImage(pickerResult.uri);
			}
			console.log(pickerResult);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container type="screen" layout="root">
			<ActionButton
				icon="plus"
				onPress={handleAddPressed}
				children={[
					{ icon: "camera", onPress: () => handleChildPressed(SelectOption.CAMERA) },
					{ icon: "file-image", onPress: () => handleChildPressed(SelectOption.FILE) },
				]}
				showChildren={childrenVisible}
			/>
			{imageUrl !== "" &&
				<Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />
			}
		</Container>
	);
};

export default ProfileGalery;
