import { AppProps } from "next/app";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import { I18nProps } from "./i18n-server";
import Link, { LinkProps } from "next/link";
import { useTranslation } from "react-i18next";

export function withI18n(App: (props: AppProps) => any) {
  return (props: AppProps) => {
    const { _i18n } = props.pageProps as I18nProps;

    if (_i18n) {
      const { locale, resource } = _i18n;

      const instance = i18n.createInstance({
        lng: locale,
        resources: {
          [locale]: resource,
        },
        react: {
          // SSR 不支持
          useSuspense: false,
        },
        // 同步加载资源
        initImmediate: false,
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

export function StaticI18nLink(props: React.PropsWithChildren<LinkProps>) {
  const { i18n } = useTranslation();
  const locale = props.locale || i18n.language || "";
  if (!locale) {
    return <Link {...props}></Link>;
  } else {
    return (
      <Link
        {...props}
        href={`/${locale}${props.href}`}
        locale={undefined}
      ></Link>
    );
  }
}
