"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { gsap } from "gsap"
import { X, Facebook, Instagram, Linkedin, Globe } from "lucide-react"
import SkullImage from '@/public/images/skull.webp'
import LogoImage from '@/public/images/main-logo.png'
import { Hamburger } from "./Icons"

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const drawerRef = useRef<HTMLDivElement>(null)
    const menuItemsRef = useRef<HTMLDivElement>(null)
    const socialLinksRef = useRef<HTMLDivElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)
    const logoRef = useRef<HTMLDivElement>(null)
    const hamburgerRef = useRef<HTMLButtonElement>(null)

    const tl = useRef<gsap.core.Timeline | null>(null)

    useEffect(() => {
        tl.current = gsap.timeline({ paused: true })

        gsap.set(drawerRef.current, {
            yPercent: -100,
            opacity: 1,
        })

        if (menuItemsRef.current && socialLinksRef.current && closeButtonRef.current) {
            gsap.set([menuItemsRef.current.children, socialLinksRef.current.children, closeButtonRef.current], {
                y: 20,
                opacity: 0,
            })
        }

        tl.current
            .to(drawerRef.current, {
                yPercent: 0,
                duration: 0.8,
                ease: "power3.inOut",
            })
            .to(
                menuItemsRef.current?.children || [],
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: "power2.out",
                },
                "-=0.4",
            )
            .to(
                socialLinksRef.current?.children || [],
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.05,
                    duration: 0.4,
                    ease: "power2.out",
                },
                "-=0.3",
            )
            .to(
                closeButtonRef.current,
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.out",
                },
                "-=0.4",
            )

        return () => {
            tl.current?.kill()
        }
    }, [])

    useEffect(() => {
        if (tl.current) {
            if (isOpen) {
                document.body.style.overflow = "hidden"
                tl.current.play()
            } else {
                document.body.style.overflow = ""
                tl.current.reverse()
            }
        }
    }, [isOpen])

    const toggleDrawer = () => {
        setIsOpen(prev => {
            const newState = !prev
            console.log("is open =", newState)
            return newState
        })
        console.log('toggleDrawer clciked')
    }

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-[10] px-8 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div ref={logoRef} className="z-50">
                            <Link href="/" className="block">
                                <Image
                                    src={LogoImage}
                                    alt="Fatfish Logo"
                                    width={120}
                                    height={40}
                                    className="h-10 w-auto"
                                />
                            </Link>
                        </div>

                        <div className="flex items-center justify-end gap-[90px]">
                            <div className="hidden md:flex items-center space-x-8">
                                <Link href="#" className="text-[#222222] hover:text-gray-900 text-sm">My Ventures</Link>
                                <Link href="#" className="text-[#222222] hover:text-gray-900 text-sm">Products</Link>
                                <Link href="#" className="text-[#222222] hover:text-gray-900 text-sm">Blogs</Link>
                                <Link href="#" className="text-[#222222] hover:text-gray-900 text-sm">9-5</Link>
                                <Link href="#" className="text-[#222222] hover:text-gray-900 text-sm">9-5</Link>
                            </div>

                            <button
                                ref={hamburgerRef}
                                onClick={toggleDrawer}
                                className={`z-50 flex flex-col justify-center items-center cursor-pointer w-10 h-10 focus:outline-none ${isOpen ? "invisible" : "visible"}`}
                                aria-label="Toggle menu"
                            >
                                <Hamburger />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div ref={drawerRef} className="fixed top-0 left-0 w-full h-screen bg-[#cb413f] z-[20] opacity-0">
                <div className="container mx-auto h-full flex flex-col justify-between py-24 px-8 md:px-16">
                    <button
                        ref={closeButtonRef}
                        onClick={toggleDrawer}
                        className="absolute top-6 right-8 text-white pointer-events-[all]"
                        aria-label="Close menu"
                    >
                        <X size={32} />
                    </button>

                    <div ref={menuItemsRef} className="flex flex-col space-y-6 mt-16">
                        <Link
                            href="/projects"
                            className="text-[#e8d7b4] text-6xl md:text-8xl font-bold hover:text-white transition-colors"
                        >
                            <div className="flex items-center">
                                <div className="menu-item-icon-container mr-4">
                                    <Image className="menu-item-icon lazyloaded"
                                        src={SkullImage}
                                        alt="Skull icon"
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                PROJECTS
                                <span className="ml-4 text-2xl text-white">32</span>
                            </div>
                        </Link>

                        <Link
                            href="/agency"
                            className="text-white text-6xl md:text-8xl font-bold hover:text-[#e8d7b4] transition-colors"
                        >
                            AGENCY
                        </Link>

                        <Link
                            href="/expertise"
                            className="text-white text-6xl md:text-8xl font-bold hover:text-[#e8d7b4] transition-colors"
                        >
                            EXPERTISE
                        </Link>

                        <div className="text-white text-xl mt-8 flex items-center">
                            <div className="menu-item-icon-container mr-4">
                                <Image className="menu-item-icon lazyloaded"
                                    src={SkullImage}
                                    alt="Skull icon"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            branding + web + strategy
                        </div>
                    </div>

                    <div className="mt-12 md:absolute md:right-16 md:top-1/2 md:transform md:-translate-y-1/2 max-w-sm">
                        <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">FEEL LIKE GETTING A NEW JOB?</h2>
                        <p className="text-white mb-6">
                            At fatfish, our fuel is challenges (and coffee), and we like to have fun, even between 9 and 5. If you are
                            like us...
                        </p>
                        <Link
                            href="/careers"
                            className="inline-block bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
                        >
                            JOIN OUR TEAM
                        </Link>
                    </div>

                    <div ref={socialLinksRef} className="absolute bottom-8 left-8 flex flex-col space-y-4">
                        <Link href="/" aria-label="Facebook">
                            <Facebook className="w-5 h-5 text-white hover:text-[#e8d7b4] transition-colors" />
                        </Link>
                        <Link href="/" aria-label="Instagram">
                            <Instagram className="w-5 h-5 text-white hover:text-[#e8d7b4] transition-colors" />
                        </Link>
                        <Link href="/" aria-label="LinkedIn">
                            <Linkedin className="w-5 h-5 text-white hover:text-[#e8d7b4] transition-colors" />
                        </Link>
                        <Link href="/" aria-label="Website">
                            <Globe className="w-5 h-5 text-white hover:text-[#e8d7b4] transition-colors" />
                        </Link>
                    </div>

                    <div className="absolute bottom-8 right-8 transform rotate-90 origin-bottom-right">
                        <Link href="/" className="text-white hover:text-[#e8d7b4] transition-colors">
                            Français
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

