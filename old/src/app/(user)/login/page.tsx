import LoginPage from "@/components/user/Login";

const page = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 transition-all">
      <LoginPage pageProps={1} />
    </section>
  );
};

export default page;
