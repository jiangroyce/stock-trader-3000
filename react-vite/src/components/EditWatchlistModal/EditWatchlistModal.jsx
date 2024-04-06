import { useState } from "react";
import { putWatchlist } from "../../redux/watchlist";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./EditWatchlistModal.css";

function EditWatchlistModal({watchlist}) {
  const dispatch = useDispatch();
  const [name, setName] = useState(watchlist.name);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await dispatch(putWatchlist({name, "list_number": watchlist.list_number}));

    if (response?.errors) {
      setErrors(response.errors)
    } else closeModal();
  };

  return (
    <div className="login-modal">
      <h1>Edit Watchlist</h1>
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
        <div className="actions">
          <button type="reset">Cancel</button>
          <button type="submit">Confirm</button>
        </div>
      </form>
    </div>
  );
}

export default EditWatchlistModal;
