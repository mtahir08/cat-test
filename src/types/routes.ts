import { ROUTE_NAMES } from "../constants/routes";

export type RouteParams = {
  [ROUTE_NAMES.HOME]?: undefined;
  [ROUTE_NAMES.LISTINGS]: {
    id: number;
  };
};
