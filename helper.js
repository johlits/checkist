function getTimeDiff(ms) {
	var seconds = Math.floor((new Date() - ms) / 1000);
	if (seconds === 1) {
		return seconds + " second ago";
	}
	if (seconds < 60) {
		return seconds + " seconds ago";
	}
	var minutes = Math.floor(seconds / 60);
	if (minutes === 1) {
		return minutes + " minute ago";
	}
	if (minutes < 60) {
		return minutes + " minutes ago";
	}
	var hours = Math.floor(minutes / 60);
	if (hours === 1) {
		return hours + " hour ago";
	}
	if (hours < 24) {
		return hours + " hours ago";
	}
	var days = Math.floor(hours / 24);
	if (days === 1) {
		return days + " day ago";
	}
	if (days < 7) {
		return days + " days ago";
	}
	var weeks = Math.floor(days / 7);
	if (weeks === 1) {
		return weeks + " week ago";
	}
	if (weeks < 52) {
		return weeks + " weeks ago";
	}
	var years = Math.floor(weeks / 52);
	if (years === 1) {
		return years + " year ago";
	}
	return years + " years ago";
}
module.exports = {
    getTimeDiff: getTimeDiff
}