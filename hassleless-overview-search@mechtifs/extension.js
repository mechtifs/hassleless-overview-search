const { getInputSourceManager } = imports.ui.status.keyboard
const Main = imports.ui.main;

class Extension {
	constructor() {}

	set source(index) {
		this._inputSourceManager.inputSources[index].activate();
	}

	enable() {
		this._inputSourceManager = getInputSourceManager();
		Main.overview.connectObject(
			'showing', () => (
				this._source = this._inputSourceManager.currentSource.index,
				this.source = 0
			),
			'hiding', () => (this.source = this._source), this);
	}

	disable() {
		Main.overview.disconnectObject(this);
	}
}

function init() {
	return new Extension();
}
