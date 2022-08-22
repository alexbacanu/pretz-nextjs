import { LockClosedIcon } from "@heroicons/react/solid";
import { ChangeEvent, FormEvent, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../lib/atoms/authModalAtom";
import { auth } from "../../../lib/firebase/clientApp";

interface Props {}

const ViewSignUp: React.FC<Props> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [createUserWithEmailAndPassword, , , userError] = useCreateUserWithEmailAndPassword(auth);
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  // Firebase logic
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (error) setError("");

    if (signUpForm.password !== signUpForm.confirmPassword) {
      // setError
      setError("Passwords do not match");
      return;
    }
    // Passwords match
    toast.promise(createUserWithEmailAndPassword(signUpForm.email, signUpForm.password), {
      loading: "Signing up...",
      success: <b>Signed up!</b>,
      error: <b>Could not sign up.</b>,
    });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
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
          className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
          className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Password"
          onChange={onChange}
        />

        {/* Confirm password */}
        <label htmlFor="confirmPassword" className="sr-only">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="current-password"
          required
          className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Confirm password"
          onChange={onChange}
        />
      </div>

      {/* Error: Passwords do not match */}
      {(error || userError) && (
        <p className="text-sm text-center text-red-600 transition-all transform">
          {error || userError?.message}
        </p>
      )}

      {/* Button: Sign up */}
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
        Sign up
      </button>

      {/* P: Existing account */}
      <p className="mt-2 text-sm text-center text-gray-600">
        Already have an account? Then{" "}
        <a
          className="font-medium text-indigo-600 cursor-pointer hover:text-indigo-500"
          onClick={() => setAuthModalState((prev) => ({ ...prev, view: "login" }))}
        >
          Log in
        </a>
      </p>
    </form>
  );
};
export default ViewSignUp;
