import React, { useState, useEffect } from "react";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TailwindProvider } from "tailwindcss-react-native";
import Dashboard from "./screens/Dashboard/Index.js";
import OnboardingScreen from "./screens/Starting-Screen/OnboardingScreen";
import User from "./screens/UserInFo/User";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import SplashScreen from "./screens/SplashScreen.js";
import "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Entypo";
import DrawerContent from "./DrawerContent";
import UserReport from "./screens/UserReport/UserReport.js";
import Notification from "./screens/Notification/Notification.js";

const StackNav = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: "#0163d2",
        headerStyle: {
          backgroundColor: "#00716F",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        options={{ headerShown: true }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name="OnboardingScreen"
        component={OnboardingScreen}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name="UserReport"
        component={UserReport}
      />

      <Stack.Screen
        options={{ headerShown: true }}
        name="Notification"
        component={Notification}
      />

      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerLeft: () => (
            <Icon
              name="menu"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              size={30}
              color="#fff"
            />
          ),
          // headerRight: () => (
          //   <Icon
          //     name="profile" // This is a generic user icon from Entypo, replace it with the name of your profile icon
          //     onPress={() => {
          //       /* Handle press event, e.g. navigate to profile screen */
          //     }}
          //     size={30}
          //     color="#fff"
          //   />
          // ),
        }}
      />

      <Stack.Screen
        options={{ headerShown: true }}
        name="Users"
        component={User}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name="Register"
        component={Register}
      />
    </Stack.Navigator>
  );
};

const DrawerNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home">
        {(props) => <StackNav {...props} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default function App() {
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 3000);
  }, []);

  if (isShowSplashScreen) {
    return <SplashScreen />;
  }

  return (
    <TailwindProvider>
      <NavigationContainer>
        <DrawerNav />
      </NavigationContainer>
    </TailwindProvider>
  );
}
