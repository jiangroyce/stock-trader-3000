import { deleteWatchlist } from "../../redux/watchlist";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useModal } from "../../context/Modal";
import "./DeleteWatchlistModal.css";

function DeleteWatchlistModal({watchlist}) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({})
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await dispatch(deleteWatchlist(watchlist.list_number));

    if (response?.errors) setErrors(response.errors);
    else closeModal();
  };

  return (
    <>
        <h1>Are you sure you want to delete &quot;{watchlist?.name}&quot;?</h1>
        <h2>If you delete, this list and its {watchlist?.stocks?.length} items will be gone forever</h2>
        <button onClick={handleSubmit}>Delete {watchlist?.name}</button>
        {errors && errors["404"] && <p>{"Cannot create/edit/delete Default lists"}</p>}
        {/* : Object.entries(errors).map(([key, error]) => (<p>{key} : {error}</p>)) */}
    </>
  );
}

export default DeleteWatchlistModal;
