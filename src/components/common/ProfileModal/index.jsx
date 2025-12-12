// components/ProfileModal.js

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    followerUser,
    getListFollowing,
    unFollowerUser,
} from "@/services/user/userServices";
import { useDispatch } from "react-redux";
import { useCurrentUser } from "@/features/auth/hooks";
import { useIsFollowings } from "@/features/user/hooks";
import { cn } from "@/lib/utils";

export default function ProfileModal({ user }) {
    const dispatch = useDispatch();
    const currentUser = useCurrentUser();

    const isFollow = useIsFollowings(user?.id);

    const handle = async () => {
        try {
            if (isFollow) {
                await unFollowerUser(user.id);
            } else {
                await followerUser(user.id);
            }

            dispatch(getListFollowing(currentUser?.id));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="flex flex-col items-center gap-3 min-w-[300px] p-4">
                <Avatar className="w-20 h-20">
                    <AvatarImage src={user?.avatar_url} alt={user?.username} />
                    <AvatarFallback>{user?.username[0]}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h2 className="text-base font-bold">{user?.name}</h2>
                    <p className="text-sm text-gray-500">@{user?.username}</p>
                </div>
                <p className="text-sm italic text-center text-gray-700">
                    {user?.bio}
                </p>
                <p className="text-sm text-gray-600">8 người theo dõi</p>
                <div className="flex justify-center">
                    <Button
                        onClick={() => {
                            handle();
                        }}
                        className={cn(
                            isFollow
                                ? "bg-amber-50 text-black"
                                : " bg-black text-white"
                        )}
                    >
                        {isFollow ? "Bỏ theo dõi" : "Theo dõi"}
                    </Button>
                </div>
            </div>
        </>
    );
}
