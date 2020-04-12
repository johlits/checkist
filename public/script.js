function clickListItem(element) {
	var chk = $("#" + element)[0];
    chk.checked = !chk.checked;
	console.log(chk.checked);
	var row = $("#tr" + element);
	if (chk.checked) {
		row.removeClass("table-dark");
		row.addClass("table-primary");
	}
	else {
		row.removeClass("table-primary");
		row.addClass("table-dark");
	}
}