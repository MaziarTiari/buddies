import React, { useContext, useState } from "react";
import Container from "../Container/Container";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import ActionButton from "../ActionButton/ActionButton";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import Permissions from "expo-permissions";
import { Image, FlatList, View } from "react-native";

// TODO: Remove example_img Array and use Profile Context instead
const example_img: string[] = [
	"https://www.bootdey.com/img/Content/avatar/avatar1.png",
	"https://upload.wikimedia.org/wikipedia/commons/3/30/%C5%A0koda_Superb_III_at_IAA_2019_IMG_0397.jpg",
	"https://www.thesun.co.uk/wp-content/uploads/2020/01/NINTCHDBPICT000554673258.jpg",
	"https://www.bootdey.com/img/Content/avatar/avatar1.png",
	"https://www.bootdey.com/img/Content/avatar/avatar1.png",
	"https://upload.wikimedia.org/wikipedia/commons/3/30/%C5%A0koda_Superb_III_at_IAA_2019_IMG_0397.jpg",
	"https://www.thesun.co.uk/wp-content/uploads/2020/01/NINTCHDBPICT000554673258.jpg",
	"https://upload.wikimedia.org/wikipedia/commons/3/30/%C5%A0koda_Superb_III_at_IAA_2019_IMG_0397.jpg",
	"https://www.bootdey.com/img/Content/avatar/avatar1.png",
	"https://www.thesun.co.uk/wp-content/uploads/2020/01/NINTCHDBPICT000554673258.jpg",
	"https://www.thesun.co.uk/wp-content/uploads/2020/01/NINTCHDBPICT000554673258.jpg",
	"https://www.bootdey.com/img/Content/avatar/avatar1.png",
	"https://upload.wikimedia.org/wikipedia/commons/3/30/%C5%A0koda_Superb_III_at_IAA_2019_IMG_0397.jpg",
	"https://www.thesun.co.uk/wp-content/uploads/2020/01/NINTCHDBPICT000554673258.jpg",
	"https://www.bootdey.com/img/Content/avatar/avatar1.png",
	"https://www.thesun.co.uk/wp-content/uploads/2020/01/NINTCHDBPICT000554673258.jpg",
	"https://www.bootdey.com/img/Content/avatar/avatar1.png",
	"https://www.thesun.co.uk/wp-content/uploads/2020/01/NINTCHDBPICT000554673258.jpg",
];

const ProfileGallery = () => {

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

	const renderItem = (url: string): JSX.Element => (
		<View style={{ flex: 1, margin: 1 }}>
			<Image style={{ backgroundColor: "black", aspectRatio: 1, resizeMode: "contain" }} source={{ uri: url }} />
		</View>
	);

	return (
		<Container type="screen" layout="root">
			<FlatList
				style={{ borderWidth: 2, width: "100%" }}
				data={example_img}
				renderItem={(item) => renderItem(item.item)}
				numColumns={3}
				keyExtractor={(item, index) => index.toString()}
			/>
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

export default ProfileGallery;
