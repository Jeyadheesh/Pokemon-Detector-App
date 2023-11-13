import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Dark from "react-native-vector-icons/Octicons";
import Light from "react-native-vector-icons/Feather";
import { useColorScheme } from "nativewind";

const DarkBtn = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <TouchableOpacity
      onPress={toggleColorScheme}
      className="bg-cya-500 h-fit  w-fit p-3   rounded-lg"
    >
      {colorScheme === "dark" ? (
        <Light name="sun" size={25} color="white" />
      ) : (
        <Dark name="moon" size={25} color="black" />
      )}
    </TouchableOpacity>
  );
};

export default DarkBtn;
