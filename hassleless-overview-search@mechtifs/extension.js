import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import { getInputSourceManager } from 'resource:///org/gnome/shell/ui/status/keyboard.js';

export default class HasslelessOverviewSearchExtension extends Extension {
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
