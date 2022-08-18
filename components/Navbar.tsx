import Link from "next/link";
import { useRouter } from "next/router";
import {Disclosure, Menu, Transition} from '@headlessui/react'
import React, {useRef, Fragment} from 'react'

const navigation = [
    {name: 'Projects', href: '/projects', authRequired: false},
    {name: 'About', href: '/about', authRequired: false},
]


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Nav = () => {
    const router = useRouter();
    const currentPath = router.pathname;
    const menuDropdown = useRef<HTMLDivElement>(null)
    const menuButton = useRef<HTMLDivElement>(null)
    const openMenu = () => {
        if (menuDropdown.current?.classList.contains('opacity-100')) {
            setTimeout(() => {
                menuDropdown.current?.classList.add('hidden');
            }, 200);
            menuDropdown.current?.classList.add('opacity-0');
            menuDropdown.current?.classList.remove('opacity-100');
            return;
        }
        menuDropdown.current?.classList.remove('hidden')
        setTimeout(() => {
            menuDropdown.current?.classList.remove('opacity-0');
            menuDropdown.current?.classList.add('opacity-100');
        }, 5)
        menuButton.current?.addEventListener('focusout', () => {
            setTimeout(() => {
                menuDropdown.current?.classList.add('hidden');
            }, 200);
            menuDropdown.current?.classList.add('opacity-0');
            menuDropdown.current?.classList.remove('opacity-100')
        })
    }
    return (
        <Disclosure as="nav" className="bg-gray-900 rounded-b-lg">
            <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
                <div
                    className="hidden fixed z-20 transition-opacity duration-200 opacity-0 ease-in-out absolute top-14 left-1 sm:invisible"
                    ref={menuDropdown}>
                    <div
                        className="flex flex-col p-2 border w-56 h-56 shadow-black shadow-sm rounded-b-md border-gray-900 bg-gray-900">
                        {navigation
                            .map((item) => (
                                <Link
                                    href={item.href}
                                    key={item.name}
                                    className={classNames(
                                        currentPath.includes(item.href)
                                            ? "bg-sky-700 text-white"
                                            : "text-gray-300 bg-gray-900 hover:text-white",
                                        "px-3 py-2 inline-block text-md hover:bg-sky-700"
                                    )}
                                    aria-current={currentPath === item.href ? "page" : undefined}
                                >
                                    {item.name}
                                </Link>
                            ))}
                    </div>
                </div>
                <div className="flex justify-between justify-items-center items-center h-14">
                    <div className={'pl-1 sm:hidden cursor-pointer'}>
                        <div tabIndex={1} ref={menuButton} onClick={openMenu}>
                            <div className="space-y-1">
                                <div className="w-5 h-0.5 bg-gray-200"/>
                                <div className="w-5 h-0.5 bg-gray-200"/>
                                <div className="w-5 h-0.5 bg-gray-200"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-start pl-3 sm:pl-0 sm:items-stretch sm:justify-start grow">
                        <div className="self-center">
                            <Link href="/">
                                <span className="text-neutral-100 text-base font-mono">
                                    nullnode
                                 </span>
                            </Link>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                {navigation
                                    .map((item) => (
                                        <Link
                                            href={item.href}
                                            key={item.name}
                                            >
                                            <a
                                            className={classNames(
                                                currentPath.includes(item.href)
                                                    ? "bg-sky-700 text-white"
                                                    : "text-gray-300 bg-gray-800 hover:text-white",
                                                "px-3 py-2 rounded-md text-sm font-medium hover:bg-sky-700"
                                            )}
                                            aria-current={currentPath === item.href ? "page" : undefined}
                                        >
                                            {item.name}
                                        </a>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Disclosure>
    );
}

export default Nav;