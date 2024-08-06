import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import css from "./ContactForm.module.css";
import { useEffect, useState } from "react";
import { createContact, getContactsList } from "../../ApiFunctions";
import { Button } from "../Button/Button";

const SignupSchema = yup.object().shape({
  FirstName: yup.string().trim().min(3, "Too Short!").max(20, "Too Long!"),
  LastName: yup.string().trim().min(3, "Too Short!").max(20, "Too Long!"),
  Email: yup
    .string()
    .email("Invalid email")
    .required("email is Required")
    .trim()
    .min(10, "Too Short!")
    .max(40, "Too Long!"),

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
          alert("Contact successfully created");
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
      <h2>Create Contact</h2>
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
              <ErrorMessage
                className={css.error}
                name="FirstName"
                component="span"
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
              <ErrorMessage
                className={css.error}
                name="LastName"
                component="span"
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
            <Button
              type={"submit"}
              credentionals={"Add Contact"}
              clasName={"btn"}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
