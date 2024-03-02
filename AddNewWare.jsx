import { useState } from "react";
import axios from "axios";
import "../Wares/wares.css";

export default function AddNewWare({ onAdd, userId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [showError, setShowError] = useState(false);
  const handleAddNewWare = () => {
    if (title === "" || description === "" || date === "") {
      setShowError(true);
      return;
    }
    addNewWares();
    onAdd({ title, description, date });
    clearForm();
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setShowError(false);
  };

  const MAX_LENGTH = 250;
  const handleChange = (newDescription) => {
    setDescription(newDescription);
  };

  const addNewWares = async () => {
    try {
      const { data } = await axios.post("http://localhost:8000/wares", {
        title: title,
        description: description,
        date: date,
        user_id: userId,
      });
      console.log("Response data:", data);
      onAdd(data);
      clearForm();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="wares-add-new-ware-wrapper">
      <h2>Add New Ware</h2>
      <div className="wares-inputs-wrapper">
        <input
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          style={{
            border: "solid",
            borderRadius: "5px",
          }}
        ></input>
        <textarea
          placeholder="Description"
          value={description}
          rows={5}
          onChange={(e) => handleChange(e.target.value)}
          style={{
            border: description.length > MAX_LENGTH ? "2px solid Red" : "solid",
            borderRadius: "5px",
          }}
        ></textarea>
        <div className="remaining-wrapper">
          Remaining: {MAX_LENGTH - description.length}
        </div>
        <input
          placeholder="Date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          style={{
            border: "solid",
            borderRadius: "5px",
          }}
        ></input>
        <button
          disabled={description.length > MAX_LENGTH}
          onClick={handleAddNewWare}
          style={{
            border: "solid",
            borderRadius: "5px",
          }}
        >
          Add
        </button>
        {showError && (
          <div className="wares-error-message">PLEASE FILL ALL THE FIELDS!</div>
        )}
      </div>
    </div>
  );
}
