import { useEffect, useState } from 'react';
import { getAllPets, deletePet } from '../services/pet-service';
import { Link, useNavigate } from 'react-router-dom';

function AllPets() {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getAllPets()
      .then((data) => {
        setPets(data);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          console.log('Unauthorized.');
          navigate('/login?message=unauthorized');
        }
      });
  }, [loaded]);

  const handleDelete = (petId) => {
    deletePet(petId)
      .then(() => setLoaded(false))
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          console.log('Unauthorized.');
        }
      });
  };

  return (
    loaded && (
      <>
        <h1 className="display-1 mb-3">All Pets</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Name:</th>
              <th>Type:</th>
              <th>Derpiness:</th>
              <th>Actions:</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet.id}>
                <td className="align-middle">
                  <Link to={`/pets/${pet.id}`}>{pet.name}</Link>
                </td>
                <td className="align-middle">{pet.type}</td>
                <td className="align-middle">
                  {pet.is_derpy ? 'totes derpy' : 'super serious'}
                </td>
                <td className="align-middle d-flex gap-2">
                  <Link
                    to={`/pets/${pet.id}`}
                    className="btn btn-sm btn-primary">
                    view
                  </Link>
                  <Link
                    to={`/pets/${pet.id}/edit`}
                    className="btn btn-sm btn-warning">
                    edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(pet.id)}
                    className="btn btn-sm btn-danger">
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  );
}

export default AllPets;
