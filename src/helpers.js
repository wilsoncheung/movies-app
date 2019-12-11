// import moment from "moment"

export default {
    convertToDuration(minutes) {
        return minutes
            ? Math.floor(minutes / 60) + "h " + (minutes % 60) + "min"
            : "??";
    },
    truncateText(text) {
        return text.length <= 500
            ? text
            : text.substring(0, 500) + "...";
    },
    underscoreText(text) {
        return text.replace(' ', '_');
    }
}