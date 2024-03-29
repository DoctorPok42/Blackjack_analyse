import Head from "next/head";
import { Case } from "../../components";
import { faFile } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <>
      <Head>
        <title>Blackjack Analyzer</title>
        <meta name="description" content="Blackjack Analyzer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className="container">
        <h1 className="title">Blackjack Analyzer</h1>

        <Case icon={faFile} title="Total Games" value="2935" />
      </main>
    </>
  );
}
