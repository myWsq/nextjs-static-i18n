import { GetStaticPaths, GetStaticProps } from "next";
import { useTranslation } from "react-i18next";
import { getI18nPaths, getI18nProps } from "../../i18n-server";
import { StaticI18nLink } from "../../i18n-browser";

export const getStaticPaths: GetStaticPaths = () => {
  return {
    fallback: false,
    paths: getI18nPaths(),
  };
};

export const getStaticProps: GetStaticProps = (ctx) => {
  return {
    props: getI18nProps(ctx),
  };
};

export default function Home() {
  const { t, i18n } = useTranslation("common");

  return (
    <div>
      {t("title")}
      <StaticI18nLink href="/" locale="zh">
        简体中文
      </StaticI18nLink>
      <StaticI18nLink href="/" locale="en">
        English
      </StaticI18nLink>
    </div>
  );
}
