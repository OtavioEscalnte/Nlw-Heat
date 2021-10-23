import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { api } from "../../services/api";
import logoImg from "../../assets/logo.svg";

import styles from "./styles.module.scss";

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

const messagesQueue: Message[] = [];

const socket = io("http://localhost:4000");

socket.on("new_message", (newMessage: Message) => {
  messagesQueue.push(newMessage);
});

export function MessageLIst() {
  // Ira armazenar um array de mensagens
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages((prevState) =>
          [messagesQueue[0], prevState[0], prevState[1]].filter(Boolean)
        );
        messagesQueue.shift();
      }
    }, 3000);
  }, []);

  useEffect(() => {
    // chamada para api
    api.get<Message[]>("messages/last3").then((response) => {
      setMessages(response.data);
    });
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DowWhile 2021" />

      <ul className={styles.messageList}>
        {messages.map((messages) => {
          return (
            <li key={messages.id} className={styles.message}>
              <p className={styles.messageContent}>{messages.text}</p>
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img
                    src={messages.user.avatar_url}
                    alt={messages.user.name}
                  />
                </div>
                <span>{messages.user.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
