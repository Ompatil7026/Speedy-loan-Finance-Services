import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center">
      {/* Light mode logo */}
      <Image
        src="/images/logo/logo.svg"
        alt="Speedy Loan"
        width={160}
        height={40}
        priority
        className="block dark:hidden"
      />

      {/* Dark mode logo */}
      <Image
        src="/images/footer/footer-logo-white.svg"
        alt="Speedy Loan"
        width={160}
        height={42}
        priority
        className="hidden dark:block"
      />
    </Link>
  );
};

export default Logo;
