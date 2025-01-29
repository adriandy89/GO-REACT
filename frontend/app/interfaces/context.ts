export interface OutletContext {
  jwtToken: string;
  setJwtToken: (token: string) => void;
  setAlertClassName: (className: string) => void;
  setAlertMessage: (message: string) => void;
  toggleRefresh: (status: boolean) => void;
}
