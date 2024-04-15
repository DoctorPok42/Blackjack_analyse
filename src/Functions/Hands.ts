import axios from "axios";

const getInfosHand = async (
  Card1: string,
  Card2: string,
  DealerHand: string,
  apiUrl: string
) => {
  const response = await axios.get(`${apiUrl}/hand_stats`, {
    params: {
      Card1: Card1,
      Card2: Card2,
      DealerHand: DealerHand,
    },
  });
  console.log(response.data);
};

export default getInfosHand;
