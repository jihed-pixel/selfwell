import AsyncStorage from '@react-native-community/async-storage';

const AuthHeader = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user && user.accessToken) {
      return { Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2MDgwMzc5OTksImV4cCI6MTYwODEyNDM5OX0.jHQLR8CeNxmAYjtabbDoj9njRCa2YdKB8Tt5u4adnMgFOmBWNfqgbEvjjDWOVhKiUnizcwDt30IIAa8C2MNWVw" };
    } else {
      return {};
    }
};

export default AuthHeader;
  