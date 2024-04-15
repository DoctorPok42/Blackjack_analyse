import Head from "next/head";
import { Case } from "../../components";
import { faFile,faWineBottle, faHeartCrack, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import useSWR from "swr";
import getInfosHand from "@/functions/Hands";
import { GameData, Stats } from "@/types/types";
import config from "@/../config.json";

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export default function Home(props: { api: string }) {
  const Icons = [faFile, faHeartCrack, faHeartCrack, faRightFromBracket, faRightFromBracket, faWineBottle, faWineBottle]

  const { data: stats, error } = useSWR(`${props.api}/total_games`, fetcher)
  const { data: games, error: errGame } = useSWR(`${props.api}/best_choice`, fetcher)
  if (!stats || !games) return <div>Loading...</div>
  if (error || errGame) return <div>Error...</div>

  return (
    <>
      <Head>
        <title>Blackjack Analyzer</title>
        <meta name="description" content="Blackjack Analyzer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="container">
        <h1 className="title">Blackjack Analyzer</h1>

        <div className="stats">
          {
            Object.keys(stats.total_games).map((key, index) => {
              return (
                <Case key={index + key} icon={Icons[index]} title={config.titles[index]} value={stats.total_games[key as keyof Stats].toString()} />
              )
            })
          }
        </div>

        <div className="charts">
          <table>
            <thead>
              <tr>
                <th>Index</th>
                <th>Player Cards</th>
                <th>Dealer Hand</th>
                <th>Player Choices</th>
              </tr>
            </thead>
            <tbody>
              {
                games.best_choice.map((game: GameData, index: number) => {
                  return (
                    <tr key={game.LossRate+game.Lost} onMouseEnter={() => getInfosHand(game.PlayerCard1, game.PlayerCard2, game.DealerHand, props.api)}>
                      <td>{index + 1}</td>
                      <td>
                        <td>{game.PlayerCard1}</td>
                        <td>{game.PlayerCard2}</td>
                      </td>
                      <td>{game.DealerHand}</td>
                      <td>{game.PlayerChoices}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>


          {/* <Graph
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
          <Graph title="Daily Traffic" value="2.579" data={[]} size="small" /> */}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  const api = process.env.API_URL;

  return {
    props: {
      api,
    },
  };
}