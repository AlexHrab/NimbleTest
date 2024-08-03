import css from "./Contact.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { deleteContact, getContactsList } from "../../ApiFunctions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Contact({ properties, setContacts }) {
  const [contactId, setContactId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (contactId) {
      async function contactDelete() {
        try {
          await deleteContact(contactId);
          const result = await getContactsList();
          setContacts(result.resources);
          setContactId("");
        } catch (error) {
          alert(error.message);
        }
      }
      contactDelete();
    }
  }, [contactId]);

  function onClick() {
    setContactId(properties.id);
  }

  function redirect() {
    navigate(`/contact/${properties.id}`);
  }

  return (
    <li className={css.box} onClick={redirect}>
      <AiOutlineCloseCircle className={css.icon} onClick={onClick} />
      <div className={css.wrapper}>
        <img
          className={css.image}
          src={properties?.avatar_url}
          alt={properties?.fields["last name"]}
        />
        <div className={css.nameAndEmail}>
          <div className={css.name}>
            <p>{properties?.fields["last name"]?.[0].value}</p>
            <p>{properties?.fields["first name"]?.[0].value}</p>
          </div>
          <p className={css.email}>{properties?.fields.email?.[0].value}</p>
        </div>
      </div>
    </li>
  );
}
