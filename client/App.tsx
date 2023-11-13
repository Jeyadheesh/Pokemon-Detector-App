import { StatusBar } from "expo-status-bar";
import { Button, Text, View } from "react-native";
import ImagePickerButton from "./components/ImagePickerButton";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Result from "./screens/Result";
import CameraImagePickerButton from "./components/CameraImagePickerButton";
import LoadingPage from "./components/LoadingPage";
import { useColorScheme } from "nativewind";

// import CameraImagePickerButton fromm

const Stack = createNativeStackNavigator();

export default function App() {
  const { colorScheme } = useColorScheme();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{
            headerShown: false,
            // header: (props) => <ChatBoxHeader {...props} />,
          }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Result"
          component={Result}
        />
      </Stack.Navigator>
      <StatusBar style="auto" animated={true} />
    </NavigationContainer>
  );
}
