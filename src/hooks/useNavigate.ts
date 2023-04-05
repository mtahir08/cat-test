import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteParams } from '../types/routes';
import { ROUTE_NAMES } from '../constants/routes';


const useCustomNavigation = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

  const navigate = (routeName: ROUTE_NAMES, params?: any) => {
    navigation.navigate(routeName, params);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return {
    navigate,
    goBack,
  };
};

export default useCustomNavigation;
