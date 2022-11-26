import { IconBrandFacebook, IconBrandGithub, IconBrandTwitter } from "@tabler/icons";

type UIFooterProps = {};

const UIFooter = (props: UIFooterProps) => {
  return (
    <footer className="border-t border-slate-200 bg-gray-100 pb-[88px] text-slate-500 md:pb-0">
      <div className="mx-auto max-w-[1920px] justify-between space-y-6 py-6 px-4 sm:flex sm:space-y-0 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <p>Copyright &copy; {new Date().getFullYear()} pretz.io</p>
        </div>
        <div className="flex items-center justify-center space-x-10">
          <IconBrandGithub />
          <IconBrandTwitter />
          <IconBrandFacebook />
        </div>
      </div>
    </footer>
  );
};

export default UIFooter;
