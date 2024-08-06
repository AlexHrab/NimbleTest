import css from "./ContactInput.module.css";
import { addTag, fetchContact } from "../../ApiFunctions";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "../Button/Button";

export function ContactInput({ setContactInfo, contactId }) {
  const [data, setData] = useState({ id: "", contactData: [] });
  const [isSubmiting, setIsSubmiting] = useState(false);
  console.log(isSubmiting);

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
      alert("Please enter search term!");
      return;
    }
    const tags = value.split(/[,;.\s]+/).filter((tag) => tag.trim() !== "");
    setData({ id: contactId, contactData: tags });
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
        autoFocus
        placeholder="Add tag"
      />

      <Button type={"submit"} credentionals={"Add Tag"} clasName={"inputBtn"} />
    </form>
  );
}
