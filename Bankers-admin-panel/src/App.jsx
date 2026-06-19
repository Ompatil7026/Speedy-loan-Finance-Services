import { useEffect, useState } from "react";
import SpeakerList from "./components/SpeakerList";
import UploadSpeaker from "./components/UploadSpeaker";
import Header from "./Header/Header";
import { supabase } from "./lib/supabase";
function App() {
  const [speakers, setSpeakers] = useState([]);

  const loadSpeakers = async () => {
    const { data, error } = await supabase
      .from("speakers")
      .select("*")
      .order("id", { ascending: false });

    if (!error) {
      setSpeakers(data);
    }
  };

  useEffect(() => {
    loadSpeakers();
  }, []);

  return (
    <div className="admin-container">
      <Header />

      {/* Upload Section */}
      <UploadSpeaker refresh={loadSpeakers} />

      {/* Bank List */}
      <SpeakerList speakers={speakers} refresh={loadSpeakers} />
    </div>
  );
}

export default App;
