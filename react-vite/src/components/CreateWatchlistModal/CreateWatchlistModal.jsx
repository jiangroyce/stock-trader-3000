import { useState } from "react";
import { createWatchlist } from "../../redux/watchlist";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./CreateWatchlistModal.css";

function CreateWatchlistModal() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await dispatch(createWatchlist({name}));

    if (response?.errors) {
      setErrors(response.errors)
    } else closeModal();
  };

  return (
    <>
      <h1>Create Watchlist</h1>
      <form onSubmit={handleSubmit} onReset={()=>closeModal()}>
        <label>
          List name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.name && <p>{errors.name}</p>}
        <button type="reset">Cancel</button>
        <button type="submit">Create List</button>
      </form>
    </>
  );
}

export default CreateWatchlistModal;
