const oCalculator = {
	jqContainer: null,
	jqDisplay: null,
	Load() {
		this.jqContainer = $("#jqCalculator");
		if (this.jqContainer.length > 0) {
			this.jqDisplay = this.jqContainer.find("label:first");
			this.LoadEvents();
		}
	},

	LoadEvents() {
		const oThis = this;

		this.jqContainer.on("click", "button", function () {
			oThis.CheckButtonClicked($(this).attr("data-value"));
		});
	},
	CheckButtonClicked(psDataValue) {
		console.log(psDataValue);
	},
	SetDisplay(psValue) {
		this.jqDisplay.html(psValue);
	},
};
