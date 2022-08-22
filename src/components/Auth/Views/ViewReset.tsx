import { LockClosedIcon } from "@heroicons/react/solid";
import { FormEvent, useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../lib/atoms/authModalAtom";
import { auth } from "../../../lib/firebase/clientApp";

interface Props {}

const ViewReset: React.FC<Props> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  // Firebase logic
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await sendPasswordResetEmail(email);
    setSuccess(true);
  };

  if (error) {
    return (
      <div>
        <p className="text-sm text-center text-red-600 transition-all transform">
          {error?.message}
        </p>
      </div>
    );
  }

  if (sending) {
    return (
      <div>
        <p className="text-sm text-center text-gray-600 transition-all transform">Loading...</p>
      </div>
    );
  }

  return (
    <form className="pt-2 space-y-5" action="#" onSubmit={onSubmit}>
      {success ? (
        <>
          {/* P: Success */}
          <p className="my-2 text-sm text-center text-gray-600">
            We&apos;ve sent you an email with a link to reset your password
          </p>
        </>
      ) : (
        <>
          {/* P: Message */}
          <p className="mx-6 text-sm text-center text-gray-600">
            Enter the email associated with your account and we&apos;ll send you a reset link
          </p>

          {/* Inputs */}
          <div className="-space-y-px rounded-md shadow-sm">
            {/* Email */}
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          {/* Button: Reset password */}
          <button
            type="submit"
            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Reset password
          </button>

          {/* Buttons */}
          <div className="flex justify-center space-x-6">
            <p className="text-sm text-center text-gray-600">
              <a
                className="font-medium text-indigo-600 cursor-pointer hover:text-indigo-500"
                onClick={() => setAuthModalState((prev) => ({ ...prev, view: "login" }))}
              >
                Log in
              </a>
            </p>

            <p className="text-sm text-center text-gray-600">
              <a
                className="font-medium text-indigo-600 cursor-pointer hover:text-indigo-500"
                onClick={() => setAuthModalState((prev) => ({ ...prev, view: "signup" }))}
              >
                Sign up
              </a>
            </p>
          </div>
        </>
      )}
    </form>
  );
};
export default ViewReset;
