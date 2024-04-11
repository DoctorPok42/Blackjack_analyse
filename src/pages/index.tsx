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
          <Graph
            title="Win rate by initial hand"
            data={[{
              label: 'PRODUCT A',
              value: [44, 15, 41, 67, 22, 43]
            }, {
              label: 'PRODUCT B',
              value: [55, 23, 20, 8, 13, 27]
            }, {
              label: 'PRODUCT C',
              value: [41, 17, 15, 15, 21, 14]
            }]}
            size="medium"
            color={["#543de0", "#61b7e1", "#c2cbdd"]}
          />
          <Graph
            title="Win rate by initial hand"
            data={[{
              label: 'PRODUCT A',
              value: [44, 15, 41, 67, 22, 43]
            }, {
              label: 'PRODUCT B',
              value: [55, 23, 20, 8, 13, 27]
            }, {
              label: 'PRODUCT C',
              value: [41, 17, 15, 15, 21, 14]
            }]}
            size="medium"
            color={["#543de0", "#61b7e1", "#c2cbdd"]}
          />
          <Graph title="Player Win Rate" value="0.5" data={[]} size="small" />
          <Graph title="Daily Traffic" value="2.579" data={[]} size="small" />
        </div>
      </main>
    </>
  );
}
