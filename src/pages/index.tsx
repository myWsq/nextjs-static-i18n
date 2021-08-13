import { GetStaticProps } from "next";
import { getConfig } from "../i18n-server";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const getStaticProps: GetStaticProps = (ctx) => {
  const { locales } = getConfig();
  return {
    props: {
      locales,
    },
  };
};

export default function Index({ locales }) {
  const router = useRouter();

  // language detection
  // not recommended for production, use servers-side redirection instead of this
  useEffect(() => {
    for (const locale of locales) {
      for (const lang of navigator.languages) {
        if (lang.startsWith(locale)) {
          router.replace("/" + locale);
          return;
        }
      }
    }
  }, []);

  return <></>;
}
