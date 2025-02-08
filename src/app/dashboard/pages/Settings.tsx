"use client";

import { useState } from "react";

const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">Settings</h1>

      {/* Profile Settings */}
      <section className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Profile Settings</h2>
        <div className="space-y-2">
          <label className="block">Username</label>
          <input type="text" className="w-full p-2 bg-gray-700 rounded" defaultValue="JohnDoe" />
          
          <label className="block">Email</label>
          <input type="email" className="w-full p-2 bg-gray-700 rounded" defaultValue="johndoe@example.com" />
          
          <button className="mt-2 bg-blue-500 px-4 py-2 rounded text-white">Save</button>
        </div>
      </section>

      {/* Security Settings */}
      {/* <section className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Security</h2>
        <button className="bg-red-500 px-4 py-2 rounded text-white">Change Password</button>
      </section> */}

      {/* Notification Settings */}
      {/* <section className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" checked={notifications.email} onChange={() => setNotifications({ ...notifications, email: !notifications.email })} />
            <span className="ml-2">Email Notifications</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" checked={notifications.sms} onChange={() => setNotifications({ ...notifications, sms: !notifications.sms })} />
            <span className="ml-2">SMS Notifications</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" checked={notifications.push} onChange={() => setNotifications({ ...notifications, push: !notifications.push })} />
            <span className="ml-2">Push Notifications</span>
          </label>
        </div>
      </section> */}

      {/* Preferences */}
      {/* <section className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Preferences</h2>
        <label className="block">Theme</label>
        <select className="w-full p-2 bg-gray-700 rounded" value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </section> */}
    </div>
  );
};

export default Settings;
