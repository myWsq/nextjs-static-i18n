import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import glob from "fast-glob";

const localeDir = path.join(process.cwd(), "src", "locales");

export interface I18nProps {
  _i18n: {
    locale: string;
    resource: any;
    locales: string[];
  };
}

export function getConfig() {
  return {
    locales: ["zh", "en"],
  };
}

export function getI18nPaths() {
  const { locales } = getConfig();
  return locales.map((lng) => ({
    params: {
      locale: lng,
    },
  }));
}

export function getI18nProps(ctx: any): I18nProps {
  const { locales } = getConfig();
  const locale = ctx.params?.locale;
  if (!locale || !locales.includes(locale)) {
    throw new Error(`Invalid locale ${locale}`);
  }

  const resource: Record<string, any> = {};

  const nsDir = path.join(localeDir, locale);

  if (fs.existsSync(nsDir)) {
    const files = glob.sync(path.join(nsDir, "*.{yaml,yml}"));

    files.forEach((file) => {
      const data = fs.readFileSync(file).toString();
      const schema = yaml.load(data) || null;
      const ns = path.basename(file, path.extname(file));
      resource[ns] = schema;
    });
  }

  return {
    _i18n: {
      locale,
      locales,
      resource,
    },
  };
}
