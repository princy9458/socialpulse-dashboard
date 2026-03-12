import { useState } from 'react';
import { SocialAccount } from '../types/social';
import SocialCard from './SocialCard';
import { connectLinkedIn } from "../services/linkedinAuth";
import { postToFacebook, postToInstagram } from "../services/metaPosting";

interface SocialHubProps {
  accounts: SocialAccount[];
  onConnect: (id: string) => void;
}

const SocialHub = ({ accounts, onConnect }: SocialHubProps): JSX.Element => {
  const [postText, setPostText] = useState("");
  const [instagramConnected, setInstagramConnected] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [instagramImageUrl, setInstagramImageUrl] = useState("");
  const [twitterPostText, setTwitterPostText] = useState("");
  const [twitterConnecting, setTwitterConnecting] = useState(false);
  const [facebookPostText, setFacebookPostText] = useState("");
  const [facebookImage, setFacebookImage] = useState<File | null>(null);
  const [facebookImageUrl, setFacebookImageUrl] = useState("");
  const [instagramStatus, setInstagramStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [facebookStatus, setFacebookStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [instagramPosting, setInstagramPosting] = useState(false);
  const [facebookPosting, setFacebookPosting] = useState(false);

  const shareToLinkedIn = () => {
    const url =
      "https://www.linkedin.com/sharing/share-offsite/?url=" +
      encodeURIComponent(postText);

    window.open(url, "_blank");
  };

  const handlePostToInstagram = async () => {
    const trimmedCaption = caption.trim();
    const imageUrl = instagramImageUrl.trim();

    if (!imageUrl) {
      setInstagramStatus({
        type: "error",
        message: "Instagram needs a public Image URL. Paste the image URL above.",
      });
      return;
    }

    setInstagramPosting(true);
    setInstagramStatus(null);
    try {
      await postToInstagram({ caption: trimmedCaption, imageUrl });
      setInstagramStatus({ type: "success", message: "Posted to Instagram successfully." });
      setCaption("");
      setInstagramImageUrl("");
    } catch (error) {
      setInstagramStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Instagram publishing failed.",
      });
    } finally {
      setInstagramPosting(false);
    }
  };

  const handleConnectTwitter = async () => {
    setTwitterConnecting(true);
    try {
      onConnect("twitter");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Twitter connection failed.");
    } finally {
      setTwitterConnecting(false);
    }
  };

  const handlePostToTwitter = () => {
    const text = twitterPostText.trim();
    if (!text) {
      alert("Please write your tweet first.");
      return;
    }

    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handlePostToFacebook = async () => {
    const message = facebookPostText.trim();
    const imageUrl = facebookImageUrl.trim();

    if (!message) {
      setFacebookStatus({ type: "error", message: "Please write your Facebook post first." });
      return;
    }

    setFacebookPosting(true);
    setFacebookStatus(null);
    try {
      await postToFacebook({ message, imageUrl: imageUrl || null });
      setFacebookStatus({ type: "success", message: "Posted to Facebook successfully." });
      setFacebookPostText("");
      setFacebookImageUrl("");
    } catch (error) {
      setFacebookStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Facebook publishing failed.",
      });
    } finally {
      setFacebookPosting(false);
    }
  };

  const connectInstagram = () => {
    window.open("https://www.instagram.com/", "_blank");
    setInstagramConnected(true);
  };

  const openLinkedInPage = () => {
    window.open("https://www.linkedin.com/company/socialpulse-dashboard/", "_blank");
  };

  return (
    <section className="social-hub">
      <div className="hub-header">
        <h2 className="hub-title">Social Hub</h2>
        <p className="hub-subtitle">Connect and manage all your social media platforms in one place.</p>
        <button
          className="connect-btn btn-connect"
          onClick={connectLinkedIn}
          id="connect-btn-linkedin"
        >
          Connect LinkedIn
        </button>
        <button
          className="connect-btn btn-connect"
          onClick={handleConnectTwitter}
          id="connect-btn-twitter"
          disabled={twitterConnecting}
        >
          {twitterConnecting ? "Connecting Twitter..." : "Connect Twitter"}
        </button>
        <button
          className="connect-btn btn-connect"
          onClick={openLinkedInPage}
          id="open-linkedin-page"
        >
          Open LinkedIn Pages
        </button>
        <button
          className="connect-btn btn-connect"
          onClick={connectInstagram}
          id="connect-btn-instagram"
          style={{
            backgroundColor: instagramConnected ? "#28a745" : "#E1306C",
          }}
        >
          Connect Instagram
        </button>
        <p
          style={{
            marginTop: "8px",
            fontWeight: "bold",
            color: instagramConnected ? "#28a745" : "#E1306C",
          }}
        >
          Instagram: {instagramConnected ? "Connected" : "Not Connected"}
        </p>
        <div style={{ marginTop: "40px" }}>
          <h2>Create LinkedIn Post</h2>

          <textarea
            placeholder="Write your LinkedIn post..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            style={{ width: "400px", height: "120px" }}
          />

          <br />

          <button
            onClick={shareToLinkedIn}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#0A66C2",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Post to LinkedIn
          </button>

        </div>
        <div style={{ marginTop: "40px" }}>
          <h2>Create Twitter Post</h2>

          <textarea
            placeholder="Write your tweet..."
            value={twitterPostText}
            onChange={(e) => setTwitterPostText(e.target.value)}
            style={{ width: "400px", height: "120px", display: "block" }}
          />

          <button
            onClick={handlePostToTwitter}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#1DA1F2",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Post to Twitter
          </button>
        </div>
        <div style={{ marginTop: "40px" }}>
          <h2>Create Instagram Post</h2>

          <input
            type="file"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          />
          {image && (
            <p style={{ marginTop: "6px", fontSize: "12px", color: "#94a3b8" }}>
              Selected image: {image.name}
            </p>
          )}
          <p style={{ marginTop: "6px", fontSize: "12px", color: "#94a3b8" }}>
            Instagram API requires a public image URL. Upload your image to a public host and paste
            the URL below.
          </p>
          <input
            type="text"
            placeholder="Paste public Image URL (required)"
            value={instagramImageUrl}
            onChange={(e) => setInstagramImageUrl(e.target.value)}
            style={{ width: "400px", marginTop: "10px", display: "block" }}
          />

          <textarea
            placeholder="Write your Instagram caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            style={{ width: "400px", height: "120px", display: "block", marginTop: "10px" }}
          />

          <button
            onClick={handlePostToInstagram}
            disabled={instagramPosting}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#E1306C",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            {instagramPosting ? "Posting..." : "Post to Instagram"}
          </button>
          {instagramStatus && (
            <p
              style={{
                marginTop: "10px",
                fontWeight: "bold",
                color: instagramStatus.type === "success" ? "#28a745" : "#DC2626",
              }}
            >
              {instagramStatus.message}
            </p>
          )}
        </div>
        <div style={{ marginTop: "40px" }}>
          <h2>Create Facebook Post</h2>

          <input
            type="file"
            onChange={(e) => setFacebookImage(e.target.files ? e.target.files[0] : null)}
          />
          {facebookImage && (
            <p style={{ marginTop: "6px", fontSize: "12px", color: "#94a3b8" }}>
              Selected image: {facebookImage.name}
            </p>
          )}
          <p style={{ marginTop: "6px", fontSize: "12px", color: "#94a3b8" }}>
            Facebook API uses a public image URL for image posts. Paste the URL if you want to post
            with an image.
          </p>
          <input
            type="text"
            placeholder="Paste public Image URL (optional)"
            value={facebookImageUrl}
            onChange={(e) => setFacebookImageUrl(e.target.value)}
            style={{ width: "400px", marginTop: "10px", display: "block" }}
          />

          <textarea
            placeholder="Write your Facebook caption..."
            value={facebookPostText}
            onChange={(e) => setFacebookPostText(e.target.value)}
            style={{ width: "400px", height: "120px", display: "block", marginTop: "10px" }}
          />

          <button
            onClick={handlePostToFacebook}
            disabled={facebookPosting}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#1877F2",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            {facebookPosting ? "Posting..." : "Post to Facebook"}
          </button>
          {facebookStatus && (
            <p
              style={{
                marginTop: "10px",
                fontWeight: "bold",
                color: facebookStatus.type === "success" ? "#28a745" : "#DC2626",
              }}
            >
              {facebookStatus.message}
            </p>
          )}
        </div>
      </div>
      <div className="cards-grid">
        {accounts.map((account) => (
          <SocialCard
            key={account.id}
            account={account}
            onConnect={onConnect}
          />
        ))}
      </div>
    </section>
  );
};

export default SocialHub;
