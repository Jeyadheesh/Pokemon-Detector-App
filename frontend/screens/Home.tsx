import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import ImagePickerButton from "../components/ImagePickerButton";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

import BgImg from "../assets/bg2.png";

const Home = ({ navigation }: any) => {
  return (
    <SafeAreaView>
      {/* <ImageBackground source={BgImg}> */}
      <View className="h-screen relative borde-4 border-black flex-col justify-center items-center">
        <View className="h-32 w-[90%] borde border-black">
          <Image
            source={require("../assets/title.png")}
            className="h-full w-full"
            contentFit="contain"
          />
        </View>

        <View className="h-40 w-[80%] borde border-black">
          <Image
            source={require("../assets/pok2.png")}
            className="h-full w-full"
            contentFit="contain"
          />
        </View>

        {/* Buttons */}
        <ImagePickerButton />

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
