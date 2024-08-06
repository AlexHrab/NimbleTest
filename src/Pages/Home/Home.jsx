import { useState } from "react";
import { useEffect } from "react";
import { getContactsList, deleteContact } from "../../ApiFunctions";
import { ContactList } from "../../Components/ContactsList/ContactList";
import { ContactForm } from "../../Components/Form/ContactForm";
import css from "./Home.module.css";

export function Home({ contactId, setContactId, contactInfo, setContactInfo }) {
  const [contacts, setContacts] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    async function getList() {
      try {
        const result = await getContactsList();
        setContacts(result.resources);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }
    getList();
  }, []);

  useEffect(() => {
    if (contactId) {
      async function contactDelete() {
        try {
          await deleteContact(contactId);
          const result = await getContactsList();
          setContacts(result.resources);
          setContactId("");
          alert("Contact successfully deleted");
        } catch (error) {
          alert(error.message);
        }
      }
      contactDelete();
    }
  }, [contactId]);

  return (
    <div className={css.wrapper}>
      {Loading && <h1>Loading...</h1>}
      {!Loading && <ContactForm setContacts={setContacts} />}
      {!Loading && (
        <ContactList
          contacts={contacts}
          setContacts={setContacts}
          contactId={contactId}
          setContactId={setContactId}
          contactInfo={contactInfo}
          setContactInfo={setContactInfo}
        />
      )}
    </div>
  );
}
