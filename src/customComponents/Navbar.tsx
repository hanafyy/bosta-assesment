import { useTranslation } from "react-i18next";
import imgUrl from "../assets/imgs/botsalogo.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Search, Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Navbar() {
  const { t, i18n } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const onLangChangeHandler = () => {
    const currentLang = localStorage.getItem("lang") || "en";
    const newLang = currentLang === "ar" ? "en" : "ar";
    localStorage.setItem("lang", newLang);
    i18n.changeLanguage(newLang);
    window.location.reload();
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue !== "") {
      navigate(`/track/orders/${searchValue}`);
    }
  };

  return (
    <nav className="w-full flex justify-between items-center px-4 py-4">
      {/* Logo */}
      <div className="logo flex items-center gap-4">
        <img src={imgUrl} className="w-16 h-16" alt="Bosta Logo" />
        <h1 className="text-primaryRed text-2xl font-black">{t("Bosta")}</h1>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden lg:flex items-center gap-8 text-lg font-semibold">
        <NavLink to="">{t("Home")}</NavLink>
        <NavLink to="">{t("Prices")}</NavLink>
        <NavLink to="">{t("Contact Sales")}</NavLink>
      </div>

      {/* Search and Login Section */}
      <div className="hidden lg:flex items-center gap-4 text-lg font-semibold">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                showIcon={false}
                className="text-lg font-semibold p-0"
              >
                {t("Track Shipment")}
              </NavigationMenuTrigger>
              <NavigationMenuContent
                className={`min-w-72 min-h-24 flex flex-col gap-4 p-4 ${
                  localStorage.getItem("lang") === "en" ? "" : "items-end"
                }`}
              >
                <span className="text-gray-500 text-sm">
                  {t("Track Shipment")}
                </span>
                <form onSubmit={onFormSubmit} className="flex w-full">
                  <Button className="bg-primaryRed text-white rounded-r-none">
                    <Search />
                  </Button>
                  <Input
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={t("Tracking Number")}
                    className={`${
                      localStorage.getItem("lang") === "en"
                        ? "rounded-l-none text-left"
                        : "rounded-l-none text-right"
                    } focus:ring-0 focus:outline-0`}
                  />
                </form>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Separator orientation="vertical" className="h-8" />
        <NavLink to="">{t("Login")}</NavLink>
        <button
          className="text-primaryRed text-lg font-semibold"
          onClick={onLangChangeHandler}
        >
          {t("EN")}
        </button>
      </div>

      {/* Mobile Hamburger Menu */}
      <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="lg:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-4">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              <img src={imgUrl} className="w-12 h-12" alt="Bosta Logo" />
            </SheetTitle>
          </SheetHeader>
          <nav className="mt-6 flex flex-col gap-4 text-lg font-semibold">
            <NavLink to="" onClick={() => setSidebarOpen(false)}>
              {t("Home")}
            </NavLink>
            <NavLink to="" onClick={() => setSidebarOpen(false)}>
              {t("Prices")}
            </NavLink>
            <NavLink to="" onClick={() => setSidebarOpen(false)}>
              {t("Contact Sales")}
            </NavLink>
            <Separator orientation="horizontal" className="my-4" />
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    showIcon={false}
                    className="text-lg font-semibold p-0"
                  >
                    {t("Track Shipment")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-72 min-h-24 flex flex-col gap-4 p-4">
                    <span className="text-gray-500 text-sm">
                      {t("Track Shipment")}
                    </span>
                    <form onSubmit={onFormSubmit} className="flex w-full">
                      <Button className="bg-primaryRed text-white rounded-r-none">
                        <Search />
                      </Button>
                      <Input
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder={t("Tracking Number")}
                        className="rounded-l-none focus:ring-0 focus:outline-0"
                      />
                    </form>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavLink
              className={"font-semibold"}
              to=""
              onClick={() => setSidebarOpen(false)}
            >
              {t("Login")}
            </NavLink>
            <button
              className="text-primaryRed text-lg font-semibold w-fit"
              onClick={() => {
                onLangChangeHandler();
                setSidebarOpen(false);
              }}
            >
              {t("EN")}
            </button>
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

export default Navbar;
