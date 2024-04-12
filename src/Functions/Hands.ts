import axios from "axios";

export async function getInfosHand(Card1: string, Card2: string, DealerHand: string) {
    const response = await axios.get("http://localhost:5000/hand_stats", {
        params: {
            Card1: Card1,
            Card2: Card2,
            DealerHand: DealerHand
        }
    });
    console.log(response.data);
}