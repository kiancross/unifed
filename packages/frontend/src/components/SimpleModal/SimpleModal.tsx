import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

function getModalStyle() {
  return {
    transform: `translate(${50}vh, ${20}vh)`,
  };
}

const useStyles = makeStyles(() => ({
  paper: {
    // backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    position: "absolute",
    width: 400,
  },
}));

interface ModalProps {
  body: JSX.Element;
}

function SimpleModal(props: ModalProps): JSX.Element {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const body = (
  //   <div style={modalStyle} className={classes.paper}>
  //     <h2 id="simple-modal-title">Text in a modal</h2>
  //     <p id="simple-modal-description">
  //       Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
  //     </p>
  //     <CreateCommunityModal />
  //   </div>
  // );

  return (
    <div>
      <IconButton onClick={handleOpen} color="inherit">
        <AddIcon />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          {props.body}
        </div>
      </Modal>
    </div>
  );
}

export default SimpleModal;
