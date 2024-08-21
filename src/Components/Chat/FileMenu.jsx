import {
  Block,
  DetailsSharp,
  Report,
  VolumeMute
} from "@mui/icons-material";
import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import React from "react";
import toast from "react-hot-toast";
import { LuLoader } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useSendAttachmentsMutation } from "../../redux/api/api";
import { setIsFileMenu, setUploadingLoader } from "../../redux/reducers/misc";
import { useBlockAUser, useUnblockAUser } from "../../Requests/PostRequests";

const FileMenu = ({ anchorE1, chatId, userId }) => {
  const { user } = useSelector(state => state.auth)
  const { isFileMenu } = useSelector((state) => state.misc);

  const dispatch = useDispatch();
  const { block, isLoading } = useBlockAUser()
  const { unblock, isLoading: unblockingLoader } = useUnblockAUser()

  const [sendAttachments] = useSendAttachmentsMutation();

  const closeFileMenu = () => dispatch(setIsFileMenu(false));

  const fileChangeHandler = async (e, key) => {
    const files = Array.from(e.target.files);

    if (files.length <= 0) return;

    if (files.length > 5)
      return toast.error(`You can only send 5 ${key} at a time`);

    dispatch(setUploadingLoader(true));

    const toastId = toast.loading(`Sending ${key}...`);
    closeFileMenu();

    try {
      const myForm = new FormData();

      myForm.append("chatId", chatId);
      files.forEach((file) => myForm.append("files", file));

      const res = await sendAttachments(myForm);

      if (res.data) toast.success(`${key} sent successfully`, { id: toastId });
      else toast.error(`Failed to send ${key}`, { id: toastId });

      // Fetching Here
    } catch (error) {
      toast.error(error, { id: toastId });
    } finally {
      dispatch(setUploadingLoader(false));
    }
  };

  return (
    <Menu anchorEl={anchorE1} open={isFileMenu} onClose={closeFileMenu}>
      <div
        style={{
          width: "10rem",
        }}
      >
        <MenuList>
          {user?.blockedUsers?.includes(userId) ?
            <MenuItem onClick={() => {
              unblock(userId)
              dispatch(setIsFileMenu(false))
            }}>
              <Tooltip title="unBlock Contact">
                {unblockingLoader ? <LuLoader className="text-2xl loader" /> : <Block />}
              </Tooltip>
              <ListItemText style={{ marginLeft: "0.5rem", fontWeight: "bold" }}>unBlock</ListItemText>
            </MenuItem> :
            <MenuItem onClick={() => {
              block(userId)
              dispatch(setIsFileMenu(false))
            }}>
              <Tooltip title="Block Contact">
                {isLoading ? <LuLoader className="text-2xl loader" /> : <Block />}
              </Tooltip>
              <ListItemText style={{ marginLeft: "0.5rem", fontWeight: "bold" }}>Block</ListItemText>
            </MenuItem>
          }

          <MenuItem onClick={() => dispatch(setIsFileMenu(false))}>
            <Tooltip title="Report">
              <Report />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Report</ListItemText>
          </MenuItem>

          <MenuItem onClick={() => dispatch(setIsFileMenu(false))}>
            <Tooltip title="Details">
              <DetailsSharp />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Details</ListItemText>
          </MenuItem>

          <MenuItem onClick={() => dispatch(setIsFileMenu(false))}>
            <Tooltip title="Mute">
              <VolumeMute />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Mute</ListItemText>
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  );
};

export default FileMenu;
