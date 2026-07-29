/* Shared nav bar — plain JS using React.createElement (no JSX, no Babel needed). */
(function () {
  const h = React.createElement;

  const ICONS = {
    home: h(
      "svg",
      { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" },
      h("path", { d: "M3 11.5 12 4l9 7.5" }),
      h("path", { d: "M5 10v9.5a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" })
    ),
    clock: h(
      "svg",
      { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" },
      h("circle", { cx: 12, cy: 12, r: 9 }),
      h("path", { d: "M12 7v5l3.5 2" })
    ),
    play: h(
      "svg",
      { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" },
      h("rect", { x: 3, y: 5, width: 18, height: 14, rx: 3 }),
      h("path", { d: "M10.5 9.5v5l4.5-2.5-4.5-2.5Z", fill: "currentColor", stroke: "none" })
    ),
    chart: h(
      "svg",
      { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" },
      h("path", { d: "M4 20V10" }),
      h("path", { d: "M11 20V4" }),
      h("path", { d: "M18 20v-7" })
    ),
  };

  const LINKS = [
    { key: "dashboard", href: "index.html", label: "Dashboard", icon: ICONS.home },
    { key: "log", href: "log.html", label: "Study Log", icon: ICONS.clock },
    { key: "videos", href: "videos.html", label: "Videos", icon: ICONS.play },
    { key: "stats", href: "stats.html", label: "Stats", icon: ICONS.chart },
  ];

  function Nav(active) {
    return h(
      "header",
      { className: "sf-nav" },
      h(
        "div",
        { className: "sf-nav-inner" },
        h(
          "a",
          { className: "sf-brand", href: "index.html" },
          h("span", { className: "sf-brand-mark" }),
          h("span", { className: "sf-brand-text" }, "Studyflow")
        ),
        h(
          "nav",
          { className: "sf-links" },
          LINKS.map((l) =>
            h(
              "a",
              { key: l.key, href: l.href, className: "sf-link" + (l.key === active ? " active" : "") },
              h("span", { className: "sf-link-icon" }, l.icon),
              h("span", null, l.label)
            )
          )
        )
      )
    );
  }

  window.SFNav = Nav;
})();
