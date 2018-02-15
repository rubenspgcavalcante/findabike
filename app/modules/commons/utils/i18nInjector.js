import en from "react-intl/locale-data/en";
import pt from "react-intl/locale-data/pt";
import * as moment from "moment/moment";
import { language } from "./locale";
import { addLocaleData } from "react-intl";

export default (() => {
  const modResolver = module => module.default;
  addLocaleData([...en, ...pt]);

  switch (language) {
    case 'pt':
    case 'pt-BR':
      import("moment/locale/pt-br").then( () => moment.locale('pt-br'));
      return () => import(/* webpackChunkName: "i18n.pt-BR" */'i18n/pt-BR').then(modResolver);

    default:
      return () => import(/* webpackChunkName: "i18n.en" */ 'i18n/en').then(modResolver);
  }
})();