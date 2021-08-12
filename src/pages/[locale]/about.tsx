import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { getI18nPaths, getI18nProps } from "../../i18n-server";

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

export default function About() {
  const { t, i18n } = useTranslation("common");

  return (
    <div>
      {t("introduction")}
      <Link href={`/${i18n.language}`}>Home</Link>
    </div>
  );
}
