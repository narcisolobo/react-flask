import WithAuth from '../utils/WithAuth';
import NewPet from '../components/NewPet';

const ProtectedNewPet = WithAuth(NewPet);

export default ProtectedNewPet;
