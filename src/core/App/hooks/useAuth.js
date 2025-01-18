import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccessToken, selectAccessToken } from "../../../common/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);

  useEffect(() => {
    if (accessToken === null) {
      dispatch(fetchAccessToken());
    }
  }, [dispatch, accessToken]);
}; 