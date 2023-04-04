import React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { AuthRequestPromptOptions } from "expo-auth-session/build/AuthRequest.types";
import { AuthSessionResult } from "expo-auth-session/build/AuthSession.types";
import { UserInfo } from "../types";
import { WEB_CLIENT_ID, IOS_CLIENT_ID, ANDROID_CLIENT_ID } from "@env";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { RouteParams } from "../types/routes";
import { ROUTE_NAMES } from "../constants/routes";

type AuthContextType = {
  accessToken: string;
  userInfo: UserInfo;
  onLogin: (
    options?: AuthRequestPromptOptions
  ) => Promise<AuthSessionResult | void>;
};

const DEFAULT_CONTEXT = {
  userInfo: null,
  accessToken: "",
  onLogin: async () => {},
};

type props = {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
};

const AuthContext = React.createContext<AuthContextType>(DEFAULT_CONTEXT);

WebBrowser.maybeCompleteAuthSession();

const AuthProvider: React.FC<props> = (props) => {
  const [accessToken, setAccessToken] = React.useState("");
  const [userInfo, setUserInfo] = React.useState(null);
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

  const [_request, loginResponse, onLogin] = Google.useAuthRequest({
    clientId: WEB_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
  });

  const fetchUserInfo = async (token: string) => {
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userInfo = await res.json();
      setUserInfo(userInfo);
      navigation.navigate(ROUTE_NAMES.HOME);
    } catch (e) {
      console.log("ERROR HERE: ", { e });
    }
  };

  React.useEffect(() => {
    if (loginResponse && loginResponse.type === "success") {
      fetchUserInfo(loginResponse.authentication?.accessToken);
      setAccessToken(loginResponse.authentication?.accessToken);
    }
  }, [loginResponse]);

  const contextValues = {
    onLogin,
    userInfo,
    accessToken,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
