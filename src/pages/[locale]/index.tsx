import { GetStaticPaths, GetStaticProps } from "next";
import { useTranslation } from "react-i18next";
import { getI18nPaths, getI18nProps } from "../../i18n-server";
import Link from "next/link";

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
      <Link href={`/${i18n.language}/about`}>About</Link>
    </div>
  );
}
