import { LockClosedIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../lib/atoms/authModalAtom";
import { auth } from "../../../lib/clients/firebaseClient";

interface Props {}

const ViewLogin: React.FC<Props> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signInWithEmailAndPassword, , , error] = useSignInWithEmailAndPassword(auth);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // Firebase logic
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.promise(signInWithEmailAndPassword(loginForm.email, loginForm.password), {
      loading: "Signing in...",
      success: <b>Signed in!</b>,
      error: <b>Could not sign in.</b>,
    });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form className="pt-4 space-y-5" action="#" onSubmit={onSubmit}>
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
          className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-20 sm:text-sm"
          placeholder="Email address"
          onChange={onChange}
        />

        {/* Password */}
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-20 sm:text-sm"
          placeholder="Password"
          onChange={onChange}
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between">
        {/* Remember me */}
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
            Remember me
          </label>
        </div>

        {/* Reset password */}
        <div className="text-sm">
          <a
            className="font-medium text-indigo-600 cursor-pointer hover:text-indigo-500"
            onClick={() =>
              setAuthModalState((prev) => ({
                ...prev,
                view: "resetPassword",
              }))
            }
          >
            Forgot your password?
          </a>
        </div>
      </div>

      {/* Error: Wrong email or password */}
      {error && (
        <p className="text-sm text-center text-red-600 transition-all transform">
          {error?.message}
        </p>
      )}

      {/* Button: Sign in */}
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
        Sign in
      </button>

      {/* P: New account */}
      <p className="my-2 text-sm text-center text-gray-600">
        New here? Then{" "}
        <a
          className="font-medium text-indigo-600 cursor-pointer hover:text-indigo-500"
          onClick={() => setAuthModalState((prev) => ({ ...prev, view: "signup" }))}
        >
          Sign up
        </a>
      </p>
    </form>
  );
};
export default ViewLogin;
