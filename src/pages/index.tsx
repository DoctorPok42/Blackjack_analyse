import Head from "next/head";
import { Case, Graph } from "../../components";
import { faFile, faTrophy, faWineBottle, faHeartCrack, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

type Stats = {
  total_games: number;
  total_loss_rate: number;
  total_losses: number;
  total_push_rate: number;
  total_pushes: number;
  total_win_rate: number;
  total_wins: number;
}

type GameData = {
  DealerHand: string;
  LossRate: number;
  Lost: string;
  PlayerCard1: string;
  PlayerCard2: string;
  PlayerChoices: string;
  Push: string;
  PushRate: number;
  Total: string;
  Win: string;
  WinRate: number;
}

export default function Home() {

  // const [stats, setStats] = useState<Stats>({} as Stats)
  const Titles = ["Total Games", "Total Wins", "Total Losses", "Total Pushes", "Total Win Rate", "Total Loss Rate", "Total Push Rate"]
  const Icons = [faFile, faTrophy, faHeartCrack, faRightFromBracket, faWineBottle, faHeartCrack, faRightFromBracket]

  const { data: stats, error } = useSWR("http://127.0.0.1:5000/total_games", fetcher)
  const { data: games, error: errGame } = useSWR("http://127.0.0.1:5000/best_choice", fetcher)
  if (!stats || !games) return <div>Loading...</div>
  if (error) return <div>Error...</div>
  console.log(games)


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

        <div className="stats">
          {
            Object.keys(stats.total_games).map((key, index) => {
              return (
                <Case key={index} icon={Icons[index]} title={Titles[index]} value={stats.total_games[key as keyof Stats].toString()} />
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
                    <tr key={index}>
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
