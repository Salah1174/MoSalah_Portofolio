import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";

function AdminMessages() {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get("/api/contact/messages");
      if (response.data.success) {
        setMessages(response.data.messages);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      console.error("Error fetching messages:", error);
    }
  };

  const markAsRead = async (messageId) => {
    try {
      await axios.put(`/api/contact/messages/${messageId}/read`);
      setMessages(
        messages.map((msg) =>
          msg._id === messageId ? { ...msg, isRead: true } : msg
        )
      );
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Contact Messages</h2>
        <div className="text-sm text-gray-500">
          {messages.filter((msg) => !msg.isRead).length} unread messages
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Messages List */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            All Messages ({messages.length})
          </h3>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message._id}
                onClick={() => {
                  setSelectedMessage(message);
                  if (!message.isRead) {
                    markAsRead(message._id);
                  }
                }}
                className={`p-4 rounded-lg border cursor-pointer transition-colors duration-200 ${
                  message.isRead
                    ? "bg-white border-gray-200 hover:bg-gray-50"
                    : "bg-blue-50 border-blue-200 hover:bg-blue-100"
                } ${
                  selectedMessage?._id === message._id
                    ? "ring-2 ring-blue-500"
                    : ""
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800">
                    {message.name}
                  </h4>
                  {!message.isRead && (
                    <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
                  )}
                </div>
                <p className="text-gray-600 text-sm">{message.email}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {formatDate(message.createdAt)}
                </p>
                <p className="text-gray-700 text-sm mt-2 line-clamp-2">
                  {message.message}
                </p>
              </div>
            ))}

            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No messages received yet.
              </div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div>
          {selectedMessage ? (
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Message Details
                </h3>
                <div className="text-sm text-gray-500">
                  {formatDate(selectedMessage.createdAt)}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <p className="text-gray-900">{selectedMessage.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-gray-900">
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {selectedMessage.email}
                    </a>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: Your inquiry&body=Hi ${selectedMessage.name},%0D%0A%0D%0AThank you for reaching out.%0D%0A%0D%0ABest regards,`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Reply via Email
                  </a>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="text-gray-400 mb-4">
                <i className="ri-mail-line text-4xl"></i>
              </div>
              <p className="text-gray-600">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminMessages;
