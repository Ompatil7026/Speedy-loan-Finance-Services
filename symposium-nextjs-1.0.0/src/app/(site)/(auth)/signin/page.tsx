import Signin from "@/components/Auth/SignIn";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Speedy Loan Finance Services",
  description: "Sign in to your account on Speedy Loan Finance Services to track your loan status and manage your profile.",
  robots: {
    index: false,
    follow: false
  }
};

const SigninPage = () => {
  return (
    <>
      <Breadcrumb pageName="Sign In Page" />

      <Signin />
    </>
  );
};

export default SigninPage;
