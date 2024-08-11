import css from "./ContactInput.module.css";
import { addTag, fetchContact } from "../../ApiFunctions";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "../Button/Button";

export function ContactInput({ setContactInfo, contactId, properties }) {
  const allTags = properties?.tags2;
  console.log(allTags);
  const [data, setData] = useState({ id: "", contactData: [...allTags] });
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [actionType, setActionType] = useState("");

  useEffect(() => {
    if (isSubmiting) {
      async function tagAdd() {
        try {
          await addTag(data);
          const result = await fetchContact(contactId);
          setContactInfo(result.resources[0]);
        } catch (error) {
          alert(error.message);
        } finally {
          setIsSubmiting(false);
        }
      }
      tagAdd();
    }
  }, [isSubmiting]);

  function Submit(evt) {
    evt.preventDefault();
    const form = evt.target;
    const value = form.elements.input.value;
    if (form.elements.input.value.trim() === "") {
      alert("Please enter tags");
      return;
    }
    const tags = value.split(/[,;.\s]+/).filter((tag) => tag.trim() !== "");
    const updatedTags = [...data.contactData, ...tags];

    setData({
      id: contactId,
      contactData: actionType !== "add" ? tags : updatedTags,
    });

    setIsSubmiting(true);
    form.reset();
  }

  return (
    <form onSubmit={Submit} className={css.form}>
      <input
        className={css.input}
        name="input"
        type="text"
        autoComplete="off"
        placeholder="Add tag"
      />

      <Button
        type={"submit"}
        credentionals={"Add Tag"}
        clasName={"inputBtn"}
        onClick={() => setActionType("add")}
      />
      <Button
        type={"submit"}
        credentionals={"Update tags"}
        clasName={"inputBtn"}
        onClick={() => setActionType("update")}
      />
    </form>
  );
}
