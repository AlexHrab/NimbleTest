import { Contact } from "../../Pages/Contact/Contact";
import css from "./ContactList.module.css";

export function ContactList({ contacts, setContacts }) {
  return (
    <>
      <h3>Contacts</h3>
      <ul className={css.list}>
        {contacts.map((el) => (
          <Contact key={el.id} properties={el} setContacts={setContacts} />
        ))}
      </ul>
    </>
  );
}
