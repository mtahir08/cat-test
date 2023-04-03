import { AUTH_ROUTE_NAMES } from "../constants/routes";

export type RouteParams = {
  [AUTH_ROUTE_NAMES.HOME]?: undefined;
  [AUTH_ROUTE_NAMES.LISTINGS]: {
    id: number;
  };
};
