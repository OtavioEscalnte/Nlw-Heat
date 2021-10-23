import { useContext } from "react";
import styles from "./App.module.scss";
import { AuthContext } from "./components/contexts/auth";
import { LoginBox } from "./components/LoginBox";
import { MessageLIst } from "./components/MessageList";
import { SendMessageForm } from "./components/SendeMessageForm";

export function App() {
  const { user } = useContext(AuthContext);

  return (
    <main
      className={`${styles.contentWrapper} ${
        !!user ? styles.contentSigned : ""
      }`}
    >
      <MessageLIst />
      {!!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  );
}
