import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { businessCategories, scienceCategories } from "../data/categories.js";
import "../styles/Registration.css";
import useScrollReveal from "../hooks/useScrollReveal";

const EASE = [0.22, 1, 0.36, 1];

const emptyValues = {
  fullName: "",
  email: "",
  contact: "",
  school: "",
  grade: "",
  main: "",
  subcategories: [],
};

const categoryLists = {
  science: scienceCategories,
  business: businessCategories,
};

function validate(values) {
  const errors = {};
  const name = values.fullName.trim();
  const email = values.email.trim();
  const digits = values.contact.replace(/\D/g, "");

  if (!name) errors.fullName = "Enter the student's full name.";
  else if (name.length < 2) errors.fullName = "Enter the full name.";

  if (!email) errors.email = "Enter an email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.contact.trim()) errors.contact = "Enter a contact number.";
  else if (digits.length < 7 || digits.length > 15) {
    errors.contact = "Enter a valid contact number.";
  }

  if (!values.school.trim()) errors.school = "Enter the school name.";
  if (!values.grade.trim()) errors.grade = "Enter the class or grade.";
  if (!values.main) errors.main = "Select Science or Business.";
  else if (values.subcategories.length === 0) {
    errors.subcategories = "Select at least one category.";
  }

  return errors;
}

function Field({ id, label, type, value, onChange, error, autoComplete, inputMode }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-required="true"
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={onChange}
      />
      {error ? (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function Registration() {
  useScrollReveal();

  const [values, setValues] = useState(emptyValues);
  const [attempted, setAttempted] = useState(false);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    document.title = "Registration — SciBiz";
  }, []);

  const errors = attempted ? validate(values) : {};
  const subcategories = values.main ? categoryLists[values.main] : [];

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function chooseMain(main) {
    setValues((current) => ({
      ...current,
      main,
      subcategories: current.main === main ? current.subcategories : [],
    }));
  }

  function toggleSubcategory(id) {
    setValues((current) => {
      const selected = current.subcategories.includes(id);
      return {
        ...current,
        subcategories: selected
          ? current.subcategories.filter((item) => item !== id)
          : [...current.subcategories, id],
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setAttempted(true);
    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0];
      document.getElementById(first)?.focus();
      return;
    }

    setReceipt({
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      contact: values.contact.trim(),
      school: values.school.trim(),
      grade: values.grade.trim(),
      main: values.main,
      subcategories: values.subcategories,
    });
  }

  function reset() {
    setValues(emptyValues);
    setAttempted(false);
    setReceipt(null);
  }

  if (receipt) {
    const pool = categoryLists[receipt.main];
    const chosen = receipt.subcategories.map(
      (id) => pool.find((item) => item.id === id)?.name ?? id,
    );

    return (
      <main className="registration-page">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <h1>Registration received</h1>
          <p className="lede">
            {receipt.fullName}&apos;s registration is saved in this browser
            only. Nothing has been sent to a server.
          </p>
          <dl className="receipt">
            <div>
              <dt>Email</dt>
              <dd>{receipt.email}</dd>
            </div>
            <div>
              <dt>Contact number</dt>
              <dd>{receipt.contact}</dd>
            </div>
            <div>
              <dt>School</dt>
              <dd>{receipt.school}</dd>
            </div>
            <div>
              <dt>Class / grade</dt>
              <dd>{receipt.grade}</dd>
            </div>
            <div>
              <dt>Main category</dt>
              <dd>{receipt.main === "science" ? "Science" : "Business"}</dd>
            </div>
            <div>
              <dt>Subcategories</dt>
              <dd>{chosen.join(", ")}</dd>
            </div>
          </dl>
          <button type="button" className="btn btn-solid" onClick={reset}>
            Submit another registration
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="registration-page">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: EASE }}
      >
        Registration
      </motion.h1>
      <motion.p
        className="lede"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, delay: 0.06, ease: EASE }}
      >
        Enter the student&apos;s details, choose Science or Business, then
        select one or more subcategories.
      </motion.p>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <Field
          id="fullName"
          label="Full name"
          type="text"
          value={values.fullName}
          autoComplete="name"
          error={errors.fullName}
          onChange={(event) => update("fullName", event.target.value)}
        />
        <Field
          id="email"
          label="Email address"
          type="email"
          value={values.email}
          autoComplete="email"
          inputMode="email"
          error={errors.email}
          onChange={(event) => update("email", event.target.value)}
        />
        <Field
          id="contact"
          label="Contact number"
          type="tel"
          value={values.contact}
          autoComplete="tel"
          inputMode="tel"
          error={errors.contact}
          onChange={(event) => update("contact", event.target.value)}
        />
        <Field
          id="school"
          label="School name"
          type="text"
          value={values.school}
          autoComplete="organization"
          error={errors.school}
          onChange={(event) => update("school", event.target.value)}
        />
        <Field
          id="grade"
          label="Class / grade"
          type="text"
          value={values.grade}
          autoComplete="off"
          error={errors.grade}
          onChange={(event) => update("grade", event.target.value)}
        />

        <fieldset className="choice-field">
          <legend>Main category</legend>
          <div
            id="main"
            className="choice-row"
            role="radiogroup"
            aria-required="true"
            aria-invalid={errors.main ? "true" : "false"}
            aria-describedby={errors.main ? "main-error" : undefined}
            tabIndex={-1}
          >
            <button
              type="button"
              role="radio"
              aria-checked={values.main === "science"}
              className={values.main === "science" ? "choice is-selected" : "choice"}
              onClick={() => chooseMain("science")}
            >
              Science
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={values.main === "business"}
              className={values.main === "business" ? "choice is-selected" : "choice"}
              onClick={() => chooseMain("business")}
            >
              Business
            </button>
          </div>
          {errors.main ? (
            <p id="main-error" className="field-error" role="alert">
              {errors.main}
            </p>
          ) : null}
        </fieldset>

        <AnimatePresence mode="wait" initial={false}>
          {values.main ? (
            <motion.fieldset
              key={values.main}
              className="choice-field"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <legend>Subcategories</legend>
              <ul
                id="subcategories"
                className="sub-list"
                aria-required="true"
                aria-describedby={errors.subcategories ? "subcategories-error" : undefined}
                tabIndex={-1}
              >
                {subcategories.map((category) => {
                  const checked = values.subcategories.includes(category.id);
                  return (
                    <li key={category.id}>
                      <label className="sub-option">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleSubcategory(category.id)}
                        />
                        <span>{category.name}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              {errors.subcategories ? (
                <p id="subcategories-error" className="field-error" role="alert">
                  {errors.subcategories}
                </p>
              ) : null}
            </motion.fieldset>
          ) : null}
        </AnimatePresence>

        <button type="submit" className="btn btn-solid submit-btn">
          Submit registration
        </button>
      </form>
    </main>
  );
}
