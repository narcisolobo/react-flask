import { useEffect, useState } from 'react';
import { getOnePet } from '../services/pet-service';
import { useParams } from 'react-router-dom';

function OnePet() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    getOnePet(id)
      .then((data) => setPet(data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    pet && (
      <>
        <h1 className="display-1 mb-3">{pet.name}</h1>
        <div className="card shadow">
          <div className="card-body">
            <p className="card-text">
              {pet.name} is a {pet.is_derpy ? 'derpy' : 'serious'} {pet.type}{' '}
              born on {pet.birthday}.
            </p>
          </div>
        </div>
      </>
    )
  );
}

export default OnePet;
