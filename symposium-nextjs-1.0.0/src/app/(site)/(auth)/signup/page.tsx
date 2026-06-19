import SignUp from "@/components/Auth/SignUp";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Speedy Loan Finance Services",
  description: "Create a new account on Speedy Loan Finance Services to apply for loans and contact agents.",
  robots: {
    index: false,
    follow: false
  }
};

const SignupPage = () => {
  return (
    <>
      <Breadcrumb pageName="Sign Up Page" />

      <SignUp />
    </>
  );
};

export default SignupPage;
