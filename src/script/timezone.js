function getNearestTimezone(cur_lat, cur_long, country_code = '') {
    const time_zones = country_code ?
        Intl.DateTimeFormat(undefined, { timeZone: country_code }).resolvedOptions().timeZone :
        Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (Array.isArray(time_zones) && time_zones.length > 0) {
        let closest_timezone = '';
        let min_distance = Infinity;

        if (time_zones.length === 1) {
            closest_timezone = time_zones[0];
        } else {
            for (const timezone_id of time_zones) {
                const timezone = Intl.DateTimeFormat(undefined, { timeZone: timezone_id });
                const location = timezone.resolvedOptions().timeZone;
                const tz_lat = parseFloat(location.split(' ')[0]);
                const tz_long = parseFloat(location.split(' ')[1]);

                const theta = cur_long - tz_long;
                let distance = Math.acos(
                    Math.sin(deg2rad(cur_lat)) * Math.sin(deg2rad(tz_lat)) +
                    Math.cos(deg2rad(cur_lat)) * Math.cos(deg2rad(tz_lat)) * Math.cos(deg2rad(theta))
                );
                distance = rad2deg(distance);

                if (distance < min_distance) {
                    closest_timezone = timezone_id;
                    min_distance = distance;
                }
            }
        }
        return closest_timezone;
    }
    return "Europe/Paris";  // Fallback to default timezone
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

function rad2deg(rad) {
    return rad * (180 / Math.PI);
}

export default getNearestTimezone;