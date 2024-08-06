import css from "./Contact.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { fetchContact } from "../../ApiFunctions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ContactInput } from "../../Components/Input/ContactInput";
import clsx from "clsx";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";

export function Contact({
  properties,
  contactId,
  setContactId,
  setContactInfo,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const thisLocation = location.pathname === "/" ? true : false;
  const wrapper = clsx(css.wrapper, !thisLocation && css.infoWrapper);
  const image = clsx(css.image, !thisLocation && css.infoImage);
  const box = clsx(css.box, !thisLocation && css.infoBox);
  const item = clsx(css.item, !thisLocation && css.infoItem);
  const { id } = useParams();
  contactId = id;
  const [Loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const [contactTag, setConactTag] = useState("");

  function onClickDelete(e) {
    e.stopPropagation();
    setContactId(properties.id);
  }

  function onClickContactInfo(id) {
    navigate(`/contact/${id}`);
    setContactId(id);
  }

  function tagOnClick(tag) {
    setActive(true);
    setConactTag(tag);
  }

  useEffect(() => {
    if (contactId) {
      async function contactFetch() {
        try {
          const result = await fetchContact(contactId);
          setContactInfo(result.resources[0]);
          setContactId("");
        } catch (error) {
          alert(error.message);
        } finally {
          setLoading(false);
        }
      }
      contactFetch();
    }
  }, [contactId]);

  if (!thisLocation && Loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <li
        className={box}
        onClick={
          thisLocation ? () => onClickContactInfo(properties.id) : undefined
        }
      >
        {!thisLocation && active && (
          <div className={css.backdrop}>
            <div className={css.modal}>
              <AiOutlineCloseCircle
                className={css.modalIcon}
                onClick={() => setActive(false)}
              />
              <p>{contactTag}</p>
            </div>
          </div>
        )}
        {thisLocation && (
          <AiOutlineCloseCircle className={css.icon} onClick={onClickDelete} />
        )}
        <div className={wrapper}>
          <div className={css.imageNameAndEmail}>
            <img
              className={image}
              src={properties?.avatar_url}
              alt={properties?.fields["last name"]}
            />
            <div className={css.nameAndEmail}>
              <div className={css.name}>
                <p>{properties?.fields["last name"]?.[0].value.trim()}</p>&nbsp;
                <p>{properties?.fields["first name"]?.[0].value.trim()}</p>
              </div>
              <p className={css.email}>{properties?.fields.email?.[0].value}</p>

              {!thisLocation && <h3 className={css.tagsTitle}>Tags</h3>}
              <ul className={css.list}>
                {properties?.tags.length !== 0 ? (
                  properties?.tags.map((el) => (
                    <li
                      key={nanoid()}
                      className={item}
                      onClick={() => tagOnClick(el.tag)}
                    >
                      <p>tag</p>
                    </li>
                  ))
                ) : (
                  <li className={item}>
                    <p>This contact has no tags</p>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {!thisLocation && (
            <ContactInput
              setContactInfo={setContactInfo}
              contactId={contactId}
            />
          )}
        </div>
      </li>
    </>
  );
}
