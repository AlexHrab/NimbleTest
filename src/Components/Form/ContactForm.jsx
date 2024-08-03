import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import css from "./ContactForm.module.css";
import { useEffect, useState } from "react";
import { createContact, getContactsList } from "../../ApiFunctions";

const SignupSchema = yup.object().shape({
  FirstName: yup.string(),
  LastName: yup.string(),
  Email: yup.string().email("Invalid email").required("email is Required"),

  customFieldCheck: yup
    .string()
    .test(
      "either-firstname-or-lastname",
      "FirstName or LastName is required",
      function (value) {
        const { FirstName, LastName } = this.parent;

        return (
          (FirstName && FirstName.trim() !== "") ||
          (LastName && LastName.trim() !== "")
        );
      }
    ),
});

export function ContactForm({ setContacts }) {
  const [contactData, setContactData] = useState();

  useEffect(() => {
    if (contactData) {
      async function createNewContact() {
        try {
          await createContact(contactData);
          const result = await getContactsList();
          setContacts(result.resources);
        } catch (error) {
          alert(error.message);
        }
      }
      createNewContact();
    }
  }, [contactData]);

  const values = {
    FirstName: "",
    LastName: "",
    Email: "",
  };

  function submit(data, actions) {
    setContactData(data);
    actions.resetForm();
  }

  return (
    <div className={css.inputBlock}>
      <h3>Create Contact</h3>
      <Formik
        initialValues={values}
        onSubmit={submit}
        validationSchema={SignupSchema}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <div className={css.inputBlock}>
              <label htmlFor="FirstName" className={css.label}>
                First Name
              </label>
              <Field
                className={css.input}
                id="FirstName"
                name="FirstName"
                placeholder="Please enter a First Name"
              />
              {errors.customFieldCheck && (
                <span className={css.error}>{errors.customFieldCheck}</span>
              )}
            </div>

            <div className={css.inputBlock}>
              <label htmlFor="LastName" className={css.label}>
                Last Name
              </label>
              <Field
                className={css.input}
                id="LastName"
                name="LastName"
                placeholder="Please enter a Last Name"
                type="text"
              />
              {errors.customFieldCheck && (
                <span className={css.error}>{errors.customFieldCheck}</span>
              )}
            </div>

            <div className={css.inputBlock}>
              <label htmlFor="Email" className={css.label}>
                Email
              </label>
              <Field
                className={css.input}
                id="Email"
                name="Email"
                placeholder="Please enter an Email"
                type="text"
              />
              <ErrorMessage
                className={css.error}
                name="Email"
                component="span"
              />
            </div>

            <button type="submit" className={css.btn}>
              Add Contact
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
