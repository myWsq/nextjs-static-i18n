import { AppProps } from "next/app";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import { I18nProps } from "./i18n-server";

export function withI18n(App: (props: AppProps) => any) {
  return (props: AppProps) => {
    const { _i18n } = props.pageProps as I18nProps;

    if (_i18n) {
      const instance = i18n.createInstance({
        lng: _i18n.locale,
        resources: _i18n.resource,
        react: {
          useSuspense: false,
        },
        initImmediate: true,
      });

      instance.init();

      return (
        <I18nextProvider i18n={instance}>
          <App {...props}></App>
        </I18nextProvider>
      );
    } else {
      return <App {...props}></App>;
    }
  };
}
