import Image from "next/future/image";
import Link from "next/link";
import { Button, Dropdown, Menu, Navbar } from "react-daisyui";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import honestpriceLogo from "../../../public/honestpriceLogo.svg";
import { authModalState } from "../../lib/atoms/authModalAtom";
import { auth } from "../../lib/clients/firebaseClient";
import Auth from "../Auth/Auth";

interface Props {}

const navigation = [
  { name: "Products", href: "/products", current: true },
  { name: "Deals", href: "#", current: false },
  { name: "Download", href: "#", current: false },
];

const userNavigation = [
  { name: "Your Profile", href: "#", onClick: () => {} },
  { name: "Settings", href: "#", onClick: () => {} },
  { name: "Sign out", href: "#", onClick: () => {} },
];

const Header: React.FC = (props: Props) => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <Navbar className="shadow-md bg-primary-content">
      {/* Mobile hamburger */}

      {/* Logo */}
      <div className="flex-shrink-0 hidden px-2 md:flex">
        <Link href="/">
          <a>
            <Image src={honestpriceLogo} alt="HonestPrice Logo" className="h-10" />
          </a>
        </Link>
      </div>

      {/* Menu */}
      <Menu horizontal className="hidden h-10 p-2 menu rounded-box lg:flex">
        {navigation.map((item) => (
          <Menu.Item key={item.name} className="rounded-btn">
            <Link href={item.href}>
              <a>{item.name}</a>
            </Link>
          </Menu.Item>
        ))}
      </Menu>

      {/* Button */}

      {/* Search */}
      <div className="flex-1">{/* <Search /> */}</div>

      {/* Profile & Auth buttons */}
      {user ? (
        <Dropdown vertical="end">
          {/* Profile icon */}
          <Button color="ghost" className="mx-2 avatar" shape="circle">
            <div className="w-10 rounded-full">
              <Image
                src={
                  user.photoURL
                    ? (user.photoURL as string)
                    : "https://api.lorem.space/image/face?hash=33791"
                }
                alt="User profile image"
                width={40}
                height={40}
              />
            </div>
          </Button>

          {/* Profile dropdown */}
          <Dropdown.Menu className="w-40 mt-1 menu-compact">
            {userNavigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <Dropdown.Item>{item.name}</Dropdown.Item>
              </Link>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <>
          {/* Auth login */}
          <Button
            key="login"
            color="ghost"
            className="ml-4 border-gray-300 border-1"
            onClick={() =>
              setAuthModalState({
                open: true,
                view: "login",
              })
            }
          >
            Login
          </Button>

          {/* Auth signup */}
          <Button
            key="signup"
            color="accent"
            className="mx-2"
            onClick={() =>
              setAuthModalState({
                open: true,
                view: "signup",
              })
            }
          >
            Sign up
          </Button>
        </>
      )}
      <Auth />
    </Navbar>
  );
};

export default Header;
