import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./Pages/Home/Home";
import { Contact } from "./Pages/Contact/Contact";

function App() {
  const [contactId, setContactId] = useState("");
  const [contactInfo, setContactInfo] = useState();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              contactId={contactId}
              setContactId={setContactId}
              contactInfo={contactInfo}
              setContactInfo={setContactInfo}
            />
          }
        />
        <Route
          path="contact/:id"
          element={
            <Contact
              contactId={contactId}
              setContactId={setContactId}
              properties={contactInfo}
              setContactInfo={setContactInfo}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
