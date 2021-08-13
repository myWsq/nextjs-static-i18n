import { GetStaticPaths, GetStaticProps } from "next";
import { useTranslation } from "react-i18next";
import Layout from "../../components/Layout";
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
  const { t } = useTranslation("common");

  return (
    <Layout>
      <p>{t("introduction")}</p>
    </Layout>
  );
}
