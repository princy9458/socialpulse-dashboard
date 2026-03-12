import ReactGA from "react-ga4";

export const initAnalytics = () => {
  ReactGA.initialize("G-1VZ3KTF77X");
};

export const trackPageView = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
  });
};
