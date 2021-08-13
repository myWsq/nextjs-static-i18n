import { AppProps } from "next/app";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import { I18nProps } from "./i18n-server";
import Link, { LinkProps } from "next/link";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

export function withStaticI18n(App: (props: AppProps) => any) {
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
          // ssr doesn't support'
          useSuspense: false,
        },
        // load resource synchronously
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

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type StaticI18LinkProps = PartialBy<LinkProps, "href">;

export function StaticI18nLink(
  props: React.PropsWithChildren<StaticI18LinkProps>
) {
  const { i18n } = useTranslation();
  const router = useRouter();

  const locale = props.locale || i18n.language || "";
  if (!locale) {
    const href = props.href || router.asPath;
    return <Link {...props} href={href}></Link>;
  } else {
    const href = props.href
      ? `/${locale}${props.href}`
      : router.pathname.replace("[locale]", locale);
    return <Link {...props} href={href} locale={undefined}></Link>;
  }
}
