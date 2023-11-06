import * as React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import AddItem from "../../../components/common/AddItem";
import { createSubTask } from "../task/taskSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function SubTaskDialog({ task }) {
  const [open, setOpen] = React.useState(false);

  const { content, id } = task;

  const { id: currentProjectId } = useParams();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function createNewTask(name) {
    dispatch(
      createSubTask({ projectId: currentProjectId, parentId: id, name })
    );
  }

  return (
    <>
      <Button
        onClick={handleClickOpen}
        sx={{ flexGrow: 1, border: "none" }}
      ></Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {content}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ minHeight: "350px" }}>
          <Typography gutterBottom variant="h6" marginBottom={2}>
            Add Sub-Task
          </Typography>

          <AddItem
            createItem={createNewTask}
            itemName="SubTask"
            btnText="Add SubTask"
          />
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={handleClose}>
            Save changes
          </Button> */}
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
