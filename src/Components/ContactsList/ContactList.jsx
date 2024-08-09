import { Contact } from "../../Pages/Contact/Contact";
import css from "./ContactList.module.css";

export function ContactList({
  contacts,
  setContacts,
  contactId,
  setContactId,
  contactInfo,
  setContactInfo,
}) {
  return (
    <div className={css.box}>
      <h2>Contacts</h2>
      <ul className={css.list}>
        {contacts.length !== 0 ? (
          contacts.map((el) => (
            <Contact
              key={el.id}
              properties={el}
              setContacts={setContacts}
              contactId={contactId}
              setContactId={setContactId}
              contactInfo={contactInfo}
              setContactInfo={setContactInfo}
            />
          ))
        ) : (
          <p className={css.noContacts}>There are no contacts</p>
        )}
      </ul>
    </div>
  );
}
