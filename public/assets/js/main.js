(function () {
  "use strict";

  /* ── Booking form ── */
  var form = document.getElementById("booking-form");

  var PRICES = { weekly: 75, deep: 150, repair: 0 };
  var SIZE_MULT = { small: 0.85, medium: 1, large: 1.25 };
  var TAX_RATE = 0.08;

  function getSelected(name) {
    var el = form && form.querySelector('[name="' + name + '"]:checked');
    return el ? el.value : null;
  }

  function updateSummary() {
    if (!form) return;
    var size = getSelected("pool_size") || "medium";
    var service = getSelected("service_type") || "deep";
    var labels = { small: "Small", medium: "Medium", large: "Large" };
    var serviceLabels = { weekly: "Weekly Maintenance", deep: "One-time Deep Clean", repair: "Equipment Repair" };
    var base = (PRICES[service] || 0) * (SIZE_MULT[size] || 1);
    var tax = base * TAX_RATE;

    var get = function (id) { return document.getElementById(id); };
    if (get("summary-size")) get("summary-size").textContent = labels[size] || size;
    if (get("summary-service")) get("summary-service").textContent = serviceLabels[service] || service;
    if (service === "repair") {
      if (get("summary-rate")) get("summary-rate").textContent = "By quote";
      if (get("summary-tax")) get("summary-tax").textContent = "—";
      if (get("summary-total")) get("summary-total").textContent = "By quote";
    } else {
      if (get("summary-rate")) get("summary-rate").textContent = "$" + base.toFixed(2);
      if (get("summary-tax")) get("summary-tax").textContent = "$" + tax.toFixed(2);
      if (get("summary-total")) get("summary-total").textContent = "$" + (base + tax).toFixed(2);
    }
  }

  if (form) {
    form.querySelectorAll('input[type="radio"]').forEach(function (r) {
      r.addEventListener("change", updateSummary);
    });
    updateSummary();

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      var errBox = document.getElementById("booking-error");
      if (errBox) { errBox.classList.add("hidden"); errBox.textContent = ""; }
      var btn = form.querySelector('[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = "Submitting…"; }

      var q = function (id) { return (form.querySelector(id) || {}).value || ""; };
      var data = {
        pool_size: getSelected("pool_size"),
        service_type: getSelected("service_type"),
        preferred_date: q("#preferred-date"),
        preferred_window: q("#preferred-window"),
        full_name: q("#full-name"),
        email: q("#email"),
        phone: q("#phone"),
        address: q("#address"),
      };

      if (!data.full_name || !data.email || !data.preferred_date) {
        if (errBox) { errBox.textContent = "Please fill in your name, email, and preferred date."; errBox.classList.remove("hidden"); }
        if (btn) { btn.disabled = false; btn.textContent = "Confirm Booking"; }
        return;
      }

      try {
        var res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          sessionStorage.setItem("booking_date", data.preferred_date);
          sessionStorage.setItem("booking_window", data.preferred_window);
          window.location.href = "/confirmed";
        } else {
          var err = await res.json().catch(function () { return {}; });
          throw new Error(err.error || "Booking failed.");
        }
      } catch (err) {
        if (errBox) { errBox.textContent = err.message || "Network error."; errBox.classList.remove("hidden"); }
        if (btn) { btn.disabled = false; btn.textContent = "Confirm Booking"; }
      }
    });
  }

  /* ── Confirmed page — populate details from sessionStorage ── */
  var dateEl = document.getElementById("conf-date");
  var winEl = document.getElementById("conf-window");
  if (dateEl) {
    var d = sessionStorage.getItem("booking_date");
    if (d) dateEl.textContent = new Date(d + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    sessionStorage.removeItem("booking_date");
  }
  if (winEl) {
    var wmap = { morning: "Morning (8 AM – 12 PM)", afternoon: "Afternoon (12 PM – 4 PM)", evening: "Evening (4 PM – 7 PM)" };
    var w = sessionStorage.getItem("booking_window");
    if (w && wmap[w]) winEl.textContent = wmap[w];
    sessionStorage.removeItem("booking_window");
  }
})();
