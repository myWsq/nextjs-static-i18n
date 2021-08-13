import { GetStaticPaths, GetStaticProps } from "next";
import { useTranslation } from "react-i18next";
import { getI18nPaths, getI18nProps } from "../../i18n-server";
import Layout from "../../components/Layout";

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
  const { t } = useTranslation("common");

  return (
    <Layout>
      <h1>{t("title")}</h1>
    </Layout>
  );
}
