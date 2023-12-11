import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingPage from "../components/LoadingPage";
import axios from "axios";

interface Props {
  route: any;
  navigation: any;
}

const Result = ({ route, navigation }: Props) => {
  const { imageUrl } = route.params;

  const [resData, setResData] = useState(imageUrl);
  const [isLoading, setIsLoading] = useState(true);

  const getPredictedData = async () => {
    console.log(imageUrl);

    try {
      const resData = await axios.post(
        "http://192.168.43.144:5000/predict",
        {
          image_url: imageUrl,
        },
        { withCredentials: true }
      );
      const data = await resData.data;
      console.log("axios data", data);
      setResData(data);
      setIsLoading(false);
    } catch (error) {
      console.log("aa", error.message);
    }
  };

  useEffect(() => {
    console.log("in in");

    getPredictedData();
  }, []);

  return (
    <SafeAreaView>
      {isLoading || imageUrl == null ? (
        <LoadingPage imageUrl={imageUrl} />
      ) : (
        <View className="h-screen w-full relative dark:bg-gray-900 flex-col justify-center  items-center ">
          <View
            className={`${
              imageUrl != null ? "" : "bg-gray-300"
            } w-[75%] max-h-80 `}
          >
            <Image
              resizeMode="contain"
              className="w-full h-full object-contain  border-2 border-purple-500 rounded-lg"
              source={{ uri: imageUrl }}
            />
          </View>

          <View className="mt-7">
            <Text className="text-3xl  font-bold text-blue-500 dark:text-cyan-300">
              {resData.prediction} 🐼
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Result;
