import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Tekton | Result',
  description: 'In a rapidly evolving contemporary context rife with falsehoods and fake news, Tekton\'23 aims to uncover and present the truth and facts. The Darul Huda U.G. Arts Fest will play a pivotal role in enhancing the academic progress of students across various fields of study and academic activities.',
  keywords: ['Tekton', 'Tekton.live', 'asas', 'dhiu', 
  'darul huda', 'ZAHRA Arts Fest',
   'dhiu rabee fest', 'rabee fest dhiu', 'Tekton23'
    , 'sibaq' , 'result portal Tekton' , 'results Tekton']
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
