import { useState } from "react";
import { createScreener } from "../../redux/screener";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";

function CreateScreenerModal({params}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await dispatch(createScreener({name, params: JSON.stringify(params)}));

    if (response?.errors) {
      setErrors(response.errors)
    } else {
        closeModal();
        navigate(`/screener?id=${response.id}`)
    }
  };

  return (
    <div className="login-modal">
      <h1>Create Screener</h1>
      <form onSubmit={handleSubmit} onReset={()=>closeModal()}>
        <label>
          Screener name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.name && <p>{errors.name}</p>}
        <div className="params">
            Parameters:
            {Object.entries(params).map(([key, value], index) => (
                <div key={index}>{key}: {value}</div>
            ))}
        </div>
        {errors.params && <p>{errors.params}</p>}
        <div className="actions">
          <button type="reset">Cancel</button>
          <button type="submit">Create Screener</button>
        </div>
      </form>
    </div>
  );
}

export default CreateScreenerModal;
