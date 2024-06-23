import { useEffect, useState } from 'react';
import { convertDate } from '../utils/date-utils';
import { editPet } from '../services/pet-service';
import { useNavigate, useParams } from 'react-router-dom';
import { getOnePet } from '../services/pet-service';

function EditPet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState({
    name: '',
    type: '',
    birthday: '',
    is_derpy: '',
  });
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    getOnePet(id)
      .then((data) => {
        setPet(data);
        return data;
      })
      .then((data) =>
        setPet((prev) => ({
          ...prev,
          birthday: convertDate(data.birthday),
          is_derpy: data.is_derpy.toString(),
        }))
      )
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setPet((prev) => ({ ...prev, is_derpy: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editPet(id, pet)
      .then(() => navigate(`/pets/${id}`))
      .catch((err) => setErrors(err.response.data));
  };

  return (
    <>
      <h1 className="display-1 mb-3">Edit a Pet</h1>
      <div className="card shadow">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                value={pet.name}
                onChange={handleChange}
                placeholder="Pet name:"
              />
              <label htmlFor="name">Pet name:</label>
              {errors?.name && (
                <p className="form-text text-danger">{errors.name}</p>
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                name="type"
                id="type"
                className="form-control"
                value={pet.type}
                onChange={handleChange}
                placeholder="Pet type:"
              />
              <label htmlFor="type">Pet type:</label>
              {errors?.type && (
                <p className="form-text text-danger">{errors.type}</p>
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                type="date"
                name="birthday"
                id="birthday"
                className="form-control"
                value={pet.birthday}
                onChange={handleChange}
                placeholder="Pet birthday:"
              />
              <label htmlFor="birthday">Pet birthday:</label>
              {errors?.birthday && (
                <p className="form-text text-danger">{errors.birthday}</p>
              )}
            </div>
            <div className="mb-3">
              <fieldset>
                <legend className="fs-6">Is your pet derpy?</legend>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="is_derpy"
                    id="yes"
                    checked={pet.is_derpy === '1'}
                    value={'1'}
                    onChange={handleRadioChange}
                  />
                  <label className="form-check-label" htmlFor="yes">
                    Yes
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="is_derpy"
                    id="no"
                    checked={pet.is_derpy === '0'}
                    value={'0'}
                    onChange={handleRadioChange}
                  />
                  <label className="form-check-label" htmlFor="no">
                    No
                  </label>
                </div>
                {errors?.is_derpy && (
                  <p className="form-text text-danger">{errors.is_derpy}</p>
                )}
              </fieldset>
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-primary">
                Edit pet
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditPet;
