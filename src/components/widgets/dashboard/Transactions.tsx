const transactions = [
    { id: 1, event: "Solana Hackathon", amount: "2 SOL", date: "Aug 20, 2024" },
    { id: 2, event: "NFT Expo", amount: "1.5 SOL", date: "Aug 18, 2024" },
    { id: 3, event: "DeFi Summit", amount: "3 SOL", date: "Aug 15, 2024" },
  ];
  
  export default function Transactions() {
    return (
      <div className="bg-[#222] p-5 rounded-xl">
        <h2 className="text-lg font-semibold mb-3">Recent Transactions</h2>
        <ul>
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className="flex justify-between py-2 border-b border-gray-700"
            >
              <span>{tx.event}</span>
              <span className="text-green-400">{tx.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  