import WithAuth from '../utils/WithAuth';
import EditPet from '../components/EditPet';

const ProtectedEditPet = WithAuth(EditPet);

export default ProtectedEditPet;
