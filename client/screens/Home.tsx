import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import ImagePickerButton from "../components/ImagePickerButton";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useNavigation, useRoute } from "@react-navigation/native";
import BgImg from "../assets/bg2.png";
import DarkBtn from "../components/DarkBtn";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase";

const Home = ({ navigation }: any) => {
  const [imageUrl, setImageUrl] = useState<null | any>(null);
  const navigation1 = useNavigation();
  const imagesRef = ref(storage, "image/");

  useEffect(() => {
    console.log("Home : ", imageUrl);
    if (imageUrl != null) {
      console.log(imageUrl);
      navigation.navigate("Result", {
        imageUrl: imageUrl,
      });
    }
  }, [imageUrl]);

  // useEffect(() => {
  //   console.log(colorScheme);
  // }, [colorScheme]);

  useEffect(() => {
    try {
      console.log(1);

      const unsubscribe = navigation1.addListener("focus", () => {
        setImageUrl(null);
        deleteObject(imagesRef);
      });

      return () => {
        unsubscribe();
        console.log("2");
      };
    } catch (error) {
      console.log(error.message);
    }
  }, [navigation1]);

  return (
    <SafeAreaView>
      {/* Dark Button */}
      {/* <View>
        <Button
          onPress={toggleColorScheme}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View> */}
      {/* <ImageBackground source={BgImg}> */}
      <View className="h-screen dark:bg-gray-900 relative borde-4 border-black flex-col justify-center items-center">
        <View className="h-32 w-[90%] borde border-black">
          <Image
            source={require("../assets/title.png")}
            className="h-full w-full"
            contentFit="contain"
          />
        </View>

        <View className="w-full flex-row  items-center">
          <View className="h-40 w-[80%] borde border-black">
            <Image
              source={require("../assets/pok2.png")}
              className="h-full w-full"
              contentFit="contain"
            />
          </View>
          <DarkBtn />
        </View>

        {/* Buttons */}
        <ImagePickerButton setImageUrl={setImageUrl} imageUrl={imageUrl} />

        {/* <View>
          <Button
            title="Go to Details"
            onPress={() => navigation.navigate("Result")}
          />
        </View> */}
      </View>
      {/* Bg Images */}
      <View className="h-40 w-full absolute top-12 -rotate-[70deg] -right-48 borde border-black">
        <Image
          source={require("../assets/pok9.png")}
          className="h-full w-full"
          contentFit="contain"
        />
      </View>
      <View className="h-36 w-full absolute top-16 rotate-[30deg] -left-32 borde border-black">
        <Image
          source={require("../assets/pok1.png")}
          className="h-full w-full"
          contentFit="contain"
        />
      </View>
      <View className="h-40 w-full absolute bottom-0 -rotate-[33deg] -right-32 borde border-black">
        <Image
          source={require("../assets/pok8.png")}
          className="h-full w-full"
          contentFit="contain"
        />
      </View>
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
};

export default Home;
