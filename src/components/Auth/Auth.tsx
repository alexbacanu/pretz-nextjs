import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { authModalState } from "../../lib/atoms/authModalAtom";
import { auth } from "../../lib/firebase/clientApp";
import AuthInputs from "./AuthInputs";
import AuthProviders from "./AuthProviders";
import ViewReset from "./Views/ViewReset";

interface Props {}

const Auth: React.FC<Props> = () => {
  const [user] = useAuthState(auth);
  const [modalState, setModalState] = useRecoilState(authModalState);

  const handleClose = useCallback(() => {
    setModalState((prev) => ({ ...prev, open: false }));
  }, [setModalState]);

  const toggleView = (view: string) => {
    setModalState({
      ...modalState,
      view: view as typeof modalState.view,
    });
  };

  useEffect(() => {
    if (user) handleClose();
  }, [handleClose, user]);

  return (
    <Transition appear show={modalState.open} as={Fragment}>
      <Dialog as="div" onClose={handleClose}>
        {/* Background fade */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        {/* Modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                {/* Title */}
                <Dialog.Title
                  as="h2"
                  className="my-2 text-3xl font-extrabold text-center text-gray-900"
                >
                  {modalState.view === "login" && "Sign in to your account"}
                  {modalState.view === "signup" && "Sign up"}
                  {modalState.view === "resetPassword" && "Reset password"}
                </Dialog.Title>

                {/* Body */}
                {modalState.view === "login" || modalState.view === "signup" ? (
                  <>
                    {/* P: Agreement */}
                    <p className="my-2 text-sm text-center text-gray-600">
                      By continuing you agree with the{" "}
                      <a className="font-medium text-indigo-600 cursor-pointer hover:text-indigo-500">
                        Terms and Conditions
                      </a>
                    </p>

                    {/* Auth Providers */}
                    <AuthProviders />

                    {/* Auth Inputs */}
                    <AuthInputs />
                  </>
                ) : (
                  <>
                    {/* Password reset */}
                    <ViewReset {...toggleView} />
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default Auth;
