import { Avatar } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AvatarImage } from "../ui/avatar";

function CreateNewPost() {
    return (
        <>
            <div className="border rounded-md">
                <div className=" w-[640px] h-20 flex items-center justify-between p-4">
                    <div className="p-2">Hủy</div>
                    <div className="text-black flex-1 text-center size-10">
                        Thread mới
                    </div>
                    <div className="p-2 flex items-center justify-between">
                        <div>Nút 1</div>
                        <div>Nút 2</div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between p-4">
                        <div className="flex flex-col w-10 items-center">
                            <div className="w-full rounded-full overflow-hidden">
                                <Avatar className="ring-2 ring-background w-full rounded-full">
                                    <AvatarImage
                                        src={"https://github.com/shadcn.png"}
                                        alt="username"
                                    />
                                </Avatar>
                            </div>
                            <div className="border-4 w-1 h-[80%] flex-1"></div>
                        </div>
                        <div className="flex-1">
                            <div className="flex">
                                <div>ten uer</div>
                                <div>icon</div>
                                <Input placeholder="Thêm chủ đề  mới" />
                            </div>
                            <div>
                                <Input type="text" placeholder="Nội dung..." />
                            </div>
                            <div className="flex gap 2">
                                <div>Nut1</div>
                                <div>Nut2</div>
                                <div>Nut3</div>
                                <div>Nut4</div>
                                <div>Nut5</div>
                                <div>Nut6</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div>Avata nho</div>
                    <div>Nut them</div>
                </div>
                <div className="flex">
                    <div> Nut</div>
                    <Button>Đăng</Button>
                </div>
            </div>
        </>
    );
}
export default CreateNewPost;
