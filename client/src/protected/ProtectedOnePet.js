import WithAuth from '../utils/WithAuth';
import OnePet from '../components/OnePet';

const ProtectedOnePet = WithAuth(OnePet);

export default ProtectedOnePet;
