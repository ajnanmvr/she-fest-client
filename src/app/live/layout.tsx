import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tekton | Live",
  description: "Created by Farrago",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
