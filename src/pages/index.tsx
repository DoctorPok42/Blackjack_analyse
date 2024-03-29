import Head from "next/head";
import { Case, Graph } from "../../components";
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

        <div className="charts">
          <Graph title="Win rate by initial hand" data={[
            {
              value: 0.5,
              label: "Win rate",
            }, {
              value: 0.5,
              label: "Loss rate",
            }
          ]} size="medium" />
          <Graph title="Win rate by initial hand" data={[]} size="medium" />
          <Graph title="Player Win Rate" value="0.5" data={[]} size="small" />
          <Graph title="Daily Traffic" value="2.579" data={[]} size="small" />
        </div>
      </main>
    </>
  );
}
