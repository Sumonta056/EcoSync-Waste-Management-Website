import { View, Text, Image } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const DotComponent = ({ selected }) => {
    return (
      <View
        className={`w-4 h-4 mx-1 flex items-center justify-center rounded-full ${
          selected ? "border border-blue-400" : ""
        }  p-2`}
      >
        <View
          className={`w-2 h-2 ${
            selected ? "bg-blue-400" : "bg-blue-200"
          } rounded-full`}
        ></View>
      </View>
    );
  };

  return (
    <Onboarding
      onSkip={() => navigation.replace("Dashboard")}
      onDone={() => navigation.replace("Dashboard")}
      DotComponent={DotComponent}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("./2.jpg")}
              className="object-contain w-72 h-72"
            />
          ),
          title: "Welcome to DNCC Waste Management",
          subtitle: "Efficiently managing waste in your community.",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("./1.jpg")}
              className="object-contain w-96 h-72"
            />
          ),
          title: "Waste Management Services",
          subtitle: "From waste collection to recycling, we've got it all.",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("./3.jpg")}
              className="object-contain w-72 h-72"
            />
          ),
          title: "Join Us in Making DNCC Cleaner",
          subtitle: "Together, we can make a difference.",
        },
      ]}
    />
  );
};

export default OnboardingScreen;
