/* Shared data layer — plain JS (no JSX), loaded before the Babel page scripts. */
(function () {
  const KEYS = {
    subjects: "sf_subjects",
    sessions: "sf_sessions",
    videos: "sf_videos",
  };

  // "Fountain pen ink" palette — muted, ledger-appropriate, not bright SaaS hues.
  const SUBJECT_COLORS = ["#1d4f91", "#2e6f6e", "#8a3b3b", "#5b4b8a", "#7a5c1e", "#3f5e3a", "#4b5d67", "#1f4d3d"];

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function todayISO() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function ensureSeed() {
    let subjects = read(KEYS.subjects, null);
    if (!subjects) {
      subjects = [{ id: uid(), name: "General Study", color: SUBJECT_COLORS[0] }];
      write(KEYS.subjects, subjects);
    }
    if (!read(KEYS.sessions, null)) write(KEYS.sessions, []);
    if (!read(KEYS.videos, null)) write(KEYS.videos, []);
  }
  ensureSeed();

  function nextColor() {
    const subjects = read(KEYS.subjects, []);
    return SUBJECT_COLORS[subjects.length % SUBJECT_COLORS.length];
  }

  function extractYouTubeId(url) {
    if (!url) return null;
    const patterns = [
      /youtube\.com\/watch\?(?:.*&)?v=([\w-]{11})/,
      /(?:youtu\.be\/)([\w-]{11})/,
      /(?:youtube\.com\/embed\/)([\w-]{11})/,
      /(?:youtube\.com\/shorts\/)([\w-]{11})/,
    ];
    for (const p of patterns) {
      const m = url.match(p);
      if (m) return m[1];
    }
    return null;
  }

  function formatMinutes(totalMinutes) {
    const m = Math.round(totalMinutes);
    const h = Math.floor(m / 60);
    const rem = m % 60;
    if (h === 0) return rem + "m";
    if (rem === 0) return h + "h";
    return h + "h " + rem + "m";
  }

  function formatHoursDecimal(totalMinutes) {
    return (totalMinutes / 60).toFixed(1);
  }

  function daysAgoISO(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function getStreak(sessions) {
    const days = new Set(sessions.map((s) => s.date));
    let streak = 0;
    let cursor = todayISO();
    // if nothing logged today, streak can still count from yesterday backwards
    if (!days.has(cursor)) {
      cursor = daysAgoISO(1);
    }
    while (days.has(cursor)) {
      streak++;
      const [y, m, d] = cursor.split("-").map(Number);
      const dt = new Date(y, m - 1, d - 1);
      cursor = dt.getFullYear() + "-" + String(dt.getMonth() + 1).padStart(2, "0") + "-" + String(dt.getDate()).padStart(2, "0");
    }
    return streak;
  }

  const Store = {
    uid,
    todayISO,
    daysAgoISO,
    formatMinutes,
    formatHoursDecimal,
    extractYouTubeId,
    getStreak,

    getSubjects() {
      return read(KEYS.subjects, []);
    },
    addSubject(name) {
      const subjects = read(KEYS.subjects, []);
      const subject = { id: uid(), name: name.trim(), color: nextColor() };
      subjects.push(subject);
      write(KEYS.subjects, subjects);
      return subject;
    },
    deleteSubject(id) {
      write(KEYS.subjects, read(KEYS.subjects, []).filter((s) => s.id !== id));
    },
    getSubject(id) {
      return read(KEYS.subjects, []).find((s) => s.id === id);
    },

    getSessions() {
      return read(KEYS.sessions, []).sort((a, b) => (b.date + b.createdAt).localeCompare(a.date + a.createdAt));
    },
    addSession({ subjectId, minutes, date, note }) {
      const sessions = read(KEYS.sessions, []);
      const session = { id: uid(), subjectId, minutes: Math.round(minutes), date: date || todayISO(), note: note || "", createdAt: Date.now() };
      sessions.push(session);
      write(KEYS.sessions, sessions);
      return session;
    },
    deleteSession(id) {
      write(KEYS.sessions, read(KEYS.sessions, []).filter((s) => s.id !== id));
    },

    getVideos() {
      return read(KEYS.videos, []).sort((a, b) => b.addedAt - a.addedAt);
    },
    addVideo({ url, title, notes, tags, subjectId, rating }) {
      const videoId = extractYouTubeId(url);
      if (!videoId) return null;
      const videos = read(KEYS.videos, []);
      const video = {
        id: uid(),
        url,
        videoId,
        title: title && title.trim() ? title.trim() : "Untitled video",
        notes: notes || "",
        tags: tags || [],
        subjectId: subjectId || null,
        rating: rating || 0,
        addedAt: Date.now(),
      };
      videos.push(video);
      write(KEYS.videos, videos);
      return video;
    },
    updateVideo(id, patch) {
      const videos = read(KEYS.videos, []);
      const idx = videos.findIndex((v) => v.id === id);
      if (idx === -1) return;
      videos[idx] = { ...videos[idx], ...patch };
      write(KEYS.videos, videos);
    },
    deleteVideo(id) {
      write(KEYS.videos, read(KEYS.videos, []).filter((v) => v.id !== id));
    },

    // Aggregations
    totalMinutes(sessions) {
      return sessions.reduce((sum, s) => sum + s.minutes, 0);
    },
    minutesToday(sessions) {
      const today = todayISO();
      return sessions.filter((s) => s.date === today).reduce((sum, s) => sum + s.minutes, 0);
    },
    minutesThisWeek(sessions) {
      const cutoff = daysAgoISO(6);
      return sessions.filter((s) => s.date >= cutoff).reduce((sum, s) => sum + s.minutes, 0);
    },
    byDay(sessions, numDays) {
      const out = [];
      for (let i = numDays - 1; i >= 0; i--) {
        const date = daysAgoISO(i);
        const minutes = sessions.filter((s) => s.date === date).reduce((sum, s) => sum + s.minutes, 0);
        out.push({ date, minutes });
      }
      return out;
    },
    bySubject(sessions, subjects) {
      return subjects
        .map((subj) => ({
          subject: subj,
          minutes: sessions.filter((s) => s.subjectId === subj.id).reduce((sum, s) => sum + s.minutes, 0),
        }))
        .sort((a, b) => b.minutes - a.minutes);
    },
  };

  window.Store = Store;
})();
