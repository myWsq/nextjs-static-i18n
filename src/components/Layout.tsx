import { StaticI18nLink } from "../i18n-browser";
import { useTranslation } from "react-i18next";

const Layout: React.FunctionComponent = ({ children }) => {
  const { t } = useTranslation("common");

  return (
    <>
      <nav>
        <StaticI18nLink href="/">{t("home")}</StaticI18nLink>{" "}
        <StaticI18nLink href="/about">{t("about")}</StaticI18nLink>
      </nav>
      <main>{children}</main>
      <footer>
        <li>
          <StaticI18nLink locale="zh">简体中文</StaticI18nLink>
        </li>
        <li>
          <StaticI18nLink locale="en">English</StaticI18nLink>
        </li>
      </footer>
    </>
  );
};

export default Layout;
