import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tekton | Program",
  description: "Created by Farrago",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-screen h-screen overflow-hidden ">{children}</div>;
}
