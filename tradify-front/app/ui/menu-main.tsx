'use client'
import React from "react";
import {usePathname } from 'next/navigation'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import Link from "next/link.js";


import {Logo} from "./logo.jsx";
import { ConnectButton } from "@rainbow-me/rainbowkit";


export default function MenuMain() {

  const pathname = usePathname();
  return (
    <Navbar shouldHideOnScroll isBordered className=" bg-transparent">
      <NavbarBrand>
        <NavbarItem href="/"
                    as={Link} className="text-white">
        <Logo />
        <p className="font-bold text-inherit">TradifyPlatform</p>
        </NavbarItem>
      </NavbarBrand>
      
      <NavbarContent justify="center">
        <NavbarItem isActive={pathname === "/seller"}>
        <Link color="primary" href="/seller">
            Seller
          </Link>
        </NavbarItem>

        <NavbarItem isActive={pathname === "/repairshop"}>
        <Link href="/repairshop">
            Repair Shop
          </Link>
        </NavbarItem>
        
        <NavbarItem isActive={pathname === "/tradify-platform"}>
        <Link color="primary" href="/tradify-platform">
            Tradify Platform
          </Link>
        </NavbarItem>

        <NavbarItem isActive={pathname === "/buyer"}>
        <Link color="primary" href="/buyer">
            Buyer
          </Link>
        </NavbarItem>

        
        <NavbarItem className="hidden md:flex">
        <ConnectButton></ConnectButton>
        </NavbarItem>
        
      </NavbarContent>
    </Navbar>
  );
}
