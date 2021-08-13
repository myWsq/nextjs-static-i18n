import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import glob from "fast-glob";
import _ from "lodash";
import { AppProps } from "next/app";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";

const CONFIG = {
  locales: ["zh", "en"],
};

const localeDir = path.join(process.cwd(), "src", "locales");

export interface I18nProps {
  _i18n: {
    locale: string;
    resource: any;
    locales: string[];
  };
}

export function getI18nPaths() {
  return CONFIG.locales.map((lng) => ({
    params: {
      locale: lng,
    },
  }));
}

export function getI18nProps(ctx: any): I18nProps {
  const locale = ctx.params?.locale;

  if (!locale || !CONFIG.locales.includes(locale)) {
    throw new Error(`Invalid locale ${locale}`);
  }

  const resource: Record<string, any> = {};

  const nsDir = path.join(localeDir, locale);

  if (fs.existsSync(nsDir)) {
    const files = glob.sync(path.join(nsDir, "**/*.{yaml,yml}"));
    files.forEach((file) => {
      const data = fs.readFileSync(file).toString();
      const schema = yaml.load(data) || null;
      const ns = file
        .replace(nsDir, "")
        .replace(path.extname(file), "")
        .split(path.sep)
        .filter((s) => s)
        .join(".");
      _.set(resource, ns, schema);
    });
  }

  return {
    _i18n: {
      locale,
      locales: CONFIG.locales,
      resource,
    },
  };
}

export function withI18n(App: (props: AppProps) => any) {
  return (props: AppProps) => {
    const { _i18n } = props.pageProps as I18nProps;
    const instance = i18n.createInstance({
      resources: _i18n.resource,
    });
    return (
      <I18nextProvider i18n={instance}>
        <App {...props}></App>
      </I18nextProvider>
    );
  };
}
