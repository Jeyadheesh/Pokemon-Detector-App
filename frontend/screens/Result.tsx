import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Result = () => {
  const [image, setImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/pokemondetectorapp.appspot.com/o/images%2F2023-10-29T14%3A53%3A41.508Z?alt=media&token=538cb560-0efa-49f0-85f2-a6d673905005"
  );

  return (
    <SafeAreaView>
      <View className="h-screen flex-col justify-center items-center gap-10">
        <View className="w-[85%] max-h-80 borde border-black">
          <Image
            resizeMode="contain"
            className="w-full h-full"
            source={{ uri: image }}
          />
        </View>

        <View>
          <Text className="text-3xl font-bold text-blue-700">DKfsjd</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Result;
