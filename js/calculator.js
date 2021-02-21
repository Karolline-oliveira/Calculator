const oCalculator = {
	jqContainer: null,
	jqDisplay: null,
	LastButtonValue: null,
	Result: 0,
	NumberTyped: null,
	BufferNumberTyped: "",
	OperatorTyped: null,

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
		const sDataValue = psDataValue.toUpperCase();

		switch (sDataValue) {
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				this.AddCharacter(sDataValue);
				break;

			case ".":
				this.AddDecimal();
				break;
			case "+":
			case "-":
			case "*":
			case "/":
				this.AddOperator(sDataValue);
				break;
			case "=":
				this.ShowResult();
				break;
			case "AC":
				if (this.LastButtonValue == "AC") {
					this.Reset();
				} else {
					this.Clear();
					this.SetDisplay(0);
				}
				this.Clear();
				break;
		}

		this.LastButtonValue = sDataValue;
	},

	AddCharacter(psDataValue) {
		switch (this.LastButtonValue) {
			case "=":
				this.Reset();
				break;

			case "+":
			case "-":
			case "*":
			case "/":
				this.ShowResult();
				break;
		}
		this.BufferNumberTyped = this.BufferNumberTyped + psDataValue;
		this.NumberTyped = parseFloat(this.BufferNumberTyped);
		this.SetDisplay(this.BufferNumberTyped);
	},

	AddDecimal() {
		if (this.BufferNumberTyped.indexOf(".") == -1) {
			if (this.BufferNumberTyped == "") {
				this.AddCharacter("0.");
			} else {
				this.AddCharacter(".");
			}
		}
	},

	AddOperator(psDataValue) {
		if (this.LastButtonValue != "=") {
			this.ShowResult();
		}
		this.OperatorTyped = psDataValue;
		this.Clear();
	},

	ShowResult() {
		if (this.OperatorTyped == null) {
			this.Result = this.NumberTyped;
		} else if (this.NumberTyped != null && this.OperatorTyped != null) {
			this.Result = eval(`${this.Result} ${this.OperatorTyped} ${this.NumberTyped}`);

			this.SetDisplay(this.Result);
		}
	},

	Clear() {
		this.BufferNumberTyped = "";
		this.NumberTyped = null;
	},

	Reset() {
		this.Clear();
		this.Result = 0;
		this.OperatorTyped = null;
	},

	SetDisplay(psValue) {
		this.jqDisplay.html(psValue);
	},
};
