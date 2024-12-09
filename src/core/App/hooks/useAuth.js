import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAccessToken } from "../../../common/slices/authSlice";

export const useAuth = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(fetchAccessToken());
    }, [dispatch]);
  }; 