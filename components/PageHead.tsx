import Head from "next/head";

interface Props {
  title: string;
}

const PageHead = ({ title }: Props) => {
  return (
    <Head>
      <title>{`${title} - nullnode`}</title>
    </Head>
  );
};

export default PageHead;
