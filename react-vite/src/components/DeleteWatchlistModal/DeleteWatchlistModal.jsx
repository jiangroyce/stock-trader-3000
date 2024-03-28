import { useState } from "react";
import { createWatchlist } from "../../redux/watchlist";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteWatchlistModal.css";

function DeleteWatchlistModal({watchlist}) {
  const dispatch = useDispatch();
  const [name, setName] = useState(watchlist.name);
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
        <h1>Are you sure you want to delete "{watchlist?.name}"?</h1>
        <h2>If you delete, this list and its {watchlist?.stocks?.length} items will be gone forever</h2>
        <button>Delete {watchlist?.name}</button>
    </>
  );
}

export default DeleteWatchlistModal;
