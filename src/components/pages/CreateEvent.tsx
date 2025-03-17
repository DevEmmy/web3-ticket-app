"use client";
import { useState } from "react";
import { MdCancel } from "react-icons/md";

const CreateEvent = () => {
  const [eventData, setEventData] = useState<{
    name: string;
    description: string;
    category: string;
    date: string;
    type: string;
    time: string;
    link: string;
    location: string;
    gLink: string;
    price: string;
    currency: string;
    maxAttendees: string;
    organizerName: string;
    organizerEmail: string;
    organizerPhone: string;
    image: File | null; // Allow File or null
    mintAsNFT: boolean;
  }>({
    name: "",
    description: "",
    category: "",
    date: "",
    type: "",
    time: "",
    link: "",
    location: "",
    gLink: "",
    price: "",
    currency: "",
    maxAttendees: "",
    organizerName: "",
    organizerEmail: "",
    organizerPhone: "",
    image: null,
    mintAsNFT: false,
  });

  const [eventImage, setEventImage] = useState<any>("");

  const getMimeType = (base64String: any) => {
    const match = base64String.match(/^data:(.+);base64,/);
    return match ? match[1] : null;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Event Created:", eventData);
  };

  const getAllCurrencies = () => {
    const currencies = new Set(Intl.supportedValuesOf("currency"));
    return Array.from(currencies).map((code) => ({
      code,
      symbol: new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: code,
      })
        .formatToParts(0)
        .find((part) => part.type === "currency")?.value,
      name: new Intl.DisplayNames(["en"], { type: "currency" }).of(code),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : "";
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const fileType = getMimeType(reader.result);
        if (
          fileType === "image/png" ||
          fileType === "image/jpg" ||
          fileType === "image/jpeg" ||
          fileType === "image/jfif"
        ) {
          setEventData({
            ...eventData,
            image: file,
          });
          setEventImage(reader.result);
        }
      };
      reader.onerror = (error) => {
        setEventData({
          ...eventData,
          image: null,
        });
        console.error("Error converting file: ", error);
      };
    }
  };

  return (
    <div className="p-6 w-3/4 mx-auto">
      <h1 className="text-2xl font-bold text-white mb-4">Create New Event</h1>

      <form
        onSubmit={handleSubmit}
        className="h-full bg-gray-800 p-6 rounded-lg grid grid-cols-2items-start gap-7"
      >
        {/* Event Name */}
        <div className="w-full">
          <label className="block text-white">Event Name</label>
          <input
            type="text"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
            required
          />
        </div>

        {/* Category */}
        <div className="w-full">
          <label className="block text-white">Category</label>
          <select
            name="category"
            value={eventData.category}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="music">Music</option>
            <option value="tech">Tech</option>
            <option value="sports">Sports</option>
          </select>
        </div>

        {/* Date & Time */}
        <div className="gap-5 col-span-2 grid grid-cols-3">
          <div>
            <label className="block text-white">Date</label>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-white">Time</label>
            <input
              type="time"
              name="time"
              value={eventData.time}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded"
              required
            />
          </div>

          {/* Event Type */}
          <div>
            <label className="block text-white">Event Type</label>
            <select
              name="type"
              value={eventData.type}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded"
              required
            >
              <option value="">Select Type</option>
              <option value="physical">Physical</option>
              <option value="online">Online</option>
            </select>
          </div>
        </div>

        {/* If Physical or Online */}

        {eventData.type === "online" && (
          <div className="gap-5 col-span-2 grid grid-cols-1">
            <div>
              <label className="block text-white">Meeting Link</label>
              <input
                type="link"
                name="link"
                value={eventData.link}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
            </div>
          </div>
        )}

        {eventData.type === "physical" && (
          <>
            <div className="gap-5 col-span-2 grid grid-cols-2">
              <div>
                <label className="block text-white">Event Location</label>
                <input
                  type="text"
                  name="location"
                  value={eventData.location}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-white">
                  Google Maps Link (Optional)
                </label>
                <input
                  type="text"
                  name="gLink"
                  value={eventData.gLink}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 rounded"
                />
              </div>
            </div>
          </>
        )}

        {/* Ticket Pricing */}

        <div className="gap-5 col-span-2 grid grid-cols-2">
          <div>
            <label className="block text-white">
              Ticket Price (Leave blank if free)
            </label>
            <div className="flex justify-start items-center gap-[10px]">
              <input
                type="number"
                name="price"
                placeholder="Amount"
                value={eventData.price}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 rounded"
              />
              <select
                name="currency"
                value={eventData.currency}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 rounded"
              >
                <option>Currency</option>
                {getAllCurrencies().map((currency) => (
                  <option value={currency.code}>{currency.code}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-white">Max Attendees (Optional)</label>
            <input
              type="number"
              name="maxAttendees"
              value={eventData.maxAttendees}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
        </div>

        <div className="gap-5 col-span-2 grid grid-cols-3">
          {/* Organizer Info */}
          <div>
            <label className="block text-white">Organizer Name</label>
            <input
              type="text"
              name="organizerName"
              placeholder="Name"
              value={eventData.organizerName}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-white">Organizer Email</label>
            <input
              type="email"
              name="organizerEmail"
              placeholder="Email"
              value={eventData.organizerEmail}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-white">Organizer Phone</label>
            <input
              type="number"
              name="organizerPhone"
              placeholder="Phone"
              value={eventData.organizerPhone}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded"
              required
            />
          </div>
        </div>

        <div className="gap-5 col-span-2 grid grid-cols-2">
          {/* Upload Image */}
          <div className="flex flex-col items-start justify-center gap-[2px]">
            <div className="w-full flex justify-start items-center ">
              <label className="block text-white">Event Image</label>
            </div>
            {eventData.image ? (
              <div className="relative w-full h-[200px] rounded flex items-center justify-center">
                <img
                  src={eventImage}
                  alt="event-image"
                  className="w-full h-full rounded"
                />
                <MdCancel
                  size={25}
                  className="absolute top-[5px] right-[5px] cursor-pointer"
                  onClick={() => {
                    setEventData({
                      ...eventData,
                      image: null,
                    });
                  }}
                />
              </div>
            ) : (
              <div className="relative w-full p-2 h-[200px] bg-gray-700 rounded flex items-center justify-center border border-dashed border-primary">
                Click to upload, or drag and drop here.
                <div className="absolute flex flex-col items-center justify-center top-0 left-0">
                  {[1, 2, 3, 4, 5].map((items, index) => {
                    return (
                      <input
                        key={index}
                        name="cover"
                        type="file"
                        onChange={handleFileChange}
                        className="p-2 opacity-0"
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col items-start justify-center gap-[2px]">
            <label className="block text-white">Description</label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 h-[200px] rounded"
              required
            />
          </div>
        </div>

        {/* Mint as NFT */}
        <div className="flex items-center col-span-2">
          <input
            type="checkbox"
            checked={eventData.mintAsNFT}
            onChange={() =>
              setEventData({ ...eventData, mintAsNFT: !eventData.mintAsNFT })
            }
          />
          <label className="ml-2 text-white">Mint Tickets as NFTs</label>
        </div>

        <button
          type="submit"
          className="col-span-2 bg-primary px-4 py-2 rounded text-white w-full"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
