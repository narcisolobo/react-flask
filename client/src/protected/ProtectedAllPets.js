import WithAuth from '../utils/WithAuth';
import AllPets from '../components/AllPets';

const ProtectedAllPets = WithAuth(AllPets);

export default ProtectedAllPets;
