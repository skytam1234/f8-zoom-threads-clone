import { getListFollow } from "@/services/user/userServices";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCurrentUser } from "../auth/hooks";

export const useFetchListFollow = () => {
  const currentUser = useCurrentUser();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListFollow(currentUser?.id));
  }, [dispatch, currentUser]);
};
export const useListFollow = () => {
  const listFollow = useSelector((state) => state.user.list);
  return listFollow;
};
