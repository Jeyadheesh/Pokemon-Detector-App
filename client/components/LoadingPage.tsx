import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const LoadingPage = () => {
  const [image, setImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/pokemondetectorapp.appspot.com/o/images%2F2023-10-29T14%3A53%3A41.508Z?alt=media&token=538cb560-0efa-49f0-85f2-a6d673905005"
  );

  return (
    <SafeAreaView className="box-border">
      <View className=" h-screen borde-4 border-black flex-col gap-8 justify-center items-center">
        <View className="w-[85%] max-h-80 borde border-black">
          <Image
            resizeMode="contain"
            className="w-full h-full"
            source={{ uri: image }}
          />
        </View>

        <View className="w-[70%] h-32">
          <Image
            resizeMode="contain"
            className="w-full h-full"
            source={require("../assets/lodgif.gif")}
          />
        </View>

        <Text className="font-bold text-2xl text-blue-600">
          Pokemon Detecting ....
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoadingPage;
