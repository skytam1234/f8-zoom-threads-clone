import { getListFollowing } from "@/services/user/userServices";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCurrentUser } from "../auth/hooks";

export const useFetchListFollowing = () => {
    const currentUser = useCurrentUser();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getListFollowing(currentUser?.id));
    }, [dispatch, currentUser]);
};
export const useListFollowing = () => {
    const listFollow = useSelector((state) => state.user.followings);
    return listFollow;
};
export const useIsFollowings = (id) => {
    const listFollow = useListFollowing();
    console.log(listFollow);

    if (!listFollow) return false;
    const res = listFollow.find((item) => item.id === id);
    if (res) return true;
    return false;
};
