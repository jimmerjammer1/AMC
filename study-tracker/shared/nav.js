/* Shared nav bar — plain JS using React.createElement (no JSX, no Babel needed). */
(function () {
  const h = React.createElement;

  const LINKS = [
    { key: "dashboard", href: "index.html", label: "Dashboard", no: "01" },
    { key: "log", href: "log.html", label: "Study Log", no: "02" },
    { key: "videos", href: "videos.html", label: "Videos", no: "03" },
    { key: "stats", href: "stats.html", label: "Stats", no: "04" },
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
          h("span", { className: "sf-brand-mark" }, "LOG"),
          h("span", { className: "sf-brand-text" }, "Studyflow")
        ),
        h(
          "nav",
          { className: "sf-links" },
          LINKS.map((l) =>
            h(
              "a",
              { key: l.key, href: l.href, className: "sf-link" + (l.key === active ? " active" : ""), "aria-label": l.label },
              h("span", { className: "sf-link-icon" }, l.no),
              h("span", null, l.label)
            )
          )
        )
      )
    );
  }

  window.SFNav = Nav;
})();
