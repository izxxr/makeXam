import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Link,
} from "@heroui/react";
import { EditFilled } from "@ant-design/icons";
import { useState } from "react";

const NAV_ITEMS: any = [
  // {label: "GitHub", props: {href: "https://github.com/izxxr/makeXam", target: "_blank"}},
]

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = NAV_ITEMS.map((value: any) => {
    return (
      <NavbarItem key={value.label}>
        <Link color="foreground" {...value.props}>
          {value.label}
        </Link>
      </NavbarItem>
    );
  })

  const navMenuLinks = NAV_ITEMS.map((value: any) => {
    return (
      <NavbarMenuItem key={value.label}>
        <Link size="lg" {...value.props}>
          {value.label}
        </Link>
      </NavbarMenuItem>
    );
  })

  return (
    <Navbar maxWidth="2xl" height="3rem" className="shadow-lg" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="center">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="sm:flex gap-2">
          <EditFilled className="!text-blue-400" />
          <div className="text-blue-400 font-bold">MakeXam</div>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex px-5 gap-8" justify="start">
        {navLinks}
      </NavbarContent>
      <NavbarContent justify="end">
        <p className="text-sm text-default-500">
          Created with 🩶 by @
          <a className="underline" href="https://github.com/izxxr" target="_blank">izxxr</a> • {" "} 
          <a className="underline" href="https://github.com/izxxr/makeXam" target="_blank">source</a>
        </p>
      </NavbarContent>
      <NavbarMenu>
        {navMenuLinks}
      </NavbarMenu>
    </Navbar>
  );
}
