import streamlit as st
import random

# ── Page Config ──────────────────────────────────────────────
st.set_page_config(
    page_title="SocialPulse Analytics",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ── Custom CSS ────────────────────────────────────────────────
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

    html, body, [class*="css"] {
        font-family: 'Inter', sans-serif;
    }
    .main {
        background-color: #0a0c14;
        color: #f1f4ff;
    }
    [data-testid="stSidebar"] {
        background: #10131f;
        border-right: 1px solid rgba(255,255,255,0.07);
    }
    [data-testid="stSidebar"] * {
        color: #f1f4ff !important;
    }
    .metric-card {
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.09);
        border-radius: 16px;
        padding: 24px 20px;
        text-align: center;
        margin-bottom: 12px;
        position: relative;
        overflow: hidden;
    }
    .metric-card .bar {
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 3px;
        border-radius: 16px 16px 0 0;
    }
    .metric-card .icon { font-size: 28px; margin-bottom: 8px; }
    .metric-card .value {
        font-size: 36px;
        font-weight: 800;
        color: #f1f4ff;
        line-height: 1.1;
        letter-spacing: -1px;
    }
    .metric-card .label {
        font-size: 12px;
        color: #8b91b0;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 600;
        margin-top: 4px;
    }
    .metric-card .trend {
        display: inline-block;
        margin-top: 10px;
        font-size: 12px;
        font-weight: 700;
        padding: 3px 12px;
        border-radius: 100px;
    }
    .trend-up   { background: rgba(16,185,129,0.12); color:#10b981; border:1px solid rgba(16,185,129,0.25); }
    .trend-down { background: rgba(239,68,68,0.12);  color:#ef4444; border:1px solid rgba(239,68,68,0.25); }
    .platform-header {
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.09);
        border-radius: 20px;
        padding: 28px 24px;
        margin-bottom: 28px;
        display: flex;
        align-items: center;
        gap: 16px;
    }
    .hero-title {
        font-size: 32px;
        font-weight: 800;
        background: linear-gradient(135deg, #f1f4ff, #a5b4fc);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: -1px;
        margin-bottom: 4px;
    }
    .hero-sub {
        color: #8b91b0;
        font-size: 14px;
    }
    .section-divider {
        border: none;
        border-top: 1px solid rgba(255,255,255,0.07);
        margin: 28px 0;
    }
    .stSelectbox label { color: #8b91b0 !important; font-weight: 600; font-size: 13px; }
    [data-testid="stSelectbox"] > div > div {
        background: rgba(255,255,255,0.05) !important;
        border: 1px solid rgba(255,255,255,0.1) !important;
        border-radius: 10px !important;
        color: #f1f4ff !important;
    }
</style>
""", unsafe_allow_html=True)

# ── Platform Data ─────────────────────────────────────────────
PLATFORMS: dict[str, dict] = {
    "Instagram": {
        "icon": "📸",
        "color_from": "#833AB4",
        "color_to": "#FD1D1D",
        "followers": 128_400,
        "engagement_rate": 4.7,
        "total_posts": 342,
        "weekly_growth": 3.2,
        "monthly_reach": 420_000,
        "impressions": 1_200_000,
        "link_clicks": 8_430,
        "top_content": "Reels",
    },
    "LinkedIn": {
        "icon": "💼",
        "color_from": "#0077B5",
        "color_to": "#00A0DC",
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
        "color_from": "#1DA1F2",
        "color_to": "#14171A",
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
        "color_from": "#1877F2",
        "color_to": "#0C5DC7",
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

def fmt(n: float, is_percent: bool = False) -> str:
    """Format number with K/M suffix or as percentage."""
    if is_percent:
        return f"{n:.1f}%"
    if n >= 1_000_000:
        return f"{n/1_000_000:.1f}M"
    if n >= 1_000:
        return f"{n/1_000:.1f}K"
    return str(int(n))


# ── Sidebar ───────────────────────────────────────────────────
with st.sidebar:
    st.markdown("### ⚡ SocialPulse")
    st.markdown("<p style='color:#8b91b0;font-size:13px;margin-top:-8px;'>Analytics Dashboard</p>", unsafe_allow_html=True)
    st.markdown("---")
    st.markdown("**Select Platform**")
    selected = st.selectbox(
        "Platform",
        list(PLATFORMS.keys()),
        label_visibility="collapsed",
    )
    st.markdown("---")
    st.markdown("**Overview**")
    for pname, pdata in PLATFORMS.items():
        icon = pdata["icon"]
        followers = fmt(pdata["followers"])
        st.markdown(f"{icon} **{pname}** — {followers} followers")
    st.markdown("---")
    st.caption("© 2026 SocialPulse · v1.0.0")


# ── Main Content ──────────────────────────────────────────────
data = PLATFORMS[selected]

# Platform Hero
gradient_css = f"background: linear-gradient(135deg, {data['color_from']}22, {data['color_to']}11); border: 1px solid {data['color_from']}44;"
st.markdown(f"""
<div class="platform-header" style="{gradient_css}">
    <span style="font-size:52px; line-height:1;">{data['icon']}</span>
    <div>
        <div class="hero-title">{selected}</div>
        <div class="hero-sub">Platform Analytics · March 2026</div>
    </div>
</div>
""", unsafe_allow_html=True)

# Core Metrics Row
col1, col2, col3 = st.columns(3)

with col1:
    st.markdown(f"""
    <div class="metric-card">
        <div class="bar" style="background: linear-gradient(90deg, {data['color_from']}, {data['color_to']});"></div>
        <div class="icon">👥</div>
        <div class="value">{fmt(data['followers'])}</div>
        <div class="label">Total Followers</div>
        <span class="trend trend-up">↑ +{data['weekly_growth']}% this week</span>
    </div>
    """, unsafe_allow_html=True)

with col2:
    er = data['engagement_rate']
    trend_class = "trend-up" if er >= 3.5 else "trend-down"
    trend_label = "↑ Above Average" if er >= 3.5 else "↓ Below Average"
    st.markdown(f"""
    <div class="metric-card">
        <div class="bar" style="background: linear-gradient(90deg, {data['color_from']}, {data['color_to']});"></div>
        <div class="icon">📈</div>
        <div class="value">{fmt(er, is_percent=True)}</div>
        <div class="label">Engagement Rate</div>
        <span class="trend {trend_class}">{trend_label}</span>
    </div>
    """, unsafe_allow_html=True)

with col3:
    st.markdown(f"""
    <div class="metric-card">
        <div class="bar" style="background: linear-gradient(90deg, {data['color_from']}, {data['color_to']});"></div>
        <div class="icon">📝</div>
        <div class="value">{fmt(data['total_posts'])}</div>
        <div class="label">Total Posts</div>
        <span class="trend trend-up">→ Steady Growth</span>
    </div>
    """, unsafe_allow_html=True)

st.markdown('<hr class="section-divider">', unsafe_allow_html=True)

# Extended Metrics Row
col4, col5, col6, col7 = st.columns(4)
cols = [col4, col5, col6, col7]
extras = [
    ("🌐", fmt(data['monthly_reach']), "Monthly Reach", "trend-up", "↑ Organic"),
    ("👁️", fmt(data['impressions']), "Impressions", "trend-up", "↑ Strong"),
    ("🔗", fmt(data['link_clicks']), "Link Clicks", "trend-up", "↑ Growing"),
    ("🏆", data['top_content'], "Top Content Type", "trend-up", "🔥 Trending"),
]

for col, (icon, val, label, tc, tr) in zip(cols, extras):
    with col:
        st.markdown(f"""
        <div class="metric-card">
            <div class="bar" style="background: linear-gradient(90deg, {data['color_from']}, {data['color_to']});"></div>
            <div class="icon">{icon}</div>
            <div class="value" style="font-size:26px;">{val}</div>
            <div class="label">{label}</div>
            <span class="trend {tc}">{tr}</span>
        </div>
        """, unsafe_allow_html=True)

st.markdown('<hr class="section-divider">', unsafe_allow_html=True)

# Engagement Chart
st.subheader("📊 Engagement Trend (Last 8 Weeks)")
weeks = [f"Wk {i}" for i in range(1, 9)]
base = data['engagement_rate']
chart_data = {
    "Week": weeks,
    "Engagement Rate (%)": [round(base + random.uniform(-0.8, 1.2), 2) for _ in range(8)],
}
import pandas as pd
df = pd.DataFrame(chart_data).set_index("Week")
st.line_chart(df, use_container_width=True, height=220)

# Posts Chart
st.subheader("📅 Posts Published (Last 8 Weeks)")
posts_data = {
    "Week": weeks,
    "Posts": [random.randint(3, max(4, data['total_posts'] // 40)) for _ in range(8)],
}
df_posts = pd.DataFrame(posts_data).set_index("Week")
st.bar_chart(df_posts, use_container_width=True, height=200)

st.markdown('<hr class="section-divider">', unsafe_allow_html=True)

# All Platforms Quick Compare
st.subheader("🔄 All Platforms — Quick Compare")
compare_rows = []
for pname, pdata in PLATFORMS.items():
    compare_rows.append({
        "Platform": f"{pdata['icon']} {pname}",
        "Followers": fmt(pdata["followers"]),
        "Engagement": fmt(pdata["engagement_rate"], is_percent=True),
        "Posts": fmt(pdata["total_posts"]),
        "Monthly Reach": fmt(pdata["monthly_reach"]),
        "Top Content": pdata["top_content"],
    })

df_compare = pd.DataFrame(compare_rows)
st.dataframe(df_compare, use_container_width=True, hide_index=True)
