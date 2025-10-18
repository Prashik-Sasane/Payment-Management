export default function TransactionCard({ name, amount, date }) {
  return (
    <div className="border w-80 p-3 rounded-md shadow-sm flex justify-between">
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-gray-500 text-sm">{date}</p>
      </div>
      <p className="font-bold text-green-600">₹{amount}</p>
    </div>
  );
}
