import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import Toast from 'react-native-toast-message';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthSessionResult } from 'expo-auth-session/build/AuthSession.types';
import { AuthRequestPromptOptions } from 'expo-auth-session/build/AuthRequest.types';

import { WEB_CLIENT_ID, IOS_CLIENT_ID, ANDROID_CLIENT_ID } from '@env';

import { UserInfo } from '../types';
import { ROUTE_NAMES } from '../constants/routes';
import { loggedInUser } from '../constants/api';
import useCustomNavigation from '../hooks/useNavigate';

type AuthContextType = {
  accessToken: string;
  userInfo: UserInfo;
  onLogin: (
    options?: AuthRequestPromptOptions
  ) => Promise<AuthSessionResult | void>;
  login: (options?: AuthRequestPromptOptions) => void;
};

const DEFAULT_CONTEXT = {
  userInfo: null,
  accessToken: '',
  onLogin: async () => {},
  login: () => {},
};

type props = {
  children:
    | boolean
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
};

const AuthContext = React.createContext<AuthContextType>(DEFAULT_CONTEXT);

WebBrowser.maybeCompleteAuthSession();

const AuthProvider: React.FC<props> = (props) => {
  const [accessToken, setAccessToken] = React.useState('');
  const [userInfo, setUserInfo] = React.useState(null);
  const { navigate } = useCustomNavigation();

  const [_request, loginResponse, onLogin] = Google.useAuthRequest({
    clientId: WEB_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    scopes: ['profile', 'email'],
    redirectUri: 'here',
  });

  const fetchUserInfo = async (token: string) => {
    try {
      const res = await fetch(loggedInUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userInfo = await res.json();
      setUserInfo(userInfo);
      navigate(ROUTE_NAMES.HOME);
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Error logging in',
        text2: 'Please retry',
      });
    }
  };

  const login = () => {
    navigate(ROUTE_NAMES.HOME);
  };

  const checkLoginState = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      await fetchUserInfo(accessToken);
    } else navigate(ROUTE_NAMES.LOGIN);
  };

  React.useEffect(() => {
    if (loginResponse?.type === 'success') {
      const token = loginResponse.authentication?.accessToken;
      fetchUserInfo(token);
      setAccessToken(token);
      AsyncStorage.setItem('accessToken', token);
    }
  }, [loginResponse]);

  React.useEffect(() => {
    checkLoginState();
  }, []);

  const contextValues = {
    onLogin,
    login,
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
