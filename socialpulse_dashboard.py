import streamlit as st
import pandas as pd
import random
import math

# ── Seed for consistent demo data ─────────────────────────────
random.seed(42)

# ── Page Configuration ─────────────────────────────────────────
st.set_page_config(
    page_title="SocialPulse Social Media Analytics",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ── Global CSS (dark SaaS theme) ──────────────────────────────
st.markdown("""
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  /* ── Root & Body ── */
  html, body, [class*="css"], [class*="stApp"] {
    font-family: 'Inter', sans-serif !important;
    background-color: #080b14 !important;
    color: #e8ecf4 !important;
  }

  /* ── Sidebar ── */
  [data-testid="stSidebar"] {
    background: linear-gradient(180deg, #0d1120 0%, #0a0d1a 100%) !important;
    border-right: 1px solid rgba(255,255,255,0.06) !important;
  }
  [data-testid="stSidebar"] * { color: #e8ecf4 !important; }
  [data-testid="stSidebar"] .stSelectbox label {
    color: #7c85a8 !important;
    font-size: 11px !important;
    font-weight: 700 !important;
    letter-spacing: 1.5px !important;
    text-transform: uppercase !important;
  }

  /* ── Main content background ── */
  .main .block-container {
    padding-top: 2rem !important;
    padding-bottom: 2rem !important;
    background: transparent !important;
    max-width: 1200px;
  }

  /* ── Selectbox styling ── */
  [data-testid="stSelectbox"] > div > div {
    background: rgba(255,255,255,0.05) !important;
    border: 1px solid rgba(255,255,255,0.1) !important;
    border-radius: 12px !important;
    color: #e8ecf4 !important;
    font-weight: 600 !important;
  }
  [data-testid="stSelectbox"] [role="option"] {
    background: #111525 !important;
  }

  /* ── Metric cards (native st.metric) ── */
  [data-testid="stMetric"] {
    background: rgba(255,255,255,0.04) !important;
    border: 1px solid rgba(255,255,255,0.08) !important;
    border-radius: 16px !important;
    padding: 20px 22px !important;
    position: relative !important;
    overflow: hidden !important;
    transition: transform 0.2s ease, border-color 0.2s ease !important;
  }
  [data-testid="stMetric"]:hover {
    border-color: rgba(165,180,252,0.3) !important;
    transform: translateY(-2px) !important;
  }
  [data-testid="stMetricLabel"] {
    color: #7c85a8 !important;
    font-size: 11px !important;
    font-weight: 700 !important;
    letter-spacing: 1.5px !important;
    text-transform: uppercase !important;
  }
  [data-testid="stMetricValue"] {
    color: #e8ecf4 !important;
    font-size: 2.4rem !important;
    font-weight: 800 !important;
    letter-spacing: -1.5px !important;
    line-height: 1.1 !important;
  }
  [data-testid="stMetricDelta"] {
    font-size: 12px !important;
    font-weight: 700 !important;
    border-radius: 100px !important;
    padding: 2px 10px !important;
  }

  /* ── Chart containers ── */
  [data-testid="stArrowVegaLiteChart"],
  [data-testid="stVegaLiteChart"],
  .stPlotlyChart {
    background: rgba(255,255,255,0.03) !important;
    border: 1px solid rgba(255,255,255,0.07) !important;
    border-radius: 16px !important;
    padding: 16px !important;
  }

  /* ── Subheaders ── */
  h2, h3 { color: #e8ecf4 !important; letter-spacing: -0.5px !important; }

  /* ── Divider ── */
  .sp-divider {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.07);
    margin: 24px 0;
  }

  /* ── Platform Hero Card ── */
  .hero-card {
    border-radius: 20px;
    padding: 28px 30px;
    margin-bottom: 32px;
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .hero-title {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -1px;
    line-height: 1.1;
  }
  .hero-sub {
    color: rgba(255,255,255,0.55);
    font-size: 13px;
    margin-top: 4px;
    font-weight: 500;
  }
  .hero-badge {
    display: inline-block;
    margin-top: 10px;
    font-size: 11px;
    font-weight: 700;
    padding: 4px 14px;
    border-radius: 100px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  /* ── Section label ── */
  .section-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #7c85a8;
    margin-bottom: 14px;
  }

  /* ── Compare table ── */
  [data-testid="stDataFrame"] {
    border-radius: 14px !important;
    overflow: hidden !important;
    border: 1px solid rgba(255,255,255,0.07) !important;
  }

</style>
""", unsafe_allow_html=True)

# ── Platform Data ──────────────────────────────────────────────
PLATFORMS: dict[str, dict] = {
    "Instagram": {
        "icon": "📸",
        "color_a": "#833AB4",
        "color_b": "#FD1D1D",
        "followers": 124_000,
        "engagement_rate": 8.2,
        "total_posts": 320,
        "weekly_growth": 3.2,
        "monthly_reach": 420_000,
        "impressions": 1_200_000,
        "link_clicks": 8_430,
        "top_content": "Reels",
    },
    "LinkedIn": {
        "icon": "💼",
        "color_a": "#0077B5",
        "color_b": "#00A0DC",
        "followers": 54_200,
        "engagement_rate": 3.2,
        "total_posts": 189,
        "weekly_growth": 1.8,
        "monthly_reach": 180_000,
        "impressions": 520_000,
        "link_clicks": 4_210,
        "top_content": "Articles",
    },
    "Twitter (X)": {
        "icon": "🐦",
        "color_a": "#1DA1F2",
        "color_b": "#0d8ed4",
        "followers": 89_700,
        "engagement_rate": 5.1,
        "total_posts": 1_023,
        "weekly_growth": 4.1,
        "monthly_reach": 310_000,
        "impressions": 980_000,
        "link_clicks": 12_050,
        "top_content": "Threads",
    },
    "Facebook": {
        "icon": "👥",
        "color_a": "#1877F2",
        "color_b": "#0C5DC7",
        "followers": 210_500,
        "engagement_rate": 2.8,
        "total_posts": 567,
        "weekly_growth": 0.9,
        "monthly_reach": 630_000,
        "impressions": 2_100_000,
        "link_clicks": 18_760,
        "top_content": "Videos",
    },
}


def fmt_num(n: float, is_pct: bool = False) -> str:
    """Format number with K/M or as percentage."""
    if is_pct:
        return f"{n:.1f}%"
    if n >= 1_000_000:
        return f"{n / 1_000_000:.1f}M"
    if n >= 1_000:
        return f"{n / 1_000:.1f}K"
    return str(int(n))


def gen_growth_series(base: int, weeks: int = 12) -> list[int]:
    """Generate a realistic cumulative followers growth series."""
    vals = []
    cur = int(base * 0.85)
    for i in range(weeks):
        growth = int(base * random.uniform(0.008, 0.022))
        cur = min(cur + growth, base + int(base * 0.05))
        vals.append(cur)
    vals[-1] = base          # pin last point to actual followers count
    return vals


def gen_engagement_series(base_rate: float, weeks: int = 12) -> list[float]:
    """Generate a wavy engagement-rate trend series."""
    vals = []
    for i in range(weeks):
        wave = math.sin(i / 2.5) * 0.6
        noise = random.uniform(-0.3, 0.4)
        vals.append(round(max(0.5, base_rate + wave + noise), 2))
    return vals


# ── Sidebar ────────────────────────────────────────────────────
with st.sidebar:
    # Logo / Brand
    st.markdown("""
    <div style="padding: 6px 0 18px;">
      <div style="font-size:22px; font-weight:900; letter-spacing:-0.5px;">
        ⚡ <span style="background:linear-gradient(135deg,#a5b4fc,#7c3aed);
           -webkit-background-clip:text;-webkit-text-fill-color:transparent;
           background-clip:text;">SocialPulse</span>
      </div>
      <div style="color:#7c85a8;font-size:12px;margin-top:2px;font-weight:500;">
        Marketing Dashboard
      </div>
    </div>
    """, unsafe_allow_html=True)

    st.markdown('<div class="section-label">Platform</div>', unsafe_allow_html=True)

    selected = st.selectbox(
        "Select Platform",
        list(PLATFORMS.keys()),
        label_visibility="collapsed",
    )

    st.markdown("---")
    st.markdown('<div class="section-label">All Platforms</div>', unsafe_allow_html=True)

    for pname, pdata in PLATFORMS.items():
        active_dot = "🟣" if pname == selected else "⚫"
        follower_str = fmt_num(pdata["followers"])
        st.markdown(
            f"{active_dot} **{pdata['icon']} {pname}** &nbsp;&nbsp;"
            f"<span style='color:#7c85a8;font-size:12px;'>{follower_str}</span>",
            unsafe_allow_html=True,
        )

    st.markdown("---")
    st.caption("© 2026 SocialPulse · v2.0")


# ── Main: pull selected data ───────────────────────────────────
d = PLATFORMS[selected]

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# SECTION 1 — Header
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
st.markdown("""
<div style="margin-bottom:6px;">
  <div style="font-size:30px;font-weight:900;letter-spacing:-1.5px;
              background:linear-gradient(135deg,#e8ecf4 30%,#a5b4fc);
              -webkit-background-clip:text;-webkit-text-fill-color:transparent;
              background-clip:text;line-height:1.15;">
    SocialPulse Social Media Analytics
  </div>
  <div style="color:#7c85a8;font-size:14px;font-weight:500;margin-top:4px;">
    Monitor, analyse, and grow your presence across every platform — March 2026
  </div>
</div>
<hr class="sp-divider">
""", unsafe_allow_html=True)


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# SECTION 2 — Platform selector hero card
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
hero_gradient = (
    f"background: linear-gradient(135deg, {d['color_a']}28, {d['color_b']}14);"
    f"border: 1px solid {d['color_a']}55;"
)
badge_style = (
    f"background:{d['color_a']}22; color:{d['color_a']}; "
    f"border:1px solid {d['color_a']}55;"
)

st.markdown(f"""
<div class="hero-card" style="{hero_gradient}">
  <span style="font-size:58px;line-height:1;">{d['icon']}</span>
  <div>
    <div class="hero-title" style="color:#e8ecf4;">{selected}</div>
    <div class="hero-sub">Platform Analytics &nbsp;·&nbsp; March 2026</div>
    <span class="hero-badge" style="{badge_style}">
      📶 +{d['weekly_growth']}% this week
    </span>
  </div>
</div>
""", unsafe_allow_html=True)


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# SECTION 3 — Core Metric Cards (Streamlit st.metric)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
st.markdown('<div class="section-label">Key Metrics</div>', unsafe_allow_html=True)

m1, m2, m3 = st.columns(3)

with m1:
    st.metric(
        label="👥  Followers",
        value=fmt_num(d["followers"]),
        delta=f"+{d['weekly_growth']}% this week",
    )

with m2:
    er = d["engagement_rate"]
    delta_label = "↑ Above Average" if er >= 3.5 else "↓ Below Average"
    st.metric(
        label="📈  Engagement Rate",
        value=fmt_num(er, is_pct=True),
        delta=delta_label,
    )

with m3:
    st.metric(
        label="📝  Total Posts",
        value=fmt_num(d["total_posts"]),
        delta="Steady Growth →",
    )

st.markdown('<hr class="sp-divider">', unsafe_allow_html=True)

# Extended metrics row
st.markdown('<div class="section-label">Extended Metrics</div>', unsafe_allow_html=True)

e1, e2, e3, e4 = st.columns(4)

with e1:
    st.metric("🌐  Monthly Reach",  fmt_num(d["monthly_reach"]),  "↑ Organic")
with e2:
    st.metric("👁️  Impressions",    fmt_num(d["impressions"]),    "↑ Strong")
with e3:
    st.metric("🔗  Link Clicks",    fmt_num(d["link_clicks"]),    "↑ Growing")
with e4:
    st.metric("🏆  Top Content",    d["top_content"],             "🔥 Trending")


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# SECTION 4 — Analytics Charts
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
st.markdown('<hr class="sp-divider">', unsafe_allow_html=True)
st.markdown('<div class="section-label">Analytics Charts</div>', unsafe_allow_html=True)

chart_col1, chart_col2 = st.columns(2)

weeks_labels = [f"Week {i}" for i in range(1, 13)]

# -- Followers Growth Chart --
with chart_col1:
    st.markdown("**📈 Followers Growth Chart**")
    st.caption("Cumulative follower count over the last 12 weeks")

    growth_vals = gen_growth_series(d["followers"])
    df_growth = pd.DataFrame({
        "Week": weeks_labels,
        "Followers": growth_vals,
    }).set_index("Week")

    st.area_chart(
        df_growth,
        use_container_width=True,
        height=260,
        color="#a5b4fc",
    )

# -- Engagement Trend Chart --
with chart_col2:
    st.markdown("**📊 Engagement Trend Chart**")
    st.caption("Weekly engagement rate (%) over the last 12 weeks")

    eng_vals = gen_engagement_series(d["engagement_rate"])
    df_eng = pd.DataFrame({
        "Week": weeks_labels,
        "Engagement Rate (%)": eng_vals,
    }).set_index("Week")

    st.line_chart(
        df_eng,
        use_container_width=True,
        height=260,
        color="#34d399",
    )


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# SECTION 5 — Posts published bar chart
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
st.markdown('<hr class="sp-divider">', unsafe_allow_html=True)
st.markdown("**📅 Posts Published per Week (Last 12 Weeks)**")
st.caption("Frequency of content published per platform")

posts_per_week = [random.randint(2, max(3, d["total_posts"] // 40)) for _ in range(12)]
df_posts = pd.DataFrame({
    "Week": weeks_labels,
    "Posts Published": posts_per_week,
}).set_index("Week")

st.bar_chart(df_posts, use_container_width=True, height=200, color="#818cf8")


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# SECTION 6 — All Platforms Quick Compare
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
st.markdown('<hr class="sp-divider">', unsafe_allow_html=True)
st.markdown("**🔄 All Platforms — Quick Compare**")
st.caption("Side-by-side platform performance summary")

rows = []
for pname, pdata in PLATFORMS.items():
    rows.append({
        "Platform":      f"{pdata['icon']}  {pname}",
        "Followers":     fmt_num(pdata["followers"]),
        "Engagement":    fmt_num(pdata["engagement_rate"], is_pct=True),
        "Posts":         fmt_num(pdata["total_posts"]),
        "Monthly Reach": fmt_num(pdata["monthly_reach"]),
        "Top Content":   pdata["top_content"],
    })

df_compare = pd.DataFrame(rows)
st.dataframe(df_compare, use_container_width=True, hide_index=True)
