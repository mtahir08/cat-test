import { ROUTE_NAMES } from "../constants/routes";

export type RouteParams = {
  [ROUTE_NAMES.HOME]?: undefined;
  [ROUTE_NAMES.LOGIN]?: undefined;
  [ROUTE_NAMES.LISTINGS]: { id: number };
  [ROUTE_NAMES.DETAILS]: { id: number; uri: string };
};
