const upcomingEvents = [
    { id: 1, name: "Web3 Summit", date: "Sept 10, 2024" },
    { id: 2, name: "Blockchain Conference", date: "Sept 15, 2024" },
    { id: 3, name: "CryptoFest 2024", date: "Sept 20, 2024" },
  ];
  
  export default function UpcomingEvents() {
    return (
      <div className="bg-[#222] p-5 rounded-xl">
        <h2 className="text-lg font-semibold mb-3">Upcoming Events</h2>
        <ul>
          {upcomingEvents.map((event) => (
            <li key={event.id} className="py-2 border-b border-gray-700">
              {event.name} - <span className="text-gray-400">{event.date}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  