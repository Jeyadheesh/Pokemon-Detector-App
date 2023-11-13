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

  const [image, setImage] = useState(imageUrl);
  const [resData, setResData] = useState(imageUrl);
  const [isLoading, setIsLoading] = useState(true);

  const getPredictedData = async () => {
    try {
      const resData = await axios.post(
        "http://192.168.43.66:5000/predict",
        {
          image_url: image,
        },
        { withCredentials: true }
      );
      const data = resData.data;
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
      {isLoading ? (
        <LoadingPage imageUrl={image} />
      ) : (
        <View className="h-screen relative dark:bg-gray-900 flex-col justify-center  items-center ">
          <View className="w-[75%] max-h-80">
            <Image
              resizeMode="contain"
              className="w-full h-full object-contain"
              source={{ uri: image }}
            />
          </View>

          <View className="mt-7">
            <Text className="text-3xl  font-bold text-blue-500 dark:text-cyan-300">
              💥 {resData.prediction} 💥
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Result;
