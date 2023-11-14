import St from "gi://St";

export class Graph {
  private area;

  constructor(width: number, height: number) {
    // this.menu_item = '';
    this.area = new St.DrawingArea({ reactive: false });
    // this.width = width;
    // this.height = height;
    // this.gtop = new GTop.glibtop_fsusage();
    // this.colors = ['#888', '#aaa', '#ccc'];
    // for (let color in this.colors) {
    //     this.colors[color] = color_from_string(this.colors[color]);
    // }

    // let themeContext = St.ThemeContext.get_for_stage(global.stage);
    // themeContext.connect('notify::scale-factor', this.set_scale.bind(this));
    // this.scale_factor = themeContext.scale_factor;
    // let interfaceSettings = new Gio.Settings({
    //     schema: 'org.gnome.desktop.interface'
    // });
    // interfaceSettings.connect('changed', this.set_text_scaling.bind(this));
    // this.text_scaling = interfaceSettings.get_double('text-scaling-factor');
    // if (!this.text_scaling) {
    //     this.text_scaling = 1;
    // }

    // this.actor.set_width(this.width * this.scale_factor * this.text_scaling);
    // this.actor.set_height(this.height * this.scale_factor * this.text_scaling);
    // this.actor.connect('repaint', this._draw.bind(this));
  }
  // create_menu_item() {
  //     this.menu_item = new PopupMenu.PopupBaseMenuItem({reactive: false});
  //     if (shell_Version < '3.36') {
  //         this.menu_item.actor.add(this.actor, {span: -1, expand: true});
  //     } else {
  //         this.menu_item.actor.add_child(this.actor);
  //     }
  //     // tray.menu.addMenuItem(this.menu_item);
  // }
  // show(visible) {
  //     this.menu_item.actor.visible = visible;
  // }
  // set_scale(themeContext) {
  //     this.scale_factor = themeContext.scale_factor;
  //     this.actor.set_width(this.width * this.scale_factor * this.text_scaling);
  //     this.actor.set_height(this.height * this.scale_factor * this.text_scaling);
  // }
  // set_text_scaling(interfaceSettings, key) {
  //     // FIXME: for some reason we only get this signal once, not on later
  //     // changes to the setting
  //     //log('[System monitor] got text scaling signal');
  //     this.text_scaling = interfaceSettings.get_double(key);
  //     this.actor.set_width(this.width * this.scale_factor * this.text_scaling);
  //     this.actor.set_height(this.height * this.scale_factor * this.text_scaling);
  // }
}
