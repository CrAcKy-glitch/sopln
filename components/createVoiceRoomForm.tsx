import useUserInfo from "@app/contexts/useUserInfo";
import useVoiceRoom from "@app/contexts/useVoiceRoom";
import { VoiceRoomInterface } from "@app/lib/models/voiceroom";
import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";

export default function VoiceRoomForm() {
  const { voiceRoomVisible, setVoiceRoomVisible } = useVoiceRoom();

  const [formData, setFormData] = useState<VoiceRoomInterface>({
    name: "",
    about: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState<string>("");

  // Handle input change with proper typing
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle tag input and validation
  const handleTagInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (/^#\S+/.test(tagInput)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput],
      });
      setTagInput(""); // Clear tag input after valid entry
    } else {
      alert("Tags must start with # and have no spaces!");
    }
  };

  // Handle form submission
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Voice Room Data:", formData);

    await axios.post("/api/voiceroom", {
      name: formData.name,
      about: formData.about,
      tags: formData.tags,
    });
    setVoiceRoomVisible(true);
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-black text-gray-200 rounded-lg shadow-md flex justify-center">
      <div className="justify-center flex-col flex">
        <h2 className="text-3xl font-bold mb-6">Create a Voice Room</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Room Name */}
          <div>
            <label className="block text-gray-400 font-medium mb-1">
              Room Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter room name"
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-twitterBlue"
            />
          </div>

          {/* About */}
          <div>
            <label className="block text-gray-400 font-medium mb-1">
              About
            </label>
            <input
              type="text"
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Describe your voice room"
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-twitterBlue"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-gray-400 font-medium mb-1">Tags</label>
            <div className="flex space-x-3">
              <input
                type="text"
                value={tagInput}
                onChange={handleTagInput}
                placeholder="Enter tag starting with #"
                className="flex-grow p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-twitterBlue"
              />
              <button
                onClick={handleTagSubmit}
                className="bg-twitterBlue p-3 rounded-lg hover:bg-twitterDarkBlue transition-colors"
              >
                Add Tag
              </button>
            </div>

            {/* Display Tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-twitterBlue text-white rounded-lg text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-twitterBlue text-white py-3 rounded-lg hover:bg-twitterDarkBlue transition-colors duration-200"
            >
              Create Voice Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
