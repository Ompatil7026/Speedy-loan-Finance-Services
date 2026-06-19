import { supabase } from "../lib/supabase";

export default function SpeakerList({ speakers, refresh }) {
  const deleteSpeaker = async (id) => {
    if (!confirm("Are you sure you want to delete this bank?")) return;

    const { error } = await supabase.from("speakers").delete().eq("id", id);

    if (error) {
      console.error(error);
      alert("Delete failed");
      return;
    }

    alert("Deleted successfully");

    refresh();
  };

  return (
    <div>
      <h2>Uploaded Banks</h2>

      {speakers.map((s) => (
        <div key={s.id} style={{ marginBottom: 25 }}>
          <h3>{s.name}</h3>

          <img src={s.src} width="120" />

          <br />
          <br />

          <img src={s.preview} width="300" />

          <br />
          <br />

          <button onClick={() => deleteSpeaker(s.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
