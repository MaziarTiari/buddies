import React, { useContext, useState } from "react";
import Container from "../Container/Container";
import ActionButton from "../ActionButton/ActionButton";
import { Image, FlatList, View } from "react-native";
import { SessionContext } from "../../context/SessionContext/SessionContext";
import { IProfileImage } from "../../models/PhotoGallery";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";
import useProfileGalleryStyle from "./ProfileGallery.style";
import useImagePicker, { ImageSelectMode } from "../../hooks/useImagePicker";

const ProfileGallery = () => {

	const [childrenVisible, setChildrenVisible] = useState<boolean>(false);
	const { selectImage } = useImagePicker();
	const styles = useProfileGalleryStyle();

	const { 
		userProfile, 
		user, 
		gallery, 
		fetchGallery, 
		uploadToGallery 
	} = useContext(SessionContext);

	const isOwnGallery = user.id === gallery.userId;

	useFocusEffect(() => {
		fetchGallery(userProfile.userId);
	});

	const handleAddPressed = (): void => {
		setChildrenVisible(!childrenVisible);
	};

	const handleImageSelected = (base64: string, width: number, height: number) => {
		const image: IProfileImage = {
			userId: user.id,
			asProfile: true,
			width: width,
			height: height,
			base64: base64,
			uploadedDate: moment.now(),
		};
		uploadToGallery(image);
	};

	const handleChildPressed = (selectOption: ImageSelectMode) => {
		selectImage(selectOption, handleImageSelected);
		setChildrenVisible(false);
	};

	const renderItem = (image: IProfileImage): JSX.Element => (
		<View style={styles.imageContainer}>
			<Image style={styles.image}
				source={{ uri: "data:image/gif;base64," + image.base64 }}
			/>
		</View>
	);

	return (
		<Container type="screen" layout="root">
			<FlatList
				style={styles.list}
				data={gallery.images}
				renderItem={(item) => renderItem(item.item)}
				numColumns={3}
				keyExtractor={(item, index) => index.toString()}
			/>
			{isOwnGallery &&
				<ActionButton
					horizontalLeft
					icon="plus"
					onPress={handleAddPressed}
					children={[
						{ icon: "camera", onPress: () => handleChildPressed("camera") },
						{ icon: "file-image", onPress: () => handleChildPressed("file") },
					]}
					showChildren={childrenVisible}
				/>
			}
		</Container>
	);
};

export default ProfileGallery;
