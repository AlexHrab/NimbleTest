import { useState } from "react";
import { useEffect } from "react";
import { getContactsList } from "../../ApiFunctions";
import { ContactList } from "../../Components/ContactsList/ContactList";
import { ContactForm } from "../../Components/Form/ContactForm";
import css from "./Home.module.css";

export function Home() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function getList() {
      try {
        const result = await getContactsList();
        setContacts(result.resources);
      } catch (error) {
        alert(error.message);
      }
    }
    getList();
  }, []);

  return (
    <div className={css.wrapper}>
      <ContactForm setContacts={setContacts} />
      <ContactList contacts={contacts} setContacts={setContacts} />
    </div>
  );
}
