"use strict";

var _dlob = function () {
	this.bodyRef = document.querySelector("body");

	this.workspace = document.createElement("div");
	this.workspace.style.position = "absolute";
	this.workspace.style.left = "0";
	this.workspace.style.top = "0";
	this.workspace.style.width = "0";
	this.workspace.style.height = "0";
	this.workspace.style.overflow = "visible";

	this.lastEventsCount = 0;
	this.shownEvent = null;

	this.bodyRef.appendChild(this.workspace);

	this.rootSpace = this.workspace;

	/* screen parameters */
	this.htmlRef = document.documentElement;
	this.panelRef = null;

	/* init */
	this._buildControlPanel();

	this._checkChanges();
};

_dlob.prototype._closeBookmarklet = function() {
	this.workspace.style.display = "none";;
};

_dlob.prototype._tableFromItem = function(item) {
	var table = document.createElement("table");
	table.style.textAlign = "left";
	table.style.width = "100%";
	var tableCode = "<tbody>";

	/*tableCode += '<tr><td colspan="2" style="font-weight: bold; background: #dfdfdf;">'+item["event"]+'</td></tr>';*/

	tableCode += '<tr><td colspan="2" style="font-weight: bold; background: #dfdfdf;">'+'Google Analytics'+'</td></tr>';

	for (var key in item) {
		tableCode += '<tr><td>'+key+'</td><td>'+item[key]+'</td></tr>';
	}
	tableCode += "</tbody>";
	table.innerHTML = tableCode;
	return table;
};

_dlob.prototype._showLatest = function() {
	this.itemViewer.innerHTML = "";
	this.itemViewer.appendChild(this._tableFromItem(window.dataLayer[0]));
	this.shownEvent = window.dataLayer[0];
};

_dlob.prototype._checkChanges = function() {
	var count = window.dataLayer.length;
	if (count > this.lastEventsCount) {
		this._showLatest();
		this.lastEventsCount = count;
	}
};

_dlob.prototype._closeBtn = function(evt) {
	this.btnPoll.textContent = "Close Bookmarklet";
};

_dlob.prototype.__makeButton = function() {
	var btn = document.createElement("span");
	btn.style.display = "inline-block";
	btn.style.margin = "2px";
	btn.style.padding = "3px 5px";
	btn.style.background = "#333";
	btn.style.color = "#efefef";
	btn.style.cursor = "pointer";
	btn.style.borderRadius = "3px";
	btn.style.boxShadow = "0 0 2px #ccc";

	return btn;
};

_dlob.prototype.__makeSmallButton = function() {
	var btn = document.createElement("span");
	btn.style.display = "inline-block";
	btn.style.margin = "2px";
	btn.style.padding = "2px";
	btn.style.background = "#333";
	btn.style.color = "#efefef";
	btn.style.cursor = "pointer";
	btn.style.borderRadius = "2px";
	btn.style.boxShadow = "0 0 2px #ccc";
	btn.style.width = "8px";
	btn.style.height = "8px";

	return btn;
};

/* build control panel */
_dlob.prototype._buildControlPanel = function() {
	var panel = document.createElement("div");
		panel.setAttribute("id","_dlob");
		panel.style.fontFamily = "Verdana, Geneva, sans-serif";
		panel.style.fontSize = "12px";
		panel.style.position = "fixed";
		panel.style.background = "rgba(200,200,200,0.95)";
		panel.style.border = "1px dashed #999";
		panel.style.width = "100%";
		panel.style.maxWidth = "450px";
		panel.style.height = "400px";
		panel.style.left = "2px";
		panel.style.top = "2px";
		panel.style.borderRadius = "4px";
		panel.style.zIndex  = 99999;
		panel.style.boxShadow  = "0 0 4px #ccc";
		panel.style.padding = "10px";
		panel.style.textAlign = "center";

	var headLine = document.createElement("div");
		headLine.textContent = "Made By: Kaushal Shah";
		headLine.style.color = "#555";
		headLine.style.textAlign = "center";
		headLine.style.fontSize = "12px";
		headLine.style.paddingBottom = "10px";

	var itemViewer = document.createElement("div");
		itemViewer.style.width = "100%";
		itemViewer.style.height = "300px";
		itemViewer.style.overflow = "scroll";
		itemViewer.style.background = "rgba(255,255,255,0.95)";
		itemViewer.style.color = "rgb(0,0,0)";
		itemViewer.style.marginBottom = "5px";
	this.itemViewer = itemViewer;

	var bmClose = this.__makeButton();
		bmClose.innerHTML = "<big>Close Bookmarklet</big>";
		bmClose.addEventListener("click", this._closeBookmarklet.bind(this), false);
	this.bmClose = bmClose;

	var delimiter = document.createElement("hr");

	/* panel position buttons */
	var tlBtn = this.__makeSmallButton();
	var trBtn = this.__makeSmallButton();
	var blBtn = this.__makeSmallButton();
	var brBtn = this.__makeSmallButton();

		tlBtn.textContent = "˹";
		tlBtn.style.position = "absolute";
		tlBtn.style.lineHeight = "10px";
		tlBtn.style.left = "2px";
		tlBtn.style.top = "2px";
		tlBtn.addEventListener("click", this._setPanelPosition.bind(this,  "tl"));

		trBtn.textContent = "˺";
		trBtn.style.position = "absolute";
		trBtn.style.lineHeight = "10px";
		trBtn.style.right = "2px";
		trBtn.style.top = "2px";
		trBtn.style.textAlign = "right";
		trBtn.addEventListener("click", this._setPanelPosition.bind(this,  "tr"));

		blBtn.textContent = "˻";
		blBtn.style.position = "absolute";
		blBtn.style.lineHeight = "0px";
		blBtn.style.left = "2px";
		blBtn.style.bottom = "2px";
		blBtn.addEventListener("click", this._setPanelPosition.bind(this,  "bl"));

		brBtn.textContent = "˼";
		brBtn.style.position = "absolute";
		brBtn.style.lineHeight = "0px";
		brBtn.style.right = "2px";
		brBtn.style.bottom = "2px";
		brBtn.style.textAlign = "right";
		brBtn.addEventListener("click", this._setPanelPosition.bind(this, "br"));

	panel.appendChild(tlBtn);
	panel.appendChild(trBtn);
	panel.appendChild(blBtn);
	panel.appendChild(brBtn);

	panel.appendChild(headLine);

	panel.appendChild(itemViewer);

	panel.appendChild(bmClose);

	this.panelRef = panel;

	this.rootSpace.appendChild(panel);
};

_dlob.prototype._setPanelPosition = function(pos) {
	var panel = this.panelRef;

	/* panel position reset */
	panel.style.left = "auto";
	panel.style.right = "auto";
	panel.style.top = "auto";
	panel.style.bottom = "auto";

	switch (pos) {
		case "tl": panel.style.top = "2px";
				   panel.style.left = "2px";
			break;
		case "tr": panel.style.top = "2px";
				   panel.style.right = "2px";
			break;
		case "bl": panel.style.bottom = "2px";
				   panel.style.left = "2px";
			break;
		case "br": panel.style.bottom = "2px";
				   panel.style.right = "2px";
			break;
		default:   panel.style.top = "2px";
				   panel.style.left = "2px";
	}
};

/* build controls */
setTimeout(function(){
	/* construct dlob class */
	window._dlob = new _dlob();
}, 500);


void(0);