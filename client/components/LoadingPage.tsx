import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface Props {
  imageUrl: string;
}

const LoadingPage = ({ imageUrl }: Props) => {
  return (
    <SafeAreaView className="box-border">
      <View className="dark:bg-gray-900 h-screen borde-4 border-black flex-col gap-8 justify-center items-center">
        <View
          className={`${
            imageUrl != null ? "" : "bg-gray-300"
          } w-[75%] max-h-80 `}
        >
          <Image
            resizeMode="contain"
            className="w-full h-full border-2 border-purple-500 rounded-lg "
            source={{ uri: imageUrl }}
          />
        </View>

        <View className="w-[70%] h-32">
          <Image
            resizeMode="contain"
            className="w-full h-full"
            source={require("../assets/lodgif.gif")}
          />
        </View>

        <Text className="font-bold text-2xl text-blue-500 dark:text-cyan-300">
          Pokemon Detecting ....
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoadingPage;
