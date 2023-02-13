const { getInputSourceManager } = imports.ui.status.keyboard
const Main = imports.ui.main;

let _switch2default;
let _switch2prev;
let _prevSource;
let _inputSourceManager = getInputSourceManager()

function switchSource(index) {
	let { inputSources } = _inputSourceManager;
	inputSources[index].activate();
}

function init() {
}

function enable() {
	_switch2default = Main.overview.connect('showing', () => {
		_prevSource = _inputSourceManager.currentSource.index;
		switchSource(0);
	});
	_switch2prev = Main.overview.connect('hiding', () => switchSource(_prevSource));
}

function disable() {
	Main.overview.disconnect(_switch2default);
	Main.overview.disconnect(_switch2prev);
}
