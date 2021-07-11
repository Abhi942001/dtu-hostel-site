import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		dark: true,
		themes: {
			dark: {
				primary: colors.cyan.lighten3,
				secondary: colors.cyan.darken4,
				text: colors.cyan.lighten2,
			},
		},
		options: {
			customProperties: true,
		},
	},
});
