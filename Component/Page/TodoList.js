import { Grid } from "@mui/material";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../Add/Loading";
import { db } from "../Database/Firebase";
import TodoItem from "./TodoItem";
import empty from "../../public/empty.svg";

const TodoList = () => {
  const [firebaseData, setFirebaseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.info);

  useEffect(() => {
    setLoading(true);
    const connectingFirebase = collection(db, "todo");
    const listByTime = query(
      connectingFirebase,
      orderBy("timestamp", "desc"),
      where("email", "==", userData.email)
    );

    const todoFirebaseData = onSnapshot(listByTime, (snapshot) => {
      setFirebaseData(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp?.toDate().getTime(),
        }))
      );
      setLoading(false);
    });

    return todoFirebaseData;
  }, [userData]);
  if (firebaseData.length === 0 && !loading) {
    return (
      <>
        <Image
          src={empty}
          alt="empty"
          layout="responsive"
          width={300}
          height={175}
          priority
        />
        <h3 style={{ color: "white", textAlign: "center" }}>No Data Found</h3>
      </>
    );
  }
  return (
    <div>
      {loading ? (
        <Loading
          type={"spinningBubbles"}
          color={"white"}
          height={"5%"}
          width={"10%"}
          style={{ minHeight: "10px" }}
        />
      ) : (
        <Grid container spacing={3} direction={"column"} columns={3}>
          {firebaseData.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              timestamp={todo.timestamp}
              complete={todo.complete}
              detail={todo.detail}
            />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default TodoList;
