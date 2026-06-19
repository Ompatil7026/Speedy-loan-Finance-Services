export default function BannerList({ banners, refresh }) {
  const deleteBanner = (id) => {
    const updated = banners.filter((b) => b.id !== id);

    localStorage.setItem("banners", JSON.stringify(updated));

    refresh();
  };

  return (
    <div>
      <h2>Uploaded One Pagers</h2>

      {banners.map((banner) => (
        <div key={banner.id} style={{ marginBottom: 20 }}>
          <h4>{banner.name}</h4>

          <img src={banner.preview} width="250" />

          <br />
          <br />

          <button onClick={() => deleteBanner(banner.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
