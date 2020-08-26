import React, { useContext, useState } from "react";
import Container from "../Container/Container";
import ActionButton from "../ActionButton/ActionButton";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import Permissions from "expo-permissions";
import { Image, FlatList, View } from "react-native";
import { SessionContext } from "../../context/SessionContext/SessionContext";
import { IProfileImage } from "../../models/PhotoGallery";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";
import useStyle from "./ProfileGallery.style";

const ProfileGallery = () => {

	enum SelectOption { CAMERA, FILE };

	const [childrenVisible, setChildrenVisible] = useState<boolean>(false);

	const [hasPermission, setHasPermission] = useState<boolean>(() => {
		if (Constants.platform?.ios) {
			Permissions.askAsync(Permissions.CAMERA_ROLL)
				.then((response) => setHasPermission(response.granted))
				.catch(() => setHasPermission(false));
			return false;
		} else {
			return true; // TODO Permission for Android required ?
		}
	});

	const { userProfile, user, gallery, fetchGallery, uploadToGallery } = useContext(SessionContext);
	const style = useStyle();

	const isOwnGallery = user.id === gallery.userId;

	useFocusEffect(() => {
		fetchGallery(userProfile.userId);
	});

	const handleAddPressed = (): void => {
		setChildrenVisible(!childrenVisible);
	};

	const handleChildPressed = async (selectOption: SelectOption) => {
		if (!hasPermission) {
			// TODO Test & Translation
			alert("Sorry, you did not give us the permission to access your images!");
			return;
		}
		const pickerOptions: ImagePicker.ImagePickerOptions = {
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			allowsMultipleSelection: true,
			base64: true,
			quality: 0.1,
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
				const image: IProfileImage = {
					userId: user.id,
					asProfile: true,
					width: pickerResult.width,
					height: pickerResult.height,
					base64: pickerResult.base64 || "",
					uploadedDate: moment.now(),
				};
				uploadToGallery(image);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setChildrenVisible(false);
		}
	};

	const renderItem = (image: IProfileImage): JSX.Element => (
		<View style={style.imageContainer}>
			<Image style={style.image}
				source={{ uri: "data:image/gif;base64," + image.base64 }}
			/>
		</View>
	);

	return (
		<Container type="screen" layout="root">
			<FlatList
				style={style.list}
				data={gallery.images}
				renderItem={(item) => renderItem(item.item)}
				numColumns={3}
				keyExtractor={(item, index) => index.toString()}
			/>
			{isOwnGallery &&
				<ActionButton
					icon="plus"
					onPress={handleAddPressed}
					children={[
						{ icon: "camera", onPress: () => handleChildPressed(SelectOption.CAMERA) },
						{ icon: "file-image", onPress: () => handleChildPressed(SelectOption.FILE) },
					]}
					showChildren={childrenVisible}
				/>
			}
		</Container>
	);
};

export default ProfileGallery;
