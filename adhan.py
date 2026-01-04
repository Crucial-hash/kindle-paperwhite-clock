import time as time_module
from datetime import datetime, timedelta, time

import requests

API_URL = "https://api.aladhan.com/v1/timingsByCity"
LOCATION = {"city": "Slough", "country": "United Kingdom", "method": 3}
UPDATE_INTERVAL_SECONDS = 60


def parse_time(value: str) -> time:
    """Extract HH:MM into a datetime.time, ignoring any timezone suffixes."""
    clean = value.split("(")[0].strip()
    hour_str, minute_str = clean.split(":")[:2]
    return time(int(hour_str), int(minute_str))


def fetch_prayer_times():
    resp = requests.get(API_URL, params=LOCATION, timeout=10)
    resp.raise_for_status()
    timings = resp.json()["data"]["timings"]
    return {
        "Fajr": parse_time(timings["Fajr"]),
        "Sunrise": parse_time(timings["Sunrise"]),
        "Zuhr": parse_time(timings["Dhuhr"]),
        "Asr": parse_time(timings["Asr"]),
        "Maghrib": parse_time(timings["Maghrib"]),
        "Isha": parse_time(timings["Isha"]),
    }


def next_event(now: datetime, schedule: dict[str, time], order: list[str]):
    today = now.date()
    for name in order:
        candidate = datetime.combine(today, schedule[name])
        if candidate > now:
            return name, candidate
    # wrap to the first event tomorrow
    first_name = order[0]
    return first_name, datetime.combine(today + timedelta(days=1), schedule[first_name])


def write_single(filename: str, value):
    with open(filename, "w", encoding="utf-8") as file:
        file.write(f"{value}\n")


def main():
    while True:
        try:
            timings = fetch_prayer_times()
            now = datetime.now()
            ordered_prayers = ["Fajr", "Zuhr", "Asr", "Maghrib", "Isha"]

            next_prayer_name, next_prayer_dt = next_event(now, timings, ordered_prayers)
            diff = next_prayer_dt - now
            diff_seconds = int(diff.total_seconds())

            # Sun state: sunrise first, then sunset
            sun_order = ["Sunrise", "Maghrib"]
            sun_state, sun_dt = next_event(now, timings, sun_order)
            sun_diff = sun_dt - now
            sun_diff_seconds = int(sun_diff.total_seconds())

            write_single("name.txt", next_prayer_name)
            write_single("hours.txt", diff_seconds // 3600)
            write_single("minutes.txt", (diff_seconds % 3600) // 60)

            write_single("sunstate.txt", "Sunrise" if sun_state == "Sunrise" else "Sunset")
            write_single("sunhours.txt", sun_diff_seconds // 3600)
            write_single("sunminutes.txt", (sun_diff_seconds % 3600) // 60)

            print("finished")
        except Exception as exc:
            print(f"error: {exc}")

        time_module.sleep(UPDATE_INTERVAL_SECONDS)


if __name__ == "__main__":
    main()
