import { useRecoilState } from "recoil";
import { authModalState } from "../../lib/atoms/authModalAtom";
import ViewLogin from "./Views/ViewLogin";
import ViewSignUp from "./Views/ViewSignUp";

interface Props {}

const AuthInputs: React.FC<Props> = () => {
  const [modalState] = useRecoilState(authModalState);

  return (
    <>
      {/* Or continue with text */}
      <div className="relative flex items-center my-2">
        <div className="flex-grow border-t border-gray-400" />
        <span className="flex-shrink mx-4 text-sm text-gray-400">Or continue with</span>
        <div className="flex-grow border-t border-gray-400" />
      </div>

      {/* Inputs for email and password */}
      <div className="my-2">
        {modalState.view === "login" && <ViewLogin />}
        {modalState.view === "signup" && <ViewSignUp />}
      </div>
    </>
  );
};
export default AuthInputs;
