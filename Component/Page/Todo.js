import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TodoAlert from "../Add/TodoAlert";
import TodoFrom from "./TodoFrom";
import TodoHead from "./TodoHead";
import TodoList from "./TodoList";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Zoom from "@mui/material/Zoom";

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const Todo = (props) => {
  const [open, setOpen] = useState(false);

  const todoData = useSelector((state) => state.alert);

  useEffect(() => {
    if (todoData.message !== "") {
      setOpen(true);
    }
  }, [todoData]);
  return (
    <div>
      {open && (
        <TodoAlert
          open={open}
          msg={todoData.message}
          type={todoData.type}
          setOpen={setOpen}
        />
      )}
      <TodoHead />
      <TodoFrom />
      <Toolbar id="back-to-top-anchor" />
      <TodoList />
      <ScrollTop {...props}>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </div>
  );
};

export default Todo;
