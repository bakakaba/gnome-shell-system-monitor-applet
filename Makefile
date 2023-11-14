UUID = gnome-system-monitor@tinkerer.space

help:
	@echo  '  make [install|remove] - For local testing'
	@echo  '  test                  - Run nested Wayland instance'

install:
	ln -s ~/projects/gnome-shell-system-monitor-applet/dist/$(UUID) ~/.local/share/gnome-shell/extensions/

remove:
	rm ~/.local/share/gnome-shell/extensions/$(UUID)

clean:
	rm -rf dist

build:
	cp ./metadata.json ./dist/gnome-system-monitor@tinkerer.space
	npm run compile

watch:
	cp ./metadata.json ./dist/gnome-system-monitor@tinkerer.space
	npm run compile -- --watch

test:
	MUTTER_DEBUG_DUMMY_MODE_SPECS=1920x1080@60 \
	dbus-run-session -- gnome-shell --nested --wayland

log:
	journalctl -f /usr/bin/gnome-shell

.PHONY: help install remove test log
