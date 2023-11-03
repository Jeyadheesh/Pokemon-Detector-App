import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  launchCameraAsync,
} from "expo-image-picker";
import { storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Feather from "react-native-vector-icons/Feather";

const ImagePickerButton = () => {
  const [imageUri, setImageUri] = useState<null | any>(null);
  const [imageUrl, setImageUrl] = useState<null | any>(null);

  const pickGalleryImage = async () => {
    // No permissions request is necessary for launching the image library
    try {
      let result: any = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result.assets[0].uri);

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const pickCameraImage = async () => {
    // No permissions request is necessary for launching the image library
    try {
      let result: any = await launchCameraAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0.5,
      });

      console.log(result.assets[0].uri);

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const setDownloadUrl = async () => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      // console.log(blob.size);
      const imagesRef = ref(storage, "images/" + new Date().toISOString());
      const uploadTask = uploadBytesResumable(imagesRef, blob);

      uploadTask.on("state_changed", async (snapshot) => {
        await getDownloadURL(uploadTask.snapshot.ref).then(
          async (downloadURL) => {
            setImageUrl(downloadURL);
          }
        );
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    setDownloadUrl();
  }, [imageUri]);

  useEffect(() => {
    console.log(imageUrl);
  }, [imageUrl]);

  return (
    <View className="flex-row mt-10 borde border-black w-[60%] justify-between">
      <View className="text-center flex-col items-center gap-1">
        <TouchableOpacity
          onPress={pickGalleryImage}
          className={
            "p-3 bg-blue-400 rounded-xl shadow shadow-black border-2 border-blue-400"
          }
        >
          <FontAwesome5 name="images" color={"white"} size={22} />
        </TouchableOpacity>
        <Text className="font-bold">Gallery</Text>
      </View>

      <View className="text-center flex-col items-center gap-1">
        <TouchableOpacity
          onPress={() => pickCameraImage()}
          className={
            "p-3 bg-blue-400 rounded-xl shadow shadow-black border-2 border-blue-400"
          }
        >
          <Feather name="camera" color={"white"} size={22} />
        </TouchableOpacity>
        <Text className="font-bold">Camera</Text>
      </View>
    </View>
  );
};

export default ImagePickerButton;
